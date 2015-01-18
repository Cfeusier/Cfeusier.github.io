---
layout: post_simple
title: "Popular Interview Question Series: Variations on Asynchronous Map"
date: 2015-01-18
author: "Clark Feusier"
tags:
- javascript
- implementation examples
- interview questions
- asynchronous
- functional

---

One of my favorite 'toy problems,' often asked in technical interviews during a 'screening' phase, is to implement an **asynchronous mapping** function. This problem can be tricky because it tests your knowledge of *asynchronicity* and your ability to use *callback functions*. This knowledge is considered necessary for a web-application engineer &mdash; asynchronous programming techniques, event systems, and use of callback functions are standard for building web apps. So, many interviewers use this question to *cut to the chase*.

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
2. callbacks

Before discussing two possible solutions, I want to explain how I see asynchronous programming and callback functions to be connected. If you feel confident that you could explain the asynchronous processing model and callback functions, feel free to skip to the solutions section.

### The Asynchronous Processing Model and Callback Functions

Think about a fast-food drive-through. Imagine how stupid it would be to run a drive-through in the following way: one driver approaches the speaker and provides an order to the attendant through the speaker. Then, the driver waits in front of the speaker &mdash; effectively, **blocking** any other car from placing an order. Now, the fast-food restaurant hurries to prepare the order while everyone waits. Finally, a few minutes later once the order has been prepared, the attendant calls the driver forward to a window, where the driver receives the food, pays the attendant, and drives away. Only **now** can the next driver approach the speaker and place an order. The process repeats.

That would be a **synchronous** drive-through model. That is not how drive-through lines actually operate &mdash; drive-through lines are based on an **asynchronous** model of processing instructions.

It is actually highly intuitive for humans, minus all the vocabulary mumbo-jumbo. Let's drive the analogy home by connecting the terminology to our intuitions. The drive-through is a *single-instruction stream* in that only **one instruction** can be executed at a time &mdash; the drive-through attendant can only take **one order** at a time and the drive-through line is setup for handling a **single** car at a time.

The drive-through can only handle *one input* at a time, and it takes time to produce the output after the input is given (they have to prepare the order). Similarly, computing I/O, input/output &mdash; reading and writing operations &mdash; usually take a long time, e.g., writing to a database or reading from a remote web server. If you have a single-instruction stream, as in a JavaScript runtime, your instruction stream will become **blocked** if you start an I/O operation and wait to perform more instructions until the I/O operation is completed.

The asynchronous programming model avoids the **blocking** by only *starting* the potentially blocking I/O operation and then continuing to process the next instruction instead of waiting for the I/O operation to complete. But, before continuing to process instructions, the potentially blocking I/O operation is started **with some extra information**. The operation must be sent off with instructions on how to **callback** to the single-instruction stream with the result of the operation.

Once the operation starts and the **callback** instructions are given to the operation, the single-instruction stream can move on to handle the next incoming instruction without worrying about the result of the previous operation. The previous operation is responsible for calling back the instruction stream with the result of the operation as soon as it's completed.

To beat the dead horse, the drive-through attendant sends off a potentially blocking instruction to be handled by other staff members. The drive-through attendant has told the other staff members how to notify her when the order is ready for pickup. The drive-through attendant then receives another incoming order and sends it off for preparation. As soon as one of the orders is ready for pickup, the staff members will use the notification instructions to notify the attendant that the order is complete. The staff members can then pass the completed order to the attendant, who can use it to transact with the customer. There is very little time in that process where the instruction stream is **blocked**. Welcome to asynchronicity.

Congratulations, you are ready for the solution reveal...

## Solutions

I lied. You aren't ready. Or, maybe **I'm** not ready. I am going to offer two different possible solutions to `asyncMap`, and they represent two different *styles* of programming that are often discussed in technical interviews. One of the solutions is the 'traditional,' **imperative** solution, and the other solution is the currently trending *functional* solution.

If you could already offer a succinct and opinionated response to an interviewer regarding the similiarities, differences, and tradeoffs associated with the imperative programming paradigm and functional programming paradigm, then feel free to skip to the actual solutions below. If not, here is some theory and opinion-hot-fire for you.

### Imperative Programming and Functional Programming

**Imperative programming** is a *paradigm* or *style* of programming that uses **imperative statements** to change the program state &mdash; there is an emphasis on transparency forced by lower-level imperative statements.

**Functional programming** is a *paradigm* or *style* of programming that uses **function evaluation** to manage program state &mdash; there is an emphasis on immutable data and avoidance of changing the program state by using higher-level functional abstractions.

This is not a mutually exclusive categorization; also, there is no **principled** distinction that one can draw between the two paradigms. So, think of these as loose heuristics for talking about general patterns of programming. That being said, there are noticeable differences in the code!

<script src="https://gist.github.com/Cfeusier/35002b12e8ce8a7dac6e.js"></script>

<script src="https://gist.github.com/Cfeusier/d6f282efc75068f10af4.js"></script>

So, why is the *functional* style trending? Why do people love it? Why do people hate it?

All for the same reason: **abstraction**.

