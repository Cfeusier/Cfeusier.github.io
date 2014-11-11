---
layout: post_simple
title:  "Writing a Rake Task to Generate New Posts for My Jekyll-Powered Blog"
date:   2014-11-08
author: "Clark Feusier"
tags:
- rake
- ruby
- jekyll
- devops
- automation
- workflow
---

<pre class="brush: bash">
    rake gen:post TITLE="[INSERT TITLE]" [D] [FN] [TAGS]
</pre>


I couldn't find a good plugin online for using a command to generate Jekyll post-files automatically date-stamped and stubbed with content/YAML front matter. So, I got some practice writing a simple Rake task. Here is an easy way to create a custom post file generator in just a few steps.


## Target

I want to be able to type `rake gen:post TITLE="Badass Title Here"` and get an auto-generated file that looks like this:

<pre class="brush: yaml">
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
</pre>

Stubbed content that you can have here with whatever dynamic variables you collect or calculate in your rake task!

Optionally, I would like to have the ability to add options like this:

<pre class="brush: bash">
    rake gen:post TITLE="Title Here" D=YYYY-MM-DD FN="opt_filename.md" TAGS="tag1,tag2,..."
</pre>

The `D` option would take a date that would override the default (current date). This should be input in the YYYY-MM-DD date format. The `FN` option would take a filename as a string. Finally, the `TAGS` option would take a comma-separated list of tags in the form of a string.

---

## Outline of Steps

### If you haven't already, create a `_posts` directory to hold your Jekyll blog posts

- This step is simple: just create an empty directory (folder) at the ***root*** of your Jekyll blog

- the root of your blog will be the top-level directory of your blog &mdash; **for example:**

<pre class="brush: ruby">
    blog_root/
        _posts/
</pre>

### Create a Gemfile at the top-level of your application

- This step is simple: just create an empty file titled `Gemfile` at the ***root*** of your blog &mdash; **for example:**

<pre class="brush: ruby">
    blog_root/
        _posts/
        Gemfile
</pre>

### Add `Rake` and `ActiveSupport` to your Gemfile

- Your `Gemfile` should look like this:

<pre class="brush: ruby">
    source 'https://rubygems.org'
    ruby '[INSERT RUBY VERSION NUMBER HERE]'

    gem 'activesupport', '~>4.1'
    gem 'rake'
</pre>

### Run `bundle install`

- Seriously, just go to your root directory and run `bundle install` &mdash; let Bundler take care of installing all the dependencies for you

### Create an empty directory `config/` at the top-level of your application

- This step is simple: create an empty directory titled `config` at the ***root*** of your blog &mdash; **for example:**

<pre class="brush: ruby">
    blog_root/
        _posts/
        config/
        Gemfile
</pre>

### Create an empty file titled `environment.rb` **within** the `config/` directory

- This step is simple: create an empty file titled `environment.rb` in the `config/` directory of your blog &mdash; **for example:**

<pre class="brush: ruby">
    blog_root/
        _posts/
        config/
            environment.rb
        Gemfile
</pre>

### Fill the `config/environment.rb` file with centralized helpers

- Add some path-centric logic constants and `require` statements to make it easier to work on your Rake task later &mdash; **for example:**

<pre class="brush: ruby">
    ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../Gemfile', __FILE__)
    require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])
    require 'rubygems'
    require 'uri'
    require 'pathname'

    APP_ROOT = Pathname.new(File.expand_path('../', __FILE__))
    APP_NAME = APP_ROOT.basename.to_s
</pre>

- The above code is doing the following:
    1. defining an environment variable (if it doesn't already exist) that points to the file location of the Gemfile so that Bundler can find the Gemfile
    2. requiring `bundler/setup` if the Gemfile exists
    3. requiring the `rubygems` that we care about having in our app
    4. requiring `uri` and `pathname` so that we can define our path-centric constants
    5. creating an `APP_ROOT` constant pointing to the path location of your app ***root***
    6. creating an `APP_NAME` constant with the value of the `APP_ROOT` basename as a string


### Create an empty `Rakefile` at th top-level of your application

- This step is simple: just create an empty file titled `Rakefile` at the ***root*** of your blog &mdash; **for example:**

<pre class="brush: ruby">
    blog_root/
        _posts/
        config/
            environment.rb
        Gemfile
        Rakefile
</pre>

### Add the following code to your `Rakefile`:

<pre class="brush: ruby">
    require ::File.expand_path('../config/environment', __FILE__)
    require 'rake'
    require 'active_support/core_ext'

    namespace :gen do
      desc "Create an empty post in /_posts, e.g., rake gen:post TITLE='This is a Sample Title'"
      task :post do
        err_mes = "Must specificy post TITLE, e.g., rake gen:post TITLE='This is a Sample Title'"
        raise err_mes unless ENV.has_key?('TITLE')
        post_title = ENV['TITLE'].camelize
        date = ENV['D'] || Date.today.to_s
        base_filename = ENV['FN'] || ENV['TITLE'].downcase.gsub(/\s+/, "-")
        post_filename = date + "_" + base_filename + ".markdown"
        post_path = APP_ROOT.join('../_posts', post_filename)
        file_exists_mes = "ERROR: post file '#{post_path}' already exists"
        tags = ENV['TAGS'] || "software engineering"
        tag_str = ""
        tags = tags.split(",").each { |tag| tag_str << '- ' + tag + "\n" }
        tag_str.chomp!

        raise file_exists_mes if File.exist?(post_path)

        puts "Created #{post_path}"
        File.open(post_path, 'w+') do |f|
          f.write(<<-EOF.strip_heredoc)
    ---
    layout: post_simple
    title:  #{post_title}
    date:   #{date}
    author: "Clark Feusier"
    excerpt: ""
    tags:
    #{tag_str}
    ---

    Sample content goes here. This is the first paragraph that you should replace with your content for #{post_title}.

    Now, go write something awesome...
    EOF
        end
      end
    end
</pre>

- The only things that you should need to change are the following:
    * line 16: change 'software engineering' to whatever you want your default tag to be for posts
    * line 27: the name of the layout that you will be using for this post type
    * line 30: the name of the author
    * lines 36-38: change the stubbed text to whatever default text you want for this post type
- If you know what you are doing, you should be able to change the HEREDOC string to whatever you want your post template to look like!
- You can now generate post-files from the command line, like this:

<pre class="brush: bash">
    rake gen:post TITLE="I Am So Awesome at Writing Titles" D=2014-11-09 TAGS="awesomeness,clark,tag3"
</pre>

The above command will create a file `2014-11-09-i-am-so-awesome-at-writing-titles.markdown` in your `_posts/` directory with the following stubbed content:

<pre class="brush: yaml">
    ---
    layout: post_simple
    title:  "I Am So Awesome at Writing Titles"
    date:   2014-11-09
    author: "Clark Feusier"
    excerpt: ""
    tags:
    - awesomeness
    - clark
    - tag3
    ---

    Sample content goes here. This is the first paragraph that you should replace with your content for I Am So Awesome at Writing Titles.

    Now, go write something awesome...
</pre>

### Now, GO WRITE!
