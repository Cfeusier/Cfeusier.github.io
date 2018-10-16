---
layout: post_simple
title:  "Object-Oriented JavaScript - Functional Class Pattern"
date: 2014-12-11
author: "Clark Feusier"
tags:
- object-oriented programming
- javascript
- functional class pattern
---

<script src="https://gist.github.com/Cfeusier/ff700bfdaf6f4651b05d.js"></script>

1. downside: memory overhead (duplicate methods for every instance)
2. benefit: clarity
3. downside: mutating closure variables + side effects

- lines 1 - 14: the constructor function
    - line 2: create an empty object
    - line 3: add an example 'differentiator' variable stored in closure
    - lines 5 - 11: add methods directly to empty object
    - line 13: return the new object

We can now create as many `Example` instances as we want, all with its own copy of each method. It is as simple as `var example = Example();`.