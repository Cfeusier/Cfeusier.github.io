---
layout: post_simple
title:  "The Language Features of JavaScript that Create Closure"
date: 2015-02-28
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

We now have the concept of a closure in front of us, but we need to understand how **scoping** works in JavaScript before we can truly understanding closures and their power. Remember, a **closure** is a function that retains ongoing access to the variables from the **scope** in which the closure function was created. So, to understand closures, we need to understand how scoping works in JavaScript.

## An Aside about Scope in JavaScript

First, let's clear the air &mdash; **scope** is an ambiguous term when used by JavaScripters. Most of the misunderstanding and confusion surrounding scoping comes from engineers' continual equivocation between **two** *different* concepts of scope &mdash; **lexical** and **dynamic**. This section will pull apart those two concepts, so that we can understand them properly.

### Lexical Scope

<blockquote>the region of source code where a <em>variable name</em> reference has <strong>meaning</strong></blockquote>

JavaScript lexically scopes variable name reference to the **function** (ignoring ES6 `let` and the like), which means that ***every function body has a corresponding lexical scope***. Take a look at the following code snippet, and then we will discuss.

<script src="https://gist.github.com/Cfeusier/de557a076731ad8b321e.js"></script>

JavaScript has **global** and **local** variables &mdash; any variable declared outside of a function is **global**, while any variable declared within a function is **locally** scoped to that function. So, on line 2, we declare and initialize a global variable named `globalVariable`, and we store the value `"got lipstick stamps on my passport"` in the `globalVariable` name-bucket. We can access this variable anywhere in our program, hence `global` &mdash; line 19 would log out the value stored in `globalVariable`.

The function `newScopeAboutToOpenHere` (lines 4 - 8) opens a local scope, in which we declare and initialize the name `localVariable` to the value `"never left the shire"`. This variable is ***local*** to the function in which it was declared in the sense that the variable name `localVariable` doesn't successfully refer to anything **outside** of the function `newScopeAboutToOpenHere`. The `console.log` statement of `localVariable` on line 20, outside of the `newScopeAboutToOpenHere` function, would throw a **reference** error because the variable doesn't refer to anything valid in the global scope because the variable is local. We can only access the value stored at that name reference if the value is **returned** from the function to which the variable is locally scoped. We access `"never left the shire"` from outside of the shire by invoking `newScopeAboutToOpenHere` on line 21, which explicitly returns `localVariable`.

Finally, local scopes can be nested, as seen on lines 10 to 17.

We were able to determine the **lexical scope** of the variables by merely **reading** the source code, that is, without running the code. In this sense, lexical scope is **static** &mdash; not dynamic. A variable is *lexically* scoped to a function as long as the variable name occurs **within the function's body** and represents a valid variable name within the function's lexicon (also called the "variable's local lexical environment"). Another way of saying it is: a variable's *lexical* scope is the **part of a program** where a binding between the variable and a value is valid.

We can contrast this type of scoping, based on static parts of a program, with a type of scoping for a variable that is determined based on the **time** that a function executes while a program is running. Let's discuss this type of **dynamic** scope now, which will also clarify any lingering confusion around lexical scope.

### Dynamic Scope

<blockquote>the in-memory storage system for holding a mapping of the available variables and values available to a function during execution</blockquote>

**Note**: though *dynamic scope* is also called *in-memory scope* and *execution context*, I will use the terms interchangeably.

As discussed above, JavaScript scopes variables to functions, meaning that the **dynamic scope** of a variable is the in-memory mapping of variable names and values available **during a particular execution** of the function to which the variable is scoped. During the execution of the function, the variable name 'exists' and is bound to a value, but as soon as the function returns, the variable name no longer 'exists' and thus can't be bound to any value.

This means that a new dynamic scope is created for *every invocation of a function*, in order to isolate the running of each function in its own environment. The current dynamic scope of a function is where the interpreter first does lookup for a given variable.

## The Features of JavasScript that Allow for Closure

---

## Summary





---

# WORKING NOTES

## Scopes

1. default scope in JavaScript is global
1. ‘{‘ of a function declaration delimits the entry to a new lexical scope
1. lexical scope enforces access rules
1. scopes can be nested
1. variables are either global or local to a single function (lexically scoped)
1. lexical scopes have one-to-many relationships with in-memory scopes (1 lexical scope for the code—n dynamic scopes, with one for each invocation of the function associated with that scope
program run
1. thus, for each lexical scope there could be 0-many in-memory scopes/execution contexts (depending on how many times the function has been executed)

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
