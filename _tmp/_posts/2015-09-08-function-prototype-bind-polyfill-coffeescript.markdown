---
layout: post_simple
title:  "CoffeeScript Polyfill for Function.prototype.bind"
date: 2015-09-08
author: "Clark Feusier"
tags:
- polyfill
- bind
- prototype
- coffeescript

---

Recently, I needed to polyfill `Function.prototype.bind` to use with _PhantomJS_. The project I was working on was written in _CoffeeScript_, so I rewrote the MDN `Function.prototype.bind` JavaScript polyfill in _CoffeeScript_...

<script src="https://gist.github.com/Cfeusier/18803aea2b91572da2e6.js"></script>

To use the polyfill, just add the above snippet wherever needed.
