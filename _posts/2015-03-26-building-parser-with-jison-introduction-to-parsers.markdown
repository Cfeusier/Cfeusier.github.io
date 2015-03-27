---
layout: post_simple
title:  "Building a Parser with Jison: Parsers and Parser Generators"
date: 2015-03-26
author: "Clark Feusier"
tags:
- javascript
- jison
- parser
- implementation examples
- cognition-as-a-service

---

**Who**: this post is for anyone looking to learn some of the foundations required for working with ***parsers***, ***parser generators***, and [***Jison***](http://zaach.github.io/jison/docs/)

**What**: this post will show you ***what a parser is***, ***how to generate a parser***, and ***how to use a parser***

**Why**: I will wax philosophical about why you should care about learning how to build a parser

---

## What is a Parser?

<blockquote>
A <strong>parser</strong> is a glorified <em><strong>function</strong></em>, which takes a <em>sequential stream of symbols</em> as an <strong>input</strong>, and produces a <em>structured representation of the input stream's</em> <strong>parts</strong> as an <strong>output</strong>.
</blockquote>

--> EXPLANATION GOES HERE

<img src='/img/blog/parser_function.jpg' style='border:2px solid black; border-radius: 4px; padding: 20px; margin: 0 auto;' width='100%' />

--> TRANSITION

---

## Why Should I Care About This at All?

### Case-Study: the DOM

--> TRANSITION

---

## What is a Parser Composed of?

1. Lexer (Lexical Analysis)
2. Parsing Component (Syntactic Analysis)

The lexer turns input symbols into tokens defined by a lexical grammar.
The parsing component checks that the tokens form an allowable expression. This is usually done with reference to a context-free grammar. Map allowable expressions to actions that you want to take when those expressions are found. This creates your parse tree.

### Syntactic Grammar

- recursively defines components that can make up an expression and the order in which they must appear
- mention BNF Grammar





---

## Where do Parsers Come From?

## Parser Generators

## Jison

## LALR(1) Parsing Algorithms

### Shift-Reduce Algorithms

### Top-Down vs. Bottom-Up Parsing Algorithms

## Using Jison to Generate a Parser

### Example: Small Something

### Case-Study: CoffeeScript

---

### I Generated a Parser - What Now?

### Resources

---

## Summary
