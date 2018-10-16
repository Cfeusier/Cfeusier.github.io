---
layout: post_simple
title:  "Shakin' Class -- Pianos in Different Area Codes"
date:   2014-08-21
author: "Clark Feusier"
tags:
- software engineering
- object-oriented programming
- inheritance
- composition
---

There are a lot of ways to model objects in our world -- a globe to represent earth, a popsicle-stick art project to model a real building, a drawing to represent statue, a mathematical equation to model a beehive, a Minkowski spacetime diagram to model space and time, *ad infinitum*. One of the popular ways that scientists (computer, biological, etc.) model objects in reality is a *Class-based* system.

Think of the taxonomies in biology (Life > Domain > Kingdom > Phylum ... Family > Genus > Species), or the 'basic' types in most programming languages (String, Array, Number, etc.) -- these taxonomies, and many more, tend to be built around *class* hierarchies. All *species* are instantiations (objects) of the ***Species*** class, which is a *subclass* of the ***Life*** class. That just means that all species share features common to all other species, as well as common to all other life.

Classes are are used in *<a href="http://en.wikipedia.org/wiki/Object-oriented_programming" target="_blank">Object Oriented Programming Languages (OOP)</a>* to organize the **types** of data and behavior of data throughout a program. A ***class*** is basically the description of a type -- an ***object*** is just an entity of a certain type, or an "instantiation" of a class. For example, since I will be using pianos throughout this post:

***Class:*** Piano

***Object:*** The 110 year old Chickering Grand Piano in my living room

If I were trying to create a computer program, let's say a web application for a piano warehouse and reseller, then I might want to show a bunch of different pianos in the webapp with the pianos' respective information. In this case, there might be a bunch of different pianos, all different brands, sounds, woods, colors, etc. All of these pianos are ***pianos***! Or, less redundantly on the surface, all of these piano objects are of the class ***Piano***.

I could write a ***Piano*** class that has a description of what all piano objects will share -- some basic data and basic behavior. Then, when I want to show a piano in the webapp, I can *instantiate* an object of the ***Piano*** class -- that piano object will then be available for use with all the features and behavior of a piano.

I could choose to *play* the piano, *buy* the piano, *sell* the piano, etc., all within my program if I decide to give the ***Piano*** class those abilities.

Now that we have a general idea of what a *class* is, let's discuss when to use a class in a computer program.

---

## When to Use a Class

Classes are fairly magical for *inheritance*, *encapsulation*, *reuse*, and other goodies -- so, classes get heavily overused, especially by n00bs. Far from being a panacea, classes can be used with care and in the proper situations. There are many times when a module might be better for inheritance, encapsulation, and reuse. Depending on the language (our examples and discussions will center around Ruby, primarily), there might be a better tool for the job than a class.

A class should be used if a program entity is a type of thing that shares other important characteristics with other program entities. But that is not enough -- a class should only be used if the shared characteristics are because the entities are all of the same *type*, or all stand in a ***is-a*** relationship with a type -- e.g., I **am a** *person*, a *person* **is a** *sentient being*, a *sentient being* **is a** *living organism*, etc.

If your shared charactersitics are reusable but not because of a 'is-a' relationship, then you should probably using a different programming pattern than class-based inheritance.

If you are familiar with any semantic web technologies, you might recognize this 'is-a' relationship vs. other relationships distinction. The semantic web folksonomies like RDF and OWL use class-based (is-a) relationships to structure data, while the formal semantic ontologies like SUMO and MILO use more granular relationships to structure data. Because of this difference, the formal ontologies are *much* more expressive than pure class (is-a) ontological hierarchies. Likewise, there are many ways to modularize and share features in a computer program that are beyond the capabilities of pure is-a inheritance hierarchies, i.e., pure class-based inheritance.

So, say that you have a clear 'is-a' relationship between objects that you want to model in a computer program -- you sell pianos; you have a ton of different pianos sitting in a showroom; all of these pianos share certain types of features like price, wood, key material, action material, age, brand, etc.; you want a webapp where customers can browse and compare all of the different pianos. Would it make sense to build a custom software object from *scratch* for each piano, or would it make more sense to build a ***Piano*** software blueprint that could be reused for all of the different pianos by just filling in the individual characteristics for each piano without having to rebuild the outline from scratch? Probably the latter -- that is, *use a class*.

Each piano in the storeroom (and webapp) ***is a*** piano, meaning that all of the individual piano objects can be modeled as instantiations of a ***Piano*** class. How, you ask? Gently, as follows.

---

## How to Use a Class ... in Ruby

Creating a class in the Ruby language is fairly simple -- all it requires is a *class keyword*, a *class name*, and an *end keyword* to close the class.

<pre class="brush: ruby">
    class Piano
    end
</pre>

That simple code above would allow me to then create piano objects of the class ***Piano***, like so:

<pre class="brush: ruby">
    piano1 = Piano.new
</pre>

Which would return a piano object similar to #<'Piano:0x0000010129bda8'>, which I could then use in my webapp to do things like display the piano object id, store the piano object in a database, and more.

If I wanted to actually add data and behavior to all of our pianos, I could add code within the <code>class</code> and <code>end</code> keywords. Let's try that now, with a basic ***Piano*** class example.

---

## Piano Class Example

<pre class="brush: ruby">
    class Piano
      def initialize(brand, age, price, keys, size, soundboard_wood)
        @brand = brand
        @age = age
        @price = price
        @keys = keys
        @size = size
        @wood = soundboard_wood
      end

      def piano_desc
        puts "The #{@age} year old #{@size} #{@brand} piano currently costs #{@price} U.S. dollars. The piano's soundboard is made of #{@wood} and has #{@keys} keys."
      end
    end
</pre>

Now, create some pianos!

<pre class="brush: ruby">
    my_piano       = Piano.new("Chickering", 110, "N/A", "ivory-ebony",
                               "full-grand", "spruce")
    elt_john_piano = Piano.new("Yamaha", 4, "1,000,000", "ivory-ebony",
                               "full-grand", "spruce")
</pre>

Now we can call the `piano_desc` method on each of the pianos to see a description of the pianos.

<pre class="brush: ruby">
    my_piano.piano_desc
    elt_john_piano.piano_desc
</pre>

Those two method calls would print out the following:

**The 110 year old full-grand Chickering piano currently costs N/A U.S. dollars. The piano's soundboard is made of spruce and has ivory-ebony keys.**

**The 4 year old full-grand Yamaha piano currently costs 1,000,000 U.S. dollars. The piano's soundboard is made of spruce and has ivory-ebony keys.**

Obviously these examples were highly simplified and contrived; however, I hope that the high-level concepts surrounding classes and objects were made more clear than prior to reading this post.

Though fairly simple to use, classes are very powerful. Use with care, and only use when you are trying to model an ***is-a*** relationship between a bunch of objects and a shared type. When those prerequisites are met, classes will unlock powerful gains from inheritance, encapsulation, and reusability.
