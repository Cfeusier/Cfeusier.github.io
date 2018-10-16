---
layout: post_simple
title:  "JavaScript is the Best ..."
date:   2014-08-13
author: "Clark Feusier"
excerpt: "Why is JavaScript popular in web development? What are the great things about JavaScript? What are it's limitations?"
tags:
- software engineering
- javascript
- software trends
---

# The Pencil is to the Left ...

---

## ... of?

The first statement about the pencil is ***meaningless*** until there is an answer provided to the question below the first statement. E.g., the statement "the pencil is to the left of the coffee cup on my desk" makes total sense. The statement "the pencil is to the left" does *not* make sense yet because no context or reference frame was provided. Some propositions about the world require context or being indexed to a reference frame to have meaning -- that was a big takeaway from the theory of special relativity (it is also later present in the general theory of relativity).

Why am I bringing this up? Because much of the content that I encounter related to programming languages is set up to fail -- the discussions are all around statements that are meaningless like "JavaScript is the best language" or "Ruby is the programming language of the future", *ad nauseam*. These debates and discussions are meaningless to me until they specify "for X" -- i.e., "JavaScript is the best language ... for quickly creating interactive features on the client-side of a website." Or, "Ruby is the programming language of the future ... in terms of 10-year job availability, stability, salary, etc." Now ***that*** statement makes sense to me! Whether or not it is true or false, we can at least now have a meaningful discussion about its truth and falsity.

All that discursive rambling foreplay was meant to set the stage for questions that are better-formed, the questions that we will be looking at today:

***Why is JavaScript popular in web development?***

***What are the great things about JavaScript?***

***What are it's limitations?***

I am very grateful that I am answering those questions, and not "why is JavaScript the best language?" or "why is JavaScript the future of web development?"

---

## Why is JavaScript popular in web development and what are the great things about JavaScript?

I am going to try to focus on the "differentiators" of what is great about JS and why JS is popular in web development, instead of focusing on features that are present in other less-popular languages.

<ul>
    <li>broadest societal penetration</li>
    <li>one of the best support and documentation communities</li>
    <li>relatively beginner-friendly</li>
    <li>largest amount of open-source third-party libraries</li>
    <li>delegates work to the client-side allowing for optimization of client-server work (i.e., <em>can</em> speed things up)</li>
    <li>JS plays "very nicely" with most other languages</li>
    <li>well-suited for asynchronous use</li>
    <li>well-suited for use on the full-stack</li>
</ul>

I want to focus on the penetration, support, availability of libraries, asynchronicity, and full-stack use.

***Broad social penetration:*** I am confident in making the claim that JS is the most heavily penetrated programming language in the world. My justification for said seemingly contentious statement is the following: no software has more users or heavier volume of use than the web browser (other than operating systems' kernel). Pretty much 100% of web browser market share goes to browsers that implement and rely heavily on JS. ***A fortiori***, JS is the most used programming language in the world. Therefore, JS is the most heavily penetrated language in the world.

This is an important point because penetration and entrenchment are large determiners in the future path that technology takes. Network effects, power laws (like Metcalfe's), and emergent properties from complex systems all grow substantially as a technology embeds further and further into society. The longer that JS is part of the web's infrastructure, the more technology will be built with dependencies upon JS. The following two "benefits" of JS fall directly out of the deep coupling of society to JS.

***Support and documentation:*** some of the best documentation on the web for any language is on the topic of JS. Not just the quality, but also the sheer quantity of documentation on JS is unmatched. From *Mozilla's Developer Network* to *Eloquent JavaScript*, you can find myriad resources to learn, use, progress with, and optimize JS.

***Open-source libraries:*** from public APIs to enterprise-scalable frameworks to game engines, JS has the most and the most mature open-source libraries out of any language. Also, if you want to leverage the growing number of public APIs available, then you better learn JS.

***Asynchronous use:*** because of the way that "callbacks" are built into the JS core, JS is extremely well-suited for asynchronous and "non-blocking" programming. This means that JS can request and receive data on the client-side from the server, without having to reload the page. Also, callbacks allow JS to execute code simultaneously while "waiting" for a response from the server, i.e., the server request/response cycle doesn't "block" the code from continuing to execute. JS callbacks also allow for control over what is done once the server returns the data requested. Finally, the new "promises" feature of the ECMA-Script 6 language allows for sophisticated threading.

***Full-stack use:*** JS is now gaining popularity as a back-end language with the growth of products like *Node.js*, *Express.io*, and *MongoDB*. This means that developers can now efficiently (and with confidence) focus on their JS knowledge until they become specialists because they can use JS across the front and back-end without worrying about needing to learn multiple languages.

---

## What are JavaScript's limitations?

<ul>
    <li>security requires heavy attention</li>
    <li>cross-browser compatibility requires extra work</li>
    <li>accessibility can still be an issue</li>
    <li>fairly verbose syntax (not a limitation, but seen as a weakness by some)</li>
    <li>burdensome to modularize relative to other languages</li>
    <li>possibly missing some "core" built-in methods that are standard in other languages</li>
</ul>

Security is an issue for any web language (deal with it). Cross-browser compatibility issues are already being solved with tools like Modernizr.js. Accessibility issues are being worked on successfully already -- see Apple's built-in screen-reader. Finally, the "verbose" syntax seems to be a subjective preference that some like and some dislike.

The limitations that have been noticeable to me are JS' burdensomeness of modularizing code and smaller built-in tool-belt compared to languages like Ruby. I like native "require," "include," and "import" statements -- that being said, RequireJS and other module-managers based on the AMD API fill that need for some JS developers. Finally, I wish JS had more methods on the built-in classes similar to Ruby, because I am lazy and would rather not have to spin up custom utility functions for every JS project.

---

## Conclusions about JavaScript

Like any tool, the success of the tool is dependent upon the proper use of said tool. JavaScript is a powerful tool when used properly, with more similarities than differences to other multi-purpose scripting languages.

The reasons to use one programming language over another are context-dependent. That being said, all things being equal, JS is a front-runner because of certain facts of reality -- people use it, companies use it, it will be hard to displace, etc. Until a language is ***revolutionary*** compared to JS, facts of reality will keep JS as *the language to learn* for the future. More convincingly, even if a revolutionary language comes along, JS will probably just make a platform-play and absorb the features of that language into the next JS specification -- leaving JS' secure place in software development intact.

