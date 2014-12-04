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

Hook

- Inception
- Cool Images

Topic Statement: recursion + polyfills

Roadmap Explanation

Transition

---

#### So, What is it?

<blockquote>
    Recursion is a technique for solving problems wherein a function makes calls to itself. By doing so, it can complete a small amount of the processing, and delegate the rest of the problem to the recursive calls.
</blockquote>

Explanation of quotation

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

<script src="https://gist.github.com/Cfeusier/49601da6cc409df4263b.js"></script>

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id earum dolorum porro. Adipisci necessitatibus, doloribus animi, deleniti sequi veniam illum. Laudantium excepturi ut, officiis unde earum nulla cum minima doloribus!

---

## Conclusion

Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores eveniet possimus explicabo nisi. Placeat officiis deleniti reiciendis nemo, saepe aliquam quisquam unde iste reprehenderit totam! Autem et incidunt fugiat necessitatibus quos nostrum exercitationem dolorem itaque aliquam sapiente voluptatem nesciunt corporis aliquid sequi quisquam commodi inventore ex quas sint, nemo vitae maxime nobis sit. Nemo repudiandae, perspiciatis minima harum dicta, magnam alias cumque quasi maiores tempore suscipit rem id ut. Placeat dignissimos totam inventore iure magni ipsum accusamus quibusdam nemo atque numquam doloremque, reprehenderit natus odit rem, perspiciatis quisquam alias ullam repellendus expedita reiciendis tenetur veniam vel quasi tempore? Temporibus, culpa.
