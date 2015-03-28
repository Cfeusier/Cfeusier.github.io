---
layout: post_simple
title:  "Popular Interview Question Series: Insertion Sort and Deck Shuffle"
date: 2015-04-15
author: "Clark Feusier"
tags:
- javascript
- implementation examples
- interview questions
- insertion sort
- fisher-yates

---

This is a special post because we will be covering *two* popular interview questions &mdash; **insertion sort** and **deck shuffle**. Both of these interview questions can be solved using a similar type of ***swap*** algorithm. We will start with **insertion sort**, move to **deck shuffle**, and then examine the similarities between the algorithms.

---

## Insertion Sort

As typical **insertion sort** prompt goes like this:

<blockquote>Insertion sort is a basic sorting algorithm. Insertion sort iterates over an array, growing a sorted array behind the current location. It takes each element from the input and finds the spot, up to the current point, where that element belongs. It does this until it gets to the end of the array. Insertion sort should be implemented as a stable sort. This means that equal elements should retain their relative order. Numbers, as primitives, give us no way to check this, so we'll be sorting objects with a value field, on which they will be sorted, like so: `[{value: 10}, {value: 5, order: 1}, {value: 5, order: 2}]`  A stable sort must return `{value: 5, order: 1}, {value:5, order: 2}` in that order.</blockquote>

Note, to keep the post short, we are using is a simple numeric insertion sort, which could be converted fairly easily to take a comparator function for handling non-numeric collection members.

You are given the following skeleton and behavior expectations in the next two examples:

### Skeleton


### Examples of Expected Behavior


Let's get started!

---

### Clarifying the Prompt

---

## Deck Shuffle

As typical **insertion sort** prompt goes like this:

<blockquote>Insertion sort is a basic sorting algorithm. Insertion sort iterates over an array, growing a sorted array behind the current location. It takes each element from the input and finds the spot, up to the current point, where that element belongs. It does this until it gets to the end of the array. Insertion sort should be implemented as a stable sort. This means that equal elements should retain their relative order. Numbers, as primitives, give us no way to check this, so we'll be sorting objects with a value field, on which they will be sorted, like so: `[{value: 10}, {value: 5, order: 1}, {value: 5, order: 2}]`  A stable sort must return `{value: 5, order: 1}, {value:5, order: 2}` in that order.</blockquote>

You are given the following skeleton and behavior expectations in the next two examples:

### Skeleton


### Examples of Expected Behavior


Let's get started!

---

### Clarifying the Prompt

---