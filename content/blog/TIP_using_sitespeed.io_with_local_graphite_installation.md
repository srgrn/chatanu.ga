+++
Description = ""
date = "2015-09-19T22:30:07+03:00"
draft = false
title = "Tip using sitespeed.io with local graphite installation"
type = "post"
categories = ["tools"]
+++

After installing graphite on a machine as shown in a [previous post]({{< ref "installing_graphite_on_ubuntu_azure.md" >}}) I found out about [sitespeed.io](http://sitespeed.io) (which if you have a webapp/website you need to check).

Sitespeed.io have integration with graphite and they have a docker container which makes it easy to run. Now connecting between two docker containers is easy you use the `--link` flag and it works.
<!--more-->

So if I had graphite in a container with the name graphite the command to run sitespeed.io would be something like:

```
docker run --link=graphite:graphite --rm -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io sitespeed.io --graphiteHost graphite --graphiteNamespace sitespeed.io.mobile --profile mobile -b firefox -u <url>
```

This is easy, but graphite in my case was installed directly on the machine that ran this container, and it the graphite port (2003) was not open to external connections. 

After reading for a while and scouring stack overflow the solution was found `--add-host="name:ip"` this little command allows you to add hostnames into the /etc/hosts file inside the container, this is great but the container doesn't recognizes the machine internal IP, and as specified before the external access is blocked.

Again searching, reading, and scouring and finally asking for advice from a friend. It seems that docker sets an IP for the docker bridge device which can be used to communicate with the host machine. The docker bridge device default name is docker0 (considering only one docker bridge device that was automatically created), and its IP is usually also the default.

Now with some bash magic I got the following commands:
```
alias docker_ip='ip -f inet -o addr show docker0|cut -d\  -f 7 | cut -d/ -f 1'
```
This allows me to use the docker_ip command to get the IP when I need, it can also be modified to support changeable interfaces with parameters.

Than I can finally run sitespeed.ip in docker and it will reach my locally installed graphite:
```
docker run --add-host=graphite:$(docker_ip) --rm -v "$(pwd)":/sitespeed.io sitespeedio/sitespeed.io sitespeed.io --graphiteHost graphite --graphiteNamespace sitespeed.io.mobile --profile mobile -b firefox -u <url>
```

This was annoying to find out but it will now stay on the internet forever and ever,''

