---
layout: post_simple
title:  "The Language Features of JavaScript that Create Closure"
date: 2015-02-22
author: "Clark Feusier"
tags:
- javascript
- closures
- computer science
- language

---

1. a closure function closes over (encloses) the closure-scoped variables
1. the declaration is returned within another function
  1. references a variable from its context (the containing function)
1. when the closure function is executed, it can access the variables referenced in even though the containing function has already finished execution

### function properties (language features) that allow for closures in JS:

1. fn1 can/must explicitly return value (or value gets GCed)
1. fn1 can return fn2 as explicit return value
1. fn2 can retain access to the context in which it was created
1. fn1 returns fn2 as explict value
1. fn2 references variable A in fn1
1. fn1 gets executed and stored in variable as fn2
1. variable A disappears when execution is done
1. fn2 gets executed
1. fn2 can access variable A, even though the fn1’s execution context (intuitively) should have disappeared at this point


## Scopes

1. scope = part of program where a binding between a variable and value is valid
1. lexical scope = regions of source code where variable name reference has meaning (no access errors)
1. default scope in JavaScript is global
1. ‘{‘ of a function declaration delimits the entry to a new lexical scope
1. lexical scope enforces access rules
1. scopes can be nested
1. variables are either global or local to a single function (lexically scoped)
1. in-memory (dynamic) scope = in-memory storage sytem (data structure) for holding variables and their values
1. in-memory scope structures are called execution contexts
1. in-memory scopes == dynamic scopes == execution contexts
1. lexical scopes have one-to-many relationships with in-memory scopes (1 lexical scope for the code—n dynamic scopes, with one for each invocation of the function associated with that scope
program run
1. in-memory datastores will be built to keep track of all variables available to function objects
1. an in-memory datastore is created anew for every invocation of a function to isolate the running of each function
1. thus, for each lexical scope there could be 0-many in-memory scopes/execution contexts (depending on how many times the function has been executed)
1. the current in-memory scope/execution context is where the interpreter first does lookup
1. the execution context has a key-value mapping inside it


## Closures

1. closure = a function object that retains ongoing access to the variables of the context in which it was created
1. a function object (the function itself, uninvoked) that was created within another function
1. this inner function object is just a reference to the function object that you invoke later!
