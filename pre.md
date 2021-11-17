# Automating string processing in spreadsheets using input-output examples

Today, I will talk about automating string processing in spreadsheets using input-output examples (**next slide**).

Nowadays, spreadsheets are widely used in our daily life. Scientists use spreadsheets to organize experimental data. Marketing managers use spreadsheets to analyze the sales of goods. And we also use online spreadsheets to collect personal information (**points to picture in the slide**).

While large number of these spreadsheets users are not programmers, and they may face some troubles doing string manipulation. Image this situation (**next slide**) that you are the class president, and you want to collect the cities that your classmates live to check whether they come from cities at high risk. But you have get the data like this, the full address of students (**points to slides**). And you just want to **extract** the city from these string. To solve it, for the users who are not programmers, they can select-copy-paste one by one, and it seems hard for them to write some string manipulation scripts with something like regular expressions. However, with the help of our technique, flashfill (**next part**), end-users just need to write a few output examples, click Run. (**perform a demo**). Now, the rest cities are generated here (**points to slides**). It is convenient.

In this work (**next slide**), there are two main sections. We first describe a simple string manipulation language that is expressive enough to solve a lot of real-world tasks. Then (**next part**) we design a learning algorithm to synthesize a program in this language with some given input-output examples.

## Language for Constructing Output Strings

First (**next slide**), let us have a quick look at this string manipulation language (**next slide**).

### Trace

We assume that the output string is a concatenation of the substrings of inputs or a constant string. So, the main body of the language, called Trace Expression, is a concatenation of some atom string expressions.

See this example (**points to slide**), the output string consists of 3 parts, the first part "A" comes from the first input, and the second part is a constant string " lives at " encoded in the program, and the last part "nanjing" is a substring of the second input. The constant string and substring are all atom expressions. Then we concatenate them together to get the output string.

### Substring

Then (**next slide**), let us see more details about what substring is. The substring consists of 3 parameters. We first choose an index $i$, that denotes which input string is used (**next click**), and two positions $left, right$ which denots the left and right boundaries of substring. And the concrete position are evaluationed by a position expression.

For this example, we want to extract the substring "nanjing". We first choose input column Adress. Then we need to find the left and right position. While the $CPos(k)$ is a position expression which evaluates to a constant number. Non-negative index $k$ is the $k$-th index from the left side, while the negative is from the right side.

However, in this way, we losses much generalization ability. If we use some different provinces or universities, then we will get wrong results (**next click**). As a result, we can use regular expressions.

$Pos$ is another kind of position expression. The first two parameters are regular expressions $r_1$ and $r_2$. It finds the a position that can split the input string with two parts, left and right. There exists a suffix of the left part is accepted by the first regular expression $r_1$, and a prefix of the right part is accepted by $r_2$.

### Regular Expressions

In our string manipulation language, we only use a small subset of regular expressions. It is just a sequence of tokens. Each token is a category of characters, like letters, digits, spaces, and so on. In this example, this regular expression will accept the strings that start with as least one lowercase letter and end with at least one digit number, which is equivalent with the normal regular expressions `[a-z]+[0-9]+`.

Notice that we don't support the kleen star and disjunct operation. Although we losses some expressiveness, but we can have a more efficient synthesize algorithm for that the kleen star and disjunct will cosume lots of time when synthesizing program.

Moreover, we also make a trade-off that use top-level conditionals (**next slide**).

### Conditionals

The top-level of the string language is `Switch` that receives pairs of a boolean expression and a trace expression. The string language will evaluate the trace expression corresponding to the first satisfied boolean expression.

The top-level is some switch-cases. Then, if the input satifies a boolean expression, the corresponding trace expression is evaluated. Then all the atom expressions in trace will be evaluated one by one. Finally, we get the output string. Now, this is all the language constructions.

### Example

Let's see an example.

## Algorithm

Now, it is ready to introduce the algorithm to synthesize a program.

First, let us formally define the problem we want to solve.

Given some input-output examples $(i_1, o_1), (i_2, o_2), \dots$, synthesize a program $P$ such that $P(i_1) = o_1, \dots, P(i_n)=o_n$.

However, synthesizing this program $P$ directly seems to be hard. We can solve it in another way.

Divide the problem into little parts. Generate a program $P_i$ for each input-output example pair, and then merge them together to get the final program $P$ (**Highlight in the slide**). Sometimes, the merging operation may fail, so that in this case for those classes of programs cannot be merged, we generate boolean expressions to classify them.

### Learn Trace

Let us talk about the first step. The goal of the first step is to generate a program $P_k$ for each input-output example such that $P_k(i_k)=o_k$.

See this example, for us we know the output string is generated in this way. But the algorithm does not know, so this trace is also valid, as this is (**explain the example in the slide**). Since algorithm doesn't know what we really need, we must store them all for further computation. And this is our basic idea, to iterative all possible trace expressions that can construct the given output string. But the number of these traces is exponential in size of the output string, while iterating and storing consumes lots of time and space.

So that we need to use a more effective way, or data structure to expressive it, which is a Directed Acyclic Graph (DAG).

In this DAG, we create a node for each position with in the output string. We create an edge from position $i$ to any latter position $j$, which denotes a substring of the ouptut. Then, all the valid trace can be expressed a path from the 1-st node to the last node (**explain examples**).

Now, we can divide the origin exponential problem to quadratic sub-problems, that how to generate each substring of output using some input strings.

So, the next goal of the algorithm is to solve these sub-problems. For each of the $n^2$ substrings, find all possible atom expressions to generate it. Just like the previous talk, generating a substring atomic may contain several different solutions. But this time, it does not explode exponentially. We can iterate all the input string, and find substrings that match the output, then generate the position expression for the left and right boundaries.

### Intersect

## Extensions

### Loop

### Rank
