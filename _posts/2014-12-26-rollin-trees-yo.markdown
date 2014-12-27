---
layout: post_simple
title:  "Rollin' Trees, yo"
date: 2014-12-26
author: "Clark Feusier"
tags:
- javascript
- data structures
- implementation examples
- tree
- binary tree
- search tree
- decision tree
---

I like trees. All kinds of trees &mdash; concrete and abstract. Redwoods, Oaks, search trees, decision trees, fruit trees, DOM trees, Christmas trees, and more.

They are powerful beyond common recognition. Oxygen, life, shelter, food, beauty, computational efficiency, and more are provided by trees when we interact with them in the right ways.

Don't get offended when I say this:

<blockquote>you don't like trees enough.</blockquote>

Before I can make you feel bad about taking trees for granted, I need you to be very familiar with trees and their uses. Once you understand the tree, you will feel bad for not appreciating it enough. Then, you will start appreciating trees, as well as using them in the situations for which they are perfectly suited. Good.



---

### The Tree as an Abstract Data Type

A tree is, first and foremost, a data structure adhering to the interface of the abstract data type **Tree**. A Tree is just an abstract *ideal* that we all kind of agree upon &mdash; hey buddy, let's call any data structure that has property X, Y, and Z an ***array***, while any data structure with properties A, B, and L should be called a ***tree.***

Why is this important? Because it helps us avoid a common mental mistake, early &mdash; that of confusing the abstract data type **Tree** with a particular concrete implementation of that abstraction. Can you implement the basic properties of 'Treehood' in more than one way? If you answered yes, you are ready to continue. If not, please read about the differences between a concrete entity and an abstraction.



### The Tree as a Concrete Data Structure

A tree, like all data structures, holds data and has certain data-access rules. Like all data structures, a tree will have tradeoffs related to lookup, insertion, removal, and similar operations. So, the real questions:

<blockquote>1. what data does a tree hold?</blockquote>
<blockquote>2. how is that data accessed and manipulated?</blockquote>
<blockquote>3. what tradeoffs are associated with a standard tree implementation?</blockquote>

Let's try to answer those three questions.



## Data Arrangement

The tree is often called a 'node-based data structure,' like a linked-list or graph &mdash; this is just to say that a tree is composed of ***nodes***, where each node stores a value and reference to zero or more other nodes. The tree is distinguished from the other node-based data structures by the constraint that there is a root node and each other node is an ancestor of the root node. This allows the data structure to simulate a tree-like hierarchy that we are used to conceptualizing in disciplines like taxonomy.

Another interesting feature of the tree structure is that each node of a tree is itself a subtree with its own children nodes, making the tree particularly well-suited for interaction with recursion to solve certain types of problem.

Summary:

1. a tree is composed of **nodes**
2. a tree has a **root node**
3. each node has a **value** of any data type
4. a root node has **ancestor nodes** stored as a list with no duplicates and without the root node itself
5. all nodes are *themselves trees*

With that summary in mind, here is a simple tree visualization:

<div style="text-align: center;"><img class='treeImg' src='/img/simple_tree.png' style='width: 70%; height: 300px; margin: 10px auto;' /></div>



## Data Access - the Basic Read Interface of a Tree

## Data Manipulation - the Basic Write Interface of a Tree

## Tradeoffs

