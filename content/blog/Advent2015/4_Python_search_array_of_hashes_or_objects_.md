+++
Description = ""
categories = []
date = "2015-12-04T08:00:00+02:00"
pubdate = "2015-12-04T08:00:00+02:00"
draft = false
title = "4 - python search list of hashes or objects "
type = "post"

+++

This is not a great tip.
It is something I seem to keep forgetting even after using it so many times.

Finding a specific object/hash in a python list by attribute/value
<!--more-->

```specific = [x for x in hashlist if x['somefield'] == 'searchvalue']```

This returns an array of hashes matching the specific field.

While this proably shows you needed to use a hash instead of a list with some unique key that can be used to select sometimes we work with old code and must fit to it instead of the other way around.