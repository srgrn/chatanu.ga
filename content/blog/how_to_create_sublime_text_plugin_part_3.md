+++
Description = ""
date = "2015-10-04T12:33:05+03:00"
draft = false
title = "How to create sublime text plugin part 3"
type = "post"

+++

So I updated my laptop (macbook pro from work) to the latest version of OSX, El Capitan.
This casued my simple HugoHelper plugin to stop working correctly as it couldn't find the Hugo command.
<!--more-->

After a few commands in the console:

```
>>> os.environ.get('PATH')
'/usr/bin:/bin:/usr/sbin:/sbin'
```
the reason become clear, hugo was installed in /usr/local/bin, which was missing from the path when sublime tried to run it.

So a settings file to allow the user to specify the path to the hugo executable was required.

First thing was to see how I get the settings file, easily enough it is in the [API docs](https://www.sublimetext.com/docs/3/api_reference.html) as load_settings .

They also specify in the docs that you need to load it in advance as it is an async operation.
So I added a new methood to the main HugoHelper.py file:

{{< highlight python >}} 
def plugin_loaded():
    print('HugoHelper plugin_loaded')
    settings = sublime.load_settings('Hugo Helper.sublime-settings')
{{< /highlight >}}     

Notice that the settings file name has a space in it, for some yet unknown reason it failed to work without it.

Than the only other change was to load the settings in the on_done method of the HugoHelperAddContentCommand class.
so instead of 

{{< highlight python >}} 
args = ["hugo", "new", target]
{{< /highlight >}}

I now have:

{{< highlight python >}} 
settings = sublime.load_settings('Hugo Helper.sublime-settings')
hugoPath = settings.get('HugoPath','hugo')
args = [hugoPath, "new", target]
{{< /highlight >}}

All that is missing from this description is the settings file itself, which is a basic json file with one property in it:

{{< highlight json >}} 
{
	"HugoPath": "/usr/local/bin/hugo"
}
{{< /highlight >}}


As always hope it helps.


