+++
Description = ""
categories = ['Advent']
date = "2015-12-09T08:00:00+02:00"
pubdate = "2015-12-09T08:00:00+02:00"
draft = true
title = "9_simple_http_auth_for_bottle_app"
type = "post"

+++

So this is another simple trick, but one that might save someone some minutes.

in a bottle.py app you can add authentication by adding the auth_basic module from bottle

so you add the following parts:

{{< highlight python >}}
from bottle import auth_basic

def check_credentials(user, pw):
    username = "someusername"
    password = "somepassword"
    if pw == password and user == username:
        return True
    return False
{{< /highlight >}}

Than for each route that requires authentication you can add a decorator ```@auth_basic(check_credentials)```.

This is a very simple function however you can add in this function accessing DB for validating username or hashing the username and password togather to match them to some predefined value.

I used this with a single user service where the username and password were environment variables that were loaded by the web server.

it is easy and useful for mini test services that need to be only a bit protected.