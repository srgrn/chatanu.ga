+++
Description = ""
date = "2015-07-28T21:11:18+03:00"
draft = false
title = "How to create a sublime_text plug-in"
type = "post"

+++

When starting to blog using [hugo](gohugo.io) the first thing you learn is to create posts.

However those posts get the date from the time you started writing them and not the time you want to publish them. This might be good for some people but since I had many titles for posts, some starter ideas and not enough body so I had to change the date when the post was ready. 

After doing this manually several times it was time for automation, and since my text editor is Sublime a plug-in was required.
<!--more-->

This was a great time to learn how to make simple plug-ins. There are several guides on-line on how to create a plug-in for [SublimeText](http://www.sublimetext.com), but those I found while being good and interesting didn't have the whole picture. Below is my own take on a sublime text plug-in tutorial.

Before this tutorial starts a quick note:
Sublime text has three types of commands

1. TextCommand - Works on the current view (you might refer to it as buffer or file or tab)
2. WindowCommand - Works on the current window. this means you can access the current running view or create new ones.
3. ApplicationCommand - Not sure exactly it doesn't seem to be documented, and I haven't searched enough for a plug-in that has such command

This guide is for TextCommand which works on current buffer.

The code for my plugin is in https://github.com/srgrn/HugoHelper

Step 1 - Structure
==============

The first thing is to find the plug-in folder:
Open Sublime text.
press Super+Shift+P (Ctrl+Shift+P) to open the command palette.
Search for "Preferences: Browse Packages" ( simply type "browse packages").
in the folder that opened create a new folder with your plug-in name. In this case it was **HugoHelper**
{{< figure src="/media/Plugin_NewFolder.png" title="Create New Folder In Packages" >}}

The most important file that will be in that directory is the source of the plug-in. Sublime will load as plug-in all .py files in the folder. 
The recommended best practice seems to be having your main file (the one that will do the work) called the same name as you plug-in, in my case it was "HugoHelper.py"

Now you need to create files for specific additions to your plug-in.

For Keyboard shortcuts you'll need .sublime-keymap file (one for each platform).

So for all platforms (OSX, Windows and Linux) you'll have:

* Default (OSX).sublime-keymap
* Default (Windows).sublime-keymap
* Default (Linux).sublime-keymap

For adding your commands to the command palette (Ctrl+P/Super+P) you'll need a .sublime-commands the name of the file doesn't matter or so it seems to me but I found it easier to use 

* Default.sublime-commands

The last optional file is a README.md file. this is great if you mean to share your plug-in on github as github automatically shows README.md files under the file list.

So the structure you now have will probably be similar to:

```
Packages
└── HugoHelper
    ├── HugoHelper.py
    ├── Default (OSX).sublime-keymap
    ├── Default (Window).sublime-keymap
    ├── Default (Linux).sublime-keymap
    ├── Default.sublime-commands
    └── README.md
```
Step 2 - Start writing your plug-in.
===============

The base supplied by sublime when creating a new plug-in is pretty simple but it is clear enough.

{{< highlight python >}}

import sublime, sublime_plugin

class ExampleCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        self.view.insert(edit, 0, "Hello, World!")

{{< /highlight >}}

This command will insert the text "Hello, World!" at the beginning of the current open view.
the way to run it is by opening the console (ctrl+`) and typing 
```
view.run_command('example')
```
{{< figure src="/media/Plugin_ConsoleRunExample.png" title="Run Example command" >}}

Now reading the documantation you learn that sublime will remove the Command from the class name and will convert it to camel case and that will be the name of the command.

So if you call your class "HelloWorldPrintCommand" your command will be called "hello_world_print".

lets write a command to add Hugo summary break in the current line.

So starting from the example code all we need is to replace the "0" in the insert to the beginning of current line.

getting the starting point of current line is not that complicated according to the [sublime API](https://www.sublimetext.com/docs/3/api_reference.html) and the duplicate line example we can do the following 

{{< highlight python >}}

import sublime, sublime_plugin
class InsertSummaryBreakCommand(sublime_plugin.TextCommand):
    def run(self, edit):
        for region in self.view.sel():
            if region.empty():
                line = self.view.line(region)
                self.view.insert(edit,line.begin(), '<!--more-->\n')

{{< /highlight >}}

While a bit more complicated the first line is getting all regions (sublime concept for interesting parts of buffer) and sel() is a reference to the selection (which means the curser when nothing is selected).

The if is used to remove all regions that are not the curser - because the curser is of size 0.

Than we use the line() function to get a new region that starts at the beginning of the line.

The last line is the same insert command with the addition of line.begin(), which is the start of the region (text wise).

This command can be used as 

```
view.run_command('insert_summary_break')
```

Step 3 - Making it easily accessible.
===============

Now the command works but in order to really make it useful it should be accessible through the command palette.

So in the file Default.sublime-commands should be a reference to it.

the sublime-commands file is a JSON array of commands each command has several properties:

* caption - the text you will see in the command palette.
* command - the name of the command it will run.
* args - if the command has any arguments.

In this case the array will look like:

{{< highlight json >}}
[
    { 
      "caption": "Hugo Add Summary break",
      "command": "insert_summary_break" 
    }
]
{{< /highlight >}}

Now we also want a keyboard shortcut to make it a bit quicker. This is done in the Default (< OS >).sublime-keys.

Like the sublime-commands it is a JSON array with each element having:

* keys - the keys to press which can be an array of combinations. for OSX the sublime key is usually super, for windows and Linux it is usually ctrl.
* command - the command to run.

I chose cmd+b followed by cmd+c. so the result for OSX is:

{{< highlight json >}}
[
    {  
      "keys": ["super+b", "super+c"], 
      "command": "hugo_helper_insert_summary_break" 
    }
]
{{< /highlight >}}

Step 4 - Repeat.
=============

Now is the time to write some more commands.

the final result of my plug-in is:

{{< highlight python>}}
import sublime
import sublime_plugin
from datetime import datetime


class HugoHelperPublishPostCommand(sublime_plugin.TextCommand):

    def set_draft_status(self, edit, target):
        region = self.view.find('draft\s=\s.*$', 0)
        if not region.empty():
            self.view.replace(edit, region, 'draft = ' + target)

    def set_date(self, edit):
        region = self.view.find('date\s=\s".*"$', 0)
        if not region.empty():
            now = datetime.now()
            current = self.view.substr(region)
            tz = '+' + current.split('+')[1]
            print (now)
            self.view.replace(edit, region, 'date = "' + now.strftime("%Y-%m-%dT%H:%M:%S") + tz)

    def run(self, edit):
        self.set_draft_status(edit, 'false')
        self.set_date(edit)


class HugoHelperInsertSummaryBreakCommand(sublime_plugin.TextCommand):

    def run(self, edit):
        for region in self.view.sel():
            if region.empty():
                line = self.view.line(region)
                self.view.insert(edit,line.begin(), '<!--more-->\n')
{{< /highlight >}}

Which has two commands which can use a bit more refactoring. 
The publish_post command also uses find to get a specific location in the view and substr to get the text from a given region. and both are updated in the README and in the sublime-commands and sublime-keys.

If I made a mistake somewhere or can improve this post let me know in the comments. 

Now I'm pressing cmd+b, cmd+p and than save this for publishing.