---
layout: post_simple
title:  "Building a Parser with Jison: Parsers and Parser Generators"
date: 2015-03-28
author: "Clark Feusier"
excerpt: "This post is an introduction to parsers, parser generators, and Jison. To start, a <strong>parser</strong> is a glorified <em><strong>function</strong></em>, which takes a <em>sequential stream of symbols</em> as an <strong>input</strong>, and produces a <em>structured representation of the input stream's</em> <strong>parts</strong> as an <strong>output</strong>..."
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
<h3>A <strong>parser</strong> is a glorified <em><strong>function</strong></em>, which takes a <em>sequential stream of symbols</em> as an <strong>input</strong>, and produces a <em>structured representation of the input stream</em> <strong>parts</strong> as an <strong>output</strong></h3>
</blockquote>

For example, imagine that we were given the symbol stream of `1 + 2`. Right now, the structure and meaning of that stream is unclear (to a computer) &mdash; to give the symbol stream meaning to the computer, we need to **re-represent** the symbol stream in a format that contains its structure and semantics &mdash; we need to **parse** the symbol stream.

In the diagram below, we see one way to parse the symbol stream `1 + 2` into a new representation &mdash; from a *linear* stream into a *tree* that contains the data and relationships of the symbol stream but with all of the benefits of a tree-like interface.

<img src='/img/blog/parser_function.jpg' style='border:1px solid black; border-radius: 4px; padding: 2px; margin: 0 auto;' width='100%' />

In the parsing example above, the input gets converted into a single root node, an `AdditionExpression`, which contains children `NumericLiterals` that stand in an addition-relation of some type via the `AdditionOperator`.

Great. So, now that we have a firm grasp of the high-level concept of a **parser**, let's talk about ***why you should care about all this***.

---

## Why Should You Care About This?

<blockquote><h3><em><strong>TL;DR</strong></em> &mdash; parsers help you build cool shit</h3></blockquote>

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

<blockquote><h3>Parsing HTML into a DOM tree allows the web browser to <strong>expose an API</strong> for the document</h3></blockquote>

That is the payoff. Let me state it more generally. Parsing a string into a tree representation allows you to expose an API for accessing and manipulating the input data &mdash; an API that was **not** available when working with the raw input stream.

Imagine that our input HTML's first `div` element included an **id** `first-div`. Browsers expose a method on the `document` object that allows us to select the `div` element with a given **id**, without having to manually traverse the HTML string. It is a simple as `document.getElementById('first-div');`. There are hundreds of public methods in each browser's DOM API. By parsing HTML into a JavaScript object (the DOM tree), the browser is able to offer a JavaScript interface that is **extremely powerful**.

At this point, we have a firm grasp of what a parser is and the motivations for building a parser, but you are probably thinking **just show me how to build a parser already, damn it!** Well, here we go.

---

<h1 class="page-title">Parsers</h1>

In order to build a parser, we must be clear on what we are building, that is, we must have a clear idea of the components of a parser.

## What are the Components of a Parser?

1. the **Lexical Analyzer** generates meaningful tokens by splitting the input stream based on regular expressions patterns
2. the **Syntactic Analyzer** generates a tree of expressions by checking if tokens combine into well-formed formulas based on a grammar specification

Let's clarify the details of both components in turn, starting with the *lexical analyzer*.

### The Lexical Analyzer

<blockquote><h3>The lexer turns input symbols into tokens defined by a lexical grammar</h3></blockquote>

The main job of the lexical analyzer is to convert the symbols of the input stream into **tokens**, which are then passed to the syntactic analyzer. Creating **tokens** out of the input is the first step in generating **meaning** from the input symbols.

So, what is a **token**? Simplistically, a **token** is a mapping between a symbol or sequence of symbols and the type of lexeme the symbol or sequence of symbols represents. For example, we could choose to represent the symbol `(` with the token `{ value: (, tag: 'LPAREN' }`, or `var` as the token `{ value: var, tag 'VAR_KEYWORD' }`.

In order to create the tokens, the lexical analyzer is must first ***read in a stream of characters***. The lexical analyzer might read in a stream of symbols from user input, from the input to a function within a program, from a file, *ad nauseam*.

The logic for creating tokens out of an input stream can be summarized in pseudocode as follows:

<script src="https://gist.github.com/Cfeusier/a6ab7753a330b7cacef7.js"></script>

Here is a real-life example from the **CoffeeScript** lexer's [**`tokenize`**](http://coffeescript.org/documentation/docs/lexer.html) method. You will notice that the logic matches that of the pseudocode above it. Any standard lexical analyzer will contain logic that looks very similar.

<script src="https://gist.github.com/Cfeusier/fe7dc4c2b93613911105.js"></script>

Now that we have a high-level idea of how a lexical analyzer ***reads a symbol stream***, let's look at how it does the **tokenization** &mdash; i.e., how does it get from *symbols* to **tokens**.

Imagine that our input was a single character `$` &mdash; our lexical analyzer could contain a rule which returns `'BLINGBLINGMONEYAINTATHING'` every time the `$` symbol is encountered. `'BLINGBLINGMONEYAINTATHING'` is the token which is passed into the syntactic analyzer for further analysis.

Obviously, that is a highly simplified example of lexical analysis; however, it shows us the main component of the lexical analyzer, that is, the **lexical grammar**. The lexical grammar is just a set of rules for mapping patterns onto tokens, usually done with Regular Expressions. Here is an example of a simple (pointless) lexical grammar specification that a tool like <a href="http://en.wikipedia.org/wiki/Lex_(software)" target="_blank">(f)lex</a> could use to generate a lexical analyzer, as we will be doing later with Jison.

<script src="https://gist.github.com/Cfeusier/2dc52725ffb4b375578e.js"></script>

- **Lines 1 - 3**:
  - lexical macros or name definitions. Matched regexp expands into name, which can be used in the grammar to generate a token. EXAMPLES
- **Lines 5 - 14**:
  - the lexical grammar rules. When a raw symbol or macro pattern is matched, then return the following token type. EXAMPLES

Depending on the implementation, the lexer will usually wrap the token with location data and other goodies along with the token type. EXAMPLES

### The Syntactic Analyzer

<blockquote><h3>The syntactic analyzer uses a syntactic grammar, in combination with the tokens from the lexer, to create a parse tree of allowable expressions</h3></blockquote>

- The syntactic analyzer checks that the tokens form an allowable expression.
- This is usually done with reference to a context-free grammar.
- Maps allowable expressions to actions that you want to take when those expressions are found.
- This creates your parse tree.
- Grammar + Logic/Actions + composed of tokens from the lexer
- The Syntactic Grammar recursively defines components that can make up an expression and the order in which they must appear
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
