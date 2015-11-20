+++
Description = ""
date = "2015-08-05T22:24:24+03:00"
draft = false
title = "Finding next file number"
type = "post"
categories = ["coding"]
+++

Yesterday I encountered a tiny problem. 
When creating a file using the ```hugo new``` command it doesn't create the file if it already exists.

This is not really a problem of the code, as you are not supposed to have multiple posts with the same file name, but since I created a plugin that runs the command for me it was required.
<!--more-->

This simple problem became annoyingly complicated. The first step was stackoverflow.com, but the solutions there were not exactly what I wanted, eventually after half a day of pondering, I went back to my Perl roots and used a regex, creating the following solution.

{{< highlight python >}}

index = 1
import re
while os.path.exists(os.path.join(dirpath, name)):
    exp = r'_\d*.md$'
    if index == 1:
        exp = r'.md$'
    name = re.sub(exp, '_' + str(index) + '.md', name)
    index += 1
    
{{< /highlight >}}

This is working only on .md files but it works fine. it can be easily changed to extract the ext part using os.path.splitext method.

