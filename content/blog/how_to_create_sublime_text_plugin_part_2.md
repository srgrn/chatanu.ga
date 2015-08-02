+++
Description = ""
date = "2015-07-31T21:54:03+03:00"
draft = true
title = "how_to_create_sublime_text_plugin_part_2"
type = "post"

+++

The previous post [How to create a sublime_text plug-in](https://chatanu.ga/2015/07/how_to_create_sublime_text_plugin/) The subject was how to start creating TextCommands for sublime text and how to have them as keyboard shortcuts.

This post is about adding running external process and using the sidebar.
<!--more-->

So the plugin from the previous post can now help me preparing my post for publishing and add the summary break. 

Now I needed an easy way to create a new post. Now in hugo you can simply write a new .md file in the content folder, but running the ```hugo new``` command will also add front matter based on archtypes and path.

So some code.

First an interesting tidbit. you can open the sublime.py and sublime_plugin.py in the program folder to look on all options of those classes, this with the API documantation is a bit helping to understand whats going on.

In this post i actually analayze the code. To be perfectly honest some parts are based on code I saw in SideBar enhancements, OmniSharp and others.

{{< highlight python >}} 
class HugoHelperAddContentCommand(sublime_plugin.WindowCommand):

    def run(self, paths=[], name=""):
        import functools
        window = sublime.active_window()
        window.run_command('hide_panel')
        window.show_input_panel("post path:", name, functools.partial(self.on_done, paths), None, None)

    def on_done(self, paths, name):
        path = None
        cwd = None
        if name == "" or name is None:
            print ("You must supply a name")
            return
        if len(paths) > 0 and DEFAULT_CONTENTS_DIR in paths[0]:
            splitted_paths = paths[0].split(os.path.sep)
            path = os.path.join("", *splitted_paths[splitted_paths.index(DEFAULT_CONTENTS_DIR) + 1:])
            cwd = os.path.join("/", *splitted_paths[:splitted_paths.index(DEFAULT_CONTENTS_DIR)])
        if not name.endswith(".md"):
            name += ".md"
        import subprocess
        target = os.path.join(path, name)
        args = ["hugo", "new", target]
        print (args, cwd)
        subprocess.Popen(args, cwd=cwd)
        return
{{< /highlight >}}

First thing was to create a new command class 
{{< highlight python >}}
class HugoHelperAddContentCommand(sublime_plugin.WindowCommand):
{{< /highlight >}}

This class has a run method, which receives two parameters: paths and name.
This is because this command is supposed to be called from the sidebar which gives the path to the folder and the name of the file.

Than the run method uses the sublime active window to show a input panel. 
{{< highlight python >}}
window.show_input_panel("post path:", name, functools.partial(self.on_done, paths), None, None)
{{< /highlight >}}

the show input panel requires as shown in the API docs requires caption, initial text, and 3 functions that expects a single argument. Since we want the path as well the use of functools.partial is building a new function wrapper with the paths parameter already available.

All the code so far was to create a input panel for file name and send it to the on_done method.

Since this command is supposed to be called from the sidebar it must receive a value. Than it starts to prepare the external command parameters. 

The Hugo command is fast which allows using Popen directly without the use of threads it will be short and will not be felt. if the command might take more than a second it is recommended to use threads to prevent sublime from hanging.

After getting the path and the working directory (basically removing everything up to content which is Hugo default), and appending ".md" to the file name sublime will run the command ```hugo new path/name.md``` and Hugo will create the file.

Now that we have the command we need to add it to the sidebar.

Like before we need a file to let sublime know we want to add this command, for the sidebar it is called: ```Side Bar.sublime-menu```.

Like the other files to define commands it is a JSON array, with objects defining the commands.
However this time I had to specify the args property which takes a variable names paths.

{{< highlight json >}}
[
    {
        "caption": "New Hugo Post Here",
        "id": "New Post Here",
        "command": "hugo_helper_add_content",
        "args": {"paths": []}
    }
]
{{< /highlight >}}

It was hard finding all this information and most of it came out of checking how other plug-ins were written. I hope that it will help other people to create their own sublime_text plug-ins.

If you are looking for my plug-in it is available at: https://github.com/srgrn/HugoHelper


