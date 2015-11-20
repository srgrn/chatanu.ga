+++
Description = ""
date = "2015-11-01T12:59:21+02:00"
draft = false
title = "What I automated with python"
type = "post"
categories = ["social"]
+++

I encountered a reddit thread on r/Python called [What did you automate with python](https://www.reddit.com/r/Python/comments/3p8m2s/what_did_you_automate_with_python/) which got me thinking.

I automated a whole lot with python...
<!--more-->

I switched to python a couple of years ago, mostly because I changed my job and in the new place they already had a django service. 

During the time in that position I had automated many things:
  
  * a clicker game using (PyAutoGui)[https://pyautogui.readthedocs.org/en/latest/].
  * [Google drive trash cleaner script](https://github.com/srgrn/google-drive-trash-cleaner)
  * created scripts to update JIRA.
  * used [RisingOak/stashy](https://github.com/RisingOak/stashy) to create a diff between builds according to commits.
  * moved folders with their relevant history into git repos [using simple file system diffs](https://gist.github.com/srgrn/9207715).
  * and probably some other things i forgot.

After I left this position I started working only using python which for me has the great advantage of staying readable even after a while (coming from being a Perl developer where you sometimes write in clever or trickey ways and can't understand it a week later it is a great feature). This is not a feature of the language but python does make you break down code into simpler parts and having a linter integrated into my editor does help.

And as time continued I increased my knowledge in python and continued on the path of automation.

  * [Statuspage.io api wrapper module](https://github.com/srgrn/pystatuspage).
  * [Apple secrets handler with provisioning explorer](https://github.com/srgrn/secrets_details).
  * SLN and CSPROJ manipulation scripts (part of our build automation).
  * [Script to upload files to azure storage](https://gist.github.com/srgrn/7c117d633ba68861fa4c).
  * [grab_packet.py](https://github.com/srgrn/grab_packt.py) - a simple script to get the free book of the day from packet publishing.
  * Sublime Text 3 plug-in - [HugoHelper](https://github.com/srgrn/HugoHelper) To help me writ this blog.
  * Script and site using postmarkapp and google appengine to advance my position in the waiting list for one plus two (before they added captcha).
  * a simple glue script to get data from [AzurePlot](https://github.com/WadGraphEs/AzurePlot) to graphite
  * mini websites using bottle.py (you might call it micro services) for updating statuspage.io using previously mentions api wrapper. massaging HTTP requests to allow them into private API's. pulling data from internal API's. And probably others.

There are proably other things.


On a different note and related to automation.

One of the best things I did automate was not with python. There is an amazing set of tools called [fastlane tools](http://fastlane.tools) which today is using [Spaceship](http://spaceship.airforce) to automate apple developer center portal. 

Using Spaceship in ruby I was able to create a simple script to create a new demoapp with all relevant certificates, provisioing profiles and update it in our own build system. This means that the project manager doesn't need me to create new demoapps which in turn give me time to work on other more interesting tasks.

