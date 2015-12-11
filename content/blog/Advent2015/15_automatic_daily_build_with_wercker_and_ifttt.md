+++
Description = ""
categories = []
date = "2015-11-30T22:35:51+02:00"
draft = true
title = "15_-_automatic_daily_build_with_wercker_and_ifttt"
type = "post"

+++

So you have use wercker for your build automation, and it is great it builds on every push.
And suddenly you have so many tests that running them all takes 4 hours, so you run only a small part of them on each commit. 

So now you want to schedule a build to run automatically every day and a specific hour. 

Luckily wercker has a very good API which also support building from API call. You can use a simple post call to https://app.wercker.com/api/v3/builds to run a build.

Inorder to do that you need to follow their guide which shows the following example:
```
curl  -H 'Content-Type: application/json' -H  'Authorization: Bearer YOURTOKEN' -X POST -d '{"applicationId": "YOURAPPID", "branch":"YOURBRANCH", "message":"SOME TEXT MESSAGE"}' https://app.wercker.com/api/v3/builds
```

Now the easiest way is to use cron, simply set it to run nightly and forget about it.
However sometimes you don't have a server with cron just idling around, so you can use online cron like mywebcron.com or cron-job.org and there are probably much more paid services.