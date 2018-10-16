---
layout: post_simple
title:  "Guest Post: Getting Started with webpack"
date: 2015-05-11
author: "Raghuvir Kasturi"
tags:
- webpack
- modules
- dependencies
- guest post

---

I work with a guy named, [Raghu Kasturi](http://). This talented buddy of mine shared a tutorial with us &mdash; getting started with **webpack**. We will learn about webpack, why we might use webpack, and finally, how to actually use it to enhance our work. The following knowledge-bombs and practical tutorial are straight from Raghu, writing from Bangalore, India.

---

## Getting Started with webpack

**By [Raghu Kasturi](http://)**


If you’ve done any work with the front end on some level of scale, you should be familiar with the fact that keeping a codebase maintainable as your application scales can be a tricky problem to solve. There are a ton of tools and languages out there that make writing, maintaining, and reading the holy trifecta of browser languages - HTML, CSS, JS - as easy and efficient as possible. So how does [webpack](http://webpack.github.io/) fit into this landscape?

## What is webpack?

Webpack, at it’s heart, is an asset-driven module system. It allows you to write your front-end code as a complex set of inter-dependent modules and then compile them down into a set of static assets that can be served up to a browser.

## Why do we need yet another module system?

### I JUST LEARNT HOW TO USE BROWSERIFY!

The main problem webpack solves is hidden within its [**Code Splitting feature**](http://webpack.github.io/docs/code-splitting.html). The two ways to currently serve up JS assets is either via a single massive JS file that was compiled on the server, or numerous individual files which lead to a ton of overhead. These two extreme methodologies both come with their own problems, and webpack allows you to split your code intelligently, leading to much faster initial load times, and serving up only the JS that is required for a specific page or module to load.

A great example of how this works, with the CommonJS syntax, is available [in the webpack docs](https://github.com/webpack/webpack/tree/master/examples/code-splitting).

In general, webpack aims to solve a certain set of problems with as generic a solution as possible, acting more as a superset of the current JS module systems (CommonJS, AMD, ES6 modules), rather than yet another system. It also is not limited to JS; webpack utilizes loaders to make non-JS modules available to the module system.

Webpack loaders can be thought of as language specific parsers, that convert some piece of non-JS code into a JS module. For example:

*style.css*

<script src="https://gist.github.com/Cfeusier/7faa1c3d1575257ce1b7.js"></script>

The style can be passed through a loader and included into a JS file.

*app.js*

<script src="https://gist.github.com/Cfeusier/413f6ea0b08455c2c17b.js"></script>

Webpack also provides watch functionality as well as a development server. Given all of this, it shouldn’t be difficult to see webpack replacing gulp/grunt as it provides similar functionality, albeit via a single interface.

## Working with Webpack

Ok enough theory, let’s look at how we can set up a simple project using webpack.

**You’ll first need to install the webpack CLI globally** from the command-line.

```
$ npm install webpack -g
```

**To start, let’s create a config file inside our project root**.

*webpack.config.js*

<script src="https://gist.github.com/Cfeusier/55202ebe0bdc1d881cd0.js"></script>

For each loader you use, make sure you install the required package as a dependency (or dev dependency). In this case you’ll need the css-loader, and the style-loader. The style-loader applies the styles within the CSS file into the HTML page, and the CSS loader processes the CSS into a JavaScript module.

```
$ npm install css-loader style-loader
```

**Add an HTML file**

*index.html*

<script src="https://gist.github.com/Cfeusier/02aa8c690e4dd7f2f511.js"></script>

Note the absence of a stylesheet link in your `<head>`. The styles will be imported via JavaScript using webpack’s style & css loaders. This ensures that every piece of modular JS only uses the CSS it requires, rather than a server request for a monolithic application-wide CSS file.

**Add some JavaScript**

*app.js*

<script src="https://gist.github.com/Cfeusier/b68106c29bb3adf431d9.js"></script>

**Add some styles**

*style.css*

<script src="https://gist.github.com/Cfeusier/2988146414de5b742afd.js"></script>

***Now all you have to do is invoke webpack and see what happens.***

```
$ webpack
```

Go check out your new HTML page in a browser!

## Further reading & resources

If this piqued your interest, and you’d like to dig deeper, here are a few resources to get you on your way.

- [The ultimate Webpack setup](http://christianalfoni.com/articles/2015_04_19_The-ultimate-webpack-setup) by Christian Alfoni
- [Webpack + React](http://christianalfoni.com/articles/2014_12_13_Webpack-and-react-is-awesome) by Christian Alfoni
- [Webpack how-to](https://github.com/petehunt/webpack-howto) by Pete Hunt

---

**Raghuvir Kasturi** is a software engineer with a background in physics, based out of Bangalore, India. Raghu is interested in designing and building scalable and modular systems that can be leveraged on the modern multi-device web via meaningful user experiences. His current focus is on high impact data visualisations and build & deployment strategies for web & mobile applications. You can find Raghu’s writings <a href='http://raghuvirkasturi.com' target='_blank'>here</a>.
