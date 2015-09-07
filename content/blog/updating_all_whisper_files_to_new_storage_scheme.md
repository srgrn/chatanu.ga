+++
Description = ""
date = "2015-09-07T10:45:16+03:00"
draft = false
title = "Updating all whisper files to new storage scheme"
type = "post"

+++

So I installed new graphite instance, and started it up. This would have been great if I remembered to set storage-schemes.conf before it started to receive data. 

After a couple of days one of the developers working and using the data graphite collected told me it doesn't have graphs with data older than a day. This was weird as I remembered setting the storage scheme to more than that. After a quick check using whisper-info.py and reading questions, I found out that graphite doesn't update whisper files that already exist [see the first answer](https://answers.launchpad.net/graphite/+question/152701).
<!--more-->

So now I was in a problem, happily enough there is an easy bash loop to assist with updating all the files.
```for file in $(find $STORAGE_DIR -name '*.wsp'); do echo $file; sudo whisper-resize.py $file 1s:1h 10s:1d 30s:7d 5m:30d 10m:1y ;done```.

Where STORAGE_DIR is where the whisper root is (in my case /opt/graphite/storage/whisper/), and the policies are directly from my storage-schemes.conf file but seperated by spaces instead of ','.

This was an interesting lesson to learn.
