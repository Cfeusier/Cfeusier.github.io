---
layout: post_simple
title: "Popular Interview Question Series: Asynchronous Map with Variations"
date: 2015-01-17
author: "Clark Feusier"
tags:
- javascript
- implementation examples
- interview questions
- asynchronous
- functional

---

One of my favorite 'toy problems,' often asked in technical interviews during a 'screening' phase, is to implement an **asynchronous mapping** function. This problem can be tricky because it tests your knowledge of *asynchronicity* and your ability to use *higher-order functions*. This knowledge is considered necessary for a web-application engineer &mdash; asynchronous programming techniques, event systems, and use of higher-order functions are standard for building web apps. So, many interviewers use this question to *cut to the chase*.

The prompt will usually go like this:

<blockquote>
  Write an <strong>asyncMap</strong> function with two parameters &mdash; an array of asynchronous functions and a callback function. Each of the asynchronous functions takes a <em><strong>its own callback</strong></em> and invokes that callback when finished executing. The callback passed to <strong>asyncMap</strong> should be invoked on the results of the callbacks of the asynchronous functions. The order of the results should be the same as the order in which the asynchronous functions were invoked. Note, the order in which the asynchronous functions are passed to <strong>asyncMap</strong> determines the order of the results, not the order in which the asynchronous functions finish executing. After <em>all</em> the callbacks of the asynchronous functions have returned, <strong>asyncMap</strong> should invoke the callback on the collection of results.
</blockquote>

If your head isn't spinning by now, you shouldn't be reading this. ***Go build a compiler or something.***

For those of us still here, let's break down the prompt so that we have an idea of how to even think about the problem.



You are given the following skeleton and behavior expectations in the next two examples:

### Skeleton

### Examples of Expected Behavior

- implement a parallel processor that handles the results synchronously
- kick off async tasks
- once all return, invoke cb on the results in the correct order



The interview question is testing you on the following:



## Solution: Imperative Style

blahty blah

<script src="https://gist.github.com/Cfeusier/4a6321bd3acd325b85d8.js"></script>

## Solution: Functional Style

blahty blah

<script src="https://gist.github.com/Cfeusier/02ed48507b02b2b5c3f0.js"></script>








## Summary

- asynchronicity
- higher-order functions
- callbacks


