---
layout: post_simple
title:  "Unix to Know this Command Series: Printing from Streams with <em><strong>sed -n '/pattern/'p</strong></em>"
date: 2015-09-08
author: "Clark Feusier"
excerpt: "<strong><em>sed</em></strong> is my simple and obedient search hound. He has a single input &mdash; his hound-dog nose. He can match patterns coming through the input stream to patterns given to him by his handler. And finally, he can output his findings in an output stream &mdash; <strong>WOOF</strong>!"
tags:
- unix
- linux/GNU
- shell commands
- sed
- usage examples

---

I like to think of the Unix command-line utilities as though they were interesting characters &mdash; it helps me remember the flags based on each command's _personality_.

`sed` is my simple and obedient search hound. He has a single input &mdash; his hound-dog nose. He can match patterns coming through the input stream to patterns given to him by his handler. And finally, he can output his findings in an output stream &mdash; **WOOF**!

`sed` is tremendously effective for searching, editing, and printing text without leaving the command-line. I'd like to share with you the `sed -n '/pattern/'p`, today. This simple command has saved me enough time that I want to share it. Let's get started!

***Note***: this command can be used in most Linux, GNU, and Unix scripting shells. Some Windows command-line tools like Cygwin and PowerShell support this command, as well. The title is more catchy my way, though.

---

## What is `sed`?

A Unix command for stream-oriented editing without opening an editor.

<blockquote><em><strong>sed</strong></em> fills a buffer with input from stdin or a file, modifies the buffer based on desired patterns and arguments, and then outputs the contents to stdout.</blockquote>

Pretty simple, eh? Simple, but powerful. Ok, then how do we use `sed`?

## How to use `sed -n '/pattern/'p`?

`sed -n` will silence the printing of pattern space matches that we don't care about. The `p` part of `sed -n '/pattern/'p` is a command that prints from the modified buffer. The `'/pattern/'` part specifies the pattern by which to filter and modify the buffer &mdash; any legitimate Unix regular expression will do. Finally, you pass an input file or text to the command. The complete command will output the lines that contain the given pattern. Let's look at some examples.

## Examples of printing with `sed -n '/pattern/'p`

`sed -n '/console.log/'p example.js`

---

SUMMARY / CLOSING

- more about sed http://man.cx/sed
- links to other _unix to know this command_ posts

Remember, it isn't just me that should know these scripting tools &mdash; ***unix to know these commands, too&#8482;***
