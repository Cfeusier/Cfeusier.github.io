---
layout: post_simple
title:  "Concatenate and Minify JavaScripts and Stylesheets for Production with Grunt"
date: 2015-01-14
author: "Clark Feusier"
tags:
- javascript
- dev ops
- implementation examples
- build tools
- task runners
- grunt

---

## Concatenation of Files

For each script that you force your client to request, the client has to wait for a full request/response cycle before being able to load the code from that script. If you have 10 scripts and 3 stylesheets being loaded in your `index.html`, that is at least 13 full roundtrips to the server and back before the client is ready to engage with the user &mdash; not a good user experience.

For production purposes &mdash; deploying your code &mdash; you should **concatenate** all of your scripts into a single script, and load that script in your `index.html`, thereby only needing to make 1 trip to the server and back.

**tl;dr** &mdash; the purpose of concatenation is to reduce the requests needed to get your app running on the client, by only loading a single file that contains all of the files *smushed* together, separated by some meaningful delimiter (like `;` in JavaScript).

## Minification of Files

## Automation

## Build Tools and Task Runners

## Grunt

1. install grunt cli globally
2. add `Gruntfile.js` to local dir at root level
3. add `package.json` to local dir at root level
4. complete `package.json` and run `npm install`
  - will install grunt locally
5. `Gruntfile.js` contents
  - install grunt plugins as needed with `--save-dev`


// Gruntfile.js

- export function (grunt)

  - initConfig with options object
    - pkg: get package.json
    - plugin config objects
  - load plugins with loadNpmTasks
  - register tasks


// package.json