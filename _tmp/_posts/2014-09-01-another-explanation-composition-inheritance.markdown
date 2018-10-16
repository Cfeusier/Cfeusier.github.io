---
layout: post_simple
title:  "Another Explanation of Composition and Inheritance ... ugh"
date:   2014-09-01
author: "Clark Feusier"
tags:
- software engineering
- composition
- object-oriented programming
---

There are a lot of articles on the web covering the differences between <em>inheritance</em> and <em>composition</em> in software design -- when to use one or the other, how inheritance is the devil, blah blah bliggityblah. I am writing this piece to solidify my own understanding on the topic, so I might take some liberties with my presentation. Also, all examples will be using Ruby, though most of the concepts are programming-language-agnostic. <em>Allons-y!</em>

---

## Main Motivation: Laziness

This isn't a new point -- programmers are notoriously lazy (in some sense). They don't like to do more work than they necessary to solve a given problem. They don't like to repeat tedious tasks that could be automated with code. They don't like to have to maintain messy codebases that could be DRYed up. So, software developers tend to <em>reuse</em> code. Reusable code is produced by using inheritance and composition (correctly). <em>et Voil&agrave</em> -- inheritance and composition motivated.

---

## Inheritance

Inheritance in software tends to refer to using 'parent' and 'child' relationships between classes to share functionality between the parent and children classes. In Ruby, a contrived example might look like this:

<pre class="brush: ruby">
    class Parent
      def family_history
        puts "PARENT family history"
      end
    end

    class Child < Parent
    end

    gbush = Parent.new
    gwbush = Child.new

    gbush.family_history # => "PARENT family history"
    gwbush.family_history # => "PARENT family history"
</pre>

First, a parent class is created. Some functionality or behavior is added to that parent class (in this case, printing the family history of the parent). Next, a child class is created with <code>Child < Parent</code>. The '<' is all that is needed to 'connect' the parent and child classes in an inheritance relationship.

Now we create a parent object and a child object. Finally, we can call <code>#family_history</code> on both the parent and child object even though the child class never explicitly defined a <code>#family_history</code> method. <em>Both the parent and child</em> return the <strong>parent's</strong> family history when <code>#family_history</code> is called.

This contrived example showed how you can use inheritance to share behavior between two classes. This example only made mild sense because a child shares her parents' family history -- there is a very tight relationship in that a child's family history just <strong><em>is</em></strong> her parents' family history because of the relationship between parents and children.

However, usually you don't want to use inheritance unless you require your parent to maintain its own state. Let's modify the example to show a case where inheritance would make even more sense because the parent is storing a last name in an instance variable.

<pre class="brush: ruby">
    class Parent
      attr_accessor :last_name

      def initialize(last_name)
        @last_name = last_name
      end

      def family_history
        puts "PARENT family history"
      end
    end

    class Child < Parent
    end

    roger = Parent.new("Feusier")
    jessica = Child.new("Feusier")

    roger.last_name # => "Feusier"
    jessica.last_name # => "Feusier"

    jessica.last_name = "Lex"

    roger.last_name # => "Feusier"
    jessica.last_name # => "Lex"
</pre>

As you can see, the parent now initializes with a last name, as does the child. It makes sense to use inheritance here because the child <em>usually</em> shares a last name with a parent for a signficant part of his life. The beauty of this inheritance pattern is the reusability of the parent's family history and last name for children with the ability for the child to change his last name if needed, e.g., line 22 where jessica's last name is changed.

Now that we have a grasp of inheritance, let's be honest. These simplistic examples tend to give beginners (as myself) an overly romanticized picture of inheritance. Modeling the real-world as necessary for production software is never this clean. The real-world is made up of a lot of <em>has-a</em> relationships between objects and only a few <em>is-a</em> relationships. There are a lot more cases in the world like this: I am a human. I have a brain. My dog is a dog. My dog has a brain. Should my dog and I stand in an inheritance relation to some direct parent just because we both share the functionality of having a brain? Probably not. It makes more sense to model this case as a scenario where my dog and I are both <em><strong>composed</strong></em> of brains (as well as main other things), i.e., we both <em><strong>have</strong></em> brains. BOOM -- composition re-motivated.

---

## Composition

You can compose an object out of other objects (behavior or state). This can be done using class-based composition or module-based composition. I will focus on the latter because it is far more common to see composition via modules. Let's say that I am trying to model a car class so that I can create car objects for my dealership database.

I will be using at least one class -- the <em>Car</em> class. But, instead of making that Car class inherit functionality from a parent class like a <em>Vehicle</em> class, I can use modules to replace the parent classes. If we want a car object to have 4 wheels, then we can <em><strong>compose</strong></em> the car out of a module that replicates "has 4 wheels" behavior.

<pre class="brush: ruby">
    module FourWheels

      def self.four_wheels
        puts "4 WHEELS WOOHOO!"
      end

    end

    class Car

      def four_wheels
        FourWheels.four_wheels
      end

    end

    car = Car.new

    car.four_wheels # => "4 WHEELS WOOHOO!"
</pre>

The beauty of composition via modules and mixins is that you can abstract your code to handle more cases while still keeping your code organized and decoupled. For example, instead of the above code, we could do the following:

<pre class="brush: ruby">
    module Wheels

      def self.wheels(num_wheels)
        puts "#{num_wheels} WHEELS WOOHOO!"
      end

    end

    class Car

      def initialize(wheels)
        @wheels = wheels
      end

      def wheels
        Wheels.wheels(@wheels)
      end

    end

    class Tricycle

      def initialize(wheels)
        @wheels = wheels
      end

      def wheels
        Wheels.wheels(@wheels)
      end

    end

    car = Car.new(4)
    tricycle = Tricycle.new(3)

    car.wheels # => "4 WHEELS WOOHOO!"
    tricycle.wheels # => "3 WHEELS WOOHOO!"
</pre>

Obviously the example is <em>way</em> overkill for just creating objects with a number of wheels :) But, it does show how you can easily use composition to abstract away from concrete cases, increasing reusability and maintainability (usually).

---

I will leave you with the following 'practical' method for deciding to use inheritance or composition.

<blockquote>
    "The choice of which is better ... depends on if you need to maintain state in each function call in the reusable portion of your code" <a href="http://ruby.learncodethehardway.org/book/ex44.html" target="_blank">(source)</a>.
</blockquote>

If you need the reusable part of your code (the parent class or the module to mixin) to store and persist its own state, then you should probably use inheritance. If you can store state in the 'child' part of your code, then you should use composition. For example, the Wheels module doesn't need to store how many of 'itself' is required within itself, that information is provided by each of the classes that mixin the Wheels module. That being said, more information and context will be required for actually deciding which design pattern to use in your software. Good luck!
