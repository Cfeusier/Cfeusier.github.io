---
layout: post_simple
title:  "How to Organize your Files and Folders - Node + Express App Skeleton"
date: 2015-01-07
author: "Clark Feusier"
tags:
- javascript
- best practices
- implementation examples
- node
- express

---

### Intro Stuff
- Disclaimers
    - Not the only way
    - always tradeoffs
    - i like this style, it helps me extend the app later, and my brain can visualize the app
    - still have to configure to your liking
    - depends on the type of app you are building
- Versions (Node and Express)
- Motivations Summary
    - modular
    - visually clean, aesthetically pleasing
    - full view of app by hiding complexity
    - abstraction for extensibility and maintenance


## Directory Structure

<script src="https://gist.github.com/Cfeusier/e580815b1270fb98f273.js"></script>

- `app_name/` is your app root folder &mdash; this usually contains the entirety of your application
- `client/` is your client-side code root folder &mdash; contains entirety of client-specific code
- `server/` is your server-side code root folder &mdash; contains entirety of server-specific code
- `[top-level shared]` refers to any code that is shared between the client and server
- `[top-level vendor]` refers to any vendor or third-party code to which your whole app needs access &mdash; e.g.,`node_modules`
- `[top-level files]` refers to non-configuration specific top-level application files, e.g., `README.md`
- `[top-level configurations]` refers to global-app configuration code &mdash; e.g., `.gitignore`, `package.json`, `Procfile`, etc.

The majority of the actual **code** for the application will be located in either the `client` or `server` directory. Let us start by looking at the structure of the `client` directory.

### Client Directory Structure

<script src="https://gist.github.com/Cfeusier/e50ee2ded97b3dc6d412.js"></script>

### Server Directory Structure

<script src="https://gist.github.com/Cfeusier/e81b34ed90ffeb08c3cd.js"></script>

## Code Structure

A. `server.js`

<script src="https://gist.github.com/Cfeusier/27327611de7db1dcdbe0.js"></script>

B. `config/app.js`

<script src="https://gist.github.com/Cfeusier/af80a589cc456755a6ba.js"></script>

- **line 1** `config/env.js` will export a function that when invoked will set up your environment &mdash; secrets, api keys, passwords, etc. &mdash; *don't commit this!! add it to your version control .\*ignore*
- **line 2** `config/db/db.js` will export a function that when invoked will set up your database and connect an adapter if used
- **line 3** requires the express framework
- **line 4** stores the app object &mdash; app object is created by the constructor exported by express
- **line 5** requires the path module for access to path helpers
- **line 6** requires the body parser module for parsing request/response bodies
- **line 7** requires the method override module for overriding http requests to handle put/delete methods
- **lines 9 - 17** export a function which returns an app object for use throughout the program &mdash; this function also configures the application with parsers, overrides, middleware modules, static asset handlers, and routes
  - **lines 10 - 11** configures the app to use the JSON body parser for http request/response body parsing
  - **line 12** configures the app to encode urls when parsing requests/responses
  - **line 13** configures the app to use X-HTTP-Method-Override when overriding http methods
  - **line 14** configures the app to serve the client directory as static assests &mdash; change the to whatever public directory you want served as static asset
  - **line 15** `../routers/route_manifest.js` will export a function that is invoked with the app object as an input &mdash; the route manifest will require all of the app's routers and invoke them with the app object so that each router can pin it's route listeners/handlers onto the app object
  - **line 16** returns the app object for exportation

The summary of this app config file &mdash; **configure the app** environment, database, and global settings, then instantiate your routers and return the app object for use elsewhere.

I bet you are curious about how we are configuring our databases and routers &mdash; let's follow line 2 and line 15 into their respective files, starting with `config/db/db.js`.

C. `config/db/db.js`

<script src="https://gist.github.com/Cfeusier/6231afbff8731f43e9bd.js"></script>

D. `router/route_manifest.js`

<script src="https://gist.github.com/Cfeusier/8e6a74b3b8e917b7ae2b.js"></script>

E. `router/sub_router_file.js`

This is an example express router that might be used for an internal api &mdash; request listener and handler.

<script src="https://gist.github.com/Cfeusier/0ad57b777ca760e62e46.js"></script>

F. `router/sub_router2_file.js`

This is an example express router that might be used for serving up static assets to a client.

<script src="https://gist.github.com/Cfeusier/3a507cdb8cc17687fe5f.js"></script>

G. `utils/responder.js`

<script src="https://gist.github.com/Cfeusier/93eacebc1caeebb32f21.js"></script>

H. `utils/collection_interface.js`

This is an example utility module that helps handle requests for *one* collection or model. This example uses mongoose and mongodb, but could be adapted to any database and adapter given it provides a `create` and `find` interface. Assume that the require statement which saves an object into `models` is returning a bunch of model 'classes'.

<script src="https://gist.github.com/Cfeusier/7586afd70f29d9a92e81.js"></script>

## Overview of App Flow

<img src="/img/blog/node_express.png" width="90%" style="margin: 0 auto;"/>


## Summary








