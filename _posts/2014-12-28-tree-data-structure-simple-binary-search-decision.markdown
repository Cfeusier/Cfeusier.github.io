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

<blockquote>you don't like trees enough</blockquote>

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

<div style="text-align: center;"><img class='treeImg' src='/img/simple_tree.png' style='width: 80%; height: 400px; margin: 10px auto; border: 1px solid gray;' /></div>

In our case, the top node is the 'root' of our tree, storing a value of 1. In this tree, the values being stored at each node are numbers, though this need not be the case. Finally, our root node has 11 ancestors, with only 4 ancestors that are children.

Armed with a firm grasp of the concept of a tree, we can proceed to define the basic structure of a tree implementation.

## Implementation Step 1 - Tree Structure

We are going to create a Tree 'class,' from which we can create specific instances of a tree.

<script src="https://gist.github.com/Cfeusier/16f16c0e37666aa782af.js"></script>

Our **Tree** constructor function takes a single input (the value for the root node). This function will assign the input value to a property on the tree instance, as well as create an empty array to store the children of this root node.

We can now create tree instances right and left (though they will currently lack tree functionality). For example, we don't have an interface for adding children or checking if a tree contains a child with a given value. But for now, we can at least create trees, like so:

<script src="https://gist.github.com/Cfeusier/3ca9a83eaf46c8199cd7.js"></script>

Now that we can make trees, let's give them a useful interface.

## Data Access and Manipulation - the Basic Interface of a Tree

Most agree that a useful tree implementation will at least offer an interface for the following:

1. adding a child node to a tree
2. checking if a child node is in a tree

Those two operations provide a basis for building some cool functionality with your trees, as well as a basis for extension and reuse in other contexts.

Let's start with adding a node to a tree's children.

<script src="https://gist.github.com/Cfeusier/dc1110464f9760b7f352.js"></script>

This code is pretty easy to follow:

- we are adding a method called ***addChild*** to the **Tree** .prototype property
- the ***addChild*** method takes a single parameter &mdash; the value with which to initialize the child tree
- the ***addChild*** method pushes a new instance of a Tree initialized with the child value into the children array of the current tree

Next, let's add a method for checking if a tree contains a node with a target value.

<script src="https://gist.github.com/Cfeusier/83a7893e78e0610e7ea1.js"></script>

This operation is slightly more complex than ***addChild*** because it uses recursion to search through the tree &mdash; don't be alarmed. Let's break it down.

- we are adding a method called ***contains*** to the **Tree** .prototype property
- the ***contains*** method takes two parameters &mdash; a target value for which to search the tree and a root node (tree) with which to start the search
- the ***contains*** method assigns the root to the root argument passed in or defaults to the current tree
- the ***contains*** method sets up a base case to break out of the recursion that we are going to create &mdash; if the value at the current root is equal to the target value, we have found the target, i.e., the tree contains the target value
- the ***contains*** method iterates through the children of the current root node, recursively invoking the ***contains*** method with the same target value to search for, but with a new root tree to search &mdash; the child node that is currently being examined in the iteration
- if the recursive call for that child node returns truthy, we know that we have found the target value in that child tree somewhere, so we return true
- finally, if we have searched all of the children trees and not hit our base case, we will return false because we haven't found the target value anywhere within our tree

This type of recursion through a tree's children is common. Let's look at a real-world example of a tree and a function that searches that tree in a similar fashion as our *contains* method.

### The DOM Tree and a getElementsByClassName Polyfill

The DOM is a tree-like structure. Though the DOM is highly optimized, it still has certain properties that allow me to use it as an example of a simple tree.

The Document Object Model (DOM) is used in the browser to model an HTML document. The HTML document is represented as a tree of nodes, where each node is an object representation of an HTML element. The root of the tree is the `document`, which usually has at least two children &mdash; `head` and `body`.

`head` and `body` are themselves tree-like structures that contain child nodes. Each of those child nodes is also a sub-tree, *ad infinitum*. Sounds like our simple tree from earlier, right?

