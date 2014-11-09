---
layout: post_simple
title:  "Writing a Rake Task to Generate New Posts for My Jekyll-Powered Blog"
date:   2014-11-08
author: "Clark Feusier"
excerpt: "I want to be able to type 'rake gen:post TITLE=\'Badass Title Here\' and get an auto-generated file. But, I couldn't find a good plugin online for using a command to generate Jekyll post-files automatically date-stamped and stubbed with content/YAML front matter. So, I wrote a simple Rake task ..."
tags:
- rake
- ruby
- jekyll
- devops
- automation
- workflow
---

    rake gen:post TITLE="<INSERT TITLE>" [D] [FN] [TAGS]

I couldn't find a good plugin online for using a command to generate Jekyll post-files automatically date-stamped and stubbed with content/YAML front matter. So, I got some practice writing a simple Rake task. Here is an easy way to create a custom post file generator in just a few steps.


### Target

I want to be able to type `rake gen:post TITLE="Badass Title Here"` and get an auto-generated file that looks like this:

    ---
    layout: post_simple
    title:  "Badass Title Here"
    date:   2014-11-08
    author: "Clark Feusier"
    excerpt: ""
    tags:
    - default tag1
    - default tag2
    ---

    Stubbed content that you can have here with whatever dynamic variables you collect or calculate in your rake task!

Optionally, I would like to have the ability to add options like this:

    rake gen:post TITLE="Title Here" D=YYYY-MM-DD FN="opt_filename.md" TAGS="tag1,tag2,..."

The `D` option would take a date that would override the default (current date). This should be input in the YYYY-MM-DD date format. The `FN` option would take a filename as a string. Finally, the `TAGS` option would take a comma-separated list of tags in the form of a string.

---

### Outline of Steps

- create `_posts` directory
- Gemfile &mdash; add Rake and ActiveSupport/CoreExt
- bundle install
- Rakefile:
  - require rake and as/ce
  - namespace task to :gen

### Code Explanation
