---
layout: post_simple
title:  "Unix to Know this Command Series: Printing from Streams with <em><strong>sed -n '/pattern/'p</strong></em>"
date: 2015-09-12
author: "Clark Feusier"
excerpt: "<strong><em>sed</em></strong> is my simple and obedient search hound. He has a single input &mdash; his hound-dog nose. He can match patterns coming through the input stream to patterns given to him by his handler. And finally, he can output his findings in an output stream &mdash; <strong>WOOF</strong>!"
tags:
- unix
- linux/GNU
- shell commands
- sed
- usage examples

---

I like to think of the Unix command-line utilities as though they were interesting characters &mdash; it helps me remember the different command switches based on each command's _personality_.

`sed` is my simple and obedient search hound. He has a single input &mdash; his hound-dog nose. He can match patterns coming through the input stream to patterns given to him by his handler. And finally, he can output his findings in an output stream &mdash; **WOOF**!

`sed` is tremendously effective for searching, editing, and printing text without leaving the command-line. I'd like to share with you the `sed -n '/pattern/'p`, today. This simple command has saved me enough time that I want to share it. Let's get started!

***Note***: this command can be used in most Linux, GNU, and Unix scripting shells. Some Windows command-line tools like Cygwin and PowerShell support this command, as well. The title is more catchy my way, though.

---

## What is `sed`?

A Unix command for stream-oriented editing without opening an editor.

<blockquote><em><strong>sed</strong></em> fills a buffer with input from stdin or a file, modifies the buffer based on desired patterns and arguments, and then outputs the contents to stdout.</blockquote>

Pretty simple, eh? Simple, but powerful. Ok, then how do we use `sed`?

## How to use `sed -n '/pattern/'p`?

- `sed -n` will silence the printing of pattern space matches that we don't care about
- the `p` part of `sed -n '/pattern/'p` is a command that prints from the modified buffer
- the `'/pattern/'` part specifies the pattern by which to filter and modify the buffer &mdash; any legitimate Unix regular expression
- finally, the command accepts an input file (or text from stdin) to filter

The complete command will output the lines that contain the given pattern. Let's look at an example.

## Example of printing with `sed -n '/pattern/'p`

Imagine that we have an example JavaScript file that contains some `console.log` statements, like the following:

<script src="https://gist.github.com/Cfeusier/b4aa0f1988d07595adaa.js"></script>

We want to print out all of the lines that contain a `console.log` statement from `example.js`, but we do not want to leave the command-line or open a text editor. Here, we use the basic `sed` _print_ command:

<script src="https://gist.github.com/Cfeusier/90c19922ad0ae8f65f99.js"></script>

Great, but we also want to see the line numbers of each match! Easy, instead of `p` for the _print_ command, we use a variation `{=;p;}` to get the matching line numbers:

<script src="https://gist.github.com/Cfeusier/6c356bb60ea91168a594.js"></script>

Awesome, but we want the line numbers to be on the same line as the matching text! This actually cannot be done with a **single** `sed` command.

> If you use `=` in `sed` the line number will be printed on a separate line and is not available in the pattern space for manipulation. However, you can pipe the output into another instance of `sed` to merge the line number and the matching text ([source](http://stackoverflow.com/users/26428/dennis-williamson)).

But, we can achieve the desired result by using **two** `sed` commands &mdash; we can pipe the output of the first `sed` command into another `sed` command that joins the line numbers with the matching lines, as follows:

<script src="https://gist.github.com/Cfeusier/b998b1bc7b4cbbe2598e.js"></script>

Nice! But, I am lazy and won't remember those patterns, so I want a simpler command. Let's quickly talk about using `grep` as an alternative.

### Sidenote: `grep`

The same outcome can be achieved in different ways, as is usual in the Unix world. So, even though this tutorial is about the `sed` _print_ command, I want to mention the `grep -n pattern file` command. Here is the above `sed` example rewritten using `grep`:

<script src="https://gist.github.com/Cfeusier/8574de6985468da61445.js"></script>

I prefer the `grep` command for this use-case, but `sed` is an important tool, and I think it is easiest to learn by starting with a simple example like printing. So, I saved the more practical `grep` command for last to force you to read about `sed`.

---

### Summary

- `sed` is a powerful stream editor for searching and manipulating text from stdin or a file, using Regular Expression patterns
- We learned to use `sed -n '/pattern/p' file` to search a file and print the matching text
- Next, we learned to use `sed -n '/pattern/{=;p;}' file` to search a file and print the matching text and line numbers
- Then, we looked at piping the result of the previous `sed` command into another `sed` command, in order to join the line numbers with the matching text &mdash; `sed -n '/pattern/{;=p;}' file | sed '{N;s/\n/ /}'`
- Finally, we talked about using the simpler `grep -n pattern file` command to achieve our desired result

To learn more about `sed` and it's myriad use-cases, check out `man sed` or [online `man sed`](http://man.cx/sed). If you like learning Unix commands, check out [my other Unix posts](/pages/collected-writings).

Remember, it isn't just me that should know these scripting tools &mdash; ***unix to know these commands, too&#8482;***
