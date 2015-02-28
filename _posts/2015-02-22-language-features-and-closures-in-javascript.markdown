---
layout: post_simple
title:  "The Language Features of JavaScript that Create Closure"
date: 2015-02-22
author: "Clark Feusier"
tags:
- javascript
- closures
- computer science
- language

---

This will be a very simple post covering the language features of JavaScript that create **closure**. Basically, I just want to sing you a little ditty about closures &mdash; what they are and how they come about in JavaScript.

Our post will follow this outline:

1. the definition of a closure
2. the requisite parts of a closure
3. a brief explanation of *scope* in JavaScript &mdash; both lexical and dynamic scope
4. the necessary features of the JavaScript language that allow for closure

**Note**: from here on, I will assume that I am only talking about closure in *JavaScript*

<blockquote>
    <strong>Credit</strong> to <a href='https://twitter.com/mracus' target='_blank'>@mracus</a> for the awesome lecture, from which my following notes were derived. Anything good in this post is credit to him, and anything incorrect is probably because of my misunderstanding.
</blockquote>

Let's break it down, yo.

---

## The Definition of a Closure

A **closure** is a ***function*** object that retains **ongoing access** to the variables of the context *in which it was created*.

For a less formal specification &mdash; a closure is pretty much just a function object that was ***defined within*** and ***returned by*** another function. That is, a closure is a reference to a function object that was defined and returned by an 'outer' function.

If the concept of a closure isn't clear from the above definitions, the following examination of the different components of a closure help clarify.

## The Requisite Parts of a Closure

1. an **outer** function with variables

<script src="https://gist.github.com/Cfeusier/654300c9bdecd7597441.js"></script>

2. an **inner** function that references variables in the outer function

<script src="https://gist.github.com/Cfeusier/e48f5cafed64132c08d2.js"></script>

3. the inner function is **returned** by the outer function

<script src="https://gist.github.com/Cfeusier/d100585e61ab18e07606.js"></script>

As you can see, our final code snippet illustrates a closure, summarized as follows:

1. a closure function **closes over** (encloses) the closure-scoped variables
1. the declaration of the closure function is returned by the outer function
  1. the closure function references a variable from its context (the outer function)
1. when the closure function is executed, it can access the variables referenced in even though the outer function has already finished execution

## An Aside about Scope in JavaScript


## The Features of JavasScript that Allow for Closure

---

## Summary





---

# WORKING NOTES

## Scopes

1. scope = part of program where a binding between a variable and value is valid
1. lexical scope = regions of source code where variable name reference has meaning (no access errors)
1. default scope in JavaScript is global
1. ‘{‘ of a function declaration delimits the entry to a new lexical scope
1. lexical scope enforces access rules
1. scopes can be nested
1. variables are either global or local to a single function (lexically scoped)
1. in-memory (dynamic) scope = in-memory storage sytem (data structure) for holding variables and their values
1. in-memory scope structures are called execution contexts
1. in-memory scopes == dynamic scopes == execution contexts
1. lexical scopes have one-to-many relationships with in-memory scopes (1 lexical scope for the code—n dynamic scopes, with one for each invocation of the function associated with that scope
program run
1. in-memory datastores will be built to keep track of all variables available to function objects
1. an in-memory datastore is created anew for every invocation of a function to isolate the running of each function
1. thus, for each lexical scope there could be 0-many in-memory scopes/execution contexts (depending on how many times the function has been executed)
1. the current in-memory scope/execution context is where the interpreter first does lookup
1. the execution context has a key-value mapping inside it

### function properties (language features) that allow for closures in JS:

1. fn1 can/must explicitly return value (or value gets GCed)
1. fn1 can return fn2 as explicit return value
1. fn2 can retain access to the context in which it was created
1. fn1 returns fn2 as explict value
1. fn2 references variable A in fn1
1. fn1 gets executed and stored in variable as fn2
1. variable A disappears when execution is done
1. fn2 gets executed
1. fn2 can access variable A, even though the fn1’s execution context (intuitively) should have disappeared at this point
