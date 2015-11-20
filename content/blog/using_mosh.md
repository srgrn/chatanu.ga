+++
Description = ""
date = "2015-08-30T19:58:14+03:00"
draft = false
title = "Using mosh"
type = "post"
categories = ["tools"]
+++

After knowing about [MOSH](https://mosh.mit.edu/) (the mobile shell) almost from its beginning and never bothering to use it (for varied reasons) I finally have it installed.

If you want the TLDR it is going like this: MOSH is a drop in replacement for ssh which uses ssh for the initial connect than starts its own server that talks in UDP and continue the connection through it. It can withstand disconnects, roaming and actually fixes issues with ssh.
<!--more-->

It sounds great but using MOSH will not protect you from SSH problems as long as it is used for the initial connection you need ssh installed and running.

The best thing about it is that while I enjoy using OSX (which is basically Unix) I hate the fact my terminal gets stuck if I had open ssh connection while the computer goes to sleep, with MOSH this problem disappear.

It works on most platforms and even on windows through cygwin.
On windows the mosh wrapper script doesn't work properly but by following the mosh FAQ you can easily overcome this obstacle.

If you haven't installed it so far stop reading and go install it now.


