+++
Description = ""
categories = ['Advent']
date = "2015-12-02T08:00:00+02:00"
pubdate = "2015-12-02T08:00:00+02:00"
draft = false
title = "2 - Useful Jenkins Plugins"
type = "post"

+++

So here to the second day of my little Advent Calendar.

So we use Jenkins as our build server at my work and there are several plug-ins that are great and helpful.
<!--more-->

They are not in any particular order.

  - [MultiJob](https://wiki.jenkins-ci.org/display/JENKINS/Multijob+Plugin) - Creating jobs with other jobs as build steps with nice gui. Nothing can be added to make it better.
  - [Multiple SCM](https://wiki.jenkins-ci.org/display/JENKINS/Multiple+SCMs+Plugin) - A personal favorite, simple plugin that allows using multiple SCM sources in one build. For when you need to run a tool from one repo on files in another.
  - [Next Build Number](https://wiki.jenkins-ci.org/display/JENKINS/Next+Build+Number+Plugin) - Another personal favorite, that allows reseting the build number easily (although it requires deleting all the builds with higher numbers).
  - [Node Label](https://wiki.jenkins-ci.org/display/JENKINS/NodeLabel+Parameter+Plugin) - We got a situation where some builds must start on one mac trigger the next build by passing all paramaters and than continue on a different machine. This plugin allows specifing a node label for a triggered build.
  - [Rebuild](https://wiki.jenkins-ci.org/display/JENKINS/Rebuild+Plugin) - This is amazing. We have builds with paramaters and sometimes you just want to tweak a single one and rebuild, or rebuild the build that succeded 4 builds ago.
  - [RVM](https://wiki.jenkins-ci.org/display/JENKINS/RVM+Plugin) - For the rubiests allows starting RVM gemsets that will affect all build steps.
  - [Shining Panda](https://wiki.jenkins-ci.org/display/JENKINS/ShiningPanda+Plugin) - Python is great but managing virtualenv from inside jenkins was a hassle. Also has python builder and other related tools.
  - [Timetamper](https://wiki.jenkins-ci.org/display/JENKINS/Timestamper) - make logs easier to read which is usually great when someone says that the build took too long.
  - [Flexible Publish](https://wiki.jenkins-ci.org/display/JENKINS/Flexible+Publish+Plugin) - This amazing plugin allows setting rules and IF statements for publish steps. While it is not really up to the level of coding it does allow building some pretty complicated conditions.
  - [EnvInject](https://wiki.jenkins-ci.org/display/JENKINS/EnvInject+Plugin) - Probably used by anyone that want to mess around with the enviroment between build steps, we use it also to allow setting the build number from inside the build to make it easier to read.

  Feel free to add more in the comments.

