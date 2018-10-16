---
layout: post_simple
title:  "Object-Oriented JavaScript - Pseudo-Classical Class Pattern"
date: 2014-12-14
author: "Clark Feusier"
tags:
- object-oriented programming
- javascript
- pseudo-classical class pattern
---

<script src="https://gist.github.com/Cfeusier/601b17d046f3ea3d5b82.js"></script>

1. benefit: only one instance of each method created regardless of how many instances of the object are created
2. downside: less clear about `this` bindings and under-the-hood 'magic'
3. benefit?: act like Java people with 'real' classes, lolz
4. under-the-hood:
    - a new object is created that is assigned to `this`
    - `this` is returned if nothing else is explicitly returned from the constructor
    - IF this constructor is invoked with the `new` keyword, then the constructor will delegate failed property lookups to the object at the .prototype property ***of the constructor***

- lines 1 - 3: the constructor function
    - line 2: assign whatever properties you want to the new instance, which has been auto-bound to `this`, and will be returned at the end of the constructor automagically
- lines 5 - 11: the method container object stored at the .prototype key of the constructor is being filled with methods
    - these methods will be available to the new instance via failed property lookup delegation to the object at the .prototype key of the constructor function (if the instance was created with the `new` keyword)

We can now create as many `Example` instances as we want, all with access to each method on the constructor's prototype *property*, without having to store the methods themselves! It is as simple as `var example = new Example();`.