---
layout: post_simple
title:  "The Active Record Pattern + ORM + Rails' ActiveRecord"
date:   2014-09-20
author: "Clark Feusier"
tags:
- software engineering
- orm
- active record
- rails
---

This post is meant as a 'high-level' survey of the Active Record Pattern, Object-Relational Mapping (ORM), and the Ruby on Rails' implementation of the Active Record Pattern &mdash; the ActiveRecord gem. There are many concepts and technologies involved in working with databases, so I only mean to give you a comfort with how the parts work together to make data-backed applications &mdash; not a deep-dive on the individual technologies and concepts.

---

To start, let's get clear on the general context of our discussion &mdash; databases. *Applications store information for later use, and this data persistence usually involves a database and database management system (DBMS).*

Further, the most popular database-type and DBMS is the ***relational database*** implemented in some variant of SQL.

**SQL** is just a programming language used for database access and manipulation. It let's you ask your database things like, "can you give me all the records that contain products bought on June 1, 1988 by a person named 'Alfred'?" You might ask that question like this:

<pre class="brush: sql">
    SELECT * FROM products JOIN users ON products.user_id = user.id
    WHERE purchase_date = 1988_06_01 AND user_name = 'Alfred'
</pre>

So, why am I telling you about relational databases and SQL? Because our real topics &mdash; the Active Record pattern, Object-Relational Mapping, and the ActiveRecord gem &mdash; are normally motivated by developers desire to *avoid* getting their hands dirty interacting with the database in raw SQL. The Active Record pattern is usually sexified by an introduction like this &mdash; do you remember the SQL query above? What if the same thing could be acheived with something as simple as:

<pre class="brush: ruby">
    Product.where("purchase_date = ? AND user_name = ?",
                   params[:purchase_date], params[:user_name])
</pre>

That would be very cool! No need for the developer to write raw SQL; instead, the developer can write all the database access/manipulation code in the language in which she wrote the rest of the application (Ruby in the example). Also, the database code would become database agnostic. You could write it once and not worry about writing different versions for your SQLite development database and your PostgreSQL production database. In comes the 'Active Record Pattern' ...

---

## The Active Record Pattern

So, developers came up with an architectural pattern (Active Record) that allows programmers to avoid writing in raw database languages like SQL by wrapping relational database tables in classes. Each record in a database table can then be represented as an ***object*** in the wrapper language. This is acheived by writing accessor methods for each field/column in the table which you are wrapping in a class. That is, each field has an accessor method so that you can access the field as though it were a property on the table object, thus on each record object.

First, you could create an object in, for example, Ruby. Then, via the database API that most Active Record pattern implementations require, you can save that new object to the database &mdash; i.e., the wrapper class and database API work collaborate to map that object onto a new record in a table in the database. All of that without the developer writing anything other than the programming language he uses for the 'business logic' of the application! Note well, *without writing* ... SQL. Most of the introductions to Object-Relational Mapping systems like the ActiveRecord gem expound the benefits of ORM systems by claiming that an ORM allows a developer to avoid ***knowing*** SQL. This is false. An ORM allows a developer to avoid ***writing*** SQL. Why am I talking about ORMs when we were just discussing the Active Record Pattern?

Because, the Active Record Pattern has been most often implemented by using an Object-Relational Mapping system. So, ORM is just an implementation that follows the Active Record Pattern. Finally, the ActiveRecord gem from Rails is just one type of ORM system!

Ok, now I think I can consider our discussion of Object-Relational Mapping and the ActiveRecord gem to be motivated. To summarize all the moving parts so far: **if you could implement the Active Record Pattern, then you could write all of your database code in your business logic language without needing to write in SQL, and an ORM could implement the Active Record Pattern. One popular ORM that has done that is the ActiveRecord gem from Ruby on Rails.** So, how does this all work? How does an ORM system 'map' an object to a record in a table? How does the Rails' ActiveRecord gem fit into developing an application? Let's fly over that territory now.

---

## Object-Relational Mapping

So, Object-Relational Mapping. Mapping objects onto relations and relations onto objects. What does that *mean*?

The easiest way to understand ORM is to understand the component parts &mdash; objects and relations.

An object, in most object-oriented programming languages, is an 'instantiation of a class' where the instantiation is a combination of variables, functions, and data structures. That is a fancy way of saying that an object is an abstract thing that can do stuff. Or, an object is a type of thing that is actually instantiated in the form of concrete properties and abilities. For example, an object that is a dog is an instantiation of the 'Dog class' that has concrete dog properties and abilities &mdash; it is a certain size, color, shape, etc. and it can run, bark, eat, and more.

In Ruby, this might look as follows:

<pre class="brush: ruby">
    fido = Dog.new(name: "Fido", breed: "Mixed", color: "tan")
    fido.bark # => "Ruff!"
