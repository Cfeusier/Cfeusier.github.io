---
layout: post_simple
title:  "Popular Interview Question Series: Higher-Order Functions and Function Binding"
date: 2015-01-11
author: "Clark Feusier"
tags:
- javascript
- functional programming
- implementation examples
- interview questions

---

In technical interviews, it is common that the interviewer will throw in a question that tests your knowledge of higher-order functions and function-binding. If you are applying for a job as a JavaScript engineer, then you should expect an interview question in some similar form to the following:

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

## Implementation

<script src="https://gist.github.com/Cfeusier/6388b0760af775fcb068.js"></script>

- **line 2**: anything passed into our `bind` function, other than the first `ctx` parameter, needs to get passed along as an argument when the bound function is invoked
  - use the `Array.prototype.slice` method on the `arguments` object
    - `slice` from index `1` to the length of `arguments`
- **line 3**: we will be returning a new function as our bound function, so we want to store a reference to our old function first
  - capture the object that is currently bound to `this` &mdash; the function to bind
- **lines 5 - 9**: the 'decorated' function object that can now be invoked in the context to which it was bound
  - **line 6**: the bound function needs access to any arguments with which it is invoked
    - use the same technique as above, and slice the `arguments` object
      - this time, `slice` the whole `arguments` object length because there are no named parameters in the bound function's signature
      - store the array of arguments to the bound function in `allArgs`
  - **line 7**: concatenate the outer function's arguments with the bound function's arguments, and store them in the `allArgs` variable
  - **line 8**: return the original function, invoked in the context stored in closure, and pass along all of the arguments from the outer and inner function

That's it! If that felt too fast, good &mdash; the next section is perfect for you.

## Theory

### The `arguments` Object

Every function object in JavaScript has an `arguments` object that the JavaScript interpreter manages. Every time that a function is invoked, all of the arguments with which the function are invoked are stored on the `arguments` object associated with the given function object. Maybe an example will elucidate:

<script src="https://gist.github.com/Cfeusier/6e32decb794c98041ed8.js"></script>

Ignoring the `.prototype` and `.call` part, which we will explain below, the example above declares a function called `func`, which doesn't have any 'named' parameters in its function signature, i.e., nothing is in-between the parentheses on line 1 where `func` is defined. This function, `func`, will access anything that you pass into it on invocation, **from its `arguments` object**. `func` will then loop through an array representation of the `arguments` object, and log each of the individual arguments with which the function was invoked at runtime.

If you are confused by the above paragraph, ignore the complexity &mdash; each argument that I pass in to `func` when invoking it on line 9 is going to get logged out, as seen on lines 11 through 18. I am able to log out each of the arguments without knowing ahead of time about how many will be passed in, because I am accessing them from *inside* the function that they were passed to on invocation. That means, you never **actually** have to name your function parameters &mdash; we do it because we are lazy.

Takeaways &mdash; any inputs you give to a function on invocation are made available within said function via the `arguments` object. Also, the `arguments` object is an **object** &mdash; if you want to treat it like an array, you need to turn it into an array by using something like `.slice` on the `arguments` object.


### The `.prototype` Property

Briefly, the `.prototype` property is given by default to function objects in JavaScript, and that property stores an empty object. This empty object is used to store behavior (functions) that will be shared between different instances of the function object. If you are fuzzy on this topic, there are some great resources online, but here are two of my articles to start with: <a href="http://clarkfeusier.com/2014/12/14/object-oriented-javascript-pseudo-classical-class/" target="_blank">.prototype in the pseudo-classical style</a> and <a href="http://clarkfeusier.com/2014/12/13/object-oriented-javascript-prototypal-class/" target="_blank">the prototypal style class pattern</a>.

### The `this` Keyword

We want `bind` to return a new function that invokes the correct 'bound' function **every time** in a given context, but we don't know what that bound function will be ahead of time. So, how can we access the function to bind the context to, if we don't know its name? That is where the JavaScript keyword `this` comes in.

Based on a consistent set of rules, `this` is **auto-bound** at runtime to a context object. The rules for auto-binding `this` are based on function **invocation** context. That is all fancy for saying that each time you invoke a function, the interpreter 'looks around' and, depending on how you invoked the function, selects an object in the environment. Within the function declaration of the function that you are now invoking, the keyword `this` is **auto-bound** to the context object that the interpreter selected.

If the function was invoked in the global scope, `this` is bound to the global scope (the `window` in the browser).

If the function is invoked as a **method** &mdash; i.e., the function is a property on an object, and is invoked like `object.func()` &mdash; the `this` keyword is bound to the `object` to the left of the `.` of the function invocation. Anywhere within the scope of the function definition of the function that is currently being invoked, the `this` keyword refers to the `object` at invocation time.

