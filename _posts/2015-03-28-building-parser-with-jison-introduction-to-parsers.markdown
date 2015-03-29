---
layout: post_simple
title:  "Building a Parser with Jison: Parsers and Parser Generators"
date: 2015-03-28
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

For example, imagine that we were given the symbol stream of `1 + 2`. Right now, the structure and meaning of that stream is unclear (to a computer) &mdash; to give the symbol stream meaning to the computer, we need to **re-represent** the symbol stream in a format that contains its structure and semantics &mdash; we need to **parse** the symbol stream.

In the diagram below, we see one way to parse the symbol stream `1 + 2` into a new representation &mdash; from a *linear* stream into a *tree* that contains the data and relationships of the symbol stream but with all of the benefits of a tree-like interface.

<img src='/img/blog/parser_function.jpg' style='border:1px solid black; border-radius: 4px; padding: 2px; margin: 0 auto;' width='100%' />

In the parsing example above, the input gets converted into a single root node, an `AdditionExpression`, which contains children `NumericLiterals` that stand in an addition-relation of some type via the `AdditionOperator`.

Great. So, now that we have a firm grasp of the high-level concept of a **parser**, let's talk about ***why you should care about all this***.

---

## Why Should You Care About This?

<blockquote><em><strong>TL;DR</strong></em> &mdash; parsers help you build cool shit</blockquote>

The power of parsers is that they allow you to **convert input of** ***one form*** **into a** ***representation of another form*** **which with a software component can interact**.

I would contend that technology and cognition supervene heavily upon manipulations of data stream representations &mdash; for example, a sensory stream coming in and being parsed into a **meaningful** representation by the brain and body. I would argue that a large part of our society and civilization is owed to the power of manipulating representations of one format into representations of another format &mdash; reading and writing, transformation equations in mathematics and physics, network communication of data packets across the internet, and more.

So, if you want to build powerful things and think about things that have never been thought, you will want to know how to ***manipulate data from one representation to another***. A **parser** is one way to do that.

Enough *theory*, show us the **practical** applications &mdash; ***challenge accepted***.

### Concrete Examples

(1) **The Computer** &mdash; an input stream of electric patterns get converted into 0s and 1s, and vice versa.

(2) **Compilers and Interpreters** &mdash; an input stream of one type of program code is converted into another type of program code. For example, ***CoffeeScript*** is parsed and then compiled into ***JavaScript***, as shown in the following two snippets:

<script src="https://gist.github.com/Cfeusier/62dcfb440e3f73e168c8.js"></script>

Once compiled, the above CoffeeScript will be represented as the following JavaScript:

<script src="https://gist.github.com/Cfeusier/b48720078b16dacb6ad8.js"></script>

In order to generate the JavaScript code, there is a required **intermediate step** of *converting the CoffeeScript into a non-CoffeeScript structured representation* &mdash; i.e., parsing the CoffeeScript into a parse tree.

(3) **The DOM** &mdash; I find the DOM to be one of the easiest ways to show the power and approachability of building a parser. So, let's do a quick case-study of the DOM. The **DOM**, or Document Object Model, is a convention for representing a document as an object in a tree-structure. Web browsers, like Google Chrome or Mozilla Firefox, can take an input file (which is a one big string of HTML) and parse it into a document tree.

For example, if we input the following HTML document into a simplistic HTML-to-DOM parser, we would get a tree representation of the HTML document that looks like the diagram below.

<script src="https://gist.github.com/Cfeusier/a9e7219263d697432646.js"></script>

<img src='/img/blog/example_dom_tree.png' style='border:1px solid black; border-radius: 4px; padding: 2px; margin: 0 auto;' width='100%' />

**So, why does every web browser do this?** ***Why does every browser parse HTML documents into DOM trees?***

<blockquote><h3>Parsing HTML into a DOM tree allows the web browser to <strong>expose an API</strong> for the document.</h3></blockquote>

That is the payoff. Let me state it more generally. Parsing a string into a tree representation allows you to expose an API for accessing and manipulating the input data &mdash; an API that was **not** available when working with the raw input stream.

Imagine that our input HTML's first `div` element included an **id** `first-div`. Browsers expose a method on the `document` object that allows us to select the `div` element with a given **id**, without having to manually traverse the HTML string. It is a simple as `document.getElementById('first-div');`. There are hundreds of public methods in each browser's DOM API. By parsing HTML into a JavaScript object (the DOM tree), the browser is able to offer a JavaScript interface that is **extremely powerful**.

At this point, we have a firm grasp of what a parser is and the motivations for building a parser, but you are probably thinking **just show me how to build a parser already, damn it!** Well, here we go.

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