</pre>

<code>fido</code> is an object of the <code>Dog</code> class. <code>fido</code> has a few different properties or attributes &mdash; His <code>name</code> is 'Fido.' He is a mutt or "Mixed" <code>breed</code> and his <code>color</code> property is tan. He can also do things, like bark.

Most modern applications are a collection of different objects interacting with each other. Ok, I think we have enough on Objects to be getting along with ... Let's move to the 'relations' part of Object-Relational Mapping.

As earlier stated, most applications use some type of SQL database &mdash; a relational database. A relational database is just a database that stores data, as well as how that data is related. For example, a database might store data about products, customers, and orders. Relational databases make it easy to store all that data, as well as the relationships between everything (customers can order products). Most textbooks use the definition "all data and relationships are represented in flat, two-dimensional tables called relations" <a href="http://www.amazon.com/Systems-Analysis-Design-Don-Yeates/dp/0273655361" target="_blank">(source)</a>.

So, finally we have gotten to *relations*. Another fancy term for something intuitive &mdash; table-formatted data. Ever seen an Excel spreadsheet? Basically a table or 'relation.' Each table (relation) has columns (fields) and rows (entries or records). For example, a <code>customers</code> table (relation) might have a <code>first_name</code> column (field), a <code>last_name</code> column (field), an <code>address</code> column (field), an <code>email</code> column (field), etc. This table could then be full of rows (entries or records), with each row (entry or record) representing one customer with his or her own first name, last name, address, email, etc.

We now have all the parts in place to finally explain Object-Relational Mapping. **Objects are a mixture of abilities and data in the form of properties**, e.g., a <code>Car</code> object could have the ability to <code>accelerate</code> and a <code>horsepower</code> property. **Relations are just tables of data and how the data are related**, e.g., a <code>Cars</code> table could have a field for horsepower, and the different car records could have a different value for their horsepower.

Object-Relational Mapping just ***maps classes to tables, objects to records, and the properties of objects onto the fields of tables***.

So, for a larger example ... instead of using raw SQL, we could use Ruby and an ORM to map our Ruby application objects to our relational SQL database records. Instead of using some mythical ORM system, let's use this example to introduce the next topic &mdash; the ORM system from Ruby on Rails in the form of ActiveRecord.

---

## Ruby on Rails' ActiveRecord Gem

So, we have an application for a car dealer that displays the inventory and specifications within an interactive experience. However, this is a used-car dealership that wants to user-generate inventory by allowing users to sell their own cars through the webapp. Users should be able to upload pictures, write descriptions about their car, set the price of the car, etc. Sounds like we want a database that will be able to store users and cars, at least.

In Rails, using ActiveRecord (an ORM that implements the Active Record Pattern), this would be achieved by modeling two different object-types: users and cars. By creating a model of what a User object should be like and what a Car object should be like, Rails is able to then map the models to their own tables in a database &mdash; <code>users</code> and <code>cars</code>, respectively. This is why people always say that Rails' ActiveRecord is the M in MVC &mdash; ActiveRecord acts at the Model layer between the business logic in the Controller layer and the database actions in the Database layer.

Rails' ActiveRecord makes it very easy to create models for your objects. Let's try it for our example.

<pre class="brush: ruby">
    class User < ActiveRecord::Base
    end

    class Car < ActiveRecord::Base
    end
</pre>

That would create two models &mdash; <code>User</code> and <code>Car</code> &mdash; mapped onto the <code>users</code> and <code>cars</code> tables, respectively. Also, by doing that, you will be able to map the columns of each table onto attributes of <code>User</code> and <code>Car</code> objects. That is it! Now we can easily create the tables in our database using the Rails' Active Record 'migration' feature.

A **migration** is just a way to alter the SQL database schema without having to write any SQL and while allowing your schema changes to be independent of the databases.

A migration can be run with a <code>Rake</code> task, and it will use a Ruby Domain Specific Language to change the database schema, in effect creating a new version of the database. Similar to any version control system, you can then use the migrations as stopping points along a timeline to rollback changes that were made to your database. It is actually very cool &mdash; kind of like saying "I want my database to look like *this*", and then running <code>rake db:migrate</code> at the command line, and allowing Rails' ActiveRecord to do all the heavy-lifting to alter your database structure.

Our first migrations will create the tables we want with the fields that we want for each table in the database.

The migration files are each timestamped, so creating them by hand is annoying. I tend to use the generator that Rails provides.

<pre class="brush: bash">
    $ rails g migration CreateUsers name:string email:string
</pre>

This command would create a migration file with a timestamp that is named like this: <code>YYYYMMDDHHMMSS_create_users.rb</code>. The file would contain the following:

