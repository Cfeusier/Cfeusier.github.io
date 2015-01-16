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

In this post, you will learn why you should concatenate and minify your scripts and stylesheets into one small file using the task runner called **Grunt.js**. You will also learn **how** to concatenate and minify your scripts and stylesheets with **Grunt**.

## Concatenation of Files

For each script that you force your client to request, the client has to wait for a full request/response cycle before being able to load the code from that script. If you have 10 scripts and 3 stylesheets being loaded in your `index.html`, that is at least 13 full roundtrips to the server and back before the client is ready to engage with the user &mdash; not a good user experience.

For production purposes &mdash; deploying your code &mdash; you should **concatenate** all of your scripts into a single script, and load that script in your `index.html`, thereby only needing to make 1 trip to the server and back.

I tend to write 3 tasks to concatenate my files: a task for concatenating all of my client-side javascripts, a task for concatenating all of my vendor and third-party client-side javascripts, and a task for concatenating all of my stylesheets. This allows me to place three tags on my `index.html` &mdash; a javascripts tag, a vendor javascripts tag, and a stylesheets link. **Three** requests from the client and three round-trips to the server and back &mdash; regardless of how many source files were concatenated.

**tl;dr** &mdash; the purpose of concatenation is to reduce the requests needed to get your app running on the client, by **smushing together** all of the files of a single type into *one* file, separated by some meaningful delimiter (like `;` in JavaScript). The client can then load all of the files with a single request.

For example, do you think that the user has a better experience waiting for the client to request and receive each of the following files?

<script src="https://gist.github.com/Cfeusier/561bfc50f1aab4a2989b.js"></script>

Or, these files?

<script src="https://gist.github.com/Cfeusier/f77e1b47174d46de3d55.js"></script>

Enough said. Let's move on to another type of production optimization &mdash; file *minification*.

## Minification of Files

If concatenation is the process of *stringing together multiple files* into one file, minification is the process of *compressing the code from one file* into one really small version of that code. The compression takes place by removing whitespace and new line characters, and sometimes changing variable names to single letters.

The purpose of concatenation is to reduce the number of roundtrips that need to be made to get all of the code onto the client. The purpose of minifcation is to reduce the *amount of data that needs to be sent on a single response*, by removing extraneous and non-semantic characters in the file that the response will send.

For example, do you think it would take longer for a server to send the first code example below to a client or the second code example? And, which do you think would take longer for the client to download? By the way, the first example is only showing 60 of 1200+ lines of code, and the second example, takes up 30 lines.

<script src="https://gist.github.com/Cfeusier/9b3a4bd4b58038f87c6a.js"></script>

<script src="https://gist.github.com/Cfeusier/fce136d6e687e1dd87b3.js"></script>

**tl;dr** &mdash; obviously, the minified version is much smaller than the unminified version. Smaller usually means faster to upload and download.

So, now that we understand both concatenation and minification in terms of result and purpose, we can understand how to combine them. The process goes like this:

1. combine lots of different files into a single file (concatentation)
2. strip that single combined file &mdash; the output of the concatenation operation &mdash; of all extraneous space and characters (minification)

The result of those two operations is a single and *small* file (relative to the unminified version) that can be sent to the client in a single and speedy trip.

How would you go about implementing the two step process that I just outlined?

Hopefully, your mind went rather quickly from a manual solution to an automated solution. You don't want to have to copy and paste everytime any source file changes &mdash; error prone and ridiculous. Time matters to me; I don't want to waste time doing things like copying and pasting. Let's figure out how to automate this concatenation/minification task. I suggest a build tool or task runner, like Grunt. Here we go...

## Build Tools and Task Runners