The main difference between the imperative and functional styles of programming (**heuristically**, please don't shoot me, Mr. Computer Scientist), is the ***level of abstraction***.

The traditional imperative paradigm uses 'lower-level' and 'transparent' imperative statements to direct the program to compute in a specific way. The traditional functional paradigm uses 'higher-level' and 'abstracted' function evaluations to direct the program to compute in a specific way. We see this in our examples above &mdash; the imperative style uses statements to direct the program, while the functional style uses a **function**, `forEach` to direct the program.

The functional style is prefered (often) because it allows the programmer to think like this:

1. use `forEach` to give me each member of the collection, one by one
2. call the function I give you once for each member of the collection &mdash; pass the collection member into my function each time so that I can access it

The imperative style forces the programmer to keep track of a lot more, like this:

1. use a `for` loop, starting at a variable called `i`
2. `i` should store the value `0` at the beginning of the `for` loop
3. the `for` loop should continue as long as `i` is less than the length property of the `collection`
4. every time through the `for` loop, `i` should be incremented by `1`
5. find the current member of the collection by indexing into the collection at the index `i`
6. perform some work with the current member of the collection that was just found via index

Notice, the functional style implementation uses a **callback**, which is passed into `forEach`. That callback is invoked on each item from the collection, in turn. The abstraction ends up giving you an interface where you can say, 'hey, forEach, give me each item of the collection one by one, and do whatever I tell you with each item, in turn.' You don't have to have **any idea** how `forEach` is working, you just have to know its public interface.

The imperative style is very different. You know exactly how you are getting access to each item in the collection. You know, because you are directing the computer to perform each of the small pieces of work required to iterate through a collection. You know where you are starting the iteration (`var i = 0`), how long to continue the iteration (as long as, `i < collection.length`), and how big of a *step* each iteration is taking (`i++`).

By **encapsulating** the iteration logic within the `forEach` method, and **abstracting** away some of the differences between iterating through collections, the functional style allows a user to think about the business logic and not the logic of iteration. Also, the encapsulation and abstraction that `forEach` provides offers protection from bugs that are often introduced with repeating any type of lower-level logic.

There are a lot of subtleties being trampled, but that should be enough to be getting along with. Let's start with a 'traditional' imperative solution. I will explain the code directly after, before proceeding to the functional style of the solution.

## Solution: *imperative*

<script src="https://gist.github.com/Cfeusier/4a6321bd3acd325b85d8.js"></script>

- **line 2**: declare a `results` variable and initialize it to an empty array
  - this array will store the return values from all of our `jobs` &mdash; the `results` must be ordered based on the order of the original `jobs` array, not the order that the `jobs` complete processing
- **line 3**: declare a `finished` variable and initialize it to `0`
  - this variable will keep track of how many of the `jobs` have finished &mdash; `finished` gets incremented every time one of the `jobs` calls back with the result of its work
- **lines 5 - 14**: iterate the length of the `jobs` array
  - this iteration will allow us to trigger all of the `jobs` one by one
- **lines 6 - 13**: create an **immediately-invoked function expression** (IIFE)
  - this is where it gets cool, but it also requires an aside ...

**ASIDE**

An ***immediately-invoked function expression***, or **IIFE** (pronounced 'If - E'), is exactly what it sounds like &mdash; a function expression that is invoked **immediately** after it is defined. Read this code and try to understand what is happening before I explain it.

<script src="https://gist.github.com/Cfeusier/8a8d9c73dadd716aca64.js"></script>

Seriously, an **IIFE** is just a function that has `()` **immediately** following the end of the function definition, which invokes the function that was just defined. The **IIFE** is a very common and useful pattern because it allows you to open a new scope and then immediately destroy the scope by invoking the function, with the possibility of storing the return value of the function without storing anything else in the scope. This is used often for simulating 'private variables' in JavaScript &mdash; the IIFE allows you to maintain a variable's state by protecting it with a new scope, while still having access to the variables from the outer scope. We used an IIFE in our solution for that very reason.

**END ASIDE**

Ok, here is the imperative solution again, just to refresh the mind before we pick up again on line 7.

<script src="https://gist.github.com/Cfeusier/4a6321bd3acd325b85d8.js"></script>

- **line 7**: within our IIFE wrapper, we are grabbing the current `job` with `jobs[i]`
  - `i` is referring to the parameter in the function signature on line 6, which is actually being passed into the invocation of the IIFE from the `for` loop on line 13
  - we must do this to **capture** the current value of `i` because the iteration of the `for` loop will happen faster than each of the `jobs`, so by the time the first `job` is trying to store its result value at index `i` on line 9, the value of `i` will be the length of the array because the iteration will have completed all of its loops
- **lines 8 - 12**: invoke the current `job` and pass in a callback that will handle the result of the `job`
  - the result of the `job` is passed to the callback as `val` on line 8
    - remember, each `job` must trigger its callback with the return value of its work &mdash; the return value of the `job` will be passed into the callback as `val` on line 8
  - **line 9**: assign the result `val` of the `job` to the correct position in the `results` collection
    - the position at which we are storing the `val` is the index number which is based on when the `job` was **started**
  - **line 10**: increment the `finished` count, indicating that another `job` has finished its work
  - **line 11**: if the number of `jobs` that have `finished` is equal to the length of the `jobs` collection, then invoke the `asyncMap` callback with `results` of all the `jobs`
    - if the `finished` count is equal to the number of `jobs` in the `jobs` collection, then we can assume that all of the `jobs` have stored their result values in the `results` array &mdash; once all the `jobs` have called back with their values, we know that the `results` array is complete and ready to pass back to the `asyncMap` callback function

That is our complete imperative-style solution to `asyncMap`. The trick to handling the asynchronous ordering is to create a new scope and capture the **original start** index number of the `job` with an IIFE.

I love that solution, especially since it reminds me of beautiful third-party libraries like *jQuery*, but I also hate having to remember to wrap the work inside the `for` loop within an IIFE. To avoid dealing with these 'lower-level' details of managing scope and race conditions, we can **abstract away** those lower-level details and wrap them up in a **function** so that we don't have to remember the details each time. Instead, we can just remember the interface of our new function, and let it do all the work for us.

I am sure that you have inferred where I am going with this...

## Solution: *functional*

<script src="https://gist.github.com/Cfeusier/02ed48507b02b2b5c3f0.js"></script>

Before I go through this solution line-by-line, I want to warn you that I have tweaked the logic on this implementation sligthly relative to the imperative-style solution. The differences in logic are the direction that `finished` moves and the condition of the base-case. In the imperative version, `finished` starts at `0` and is **incremented** each time a `job` finishes, and the base-case is reached when `finished` is equal to the length of the `jobs` collection. In the functional version, this logic is reversed. `finished` starts at the length of the `jobs` collection, and each time a `job` finishes, we **decrement** the `finished` count. The base-case checks if the `finished` count is `0`, indicating that all the `jobs` have completed.

- **line 2**: declare a `results` variable and initialize it to an empty array
  - this array will store the return values from all of our `jobs` &mdash; the `results` must be ordered based on the order of the original `jobs` array, not the order that the `jobs` complete processing
- **line 3**: declare a `finished` variable and initialize it to `jobs.length`
  - this variable will keep track of how many of the `jobs` have finished &mdash; `finished` gets decremented every time one of the `jobs` calls back with the result of its work
- **lines 5 - 10**: iterate over the `jobs` array with `jobs.forEach`
  - `forEach` is the abstraction **function** mentioned above &mdash; it *hides* all of the iteration logic from us, so we only need to know the **public interface** of `forEach`. It is a invoked **on a collection**. `forEach` takes a callback parameter that is invoked once for every item in the collection. `forEach` passes each item into the callback, along with the index number of that item. We can say, 'hey, give me all the jobs one by one along with the index number that corresponds to their index in the `jobs` collection, and do whatever I specify in the callback for each `job` in the collection.' We don't need to worry about scopes and race conditions because our `forEach` abstraction worries about that for us!
- **line 6**: invoke the current `job` and provide a callback instruction to the `job` that specifies how to handle the result of the `job`
- **line 7**: store the result of the `job`'s work at `results[i]`
  -within our `job` callback, the `job` has **finished** its work and provided the result of the work to the callback in the form of `result`, so we can store it in the `results` collection
- **line 8**: if the `finished` count decremented by `1` is equal to `0`, callback to `asyncMap` with the final `results` of all the `jobs` in the correct order
  - the decrementing happens **first**, before the equality check, so we can decrement and check all in one step

That is the complete solution to our functional-style solution to `asyncMap` &mdash; terse and simple. All of the hard work of this prompt is **handled for you** if you use the native `forEach` that is standard in ECMAScript 5+. If it feels like cheating to you, remind yourself how silly that attitude is &mdash; if utilizing a helpful abstracting is cheating (and you think cheating is bad), then you shouldn't be using a computer or the English language ;)

Wow, that was a lot of material &mdash; let's summarize.

## Summary

**Callbacks**

A **callback** is just a group of *instructions* bundled into a **function**, which is passed into another function. The **callback** can get executed at a precise time of the developer's choosing, usually after the function that is accepting the callback finishes its operations.

**The Asynchronous Processing Model**

This model processes instructions of a certain type (usually costly operations like I/O) asynchronously. The processor **starts** to process those instructions' operations, and then hands those operations an instruction of how to return the result when complete; then, *the processor continues to the next instruction without waiting for the prior instructions' operations to complete*. As soon as any operations complete, they can use the instructions they were provided at start to **callback** to the processor with the result. This model allows the processor to avoid getting **blocked** by costly operations.

**Imperative Programming and Functional Programming**

These are both **styles** or **paradigms** of programming, with different commitments to **how computation should be represented in code**. The *imperative*-style of programming is committed to representing computation in the form of short, *language-level*, **imperative statements**. The *functional*-style of programming is committed to representing computation in the form of **function abstractions** over language-level features.

Now go use callbacks to implement your functional-style asynchronous apps! If you finish anything cool, [call me back](mailto:cfeusier@gmail.com). I have other things to process,

Clark