<pre class="brush: ruby">
    class CreateUsers < ActiveRecord::Migration
      def change
        create_table :users do |t|
          t.string :name
          t.string :email
        end
      end
    end
</pre>

To actually create the table that the migration file references, you merely need to run <code>rake db:migrate</code>. We could then also generate a migration for the cars.

<pre class="brush: bash">
    rails g migration CreateCars make_model:string year:integer price:integer description:text
</pre>

The above command would create a migration file with the name <code>YYYYMMDDHHMMSS_create_cars.rb</code> (substituting the correct timestamp). The contents of the file would be as follows:

<pre class="brush: ruby">
    class CreateCars < ActiveRecord::Migration
      def change
        create_table :cars do |t|
          t.string :make_model
          t.integer :year
          t.integer :price
          t.text :description
        end
      end
    end
</pre>

Just run <code>rake db:migrate</code> to alter your database schema based on the above migration file.

By using ActiveRecord, you can avoid touching very much SQL and keep your schema database agnostic at the same time! We have seen how you can create a Model that maps to a table in the database, which is created with a migration, but we haven't shown many examples from the 'object' side of Object-Relational Mapping.

For example, if we went into the Rails console, we could create some <code>User</code> and <code>Car</code> objects and save them to our <code>users</code> and <code>cars</code> tables. We could also then access the objects' properties like price and email from the mapping to the <code>price</code> and <code>email</code> fields in our database. Let's do it ... (not displaying console output for length reasons)

<pre class="brush:bash">
    $ rails c
    Loading development environment (Rails 4.1.0)
    >> user1 = User.new(name: "Clark Feusier", email: "cfeusier@gmail.com")
    >> user2 = User.new(name: "Fiddle Feusier", email: "fiddlesticks@gmail.com")
    >> car1 = Car.new(make_model: "Toyota Camry", year: 2012, price: 10_000, description: "Really dirty car. Doesn't run. Give me money")
    >> car2 = Car.new(make_model: "Porsche Carrera", year: 2011, price: 60_000, description: "Fast and sexy. Get's ladies. Give me money")
    >> user1.save
    => #<`User id: 1, name: "Clark Feusier", email: "cfeusier@gmail.com", created_at: "2014-06-29 02:42:12", updated_at: "2014-06-29 02:42:12">
    >> user2.save
    => user2 object ...
    >> car1.save
    => car1 object ...
    >> car2.save
    => car2 object ...
    >> car2.price  # => 60_000
    >> user2.email  # => "fiddlesticks@gmail.com"
</pre>

If you are running those commands in the console, you will see the SQL statements that are generated from the Rails ActiveRecord mapping. For example, creating <code>user1</code> above with <code>user1 = User.new(name: "Clark Feusier", email: "cfeusier@gmail.com")</code> would generate the following:

<pre class="brush: sql">
    INSERT INTO "users" ("name", "email", "created_at", "updated_at")
    VALUES (?, ?, ?, ?)  [["name", "Clark Feusier"], ["email", "cfeusier@gmail.com"],
    ["created_at", Fri, 15 Feb 2013 16:02:18 UTC +00:00], ["updated_at", Fri, 15 Feb 2013 16:02:18 UTC +00:00]]
</pre>

As you can see, we can use simple Ruby objects and object properties and they get mapped to records and fields in tables in the database! We can even access the properties like <code>user1.name</code>, which will retrieve the value from the <code>name</code> field in the <code>users</code> table. Very cool. All without writing raw SQL!

---

## Conclusion

So, we have covered a lot of ground and tried to paint a picture that ties together myriad difficult concepts. Let's try to summarize ...

Most applications use some variant of a relational SQL database. All of your application's data would be stored in relations in your database (tables with columns and rows). To access and manipulate data in your SQL database, you would write raw SQL code for each of your different SQL databases (SQLite, MySQL, Oracle, etc.). Your application logic probably utilizes objects and their properties, constructed in your 'business logic' language (let's say Ruby). So, you would write your business logic to manipulate your objects using Ruby, but then any database access/manipulation would have to be written in raw SQL in the middle of your business logic.

To avoid this janus-natured application, smart people came up with the **Active Record Pattern** &mdash; an architectural pattern that makes relational records *active,* i.e., object-like. This pattern entails *wrapping* tables and records in Classes, allowing you to access the tables and records as though they were objects with properties.

The 'wrapping in Classes' part of the Active Record Pattern is normally handled by an ORM system &mdash; a system that implements the Active Record Pattern by mapping objects onto relations (tables). The ORM system that we covered &mdash; as well as one of the most famous ORM systems &mdash; the Rails' ActiveRecord gem, maps a layer of Model objects to the tables and records in an application's relational database. Upshot is agnostic database access and manipulation code, as well as developer happiness.
