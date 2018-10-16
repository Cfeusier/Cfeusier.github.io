---
layout: post_simple
title:  "(Re)cycle and Reuse"
date:   2014-08-19
author: "Clark Feusier"
excerpt: "Conditional loops and iterator methods like Enumerable#each aid greatly in keeping your code DRY by allowing for code reuse and repetitive-task automation. I want to introduce and dissect another one of these methods -- 'Enumerable#cycle' ..."
tags:
- software engineering
- ruby
- enumerables
- cycle
- each
---

Conditional loops and iterator methods like Enumerable#each aid greatly in keeping your code DRY by allowing for code reuse and repetitive-task automation. I want to introduce and dissect another one of these methods -- ***Enumerable#cycle***.

---

## Enumerable#cycle(n = nil) { |obj| block } -> nil

<h5 style="opacity: 0.5;">Ruby Documentation of Enumerable#cycle</h5>

<blockquote>
    Calls <strong>block</strong> for each element of <em>enum</em> repeatedly n times or forever if none or nil is given. If a non-positive number is given or the collection is empty, #cycle does nothing. #cycle returns nil if the loop has finished without getting interrupted.
    <br /><br />
    #cycle saves elements in an internal array so changes to <em>enum</em> after the first pass have no effect.
    <br /><br />
    If no block is given, an enumerator is returned instead.
    <br />
    <strong>Enumerable#cycle(n = nil) -> an_enumerator</strong>
</blockquote>

<a href="http://ruby-doc.org/core-2.1.2/Enumerable.html#method-i-cycle" target="_blank">(Source)</a>

---

Here is my explanation of the above definition of #cycle from the <a href="http://ruby-doc.org/core-2.1.2/Enumerable.html#method-i-cycle" target="_blank">Ruby documentation:</a>

First, the '#cycle' definition is *called on* an **enumerable** object (an instantiation of the ***Enumerable*** class). This is just a fancy way of saying that the 'callee' or 'receiver' of the #cycle method call is an *enumerable* object, most likely an array or hash -- or, the object on which the method will work is an enumerable object (an object that can be 'enumerated').

'#cycle' calls **block** for each element of *enum* can be translated as meaning that each element of the enumerable receiver will have **block** called with the element being passed to the block. So, calling:

<pre class="brush: ruby">
    [1, 2, 3].cycle(2) { |num| puts num }
</pre>

... will call `puts num` for each element of the array `[1, 2, 3]`, resulting in:

<pre class="brush: ruby">
    1
    2
    3
    1
    2
    3
</pre>

The numbers '1, 2, 3' are repeated because '2' is passed in as an argument to #cycle, indicating that #cycle should happen *twice*. As you can see, each element of the array gets passed in to the **block** as the `|num|` local block variable, resulting in `puts` being called for each element.

'#cycle' 'calls **block** for each element of *enum* repeatedly n times or forever if none or nil is given' isn't the most well-wrought of sentences, but it means something similar to the following:

Each element gets passed into the block 'repeatedly n times or forever' -- the number of times to repeat the cycle is given as an argument to the #cycle method call. If you just call #cycle without passing in an argument, it will repeat 'forever,' because the default parameter is set to `nil`.

If #cycle is passed a number, and #cycle finishes its loop without getting interrupted, the return value of the method will be `nil`. Finally, #cycle uses an 'internal array' to store changes to **enum** so that #cycle acts non-destructively on the callee.

So, now that we have a decent understanding of what #cycle does, let's cover some different examples of uses of #cycle.

---

***Calling #cycle on an enumerable without passing in a block results in a new enumerator object being returned.***

That is, `[1, 2, 3].cycle(5)` will return an enumerator object that looks like this (without the single quotes inside the tag):

<pre class="brush: ruby">
    #<'Enumerator: [1, 2, 3]:cycle(5)'>
</pre>

To be totally honest, I am not exactly sure what people do with Enumerator objects like this in this type of context. I will be asking around... ***UPDATE:*** turns out that using an enumerable method to return an Enumerator object is usually so that you can chain method calls onto that Enumerator object.

***Using #cycle with an array, would look something like this:***

<pre class="brush: ruby">
    arr = ["Clark", "is", "the", "best", "!"]
    arr.cycle(3) { |str| puts str }
    puts "Keep telling yourself that, Clark..."
