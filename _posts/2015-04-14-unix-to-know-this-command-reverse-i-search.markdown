---
layout: post_simple
title:  "Unix to Know this Command Series: Reverse-i-Search with CTRL-R"
date: 2015-04-14
author: "Clark Feusier"
tags:
- unix
- linux/GNU
- shell commands
- scripting
- bash
- zsh

---

If you want to look cool, save time, and live a better life, then spend 5 minutes learning the shell command `CTRL-R` &mdash; sometimes called **reverse-i-search**. There is rare shell command that I use more often as a software engineer; I would like to pass my love for this wonderful utility on to the rest of the world. Here we go <3

***Note***: this command can be used in most Linux, GNU, and Unix scripting shells. Some Windows command-line tools like Cygwin and PowerShell support this command, as well. The title is more catchy my way, though.

---

## Definition of Reverse-i-Search

<blockquote><strong>Reverse-i-search</strong> is a simple, <em><strong>backward-moving</strong></em>, incremental search starting at the current line and moving <em><strong>up</strong></em> through the command history <a href="https://www.gnu.org/software/bash/manual/html_node/Commands-For-History.html" target="_blank">(source)</a></blockquote>

Imagine that the command history is a stack &mdash; each time that you execute a command, the command is pushed onto the command history stack.

Each time that you use ***reverse-i-search***, you are peeking at the top of the stack, and then if satisfied, popping the latest command off of the stack to exectute &mdash; except, you can imagine you are peeking at the top of a stack that has been filtered to only contain matches to the search pattern requested.

## How to Use Reverse-i-Search

<blockquote>Hit <em><strong>CTRL-R</strong></em> then start typing previously used command</blockquote>

For example, if I had previously typed a command to run a specific test file that started with the word `mocha`, I could start typing `moch...` (mocha is the test runner utility) after initiating ***reverse-i-search*** with **CTRL-R**.

<img src="/img/blog/reverse_i_search_example.png" width="97%" style="margin: 0 auto; border: 2px solid gray;" />

As the above screenshot shows, the command-line is populated with the most recent fuzzy match from the command history &mdash; the matched pattern is underlined.

<blockquote>Hit <em><strong>Enter/Return</strong></em> to select a command and execute it</blockquote>

For example, assume that we have started a back-search with `g fet`...

<img src="/img/blog/reverse_i_search_git_result.png" width="97%" style="margin: 0 auto; border: 2px solid gray;" />

We want to execute the command that matched &mdash; `g fetch origin master`. We hit **enter**, and watch the command execute.

<img src="/img/blog/reverse_i_search_git.png" width="97%" style="margin: 0 auto; border: 2px solid gray;" />

---

## Cycle through History

**What if we want to search through the command history list, one-by-one?**

<blockquote>Cycle through command history by hitting <em><strong>CTRL-R</strong></em>, again</blockquote>

Simple. Just repeat the command as many times as needed until you find your command or exhaust the list of history.

## Edit Command while Searching

**What if we want to edit the historical command before executing it?**

<blockquote>Use the left or right arrow to place cursor within selection for editing</blockquote>

Also simple. While searching, hit either the left or right arrow to place your cursor in the currently matched command. You can then edit the command as you normally would, then hit **enter** to execute the new command.

---

Good for you for making your life easier by learning these shortcuts and tools &mdash; you now have a valuable way to manipulate your shell command history with `CTRL-R`!

Remember, it isn't just me that should know these scripting tools &mdash; ***unix to know these commands, too&#8482;***

