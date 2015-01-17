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

For those of us still here, let's look at an example of the expected behavior and then dissect the prompt.

## Example of Expected Behavior

Each of the asynchronous functions (`job1`, `job2`, and `job3`) use a `setTimeout` function to simulate a long-running task.

<script src="https://gist.github.com/Cfeusier/766a1031e12c860dc0c2.js"></script>

Based on the example, `job2` will return first, `job3` will return second, and `job1` will return last, but the expectation is that `asyncMap` will **make it appear** as though the results being passed into the final callback were returned in the order of `job1` - `job2` - `job3`. The results will be passed into the callback, which logs the results in **synchronous-appearing** order, as seen on lines 17 - 19.

We have a clear expectation of the behavior of a **single-case**, so let's dissect the prompt to see if we can pick out a more general expectation that handles all cases.

## Dissecting the Prompt

- we are in JavaScript-land &mdash; the world of the browser, Node, the Event Loop, a single-thread, and web applications

Obviously, you can implement asynchronous code behavior in a language that can handle multi-threading, but the prompt will be framed very differently. If you are being asked this question in an interview, it is because you are going to be working with the JavaScript in some capacity if they offer you the job.

- `asyncMap` will take two inputs &mdash; an array and a callback function

The **array** argument will be full of *asynchronous* functions, and the **callback function** argument will be an action to perform when all of the functions in the array have finished executing.

Each member of the array can be thought of as a ***job*** that needs to be performed. The job will take time to complete, and because JavaScript runs on a single-thread, the job will block the event loop of the JavaScript interpreter if it is executed *synchronously*.

Instead, each job should be **started** and given instructions on what to do when the job is completed, and then the JavaScript interpreter can continue processing without needing to wait for each job to complete before even **starting** the next job. When each job finishes, it can use the instructions it was given to **callback** the main thread with the result of the job's work. This is *one* way to implement **asynchronicity** &mdash; another popular style is to use [Promises](https://promisesaplus.com/) instead of callbacks.

Don't get confused by all the callbacks floating around. Our `asyncMap` function will take a **single** callback, while each of the functions within the input array will take **its own** callback, which will be different from the callback passed into `asyncMap` as the second argument.

Once all of the **jobs** have completed and triggered their individual callbacks, `asyncMap` should collect up all of the results from the jobs &mdash; the results should be ordered based on when the job was **started**, not when the job returned it's value. Finally, the callback that was passed into `asyncMap` should be invoked with the results as an argument.

`asyncMap` should effectively simulate a *synchronous* mapping function, i.e., even though the collection being enumerated over contains functions that will be executed asynchronously, the result of our `asyncMap` function will appear as though all of the jobs were executed synchronously.

Now that we have a target for which we can aim, let's cover the concepts and techniques that will be involved in our algorithm, and then we will cover two possible solutions to the problem.

## Concepts and Techniques Involved

The interview question is testing you on your ability to comprehend and use the following:

1. asynchronous programming techniques
2. higher-order functions
3. callbacks

Before discussing two possible solutions, I want to give a **too long - didn't read (tl;dr)** overview of those three topics to make sure that everyone is on the same page.

### Asynchronous Programming Techniques

### Higher-Order Functions

### Callbacks

## Solutions

1. imperative style solution
2. functional style solution

What does that mean?

## Solution: *imperative*

blahty blah

<script src="https://gist.github.com/Cfeusier/4a6321bd3acd325b85d8.js"></script>

## Solution: *functional*

blahty blah

<script src="https://gist.github.com/Cfeusier/02ed48507b02b2b5c3f0.js"></script>








## Summary

- asynchronicity
- higher-order functions
- callbacks


