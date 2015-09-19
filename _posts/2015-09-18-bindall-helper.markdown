---
layout: post_simple
title:  "Helper Function .bindAll"
date: 2015-09-18
author: "Clark Feusier"
tags:
- polyfill
- underscore
- bindAll
- functional programming

---

Like most JavaScripters, I often find myself needing to manually control the `this`-binding of a function on invocation. Event handlers and callback functions are often re-bound to a different context than the caller &mdash; meaning that if those event handlers or callbacks reference `this`, they might be referencing the wrong object.

These _context-switching_ functions sometimes require an explicit binding, as in this next snippet.

<script src="https://gist.github.com/Cfeusier/d6ed570b51ceb9d858d3.js"></script>

Above, an event is fired when the `app` is `'ready'` &mdash; a callback function is registered to handle this `'ready'` event. Assuming the event handler (`this.startMainWindow`) uses `this` internally, it needs to be bound explicitly in order to preserve the `this`-binding that is desired. We do this by passing our desired `this`-binding into `.bind` as the first argument.

Great, now imagine that we have these _context-switching_ functions all over our codebase. Also, imagine that groups of these functions are all bound to the same object. Pretty soon, you have a stupid amount of `someObj.someFunc.bind(ctxObj)` in your codebase.

Are you now motivated you to find a helper function for binding a bunch of functions at once? I am!

**I FOUND ONE!**

[Underscore.js](http://underscorejs.org/#bindAll) provides a `_.bindAll` method that binds a list of methods to one object. However, Underscore is a _1,500_ line of code **dependency** that is _**outside of our control**_. I'd prefer _15_ lines of code over which we have control.

So, let's implement our own `.bindAll` function!

---

<script src="https://gist.github.com/Cfeusier/2a1e2aa90f32850125cb.js"></script>

Here is one example using the `.bindAll` helper (line 6):

<script src="https://gist.github.com/Cfeusier/e9b79897a4202805dafb.js"></script>

Beautiful. We can simply pass `.bindAll` the object to which to bind, along with a list of method names in the current context which should be bound to the first argument.
