---
layout: post_simple
title:  "Popular Interview Question Series: Balanced Parentheses and a Stack"
date: 2015-01-16
author: "Clark Feusier"
tags:
- javascript
- implementation examples
- interview questions
- stack

---

In early-screening technical interviews, the **Balanced Parentheses** question is quite popular. It goes something like this:

<blockquote>Write a 'balancedParens' function that takes a string as input and returns a boolean &mdash; if the parentheses in the input string are 'balanced', then return true, else return false</blockquote>

You are given the following skeleton and behavior expectations in the next two examples:

### Skeleton
<script src="https://gist.github.com/Cfeusier/f0ac47298ed24bdb67d3.js"></script>

### Examples of Expected Behavior
<script src="https://gist.github.com/Cfeusier/044499c1de173f77a702.js"></script>

The interview question is testing you on the following:

1. ability to interpret the prompt and expectations to figure out the properties of a **balanced** string of parentheses
2. familiarity with common data structures &mdash; it is likely that a **Stack** data structure is expected in the solution, though that is definitely not necessary
3. ability to discuss the time complexity of possible solutions

Let's get started!

---

### Clarifying the Prompt

My first questions when prompted with the **Balanced Parentheses** always surround the following:

1. what is the definition of *balanced* parentheses?
2. what should be the return value if the input string is empty?
3. what should be the return value if input isn't a string?
4. what constitutes the extension of *parentheses*?

Once I have answered those questions to a satisfactory degree, I feel as though I can approach the problem clearly. So, what is a string with *balanced* parentheses?

Usually, this is meant as it is meant in mathematics, logic, and programming &mdash; open parentheses must be closed by the same type of parentheses, and open parentheses must be closed in the *correct* order, i.e., never close an open pair before its **inner** pair is closed (if it has an inner pair). Thus, `'{[]}'` is balanced, while `'{[}]'` is not balanced.

Next, what should the return value be if the input string is empty? We are considering an empty string a *balanced* string, so we should return `true`.

Next, what should be the return value if input isn't a string? In our case, we are going to assume that our function is **always** recieving a string input, so we don't need to worry about this edge case.

Finally, what constitutes the extension of *parentheses*? We are considering the extension of *parentheses* to be `'{, }, (, ), [, ]'`, but feel free to add any other parenthesis symbol.

I consider our four questions to have been satisfactorily answered, so let's move on to our algorithm and then implementation.

---

### Algorithm Outline

1. create a stack and store it in a variable
  - the stack will be used to hold all the opened parentheses in the input string
2. create two object maps &mdash; one for all the open parenthesis characters and one for all the closed parenthesis characters
  - for the open parentheses map, set the keys to the open parenthesis symbols and the values to the matching closing parenthesis symbol
  - for the closed parentheses map, set the the keys to the closed parenthesis symbols and the values to true
3. iterate through the characters of the string
    - for each character
      - if the character is an open parenthesis character, push the character onto the stack
      - else if the character is a closed parenthesis character, then pop off the last opening parenthesis from the stack and compare it's closing pair to the current character
        - if the character is not equal to the required closing parenthesis symbol, then you have an imbalanced string and should return false
4. return an equality comparison between the stack length and 0 &mdash; if the stack is empty and we have looped through the whole input string, we can assume that we have a balanced string.

Let's look at the implementation, and then talk through it line by line.

---

### Solution
<script src="https://gist.github.com/Cfeusier/4d883707c111476ff4e9.js"></script>

- **line 2**: declare our stack and initialize it to an empty array
- **line 3**: declare our open parentheses map and intialize it to an object with open parentheses as keys and closed parentheses as values
- **line 4**: declare our closed parentheses map and intialize it to an object with closed parentheses as keys and `true` as the values
- **lines 6 - 13**: loop through the input string
  - **line 7**: declare a temporary `chr` variable and initialize it to the character in the input string at the index of the iteration counter
  - **line 8**: check if the `chr` is an open parenthesis symbol
    - **line 9**: if an open `chr`, push the `chr` onto the stack and keep looping through the string
  - **line 10**: check if the `chr` is a closed parenthesis symbol
    - **line 11**: if a closed `chr`, check if the matching closed parenthesis of the last element that is popped off the stack (the last open parenthesis symbol found in the string) is not equal to the current `chr`
      - if the `chr` isn't the matching closed parenthesis for the *last* open parenthesis from the stack, then we return false because we have an imbalanced input
- **line 15**: return a coerced boolean value &mdash; the result of evaluating the expression `stack.length === 0` &mdash; which will return true if the stack has been emptied with no imbalanced parentheses, and false otherwise

That is the full solution! Let's talk time complexity!

### Time Complexity of our Solution

**Worst case**: *linear*

Our solution iterates the length of the input string, meaning that our time cost will grow in linear proportion to the growth of the string length. Or, for each character that is added to the input string, the algorithm will take 1 time unit longer to complete (worst case). All other operations in our algorithm are *constant time* because we are using object-property lookup to find our comparison values and the `pop` method of a *Stack* data structure to keep track of all the parenthesis pairs that get opened.

---

### Summary

- clarify the prompt by defining terms and point out all edge cases your solution will need to handle
- if you are keeping track of the 'last' member of a sequence and need to access that last element in constant time, use a **Stack** data structure
- keep your algorithm simple

Cheers,

Clark
