---
layout: post_simple
title:  "Unabridged Notes on JavaScript"
date:   2014-11-10
author: "Clark Feusier"
tags:
- software engineering
- programming languages
- javascript
- notes
---

<blockquote>The key to understanding JavaScript is to understand the close relationship between <em>objects</em>, <em>functions</em>, and <em>closures</em></blockquote>

1. Objects
2. Functions
3. Closures
4. Timers
5. Regular Expressions
6. Testing
7. Perfomance analysis
8. Debugging


## Testing

- basic `assert` statement

<pre class="brush: js">
    assert(condition, message);
</pre>

Good (JavaScript) Tests:

1. repeatability
2. simplicity (single responsibility)
3. independence from other tests

- Deconstructive vs. Constructive Test Approaches
    1. Deconstructive: remove code till you reach a unit to test

    2. Constructive: add code till you reach a unit to test

#### Test Suites

- Desired Features:
    1. The ability to simulate browser behavior (clicks, keypresses, and so on)
    2. Interactive control of tests (pausing and resuming tests)
    3. Handling asynchronous test timeouts
    4. The ability to filter which tests are to be executed


## Performance Analysis

- basic profiling with start time, run operation, endtime, and calculated difference between start and end

## Debugging

- logging: print to the console at different spots throughout execution of code to inspect values

- breakpoints: stop code at a certain line of code and explore values available within that context, the context itself, and the scope chain
    - break the line **before** the code is executed
    - step into
    - step over




