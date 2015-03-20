---
layout: post_simple
title:  "Guest Post: String Primitives and String Objects in JavaScript"
date: 2015-03-19
author: "Paulo Diniz"
tags:
- javascript
- fundamentals
- data types
- guest post

---

My friend and talented young Software Engineer, [Paulo Diniz](http://www.pdiniz.com/), wrote this guest post to explain the difference between *String Primitives* and *String Objects* in JavaScript, and what that might mean to a JavaScript programmer. The following is from Paulo...

---

## JavaScript String Primitives and String Objects

**By [Paulo Diniz](http://www.pdiniz.com/)**

Throughout this post I will be referring to JavaScript’s string primitive data type as a **string** and to the String Object as a **String**. Now let’s take a look at what the JavaScript string data type and the String Object actually are. In order to do this let's use [MDN’s descriptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) and some examples of why the distinction matters:

### The Distinction Between String Primitives and String Objects

**Note**: JavaScript distinguishes between String objects and primitive string values (the same is true of Boolean and Numbers).

String literals (denoted by double or single quotes) and strings returned from String calls in a non-constructor context (i.e., without using the new keyword) are primitive strings. JavaScript automatically converts primitives to String objects, so that it's possible to use String object methods for primitive strings. In contexts where a method is to be invoked on a primitive string or a property lookup occurs, JavaScript will automatically wrap the string primitive and call the method or perform the property lookup.

<script src="https://gist.github.com/Cfeusier/0102abdfae6893db8cdf.js"></script>

String primitives and String objects also give different results when using eval(). Primitives passed to eval are treated as source code; String objects are treated as all other objects are, by returning the object. For example:

<script src="https://gist.github.com/Cfeusier/a9c9e9f425d14140d317.js"></script>

For these reasons, code may break when it encounters String objects when it expects a primitive string instead. Generally authors need not worry about the distinction.

A String object can always be converted to its primitive counterpart with the valueOf() method.

```js
console.log(eval(s2.valueOf())); // returns the number 4
```

Now that we know what the distinction between the two are let’s take a deeper look into the string datatype. String datatypes in JavaScript are immutable, and what that means is that whenever you run any function such as `String.substr()`, `String.concat()`, or `String + “a”`, what you are actually doing is creating a new string with the new data set provided. What’s actually going on is that despite the string data type being a JavaScript primitive datatype it’s not actually saved as a string but as an array of 16-bit unsigned integer values. In the language C they are referred to as **char**.

As I’ve explained in [my post on arrays](http://www.pdiniz.com/demystifying_javascript_array/), the primitive C array data type consist of a contiguous memory location on disk and cannot be modified once allocated. ​The reason all this becomes important is the following:

<blockquote>
All operations on Strings (except as otherwise stated) treat them as sequences of undifferentiated 16-bit unsigned integers; they do not ensure the resulting String is in normalised form, nor do they ensure language-sensitive results (<a href="http://www.ecma-international.org/ecma-262/5.1/#sec-8">source</a>).
</blockquote>

​Thus, ***only String function that should be used to normalize a string value*** is `String.prototype.normalize`. Finally, when using other String functions be aware that this is not being done for you and might result in unexpected errors when dealing with different data types.