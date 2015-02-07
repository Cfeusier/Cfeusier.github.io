---
layout: post_simple
title:  "What the eff is 'this'?"
date: 2015-02-08
author: "Clark Feusier"
tags:
- object-oriented programming
- javascript
- this keyword
- heuristics

---

**Why you should read this post** &mdash; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis doloremque dolores, fuga! Accusantium sed unde itaque, quasi fuga sit, cupiditate facere quam delectus eius, maiores maxime. Quod labore facilis beatae. Sunt debitis ad similique veniam cum iste ipsa, ullam veritatis, illo quibusdam fugiat id quaerat hic odit temporibus rem praesentium?

**Who should read this post** &mdash; Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, hic.

**Post Outline** &mdash; what, why, and how.

Transition lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, quas. Sunt totam quo eligendi vel.

---

## What is `this`?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo nam fuga nobis eum nisi placeat dolor, hic quia officiis iste.

<blockquote>
  <strong>this</strong> is an auto-bound identifier that refers to some likely-focal object during function invocation<br />
  &mdash; <a href="http://twitter.com/mracus" target="_blank"><em>@mracus</em></a>
</blockquote>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo magnam ratione assumenda, sapiente eligendi eos ducimus, blanditiis, accusantium explicabo rerum rem harum expedita error doloribus in illo! Adipisci, soluta natus iure! Dolorem ea libero magnam similique, eum voluptatibus beatae sunt, aliquam harum illo voluptatum? Quasi accusantium animi facere consectetur dolorum.

Maxime recusandae fuga quod culpa totam nisi nihil voluptatibus ipsam cumque natus sapiente at facilis nam, deserunt in eos. Iste distinctio placeat animi perferendis corporis ducimus aut ab nisi explicabo maxime, eaque dolore, consequuntur quos, blanditiis magni architecto dicta eos cum et veritatis ut deserunt? Fugit aliquam, facilis rem quaerat.

Magni nesciunt enim accusamus deserunt ducimus aliquid asperiores hic molestias consequatur fugiat pariatur sint, placeat, ullam saepe, officiis quasi explicabo debitis nihil. Laboriosam et, in obcaecati aliquam quae ratione. Nemo ea a neque vitae illum temporibus hic aliquam, numquam, perspiciatis quas quam! Aliquid obcaecati sint tenetur, nihil possimus, quas iure.

---

## Why `this`?

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi voluptas, enim tenetur perspiciatis maiores eos, quo velit fugiat!

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores sunt, aliquam commodi corrupti ipsum architecto atque quos doloribus maiores culpa unde, eos!

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, sed. Maxime iste temporibus, assumenda eius beatae blanditiis! Id sed reiciendis quo quam soluta! Saepe quo inventore quidem itaque a veritatis dolorem, maxime aliquam quibusdam!

---

## How do I do `this`?

1. how (stop guessing &mdash; use a process with first principles, rules, general and applicable)

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio dolor blanditiis ipsa modi unde asperiores, velit commodi iure quae, laudantium. Esse quia in est explicabo, nemo provident deleniti numquam omnis architecto beatae.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores sunt, aliquam commodi corrupti ipsum architecto atque quos doloribus maiores culpa unde, eos!

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, sed. Maxime iste temporibus, assumenda eius beatae blanditiis! Id sed reiciendis quo quam soluta! Saepe quo inventore quidem itaque a veritatis dolorem, maxime aliquam quibusdam!

---


# NOTES BELOW

1. invocation
1. ‘this’ is used for OO language features
1. ‘this’ has reference only when code runs
1. 5 ways this can appear in running code (at call time)

## How to determine what ‘this’ refers to

**Credit**: *@marcusphillips*

1. pause debugger on a line that refers to this
1. scan outward — find the closest enclosing function body
1. look one level down in the call stack — find where the function was called
1. see how the function was called to determine this reference

## Run Patterns or Invocation Patterns

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
