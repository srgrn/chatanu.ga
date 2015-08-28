+++
Description = ""
date = "2015-08-28T21:59:25+03:00"
draft = false
title = "Duct Tape Coding"
type = "post"

+++

There is an old saying "real engineers need only two tools Duct Tape and WD40 - When something should move and it is stuck WD40, if it should stay and it moves Duct tape, all other cases are working as expected".

It seems like in the last couple of weeks the idea of Code-less coding, or making computer systems that can be developed without code got some headlines. stories like: [HOW “CODE-LESS” DEVELOPMENT COULD OBLITERATE THE APP DEV BACKLOG](http://www.programmableweb.com/news/how-%E2%80%9Ccode-less%E2%80%9D-development-could-obliterate-app-dev-backlog/analysis/2015/08/18) or [AppGyver aims to democratize software development](http://arcticstartup.com/article/appgyver-aims-to-democratize-software-development)

This is a great example of cyclic innovation.
<!--more-->

This is not a new idea, it was tried with some success in the past.
COBOL was created to allow the business people to write computer programs and it worked up to a point.
There were game creation suites and data manipulation tools which allow non developer people to create useful mini programs.

Some people say it is the end of the need for developers for if everyone can create software why do you need an expert?
 
However there always be a need for developers, someone must create the basic platforms, create the libraries and devise ways to convert algorithms into code. This is the first kind of developer that will survive but it is rare and hard.

The second type of developer is the duct tape developer. This kind of developer has the less glamorous job of connecting systems together.

It might seems like with all the easy tools like [IFTTT](https://ifttt.com), [Zapier](https://zapier.com/), [bip.io](https://bip.io) and others there is no more need for duct tape developers.

However I disagree, not only because I am a duct tape developer. In the end those services are limited.

For example when starting this blog i wanted each new post to generate a twit, and using IFTTT was the easiest, the trigger was new post in the rss and the action was a twit ( which than goes to facebook and so on).

This was great until I decided those links in twitter need to be processed through [startafire](http://startafire.com), this means now it has four steps in the process:

1. Get latest post url.
2. Send url to startafire.com for processing.
3. Process response from startafire.
4. twit the new URL.

While this sounds very easy you need someone to develop it as none of the service specifed above can handle such a case.

In most cases you need a duct tape developer, someone to get the data from one system, reorder this in a different way and than send it on its way to another system. And all those developers are not going away.

