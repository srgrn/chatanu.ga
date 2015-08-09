+++
Description = ""
date = "2015-08-09T22:01:23+03:00"
draft = false
title = "Using jenkins dynamic plug-in for getting android devices"
type = "post"

+++
This is an interesting trick.
Recently a co-worker wanted to have a parameter in his jenkins build that should have the device id of one of the connected devices.

He did it manually for a while using a string parameter, but it got complicated when he got several devices connected and kept replacing them.

So he told me of [Dynamic Parameter Plug-in](https://wiki.jenkins-ci.org/display/JENKINS/Dynamic+Parameter+Plug-in) and that he wanted to use it to run ```adb devices```.
<!--more-->

I found some groovy code to run adb devices and the code used for the dynamic parameter is below:
{{< highlight groovy >}}
def list =['all']
['/usr/local/bin/adb', 'devices'].execute().text.eachLine { line ->
            def matcher = line =~ /^(.*)\tdevice/         
            if (matcher) {
                list << matcher[0][1]
            }
        }
list
{{< /highlight >}}

The line to notice is the second line which runs the command. Becouse jenkins has an empty environment variable it doesn't have usually ```adb``` command in the PATH.

The last line is part of the way the plug-in works which expects the values being returned.

I find this a very interesting trick to make your jenkins a bit more responsive to changing devices.