+++
Description = ""
categories = ["general"]
date = "2016-05-03T22:31:58+03:00"
draft = false
title = "Azure AD weird fact"
type = "post"

+++

Azure Active Directory is an amazing tool, it is also a mandatory tool when working with azure.
For example for some of the rest API's you now need to use a Service principal which can only be created through azure AD or use an account that is not a MS account (which means it was created through AD on azure or synced to it).
<!--more-->

However I recently found out a very weird fact, If you create an AD only you can see it, and by see it I mean in the Azure portal AD page. Users in the AD can also see it if they are defined as admins.

This is not the weirdest thing, apparently every account by definition is created with an AD automatically. This is not a problem but add to it the previous fact of the AD being invisible and you get a weird situation if the person that created the account is not the one responsible for managing it.

For example if imagine the situation where the person that created the account is on the finance team but the service admin is on the RND, now the operations team wants to monitor or to use azure automation for automated tasks. They need a Service Principal from an AD that they can't even see. 

This is a very weird issue with azure, and the most funny thing is that for some reason it doesn't add the AD to the list even after using the process defined by MS to allow it. 
