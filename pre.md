# Automating string processing in spreadsheets using input-output examples

Today, I will talk about automating string processing in spreadsheets using input-output examples (**next slide**).

Nowadays, spreadsheets are widely used in our daily life. Scientists use spreadsheets to organize experimental data. Marketing managers use spreadsheets to analyze the sales of goods. And we also use online spreadsheets to collect personal information like this (**points to picture in the slide**).

While large number of these spreadsheets users are not programmers, and it may trouble them to do string manipulation tasks. Imagine this situation (**next slide**) that you are the class president, and you want to collect the cities that your classmates live to check whether they come from cities at high risk. But you have get the data like this, the full address of students (**points to slides**). And you just want to **extract** the city from these string. To solve it, you may select-copy-paste one by one, or write some scripts using regular expressions. However, with the help of our technique, flashfill (**next part**), end-users just need to write a few output examples, click Run. (**perform a demo**). Now, the rest cities are generated here (**points to slides**). It is convenient.

Behind it (**next slide**), there are two main sections in this work. We first describe a domain specific language used for string manipulation. It is simpler than regular PLs, but is expressive enough to solve real-world tasks. Another thing, this language is not designed for users to write. Then (**next part**) we design an algorithm. It take several input-output examples as input to synthesize a program in this language. And it will use this program to generate output for the rest inputs.

## Language for Constructing Output Strings

First (**next slide**), let us have a quick look at this string manipulation language (**next slide**).

One basic assumption in our work is that the output string is generated from the input string. The string language only do syntactic pattern mattching and copy fragment from input and paste to the output.

### Trace

Trace Expression is the main body of the language. It represents how the output string is generated. It is a concatenation of some atom string expressions.

See this example (**points to slide**), the output string consists of 3 parts, the first part "A" comes from the first input, and next is a constant string " lives at " encoded in the program, and the last part "nanjing" is a substring of the second input. The constant string and substring are all atom expressions. Then we concatenate them together to get the output string, "A lives at nanjing".

Here, constant string is hard encoded in the program of our string language.

### Substring

Then (**next slide**), let us see more details about what substring is. The substring consists of 3 parameters. We first choose an index $i$, that denotes which input string is used (**next click**), and two positions $left, right$ which denotes the left and right boundaries of substring. And the concrete position are evaluated by a position expression.

For this example, we want to extract the substring "nanjing". We first choose input column Address. Then we need to find the left and right position. While the $CPos(k)$ is a position expression which evaluates to a constant number. Non-negative index $k$ is the $k$-th index from the left side, while the negative is from the right side.

However, in this way, we losses much generalization ability. If we use some different provinces or universities, then we will get wrong results (**next click**). As a result, we can use regular expressions.

$Pos$ is another kind of position expression. The first two parameters are regular expressions $r_1$ and $r_2$. It finds the a position that can split the input string with two parts, left and right. There exists a suffix of the left part is accepted by the first regular expression $r_1$, and a prefix of the right part is accepted by $r_2$.

### Regular Expressions

In our string manipulation language, we only use a small subset of regular expressions. It is just a sequence of tokens. 

Notice that we don't support the kleen star and disjunct operation. Although we losses some expressiveness, but we can have a more efficient synthesize algorithm.

Moreover, we also make a trade-off that use top-level conditionals (**next slide**).

### Conditionals

The top-level of the string language is `Switch` that receives pairs of a Boolean expression and a trace expression. The string language will evaluate the trace expression corresponding to the first satisfied Boolean expression.

The top-level is some switch-cases. Then, if the input satifies a Boolean expression, the corresponding trace expression is evaluated. Then all the atom expressions in trace will be evaluated one by one. Finally, we get the output string. Now, this is all the language constructions.

### Example

Let's see an example.

## Algorithm

Now, it is ready to introduce the algorithm to synthesize a program.

First, let us formally define the problem.

Given some input-output examples $(i_1, o_1), (i_2, o_2), \dots$, synthesize a program $P$ such that $P(i_1) = o_1, \dots, P(i_n)=o_n$.

However, synthesizing this program $P$ directly seems to be hard. We can solve it in another way.

Divide the problem into little parts. Generate a program $P_i$ for each input-output example pair, and then merge them together to get the final program $P$ (**Highlight in the slide**).

### Learn Trace

Let us talk about the first step. The goal of the first step is to generate a program $P_k$ for each input-output example such that $P_k(i_k)=o_k$.

See this example, for us we know the output string is generated in this way. But the algorithm does not know, so this trace is also valid, as this is (**explain the example in the slide**). Since algorithm doesn't know what we really need, we must store them all for further computation. And this is our basic idea, to iterative all possible trace expressions that can construct the given output string. But the number of these traces is exponential in size of the output string, while iterating and storing consumes lots of time and space.

Here our solution is to use a more effective way, or data structure to express it, which is a Directed Acyclic Graph (DAG).

In this DAG, we create a node for each position with in the output string. We create an edge from position $i$ to any latter position $j$, which denotes a substring of the ouptut. Then, all the valid trace can be expressed a path from the 1-st node to the last node (**explain examples**). For example, we can go through the path $0 \to 2 \to 4$, the edge from $0$ to $2$ is `ab`, and the edge from $2$ to $4$ is `cd`.

This dag structure can divide the origin exponential problem to quadratic sub-problems. Before, we iterate all the possible trace path, but now we only need to iterate each substring of output. The number of substring is obviously $n^2$.

So, our next goal of the algorithm is to solve these sub-problems. That is to say, for each of the $n^2$ substrings of the output string, find all possible atom expressions to generate it. Just like the previous talk, generating a substring atomic may contain several different solutions. For example, we can just use a constant string to generate it, or we can use the `SubStr` constructor. 

There is a oberservation that the left position expression is not related to the right. And considering our definition of regular expression is resricted to a token sequence, so the generation of regular expression can be done by iterating the input string. In short, at this time, you can just use brute-force iteration to generate atom expressions.

### Intersect

After the first step, we have generated $n$ string programs for each input-output example. In this second step, our goal is to split the programs into several groups, where the programs in will be intersected together, and the result program should be non-empty. By the way, if all the programs can be intersected into a single non-empty program, then it is just what we want, return it.

In this step, we use a greedy strategy to intersect programs. We measure the compatibility of a pair of programs. During each iteration, select a pair of programs with the highest compatibility score, until we cannot choose any pairs to intersect a non-empty program.

Then, at the third step, we use the partition result of the previous step, and generate a Boolean classification expression in DNF form for each group to distinguish them from each other. Finally, put them in a top-level switch-case expression, it is just the output program we want.

## Extensions

### Loop

### Rank
