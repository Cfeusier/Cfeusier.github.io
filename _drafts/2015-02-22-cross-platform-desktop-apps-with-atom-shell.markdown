---
layout: post_simple
title:  "Building Cross-Platform Desktop Applications with Atom Shell"
date: 2015-02-22
author: "Clark Feusier"
tags:
- hybrid apps
- javascript
- frameworks
- examples

---

## Basics

## Motivations

### Atom Shell Framework

### Examples

### Resources



- show Atom Editor
    - doc, file system, right-click, etc (Native OS commands)
    - works on all three popular OS's
        - not with 3 different code bases
    - 1 codebase of html, js (coffee), css
    - how? the Atom Editor is built with Atom Shell

- what is Atom Shell?
    - framework for building cross-platform desktop applications
    - write for MacOSX, Windows of all types, and Linux of all types, in JavaScript, HTML, and CSS
    - built on Node.js and Chromium (70% C++, 10% CoffeeScript, 10% Objective-C++, 5% Python and Shell)
    - creates a chromium container/runtime environment for you application to run in, with hooks into the OS's API
        -> allows you to use node + 3rd party node modules like you would in a node web app
        -> lets you control the native OS without having to know or write 3 diff OS APIs
            - e.g., clipboard API https://github.com/atom/atom-shell/blob/master/docs/api/clipboard.md

Caveat: not as mature of ecosystem and tools as i would like

runs your code as a web app inside a browser wrapper, also providing a JS API to tie into the OS
'app' API provides abstraction over hooks into the OS's app-lifecycle
show app.getPath()
this 'app' API allows you to manage the two sides of the application and it's lifecycle
2 sides - browser and renderer
browser is what you are used to thinking of as the node side (usually server interaction)
node Event Emitter object
https://github.com/atom/atom-shell/blob/master/docs/api/browser-window.md
renderer is usually a web page side (load scripts in the html that your browser window serves!
can communicate via an atom-shell api, ipc (or remote)
ipc is a 'inter process channel' that is just an event system object (if you have use any event system, ipc will feel very familiar, especially if you have used socket.io
listen on and fire events between the browser side and the renderer side
browser side has access to a fuller range of native os api wrappers

https://github.com/Cfeusier/atom-spike