+++
Description = ""
categories = []
date = "2015-12-05T08:00:00+02:00"
pubdate = "2015-12-05T08:00:00+02:00"
draft = false
title = "5 - dockerizing my python script"
type = "post"

+++

Sometimes you just want to play with new technologies and this time it was docker.

Several times I had used a docker containers that run an app, a good example is [sitespeed.io](https://www.sitespeed.io/). Instead of installing all their dependencies you can simply run the docker container.

I wanted to try it on my own and this is the short route to dockerizing a python script.
<!--more-->

So there is this script at [grab_packet.py](https://github.com/srgrn/grab_packt.py) while it is a simple script it has a few dependencies and it requires python. Using docker allows me to require only docker for the script to work.

The docker file is:
```
FROM alpine:3.2
MAINTAINER Eran Zimbler <eran@zimbler.net>

RUN apk --update add python libxml2-dev libxslt-dev
RUN apk --update add --virtual build-dependencies py-pip python-dev build-base  && pip install virtualenv
  
WORKDIR /src
COPY . /src

RUN ln -s /usr/include/libxml2/libxml /usr/include/libxml
RUN virtualenv env && env/bin/pip install -r ./requirements.txt
RUN apk del build-dependencies && rm -rf /var/cache/apk/*

CMD ["env/bin/python", "add_to_lib.py"]
```

and is separated into the run commands used for building the container and the CMD for running the container.

The FROM says to use the alpine linux 3.2 docker container as base - this is a very small linux distribution that is great for containers.

The first RUN command install python and some dependencies into the machine. The second installs other required parts for preparing the container that shouldn't be part of it after they have finished running.

Than copying the script and all other source into the /src folder,
and some more preparation for libxml to support python module requirements.

A new environment is being created and the script requirements are being installed into it.
and lastly unneeded files are being removed to keep the container small.

During the run it will simply use the python from the virtualenv enviroment to run the main script file.

This setup took a bit of trial and error to get it working, and some will say it is too complicated for such a simple script but you can actually replace the first RUN and the CMD line to fit any script to make it easily a docker app.

Hope it helps.
