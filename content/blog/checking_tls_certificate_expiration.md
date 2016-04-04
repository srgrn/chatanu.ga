+++
Description = ""
categories = ["coding"]
date = "2016-04-04T14:26:54+03:00"
draft = false
title = "Checking TLS certificate expiration"
type = "post"

+++

So it was a very long hiatus but eventually I manged to have another post.

I had an incident a few days back where our wild card certificate expired and as always for such problems it happened on Thursday evening (for those who work Fridays it is the same as Friday evening).

This caused a lot of problems which could have been prevented if I had set up monitoring in advance.

Since it is fun to try to do stuff yourself I decided after setting a couple of checks and alerts to try to create my own tool to check the certificate expiration. 

While it would have been easy to use python, a script such as this would have to have dependencies on OpenSSL or similar in the least.

So I decided to have another try at golang, as this was supposed to be a simple CLI tool with very simple usage.

Since I usually use python there were a few surprises along the way.
The first came when discovering that while I can easily get the certificate for the site, and even get the end date as a time object for some reason the Duration struct doesn't have a days field, this in itself is not a real problem a simple calculation of ```time.Duration(24) * time.Hour``` gets you a day worth of time, it was a bit annoying.

the second thing was that os.exit according to the documentation is stopping the entire program, and the correct usage is to do a defer at the beginning of the main method.
{{< highlight go >}}
    code := 0
    defer func() {
        os.Exit(code)
    }()
{{< /highlight >}}
But over all it was a fun little experiment. One which was easy enough to finish in less than an hour and another hour for making it look less like a pulled together script and more like a simple tool. 

so the final result is at https://github.com/srgrn/tls_expiry_checker and the explanation is as simple to use as running:

```go get -u github.com/srgrn/tls_expiry_checker```

```tls_expiry_checker -url=<some host without http>```

this will use defaults to check if the certificate expires soon and if it does it will fail with an exit code of 1.

so it can be used by any other monitoring tool that checks exit codes.

the great thing about golang in this case is that it creates a static binary, and I use only the standard library without external dependencies.

If you try it out and find issues please let me know by open a issue in the repo.


