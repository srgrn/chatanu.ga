+++
Description = "How I started the current blog"
date = "2015-07-24T16:28:54+03:00"
title = "Starting my blog"
type = "post"

+++

Well here goes another blog experiment.

this time it is a static blog, created using [hugo](gohugo.io) based on tricks learned from [npf.io](https://github.com/natefinch/npf).

Like each of the previous experiments instead of creating content I mess around with the technology.
So here is the first post on how this blog got created including some tips for free blog generation.

## Steps:
1. [get a new domain name.](#getdomain)
1. [Decide on site building method.](#choosestatic)
1. [find a place to host static files.](#findhost)
1. (optional) [create a github repo for the source of the blog.](#sourcecontrol)
1. [start messing around with the engine of choice.](#messingaround)
1. (optional) [automatic build and deployment based on the selected tools and host.](#autodeploy)


### <a name="getdomain"></a>1. Get a new domain name.

There are many ways to get a new domain name, the easiest one is to pay. 

I have several unused domains laying around but since a new one was needed.

A quick search found Dot.tk which gives away .TK domains, and from there [Freenom](http://www.freenom.com/) that offer .GA domains for free.

After a quick registration the domain chatanu.ga was registered (missplled chattanoo.ga which is proably still available) and after a couple of minutes I it with [cloudflare](https://www.cloudflare.com/) for DNS and since it gives caching for simple sites for free.

### <a name="choosestatic"></a>2. Decide on site building method.

Blogs can be created in many ways, hosted blogs, manual site crafting, cms systems, blog engines and probably even weirder things. 

Since simplicity was one of the main requirements I chose to create a static site and since this was supposed to be an experiment the chosen software was [Hugo](https://gohugo.io) - a static site generator written in go.


### <a name="findhost"></a>3. Find a place to host static files.

Since the blog is going to be a static site a place to store them would be nice as it is not really recommended to serve them from my own home PC.

There are many ways to host a site. for static sites you can use any externally available server. 

Dropbox and github pages are also very simple for that matter.

But this is as stated before an experiment and required something new.

After a quick search I found surge.sh which was simple enough and gave custom domains for free.

Following the guide at [http://surge.sh/help/adding-a-custom-domain] it was easy enough to add a CNAME and A to cloudflare and having it all up with the text "Hello world" in minutes.


### <a name="sourcecontrol"></a>4. Create a github repo for the source of the blog. 

This is an optional step to make it easier to edit from multiple machines.

if you don't have a github account now is the time to open one at [http://github.com]

so I created a new repo, and pushed the code from the next step into it.


### <a name="messingaround"></a>5. Start messing around with the engine of choice.

Starting with Hugo was not as easy as they show on their site, the way to understanding was looking on other people blogs code, like [npf.io](http://npf.io).

Eventually I understood that as always too much time is wasted, on the technology (setting it to work with integrations), the design (a bloog that is looking bad is not good but looks must be secondary to content), and other nonsense.

During this step the following was done:

* Creating a new archtype for blog 
* Added a new template for a single page for non blog items (so my about page will not have date)
* Copying the partials and index.html from the theme into the layout folder
* Changing the sidebar and the header with additional features (like adding font-awesome CSS)

Eventually after all of this messing around (about half a day) I finally started writing this post.

### <a name="autodeploy"></a>6. Automatic build and deployment based on the selected tools and host.

Well automatic builds and deploy is what I do for a living. so this is while not needed is a nice to have.

This step also splitted into several steps:
1. find a CI/CD online tool I haven't use before.
2. Learn how to use it.
3. Build.

I never used [wercker](https://wercker.com) before and it is using containers for the build which sounds interesting.

So I did a mistake and registered with github. Usually it is fine but since the wercker-cli requires login with a password and when you register with github you don't have one it slowed things down while I decided to work without the local build.

Any way another quick google search found how to build hugo on wercker and it worked within seconds.

Uploading to surge required actually reading the documentation. 
After reading the surge documentation as well and adding the required variables using the wercker web interface the final wercker.yml is looking like this:
```
box: nodesource/trusty
build:
  steps:
    - arjen/hugo-build@1.4.0

deploy:
  steps:
    - script:
      name: install surge
      code: npm install -g surge
    - script:
      name: upload site to surge
      code: |
        ls -l public/
        surge ./public/ chatanu.ga 
``` 

This last commit is actually automatically builds and deploys my blog.

I can edit it from any internet enabled computer.

This post will be expended with specifics about the code and commands at a later date.






