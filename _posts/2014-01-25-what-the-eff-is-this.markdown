---
layout: post_simple
title:  "What the eff is 'this'?"
date: 2015-01-25
author: "Clark Feusier"
tags:
- object-oriented programming
- javascript
- this keyword
- heuristics
---

1. this = an auto-bound identifier that refers to some likely-focal object during method or constructor invocation
1. ‘this’ is used for OO language features
1. ‘this’ has reference only when code runs
1. 5 ways this can appear in running code (at call time)

## How to determine what ‘this’ refers to

1. pause debugger on a line that refers to this
1. scan outward — find the closest enclosing function body
1. look one level down in the call stack — find where the function was called
1. see how the function was called to determine this reference

## Run Patterns

<script src="https://gist.github.com/Cfeusier/a8bba391fcfe744bc6db.js"></script>

global reference (binding target: global object)
free function invocation (binding target: global object)
#call or #apply (binding target: the first argument to #call or #apply)
method invocation (binding target: call time receiver — object on left of dot at call time)
construction mode (binding target: a new object created for that invocation)

this is an auto-bound identifier that refers to some likely-focal object during function invocation
where-ever this is, find enclosing function declaration braces
find the place where the enclosing function is called
global this
window or globalObject
free fn invocation - functionName()
window or globalObject
.call or .apply invocation - fn.call(target) or obj.mtdName.call(target)
the first argument to .call or .apply
method invocation - target.methodName()
the object left of the dot at call time
contstructor invocation - new functionName()
a new object created for that invocation


- 90% of the time: this  = the object to the left of the dot where that function was called
- setTimeout does weird shit (runs everything in the global context)
