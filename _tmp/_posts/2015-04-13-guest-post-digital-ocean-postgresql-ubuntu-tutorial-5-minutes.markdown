---
layout: post_simple
title:  "Guest Post: 5 Mins to Deployment - Ubuntu 14.04 and PostgreSQL 9.3 on Digital Ocean"
date: 2015-04-13
author: "Ryan Leung"
tags:
- devops
- deployment
- postgresql
- ubuntu
- guest post

---

My friend and talented colleague, [Ryan Leung](http://www.minocys.com/), wrote this guest tutorial on deploying to Digital Ocean with an Ubuntu and PostgreSQL setup. The following step-by-step guide is from Ryan...

---

## Deployment with Ubuntu and PostgreSQL on Digital Ocean

**By [Ryan Leung](http://www.minocys.com/)**

Recently, I had to deploy a project that used PostgreSQL as it’s database layer. After considering my hosting options I settled on Digital Ocean for it’s ease of use and community support. Check out their [community portal](https://www.digitalocean.com/community/) for a variety of well written tutorials.

In this post, I will walk through setting up an Ubuntu droplet on Digital Ocean, and installing PostgreSQL on the server.

---

First, create a droplet that will house your Ubuntu and PostgreSQL instance on Digital Ocean. Digital Ocean makes this really easy &mdash; select the settings you need for your server and click **create droplet**.

<img src="/img/blog/create_droplet_digital_ocean.png" width="100%" style="margin: 0 auto; border: 2px solid black;" />

Make sure to select **version 14.04** of Ubuntu &mdash; at the time of writing, Ubuntu 14.10 is also available.

We will use the default root username and password sent by Digital Ocean to your email to access the new Ubuntu VM. If you're creating a VM for production/deployment, it's a good idea to setup SSH authentication. Instructions to do this can be found [in this community tutorial](https://www.digitalocean.com/community/tutorials/how-to-connect-to-your-droplet-with-ssh).

---

Once the setup process is completed, connect to your Ubuntu droplet using the root password that was sent to your email. There are several ways you can do this, in this tutorial we will use the in-browser console provided by Digital Ocean. From your droplet dashboard, click **Access** followed by **Console Access**, which should bring you to the following screen:

<img src="/img/blog/console_access_screen_digital_ocean.png" width="100%" style="margin: 0 auto; border: 2px solid black;" />

If you would rather connect using your operating system's command-line interface, take a moment to note down the ip address of your droplet. It is located just below the name of your droplet on the dashboard.

At this point, follow the steps below to connect via SSH [(source).](https://www.digitalocean.com/community/tutorials/how-to-create-your-first-digitalocean-droplet-virtual-server).

---

### Mac Users

**Mac** users can use the pre-installed ssh client that comes with osx, just run the following command:

<script src="https://gist.github.com/Cfeusier/410e64b931ff0f709eb0.js"></script>

### Windows Users

**Windows** users will have to install an ssh client &mdash; PuTTY is one that is commonly used and can be found [here](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

1. Download and install PuTTY
2. Fill in the 'Host Name (or IP address)' field using your ip address
3. Set port number to **22**
4. Set connection type to **SSH**
5. Click on the **SSH** entry in the sidebar, and select **2 Only**
6. Click **Connect**

---

### Logging into the Server

The first time you login the server will prompt you to change your password:

<img src="/img/blog/initial_login_console_digital_ocean.png" width="100%" style="margin: 0 auto; border: 2px solid black;" />

### Installing PostgreSQL

By default, Ubuntu's package manager ***APT*** contains PostgreSQL packages, so installation should be a snap. Run the following commands:

<script src="https://gist.github.com/Cfeusier/98e6b61a98b3ec38a842.js"></script>

***Note***: [Postgresql-contrib](http://www.postgresql.org/docs/9.1/static/contrib.html) contains useful tools that are not considered part of the core PostgreSQL functionality. [Postgis](http://postgis.net/) adds spatial and geographical capabilities to Postgres, letting you run locational queries on your database.

### Switch to PostgreSQL User and Run PostgreSQL

Postgres uses 'roles' to define access privileges. After installation, it will create a new user account on your Ubuntu machine named **postgres**. It will have all access privileges to your PostgreSQL database. Run the following commands to switch to the new user and run the PostgreSQL CLI.

<script src="https://gist.github.com/Cfeusier/f1204ed5f618866cea07.js"></script>

---

Congratulations! You’ve just setup your Ubuntu droplet on Digital Ocean, and installed PostgreSQL 9.3. From here, you can get started creating your database through the CLI. If you’re new to PostgreSQL, the [official documentation’s tutorial](http://www.postgresql.org/docs/9.4/interactive/tutorial-start.html) is a good place to start.
