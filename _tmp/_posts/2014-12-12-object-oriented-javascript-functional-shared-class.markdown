---
layout: post_simple
title:  "Object-Oriented JavaScript - Functional-Shared Class Pattern"
date: 2014-12-12
author: "Clark Feusier"
tags:
- object-oriented programming
- javascript
- functional-shared class pattern
---

<script src="https://gist.github.com/Cfeusier/d864116f9ac1f241e6fa.js"></script>

1. benefit: only one instance of each method created regardless of how many instances of the object are created
2. downside: requires an #extend implementation or similar functionality
3. downside: less clear about `this` bindings than not functional style

- lines 1 - 6: the constructor function
    - line 2: create an empty object
    - line 3: add an example 'differentiator' property on the new object
    - line 4: add methods directly to empty object by extending it with the shared exampleMethods from the global scope
    - line 5: return the new object
- lines 8 - 15: the method container object with example methods

We can now create as many `Example` instances as we want, all with its own copy of each method. It is as simple as `var example = Example();`.