Build tools are just software utilities used to build new instances of applications. Task runners are just software utilities used to automate the running of tasks. Building a new version of an application is a *task*, so you can automate your *build* process with a **task runner**, like [Grunt.js](http://gruntjs.com/).

## Grunt

**Grunt** will help you automate pretty much any task that you can think of, but we will only be using it for concatenation and minification. Also, please note that there are a lot of competitors to **Grunt** that will do the same thing. **Grunt** and **Gulp** tend to be the most popular task runners out there right now for JavaScript.

**Grunt** puts an abstraction layer between the intent of your task and how to execute that task in a given environment, meaning that you can write your task once and it will run on pretty much any environment without having to rewrite it &mdash; very cool.

Now that we have enough background on **Grunt**, let's dive into concatenation and minification with **Grunt**.

### Grunt Setup

1. globally install the **Grunt Command-Line Interface** tool
  - `npm install -g grunt-cli` (must be run as a user with administrator access)
2. change directories into the root of your project
3. add a `Gruntfile.js` at the root level of your project
  - leave this empty for now
4. add a `package.json` at the root level of your project
  - **Grunt** and its plugins are managed via [npm](http://npmjs.com), so you need a `package.json` file in your project to interact with **Grunt**
  - here are the contents of our `package.json` file:

<script src="https://gist.github.com/Cfeusier/a95becf952aae5b87701.js"></script>

  - this `package.json` acts as a manifest to declare the name, version number, description, main entry point, license, publication visibility, and development dependencies of the application
  - **npm** will manage these dependencies for you if you run `npm install`
    - this command will install your `devDependencies` in your local project folder &mdash; i.e., **npm** installs the packages we will be using: `grunt`, `grunt-contrib-concat`, `grunt-contrib-cssmin`, and `grunt-contrib-uglify`
  - *Note*: any **Grunt** plugin that contains the word `contrib` in the title is officially maintained by the **Grunt** development team; So, you should probably lean towards `contrib` packages, all else being equal
  - if you need more plugins later, you can install as needed with `npm install plugin_name --save-dev`, which will automatically write the plugin to your `package.json` as a dependency, as well as install the plugin to your local project

We are finished with the **Grunt** setup, so if you haven't already, before moving on, please run `npm install` from the root-level of your local project directory. To the code!

## Gruntfile.js for Concatenation and Minification

The `Gruntfile.js` always follows the same pattern &mdash; initialize and configure **Grunt** and plugins, load the plugins, and register tasks. The configuration of the plugins can happen before or after the loading step &mdash; doesn't usually matter.

It will be easier to explain the `Gruntfile.js` if we have it in front of our mind's eye, so here it is:

<script src="https://gist.github.com/Cfeusier/161c258c1863235567f7.js"></script>

We start by exporting a function, on **line 1**, that **Grunt** can invoke with a `grunt` object as an argument. The majority of the work in this function will be done by interacting with the `grunt` object. The rest of the `Gruntfile.js` is made up of the three parts that we discussed earlier &mdash; configuration of `grunt` and plugins, loading of all necessary plugins, and registering tasks on the `grunt` object.

### Configuration

**Lines 7 - 45** invoke the `initConfig` method on the `grunt` object, providing the configuration settings for your tasks as an object. **Line 9** provides **Grunt** with the package settings by reading the JSON of the `package.json` file with `grunt.file.readJSON('package.json')`. All of the task and plugin configuration happens between lines 11 and 44.

### `concat`

- **lines 11 - 23**: define the configuration for our *concatenation* task, `concat`
  - **line 12**: sets one option for the `concat` task &mdash; the separator between each file in the concatenation (`;` works in JavaScript because the interpreter treats `;` as the end of a meaningful piece of code)
  - **lines 14 - 17**: define our `js` sub-task configuration, which will be used to concatenate all of our non-vendor JavaScript for delivery to the client
    - **line 15**: sets the location of the `src` files &mdash; the files to concatenate together
    - in our case, we are telling **Grunt** to look in the `src` directory for any `.js` files nested any level of sub-directories deep
    - **line 16**: sets the location of the `dest` file &mdash; the single file that will hold all of the concatenated JavaScript code from the `src` files
    - in our case, we are telling **Grunt** to dump all the concatenated code in a new file in the `dist` directory titled with the package name from the `pkg` property we set above
  - **lines 19 - 22**: define our `vendor` sub-task configuration, which will be used to concatenate all of our vendor JavaScripts for delivery to the client
    - **line 20**: sets the location of the `src` files &mdash; the files to concatenate together
    - in our case, we are telling **Grunt** to look through an **array** of files in a specific order because of order-dependencies between the vendor libraries
    - we are specifying the `jquery.js` file in our `vendor` directory to be concatenated first, then the `underscore.js` file, followed by any other `.js` file any level deep within the `vendor` directory
    - **line 21**: sets the location of the `dest` file &mdash; the single file that will hold all of the concatenated JavaScript code from the `src` vendor files
    - in our case, we are telling **Grunt** to dump all the concatenated code in a new file in the `dist` directory titled `vendors.js`

That is the whole process for getting all of your files concatenated &mdash; just run `grunt concat` from the command-line and watch the magic happen (assuming that you have loaded the plugins as seen below). Now, you can replace all of the script tags in your HTML with just *two* tags &mdash; one to the `dist/[NAME OF PACKAGE].js` and one point to the `dist/vendors.js` file.

### `uglify`

- **lines 25 - 38**: define the configuration for our *minification* task, `uglify`
  - **lines 26 - 29 **: sets the options for the `uglify` task
    - **line 27**: sets the `banner` option so that each minified file gets a banner comment at the top with some information for to make your life easier
    - **line 28**: sets the `mangle` option to `false`, which instructs the `uglify` plugin to avoid changing variable names and function names (even if that might shorten the code)
  - **lines 30 - 34**: define a sub-task configuration called `js`
    - **lines 31 - 32**: declare the files to minify, and store them in an array as the value of a property that has a key set to the destination file in which to put the minified code
  - **lines 35 - 38**: define a sub-task configuration called `vendor` and repeat the same pattern as the `js` sub-task, except for your vendor scripts

That is the whole process for getting all of your files minified &mdash; just run `grunt concat` then `grunt uglify` from the command-line and watch the magic happen (assuming that you have loaded the plugins as seen below). Now, you can replace all of the script tags in your HTML that point to unminified JavaScript with just *two* tags &mdash; one to the `dist/[NAME OF PACKAGE].min.js` and one point to the `dist/vendors.min.js` file.

### `cssmin`

- **lines 40 - 44**: define the configuration for our **CSS minification** task, `cssmin`
  - **lines 41 - 43**: set the `target` property to the files that you want to minify and the file that you would like to use as the destination for the minified code
    - in our case, we are minifying `style.css` from the `styles` directory, and we are outputting the code into `style.min.css` in the `dist` directory

That is the whole process for getting all of your CSS files minified &mdash; just run `grunt cssmin` from the command-line and watch the magic happen (assuming that you have loaded the plugins as seen below). Now, you can replace the stylesheet link references to unminified CSS in your HTML with just one tag pointing to a minified `styles/style.min.css`.

Now that all of the plugin task configurations have been completed, we are going to load all of the plugin packages using `grunt.loadNpmTasks`.

### Load Plugins

- **lines 51 - 53**: load the plugins you are utilizing in the tasks so that you have access to them
  - in our case, we are using a plugin for `concat`, `uglify`, and `cssmin`, so we load all three of them with `grunt.loadNpmTasks('PLUGIN NAME');`

After all of the require plugins are loaded, we can register any 'composite' tasks, and end the `Gruntfile.js`.

### Register Tasks

This is where you **register** any tasks that are made up of other tasks or sub-tasks. This is very powerful &mdash; allowing you to build highly flexible and composable units of functionality that can be rearranged depending on need. We are going to demonstrate an example of that power by registering a composite task called `build`. This `build` task is just going to **synchronously** execute the `concat` task, then the `uglify` task, and finally the `cssmin` task.

- **lines 59 - 63**: register a task on the `grunt` object that is called `build`
  - `build` is composed of the plugin sub-tasks that we configured above: `concat`, `uglify`, and `cssmin` in that order

We can now issue the `grunt build` command at the command-line and the end result will be concatenated and minified JavaScript and CSS files! BOOM.

## Summary

1. reducing the number of script tags in your HTML reduces the number of requests the client has to make to the server for the given files &mdash; this is achieved by **concatenating** all the files into a single file, and only loading that file
2. reducing the size of a single file reduces the time that a single response takes to get passed between the server and the client (and the amount of time for the client to digest the response) &mdash; this is accomplished by **minifying** your files, i.e., reducing extraneous characters and space
3. **Grunt.js** is a task runner that helps you compose and run tasks like file concatenation and minification

Automate the silly stuff and then use that earned time to do fun stuff in the future.

Thanks,

Clark