If the DOM can be thought of as a tree, then we would assume that some of the DOM API would be similar to the tree interface described above. We would guess that we can search the DOM tree for a given node or a given feature of a node. We would also guess that we can insert child nodes into the DOM tree.

In both cases, we would be correct. I am going to focus on the case of searching the DOM tree, to parallel our *contains* method from above.

There is a JavaScript method called `Document.getElementsByClassName()`, which searches the document (or any root element) for all of the elements that have a target class name. All elements that have the target classname will be returned from the method call in an array. If no elements are found, the array will be empty.

Let's imagine that we had to write a *getElementsByClassName* function that mimicks the above functionality.

<script src="https://gist.github.com/Cfeusier/6741763da15e735e09d7.js"></script>

This looks pretty similiar to the *contains* method that we wrote above. Here is a line-by-line description:

- line 1: declare global function *getElementsByClassName*
    - *getElementsByClassName* takes two parameters &mdash; a className to search for and a root node from which to start the search
- line 2: declare nodes variable and initialize to an empty array &mdash; will store nodes with matching className
- line 3: assign the node variable to whatever is passed in, or fallback to the `document.body` node
- line 5: get all of the class names for the current root node by splitting the `node.className` on whitespace
- line 8: using *indexOf*, check if the target class name is contained in the list of node's class names
- line 9: if the target class name was present, push the current node into the matching `nodes` array
- lines 13 - 16: check children of current node for target class name
    - line 13: iterate the length of the current node's list of children
    - line 14: for each child, create a variable `childResults` initialized to the result of invoking `getElementsByClassName` with the child as the root node from which to start searching
    - line 15: reassign `nodes` to the current `nodes` collection concatenated with the `childResults` from each child
- line 18: return the collection of DOM nodes that have the class name for which the method is searching

By now you should feel comfortable with the simple tree and how it can be used. We aren't going to stop here though, because the simple tree actually sucks. It is inefficient and rarely used. Let's discuss the tradeoffs associated with the simple tree.

## Tradeoffs

### Simple Tree

The simple tree implementation above was for pedagogical purposes, but now let's examine the costs of this type of tree implementation to see if we can get any clues as to why a simple tree like this is *rarely* used compared to a more 'constrained' tree like a search tree or decision tree.

The time complexity of the ***addChild*** operation is **constant**, so we will ignore ***addChild*** for now.

***contains*** is disgusting when it comes to worst-case time complexity. ***contains*** iterates through *n* children, and for each of those iterations, it recurses into checking the children of the current child. This type of recursion nested within iteration is costly &mdash; **polynomial** to **exponential**.

So, how do we change this costly search operation? How do we make a tree that is optimized to search? Constraints.

The time cost can be greatly reduced by adding constraints to our tree. We could constrain the children. We could also constrain the way that nodes are added to the tree, in order to make it more efficient to search.

## Binary Search Tree

A common type of tree in computer science is the *binary search tree*. This tree is similar to the simple tree, but it has a two new constraints:

1. each node can only have 2 children (binary)
2. each node on one side of the tree has one of the possible values of a given binary property, while each node on the other side of the tree has the inverse value for that same given binary property

Let's keep it simple by using 'greater than' and its inverse 'less than' as our binary properties.

So, a binary search tree has a root node. That node can have 0 to 2 children. The 'left' child will have a value *less than* our root node, while the 'right' child will have a value *greater than* our root node.

Here is a binary search tree that fulfills those constraints:

<img src="/img/binary_search_tree_1.png" />

If I asked you to insert a node with a value of 2 into the tree, where would you put it?

The correct answer is the far left, as the left child of the node with a value of 3. 2 is less than the root value 4, so you look left. 2 is less than the value of 3, so you look left again. You find no more nodes so you insert a node with a value of 2.

<img src="/img/binary_search_tree_2.png" />

