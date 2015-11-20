+++
Description = ""
date = "2015-11-20T21:02:36+02:00"
draft = false
title = "Simple script skeleton"
type = "post"
categories = ["coding"]
+++

It took me a while to write this post, I was ill and the baby was ill and than i got back to work and time just slips by. So while consider the time frame to be a couple of weeks back.

Anyway I've noticed recently that I write many scripts in python to execute tasks and that for most of them I start with copying the argparse and some other basic includes from the previously written script. 
<!--more-->

So I decided to write a simple skeleton to wrap up all my basic requirements for a runnable script.
 {{< gist 061e144e70812a8ce10d >}} 

 This skeleton gives the following features:

 1. supports a global config object (yes globals are bad and it should be immutable after read but its the easiest way to handle it) that is being loaded from a json file.

 2. uses logging by default with a very simple format. And allows switching to debug printing easily.

 Since than I have used it as a base for several scripts. 

 All that is missing now is a way to make it as a shared base. so I can simply add 
```import skeleton``` at the beginning of my scripts. But my python skills are still beneath such options.

Also a couple of days after doing it I encountered the following post: [Building Simple Command Line Interfaces in Python](https://stormpath.com/blog/building-simple-cli-interfaces-in-python).

Where he describes a full proof method. But it is much more complicated and since most scripts I write are used to be very simple steps in a complete build pipeline there is not need for overcomplicating things.

I hope you found this useful.
