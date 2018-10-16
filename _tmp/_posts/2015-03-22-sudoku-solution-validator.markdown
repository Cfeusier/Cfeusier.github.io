---
layout: post_simple
title: "Sudoku Solution Validator - Code Example"
date: 2015-03-22
author: "Clark Feusier"
tags:
- javascript
- implementation examples
- interview questions
- sudoku

---

*Five months ago*, I was asked to solve a problem with a pair &mdash; the challenge was to write a **Sudoku solution validator**. We were expected to take a two-dimensional array that represented a Sudoku board and determine whether or not the board was 'solved' based on [the rules of Sudoku](http://en.wikipedia.org/wiki/Sudoku).

Today, I attempted the same Sudoku challenge, but with two minor tweaks: I would be **solo** instead of with a pair, and I would deliver a solution in **under one hour**.

The account of this personal experiment will take the following form:

1. statement and discussion of the Sudoku Solution Validator prompt
2. explanation of my general approach
3. overview of my solution logic
4. solution code
5. closing thoughts

Let's get started!

## Sudoku Solution Validator Prompt

<blockquote>
Write a function <em><strong>validateSolution</strong></em> that accepts a 2-dimensional array representing a Sudoku board, and returns true if the board represents a valid solution, or false otherwise. The cells of the Sudoku board may contain the integers 1 through 9, also 0's, which will represent empty cells (<a href='http://www.codewars.com/kata/sudoku-solution-validator/javascript' target='_blank'>source</a>).
</blockquote>

### Example Expectations

<script src="https://gist.github.com/Cfeusier/c79c8054be52374475c5.js"></script>

## General Approach

When I started the challenge, I set the following guidelines to focus my approach:

1. modularize logic into small pieces about which it is easy to reason
2. short-circuit unnecessary evaluation &mdash; check the easy fail-conditions first
3. put off costly processing validations until the end
4. use functional programming techniques within reason

## Overview of Solution Logic

The logic of my solution is stupid-simple.

Check that each row, column, and region **sums to 45** and **contains one and only one** of each possible integer **between 1 and 9**.

To optimize performance, each step can short-circuit the whole process if any of the checks return false.

In order to 'check' each entity (row, column, or region), I followed this process:

1. convert row/column/region into array of 9 numbers
2. check that sum of array members is 45
3. check that the numbers 1 through 9 each appear once (and only once) in the array

If all of the checks succeed, the solution is valid and we return true.

Pretty simple, eh? Let's see the code!

## Solution

<script src="https://gist.github.com/Cfeusier/a11f1d9455add2b517b0.js"></script>

---

I had a lot of fun with this challenge, though I personally hate Sudoku.

Best,

Clark
