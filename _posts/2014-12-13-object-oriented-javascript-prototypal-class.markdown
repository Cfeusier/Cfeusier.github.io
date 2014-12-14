---
layout: post_simple
title:  "Object-Oriented JavaScript - Prototypal Class Pattern"
date: 2014-12-13
author: "Clark Feusier"
tags:
- object-oriented programming
- javascript
- protoypal class pattern
---

<script src="https://gist.github.com/Cfeusier/22a5d22ff986d7d9aad2.js"></script>

The *Prototypal Class* pattern is fundamental to JavaScript, especially object-oriented JavaScript. The important characteristics of the *Prototypal Class* pattern are the following:

1. shared functionality is stored in a container object outside the constructor function object (shared methods are *not* stored as properties on the instance created within the constructor)
2. instance-by-instance differentiation is done in the constructor
3. **failed property lookup is delegated** to the container object holding the desired shared methods

This pattern only creates a single instance of each shared method, regardless of how many instances of the 'class' are created, thus saving overhead.

This is the pattern on top of which the pseudo-classical pattern is built &mdash; adding some syntactic sugar. So, because of the frequency of use of the pseudo-classical pattern, it is important to understand this prototypal class pattern first.

Let's close by dissecting the important parts of the example above:

- lines 1 - 5: the constructor function
    - line 2: create an empty object and delegate its failed property lookups to the **exampleMethods** object
    - line 3: add an example 'differentiator' property to the empty object
    - line 4: return the new object
- lines 7 - 14: method container object with example methods

We can now create as many `Example` instances as we want, all with access to the methods contained within `exampleMethods`. It is as simple as `var example = Example();`.
