---
layout: post_simple
title:  "Popular Interview Question: Higher-Order Functions and Function Binding"
date: 2015-01-10
author: "Clark Feusier"
tags:
- javascript
- functional programming
- implementation examples
- interview questions

---

In technical interviews, it is common that the interviewer will throw in a question about functional programming. If you are applying for a job as a JavaScript engineer, then you should expect an interview question in some similar form to the following:

<blockquote>
Write a 'bind' method on the Function prototype that binds a context to a function and returns the bound version, so that when invoked, the returned function will be executed in the context passed into the bind method
</blockquote>

Here is an example of the target objective:

<script src="https://gist.github.com/Cfeusier/c23cc54f1048b02fc4f4.js"></script>

This interview question is testing your knowledge of a few things:

1. the `.prototype` property of function objects
2. the concept of an object decorator (specifically, function object decorator)
3. how to use JavaScript's `call`, `apply`, and `bind`
4. how to use first-class functions
5. how to use higher-order functions
6. what the `arguments` object is in JavaScript, and how to manipulate it into an Array

It is not enough to be able to solve this problem &mdash; you must be able to talk intelligibly about the previous 6 topics with your interviewer(s). So, let's talk through a general approach to the problem and the constraints of the problem, then, we can walk through the code for one possible solution and the theory involved.

## Problem Constraints and the Process of Finding a Solution

First, what is this problem even asking us to do?

When I approach a problem of any decent complexity, I like to break it down into **stupid**-obvious little parts.

1. write a method called `bind`
2. add the `bind` method as a property on the `Function.prototype`
3. inputs: a context object to which the returned function should be bound
4. outputs: a bound function

So, I need to figure out out to add a method to the `Function.prototype`. Next, I need to understand what it means to 'bind' a function to a context. Finally, I need to be aware of any edge-cases and 'gotchas' &mdash; e.g., what happens if no context is provided to our `bind` function?

Those problems are small and manageable &mdash; I know how to add a method to the `.prototype` property of an object. I think I know what it means to 'bind' a function to a context. Finally, I will remind myself to reconsider edge-cases as we progress. Let's implement, then discuss.

## Solution

<script src="https://gist.github.com/Cfeusier/6388b0760af775fcb068.js"></script>

- functions that can either take other functions as arguments or return them as results

## Theory


---

## Summary