You had to check multiple times to make sure that you *put* the new node in the correct place. This is a constraint on *insertion*. The binary search tree constrains insertion of new nodes because it is optimized for *search* &mdash; by putting things in a principled order, you can search and retrieve things back out faster than if the tree was unordered. However, the constraints on insertion take **time** compared to the simple tree that pushed new nodes onto its list of children without checking where to put them. This means that the binary search tree is optimized for *read* situations and not *write* situations. So, you would use it in a situation where you need speed for high-frequency search of large data, where you don't have to write new data to the tree very often (or if you do, it can happen asynchronously in the background with no user waiting on the result). This happens surprisingly often.

Let's look at the tree in action on search. Let's say I asked you if your tree contained a node with a value of 2, or if I asked you to return the node with a value of 2 if it exists in your tree?

Step 1, check the root of the tree. Is the root value equal to 2? If not, is 2 less than the root's value?

<img src="/img/binary_search_tree_3.png" />

The root value is 4, so 2 is less than the root node's value. This means that we need to go look at the left child of the root node, and repeat the process that we just did with the root node. We also get to eliminate the whole right side of the tree because we know that everything on that side is greater than our root node's value of 4. So, we can ask, is the root's left child value equal to 2? If not, is 2 less than the root's left child value?

<img src="/img/binary_search_tree_4.png" />

As you can see, in our case 2 is less than the root's left child value (3). We can now go down a level in the tree and check the value of the root's left child's left child :) Is the value of the left child of the left child of the root equal to 2? If not, is it less than 2?

<img src="/img/binary_search_tree_5.png" />

In our case, the value at this node in our tree is equal to our target value of 2, so we can either return true (tree contains value) or return the node itself (node value matches query for node with matching value).

Ok, so that might not seem very impressive, but imagine if your tree (data set) contained millions of nodes. If the tree is balanced like ours, than your first check would possibly cut the query set in half. That is a huge cost cut in time complexity.

Enough theory, you say! Show us the code! Ok, fair enough.

### One Possible Implementation of a Binary Search Tree

<script src="https://gist.github.com/Cfeusier/b32acb59cb0dfdbf5706.js"></script>

Pretty simple, with heavy dose of recursion. I am going to do a line-by-line, and then discuss the time complexity.

- lines 1 - 5: BinarySearchTree constructor function
    - initializes value property to passed in argument value
    - defaults the left and right child properties to null
- lines 7 - 30: BinarySearchTree insert instance method
    - lines 9 - 11: throws error if you try to insert a duplicate value into the tree
    - line 14: checks if the value to insert is less than the root value
    - line 15: checks if the left child of the root is empty
    - line 16: if empty, inserts a new BinarySearchTree with the passed in argument value
    - line 18: if the left child has a value, try to insert the passed in argument value into the left child
    - lines 23 - 29: run the inverse of lines 9 - 11 for the other side of the tree if the passed in argument value was greater than the root's value
- lines 32 - 50: BinarySearchTree contains instance method
    - lines 34 - 36: return true if your root value is equal to the target value
        - this is the base case
    - lines 38 - 41: if the value at the root is less than the target value, then you want to check the right side of the subtree
      - if the right child of the root isn't empty, you want to recurse down that side of the tree to see if it contains the target value
   - lines 43 - 46: if the value at the root is greater than the target value, then you want to check the left side of the subtree
      - if the left child of the root isn't empty, you want to recurse down that side of the tree to see if it contains the target value
    - line 49: return false if the target value wasn't found

Compared to the simple tree **contains** method, the time complexity of the binary search tree **contains** method is beautiful. All of the comparisons are done in constant time and the recursion is the only linear operation. So, at worst, this search method is **linear**, compared to the exponential time complexity of the simple tree.

Now that we have built the foundations of the tree and binary search tree, let's finish this post by examining a very popular use of a special type of tree &mdash; **the decision tree**.

---

## The Decision Tree

- games - rock, paper, scissors
- system-state analysis - n-queens algorithm