</pre>

As you can see, each element of the array gets passed into the 'str' parameter of the block. This is complicated slightly when using #cycle with a hash instead of an array, which we will cover now.

***When calling #cycle on a hash, there are two options*** -- pass in each whole element of the hash as a single parameter or pass in the key and the value of each element of the hash as two parameters (with the key always taking the first position and the value occupies the second). What you decide to do will depend on what you are trying to accomplish with using #cycle on a hash. Let's start with the single parameter option.

<pre class="brush: ruby">
hashish = { "Clark" => :best, "?" => false }
hashish.cycle(10) { |element| puts element }
puts "Bummer, dude..."
</pre>

The #cycle call would print (ten times in a row):

<pre class="brush: ruby">
    Clark
    best
    ?
    false
</pre>

As you can see, the first key is getting printed (with a newline), then the first value is printed. Then, the second key gets printed, then the second value ... *ad terminus ad   quem*. Each key-value pair is being passed in as the 'element' variable in the #cycle block. Let's compare that to the case of using #cycle with 2 parameters instead of 1.

***If you want to access each key and value individually, without having to pull them out of the key-value pair object, you can pass in two arguments to the #cycle block*** &mdash; `|k_pos, v_pos|`.

It doesn't matter what you name the two arguments; the first argument will be the key and the second argument will be bound to the value.

<pre class="brush: ruby">
hashish = { "Clark" => :best, "?" => false }
hashish.cycle(10) { |key, value| puts "#{key} : #{value}" }
puts "Bummer, dude..."
</pre>

The above use of #cycle will produce the following output (ten times in a row):

<pre class="brush:ruby">
    Clark : best
    ? : false
</pre>

Ok, so now that we have covered *how* to use #cycle with its few variations, you might be wondering why you *would* ever use #cycle ... For example, why would you use #cycle instead of using any of the `for` loop variations, or why would you use #cycle instead of #each within a #times block? I will make an attempt to provide an answer to those questions below.

---

The first answer is easy to give, but feels somewhat 'snooty' -- *you should use **anything** over a `for` loop because a `for` loop is so **un-Ruby*** ... ugh, pretentiousness-induced vomit.

The second answer is a little bit more difficult for me to provide (given my current state of programming ignorance), however, I think that I can provide an empirical-evidence-based explanation for why one might choose to use #cycle in certain scenarios instead of using #times/#upto in combination with #each.

Here are the competing versions:

<pre class="brush: ruby">
    [1, 2, 3].cycle(5) { |obj| puts obj }
</pre>

<h3 style="text-align: left;">vs.</h3>

<pre class="brush: ruby">
    5.times { [1, 2, 3].each { |obj| puts obj } }
</pre>

A bastardized Ockham's Razor provides the first support for using #cycle over #times + #each. I mean, why not use the built-in Enumerable class Ruby-magic and save yourself from needing to nest a block within a block?

If aesthetic sexiness doesn't sway you, you are a robot. So, hopefully you will find this convincing -- there are slight performance gains when using #cycle versus #times + #each. Here is the test that I ran to profile #cycle and #times + #each:

<pre class="brush: ruby">
    def cycle_test(arr, num)
    start = Time.now
    puts start
    arr.cycle(num) { |obj| puts obj }
    stop = Time.now
    puts stop
    puts stop - start
    end

    cycle_test([1, 2, 3], 1000)
</pre>

<pre class="brush: ruby">
    def each_test(arr, num)
    start = Time.now
    puts start
    num.times { arr.each { |obj| puts obj } }
    stop = Time.now
    puts stop
    puts stop - start
    end

    each_test([1, 2, 3], 1000)
</pre>


- `cycle_test` took 0.041044 seconds to run (100 test average)
- `each_test` took 0.042207 seconds to run (100 test average)
- So, `cycle_test`, implementing #cycle, was 2.76% faster for 1000 repetitions than `each_test`, implementing #times + #each

I know, I know, not a huge difference, nor a very well-designed test, but it gives *directional* confirmation that using #cycle is faster than using #times + #each. So, if you are concerned with that type of 'optimibation' &reg;, then use #cycle instead of #times + #each.
