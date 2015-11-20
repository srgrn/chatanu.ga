+++
Description = ""
date = "2015-10-17T15:27:27+03:00"
draft = false
title = "Installing python-qpid-proton on OSX"
type = "post"
categories = ["tools"]
+++

For Azure event hubs you can use AMQP 1.0 protocol, and the recommended way is [Apache Qpid-proton](https://qpid.apache.org/proton/) and for python it has a module python-qpid-proton.

This is how I got it working.
<!--more-->
When running pip install on my mac laptop I got the following error:


> /private/var/folders/l3/yx63w2ln25vfmmj10vbn79wr0000gn/T/pip-build-875oabd8/python-qpid-proton/build/bundled/>qpid-proton/proton-c/src/ssl/openssl.c:44:10: fatal error: 'openssl/ssl.h' file not found
>    #include <openssl/ssl.h>
>             ^
>    1 error generated.
>    error: command 'clang' failed with exit status 1
>
>    ----------------------------------------
> Command "/Users/eranz/.virtualenvs/streams/bin/python3.5 -c "import setuptools, tokenize;__file__='/private/var/folders/l3/yx63w2ln25vfmmj10vbn79wr0000gn/T/pip-build-875oabd8/python-qpid-proton/setup.py';exec(compile(getattr(tokenize, 'open', open)(__file__).read().replace('\r\n', '\n'), __file__, 'exec'))" install --record /var/folders/l3/yx63w2ln25vfmmj10vbn79wr0000gn/T/pip-6oswqngq-record/install-record.txt --single-version-externally-managed --compile --install-headers /Users/eranz/.virtualenvs/streams/bin/../include/site/python3.5/python-qpid-proton" failed with error code 1 in /private/var/folders/l3/yx63w2ln25vfmmj10vbn79wr0000gn/T/pip-build-875oabd8/python-qpid-proton
>

which was annoying as I did install openssl through brew with  ```brew install openssl```.

The solution was much simpler than expected. Proably almost anyone already know it. adding openssl to the include path.

So the command was changed to:
```
export CFLAGS="-I/usr/local/opt/openssl/include"; pip install python-qpid-proton
```

Which added openssl allowing me to install proton.

And another related thought:

For the examples to work I have do have the config file from the examples folder of proton and export the path for the config with ```export PN_SASL_CONFIG_PATH=<config_folder>```