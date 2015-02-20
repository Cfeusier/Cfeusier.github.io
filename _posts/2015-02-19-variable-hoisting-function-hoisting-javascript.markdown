---
layout: post_simple
title:  "Variable Hoisting and Function Hoisting in JavaScript"
date: 2015-02-19
author: "Clark Feusier"
tags:
- hoisting
- javascript
- fundamentals

---

In JavaScript, both variables and functions are hoisted by the interpreter at runtime. However, variables and functions are not hoisted in the same way as each other. Roughly, **hoisting** is when a line of code is parsed and made available to the runtime environment *before* the line of code is (seemingly) executed by the interpreter.

Note, the above approximation of ***hoisting*** glosses over many complex topics in computer science and software engineering. For the purposes of this post, I will restrict my discussion to a crude mental-model of a JavaScript interpreter/runtime environment as it relates to the phenomenon of ***hoisting***.

This post will clarify *variable* hoisting, *function declaration* hoisting, *function expression* hoisting, and *named function* hoisting. If these concepts weren't already clear in your mind, they will be by the end of this post.

Let's start with **variable hoisting**.

---

## Variable Hoisting

Variables are **hoisted** to the top of the *scope in which they are defined*. Usually, a variable is defined within a function body, but occasionally, a variable is defined at the top-level of a program, i.e., in the global scope, which can be scoped to a file or across files, depending on the runtime. So, either a variable is hoisted to the top of the file in which it is defined, or, a variable is hoisted to the top of the function body in which the variable is defined.

Next, the variable **name** is hoisted, but *not the value referenced by the name*. When hoisted, the value referenced by a variable name is `undefined` until it gets initialized by the line from which the variable name was hoisted.

See the example code below &mdash; when executed, the first line throws an error because the variable being reference isn't defined anywhere in the program. Lines 3 - 6 represent a case of variable hoisting, with a runtime representation below that is 'basically' happening when the code example is run.

<script src="https://gist.github.com/Cfeusier/03f7733dee65dc465bce.js"></script>

Now that you understand variable hoisting, here is an example 'gotcha' that hoisting causes &mdash; this code is one reason that some recommend putting variable declarations at the top of the scope in which they are defined, so that hoisting never surprises you.

<script src="https://gist.github.com/Cfeusier/7de8cc1a40805b08df7f.js"></script>

At first pass, one might think that line 5 would log out `good` because of the variable `janus` in the outer scope of the program. However, the variable of the same name on line 6 is within a new scope, so it is hoisted to the top of the function, where it is `undefined` until after the variable is initialized on line 6 to the value `'bad'`.

**Summary of Variable Hoisting**

1. variables are hoisted to the **top** of the scopes in which the variables are defined
    - variables are either scoped globally or to local functions
    - variables are either hoisted to the tops of files or to the tops of function bodies
1. variable **names** are available at the tops of scopes, but the values are `undefined`

We have a firm grasp of variable hoisting in JavaScript, so let's examine how **function** hoisting works.

## Function Hoisting

Functions are **hoisted** to the top of the *scope in which they are defined*. However, function *declarations* are hoisted differently than function *expressions* and *named functions*. Let's look at function ***declarations*** first.

### Function Declarations

A **function declaration** looks like this:

<script src="https://gist.github.com/Cfeusier/ed0ba367de663c340ecc.js"></script>

The function name is `example`. This function is not assigned to any variable or used in any expression statement, hence, this is a function **declaration**. Now, we are ready for an example of function declaration hoisting!

<script src="https://gist.github.com/Cfeusier/c73c07105ec47990508d.js"></script>

The function declaration named `hoist` is hoisted to the top of the scope in which it is defined (the file). Notice, the function name **and** the function value (body) are hoisted, unlike variable hoisting, where the variable name is hoisted but not the variable value.

**Summary of Function Declaration Hoisting**

1. function declarations are hoisted to the **top** of the scopes in which the functions are defined
1. both the function *name* and *body* are hoisted to the top of the scope, unlike variable hoisting

Great, we can now learn about how function *expressions* are hoisted in JavaScript!

### Function Expressions

A **function expression** looks like this:

<script src="https://gist.github.com/Cfeusier/a75eaed7273eceb7ab67.js"></script>

The function is unnamed, but the function is assigned to a variable named `example` in an expression statement, hence, this is a function **expression**. Now, we are ready for an example of function expression hoisting!

<script src="https://gist.github.com/Cfeusier/3500df3ed2bc25f568c3.js"></script>

The function expression is hoisted to the top of the scope in which it is defined (the file). Notice, the variable name in which the function is stored is the only part that is hoisted, unlike function declaration hoisting, where the function name and function body are hoisted. Function expressions are hoisted just like other variable expression statements, and **not** like function declarations.

**Summary of Function Expression Hoisting**

1. function expressions are hoisted to the **top** of the scopes in which the functions are defined
1. only the function *name* (represented by the variable name) is hoisted to the top of the scope
1. function expressions are hoisted like variables and not function declarations

Great, we can now learn about how **named functions** are hoisted in JavaScript!

### Named Functions

**Note**: I am referring to a *named* function as a function with a name that also isn't a function declaration.

A **named function** looks like this:

<script src="https://gist.github.com/Cfeusier/8343af040972c58fc9cf.js"></script>

The function is named, and the function is assigned to a variable named `example` in an expression statement, hence, this is a **named** function. Please notice that the name of the function is pretty much useless because it is effectively shadowed by the variable name. Now, we are ready for an example of named function hoisting!

<script src="https://gist.github.com/Cfeusier/e86b8b2e6b8426ff1598.js"></script>

The named function is hoisted to the top of the scope in which it is defined (the file). Notice, the variable name in which the function is stored is the only part that is hoisted, unlike function declaration hoisting, where the function name and function body are hoisted. Named functions (that aren't function declarations), are hoisted just like other variable expression statements, and **not** like function declarations.

In the second example, the named function is stored in a variable that does not match the name of the function. This example shows that the variable name is hoisted, but not the function name!

**Summary of Named Function Hoisting**

1. named functions are hoisted to the **top** of the scopes in which the functions are defined
1. only the function *name* (represented by the variable name) is hoisted to the top of the scope
1. named function are hoisted like variables and not function declarations
1. the name of the function is effectively shadowed by the name of the variable to which the function is assigned

---

## Summary

1. **variables** are hoisted to the top of their scopes
    - only the variable name is hoisted
    - the variable value is not hoisted
1. **function declarations** are hoisted to the top of their scopes
    - both the function name and the function body are hoisted
1. **function expressions** are hoisted to the top of their scopes
    - only the variable name is hoisted, not the function body
1. **named functions** are hoisted to the top of their scopes
    - if used in a function expression, only the variable name is hoisted

### Never get tripped up by JavaScript's hoisting again!
