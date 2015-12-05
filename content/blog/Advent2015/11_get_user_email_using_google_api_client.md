+++
Description = ""
categories = []
date = "2015-12-05T02:57:04+02:00"
pubdate = "2015-12-11T08:00:00+02:00"
draft = false
title = "11 - get user email using google api client"
type = "post"

+++

Recently I had to use google APIs [again](https://github.com/srgrn/google-drive-trash-cleaner) and I really wanted to get the email address of the person that is using accessing the app.

Amazingly This simple task is not as clear as you would have believed. Eventually I found a way using a mix of ideas from the google plus api documantation and examples, with some pointers from stack overflow.
<!--more-->

So the basic script (used by a webapp) is 
{{< gist 0c6e9d8cb36860eaa422>}} 

Now the most important thing in this script is the preparation part where it specifies the scope variable.

```
OAUTH_SCOPE = ['email']
``` 

And the lines to actually get the email

``` 
user = user_service.get(userId='me').execute()
email = user['emails'][0]['value']
```

It is a bit annoying that you need to request the person email from the google plus service but since it works and is much easier than ask them to type it in again who am I to argue.