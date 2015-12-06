+++
Description = ""
categories = ['Advent']
date = "2015-12-08T08:00:00+02:00"
pubdate = "2015-12-08T08:00:00+02:00"
draft = false
title = "8 - simple access blocker for azure website"
type = "post"

+++

Well this is not a really new tip, and probably known by anyone that worked with IIS8 for a while.

When creating an azure webapp there are cases you want to block access by IP, however you don't want to actually code it into your app code.

I found the following snippet that you can add to your web.config

```
<security>
    <ipSecurity allowUnlisted="false" denyAction="NotFound">
        <add allowed="true" ipAddress="X.X.X.X" subnetMask="255.255.255.0" />
    </ipSecurity>
</security>
```

paste this snippet into your web.config inside the system.webServer tag and replace the x.x.x.x with the IP you want to whitelist. 

This makes for a very interesting affect, where you can replace the denyAction with a page that looks like azure empty site page and let people think the site is empty.