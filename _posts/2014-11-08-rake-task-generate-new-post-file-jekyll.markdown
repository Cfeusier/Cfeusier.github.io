---
layout: post_simple
title:  "Writing a Rake Task to Generate New Posts for my Jekyll-Powered Blog"
date:   2014-11-08
excerpt: ""
tags:
- rake
- ruby
- jekyll
- devops
- automation
- workflow
---

1. Gemfile - add Rake and ActiveSupport/CoreExt
2. bundle install
3. Rakefile:
  - require rake and as/ce
  - namespace task to :gen