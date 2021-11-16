# Automating string processing in spreadsheets using input-output examples

Today, I will talk about automating string processing in spreadsheets using input-output examples (**next slide**).

Nowadays, spreadsheets are widely used in our daily life. Scientists use spreadsheets to organize experimental data. Marketing manager use spreadsheets to analyze the sales of goods. And we also use online spreadsheets to collect personal information (**points to picture in the slide**).

While large number of these users are not programmers, and they may face some troubles. Image this situation (**next slide**) that you are the class president, and you want to collect the cities that your classmates live to check whether they come from cities at high risk. But you have get the data like this, the full address of students (**points to slides**). And you just want to **extract** the city from these string. To solve it, for the users who are not programmers, they can select-copy-paste one by one, and it seems hard for them to write some string manipulation scripts with something like regular expressions. However, with the help of our technique, flashfill, end-users just need to write a few output examples, click Run. (**perform a demo**). Now, the rest cities are generated here (**points to slides**).

In this work (**next slide**), there are two main sections. We first describe a simple string manipulation language that is expressive enough to solve a lot of real-world tasks. Then we design a learning algorithm to synthesize a program in this language with some given input-output examples.

## Language

First, let us have a quick look at this string manipulation language. 
