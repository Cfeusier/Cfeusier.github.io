---
layout: post_simple
title:  "Recursion in the Wild - Exercises in Creating a Polyfill"
author: "Clark Feusier"
tags:
- recursion
- javascript
- polyfills
- parse
- stringify
- getElementsByClassName
---

If you like powerful, mystical, useful, and cool things, then you will like our topics: recursion and polyfills.

Roadmap Explanation

Transition

---

If you want to think about some trippy shit, think about recursion. Cue suspenseful background music ...

You walk into a room, crossing the room and opening the door in front of you. That door leads you to another identical room with another door. You cross the room and walk through the door into another identical room. This continues **infinitely**.

<img src='/img/blog/inception.png' class="inceptionImg">

The example is not necessarily recursive, but it gets you thinking about reality as ***layered***. Each room starts a new reality for the person walking through. These new realities can be entered and exited by the person. This is because there is an underlying reality which keeps track of the realities as the person enters them and exits them, stringing them together for the person to pass through. I like to think of it as the **master Reality**, **the Supernatural**, or **the main thread of a computer**.

All this 'layers of reality' talk should trigger some pop-culture alarm bells &mdash; if you haven't seen the movie ***Inception***, then go watch it and come back. The general premise of ***Inception*** involves the idea that entering a dream state in 'reality' allowed a person to enter another reality alongside the reality of his dreaming self. Further, these dream state realities could be nested &mdash; he could enter a dream state when he is already within a dream state, causing him to enter reality nested two layers below his usual experience of reality. Finally, given the right 'kick', he could bubble out of the nested realities and back to the top level reality in which he entered the dream state.

Why am I telling you this? Well, it's a cool movie, and it helps us get ready to think about recursion.


### So, What is Recursion?

<blockquote>Note: If you already know how <em>recursion</em> is normally used in mathematics or computer science, feel free to skip this section</blockquote>

There are a bunch of ways to define and describe recursion, so I will throw a few out there.

<blockquote>
    Recursion is a problem-solving technique where a function invokes itself. Each call of the function handles a small amount of processing and then re-invokes itself. The re-invocation allows for the problem to be solved by the single function over successive calls.
</blockquote>
<blockquote>
    Recursion is when a mechanism activates another cycle of itself, allowing for the mechanism to self-delegate the start and finish conditions for itself, from within itself in some meaningful way.
</blockquote>
<blockquote>
    Recursion is a <em>property</em> of <strong>processes</strong>.
</blockquote>
<blockquote>
    Recursion is the process of repeating items in a self-similar way <a href="http://en.wikipedia.org/wiki/Recursion" target="_blank">(source)</a>.
</blockquote>
<blockquote>
    [Using recursion is ...] a method of defining functions in which the function being defined is applied within its own definition <a href="http://en.wikipedia.org/wiki/Recursion" target="_blank">(source)</a>.
</blockquote>

Explanation of quotation

Why should you care about this? Because ...

### Recursion is Cool Shit

Genetic material replication (DNA/RNA) is governed by recursive mechanisms that are 'programmed' into genetic material by evolution &mdash; seriously, you are alive because of recursion.

Recursive functions can be extremely high-powered yet small in size &mdash; this is because all of the processing work is handled by the function repeatedly calling itself (i.e., not adding size to the program). This power-for-size feature of recursive functions makes them popular for certain types of large and complex stochastic processing, particularly in scientific and financial computing.

mysterious

in pop culture

### Recursion Can Be Stupid

- can be costly, don't over-use it

### Polyfills are Cool Shit

- especially when other people create them
- sometimes you need to implement your own

Common polyfills that can be implemented recursively:

- JSON's `stringify` and `parse` methods
- the `document.getElementsByClassName` method

---

### ***document.getElementsByClassName*** Implementation

Almost all DOM traversal and manipulation supervenes on a `document.getElementsByClassName` implementation, so it makes sense to try implmeneting a polyfill for this behavior. Also, `getElementsByClassName` is also well-suited for a relatively simple recursive solution &mdash; a perfect candidate for our study. Here we go:

<script src="https://gist.github.com/Cfeusier/f0acd590f7c03a478d50.js"></script>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio libero alias, eos porro sint perferendis, deleniti magnam vitae molestiae! Nam debitis assumenda possimus in consequuntur laboriosam, rerum perspiciatis vel dicta!

---

### ***JSON.stringify*** Implementation

`JSON.stringify` is one of the most-often used methods on the web, partially because of the growing ubiquity of JSON as the data-exchange format of the internet, and because `stringify` is invoked on almost every HTTP request ('under the hood').

<script src="https://gist.github.com/Cfeusier/79baf443793baaba24f7.js"></script>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error placeat fugit ex. Quia, quos quae laudantium dolores blanditiis repellat consequatur ipsam nostrum, perferendis maiores, necessitatibus aperiam quaerat debitis sed aspernatur.

---

### ***JSON.parse*** Implementation

`JSON.parse` is the 'flip-side' of `stringify`, so it is used almost as frequently.

Give shoutout to Crockford

<script src="https://gist.github.com/Cfeusier/49601da6cc409df4263b.js"></script>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id earum dolorum porro. Adipisci necessitatibus, doloribus animi, deleniti sequi veniam illum. Laudantium excepturi ut, officiis unde earum nulla cum minima doloribus!

---

## Conclusion

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eveniet possimus explicabo nisi. Placeat officiis deleniti reiciendis nemo, saepe aliquam quisquam unde iste reprehenderit totam! Autem et incidunt fugiat necessitatibus quos nostrum exercitationem dolorem itaque aliquam sapiente voluptatem nesciunt corporis aliquid sequi quisquam commodi inventore ex quas sint, nemo vitae maxime nobis sit. Nemo repudiandae, perspiciatis minima harum dicta, magnam alias cumque quasi maiores tempore suscipit rem id ut. Placeat dignissimos totam inventore iure magni ipsum accusamus quibusdam nemo atque numquam doloremque, reprehenderit natus odit rem, perspiciatis quisquam alias ullam repellendus expedita reiciendis tenetur veniam vel quasi tempore? Temporibus, culpa.