If the function is invoked using either `.call` or `.apply`, within the function definition of the function that is currently being invoked, the `this` keyword refers to the **first** argument given to either `.call` or `.apply` on invocation. Let's quickly run through JavaScript's `.call` and `.apply`.

### Forced-Context Function Invokers: `.call` and `.apply`

When the JavaScript interpreter invokes a function, the interpreter will automatically bind the keyword `this` within the function body to a likely focal object. If you, as a developer, want fine-grained control over the binding of the keyword `this` (the function invocation's context object), you can force the interpreter to invoke the function in the context of an object of your choosing by using either `.call` or `.apply` to invoke the function. In this sense, you are **forcing** the interpreter to invoke your function with the keyword `this` bound to your specified context object. I like to call `.call` and `.apply` 'forced-context function invokers' because they **force** the context of function invocation.

`exampleMethod.call({});` will invoke the `exampleMethod` with the keyword `this` assigned the empty object passed into `.call`. You can use `.apply` in the same manner as `.call`, to force the context of the function invocation to the first argument given to either `.call` or `.apply`.

The **only** difference between `.call` and `.apply` is the type of parameters that they take (after the context object). `.call` takes a list of comma-separated arguments, while `.apply` takes an array of arguments. That is the **only** difference. Here are two examples to solidify this discussion &mdash; the first example highlights the difference between using standard function invocation and `.call`, while the second example demonstrates the difference between standard function invocation and `.apply`.

<script src="https://gist.github.com/Cfeusier/0b2ac710778758c3c989.js"></script>

<script src="https://gist.github.com/Cfeusier/d2c780feeb8834bd8692.js"></script>

We are actually now in a place to fully understand line 2 and line 6, so let's turn there next.

### Line 2 and Line 6

Based on the principles that we just covered, we can infer the meaning of lines 2 and 6.

1. each function gets its own `arguments` object with arguments from invocation stored on the object
2. the `arguments` object is *not* an array
3. the `.prototype` property of a function object stores all of the **shared** functionality that each instance of that function object will inherit
4. you can turn the `arguments` object into an array by using the `slice` method on the `arguments` object
5. all array objects have inherit the `slice` method from the `Array.prototype`, so we can get access to the `slice` method by referencing `Array.prototype.slice`
6. however, we want the `slice` to work on the `arguments` object, not the `Array.prototype` on which the method is being called
7. we can **force** the context of the `slice` invocation by using either `.call` or `.apply`
8. on line 2, we want to ignore the first argument (the context object), so we only want to slice from index 1 to the end, so we need to pass `1` into `slice` as an argument
9. because our argument isn't an array, we should use `.call` instead of `.apply`
10. therefore, we are using the `Array.prototype`'s `slice` method on the `arguments` object, and we are invoking that `slice` method with a forced context by using `.call` and supplying the `arguments` object as the context object to `.call`

Now, we can sum up line 2 and line 6 &mdash; line 2 is storing all of the arguments passed into the outer `bind` function other than the first argument `ctx`, in a variable called `ctxArgs`. Line 6 is storing all of the arguments passed into the inner (bound) function in a variable called `allArgs`.

Great, the pieces are coming together! Let's tackle the last few pieces of theory, and then we will see the full picture. We will start with the concept of a *first-class* function.

### First-Class Functions

Some programming languages are 'functionists' &mdash; they discriminate against functions. Other languages, like JavaScript, treat functions as 'first-class' citizens. All that this means, is that JavaScript allows you to treat a function as you would any other object in JavaScript &mdash; if you can store a string in a variable, then you can store a function in a variable. If you can pass a number into a function invocation as an argument, then you can pass a function to another function invocation as an argument. If you can add properties to objects, you can add properties to function objects, *ad nauseam*...

There are a lot of subtlties that I am glossing over, but for now, just know that this treatment of functions allows JavaScript to do some cool 'functional' programming techniques for which some other languages aren't equipped.

If you look at our solution above, you will notice that the return value of the `bind` function is **another function**. No surprise that JavaScript allows us to do this &mdash; if you can return any other value in JavaScript, why not a function object? JavaScript allows this, once again, because functions are 'first-class' in JavaScript. Now that we understand the *first-class* treatment of functions, we can talk about this special type of first-class function treatment &mdash; the **higher-order function**, i.e., using one function to return another function. Let's talk about higher-order functions now.

### Higher-Order Functions

The 'order' of a function is based on what 'level' the function sits at in relation to other functions in the system's processing thread. So, if each function in our system is processed one after the other, we could consider all of our functions to be of order 0. Now, imagine that one of our functions nests another function within it. We could visualize the nested function as being at order 1, relative to it's wrapper function, which is at order 0. The wrapper function is returning a function that will get executed at a 'meta-level' relative to itself. A

### Decorators

#### Function Decorators

### Lines 5 through 9

### Bonus: Closures


---

## Summary

