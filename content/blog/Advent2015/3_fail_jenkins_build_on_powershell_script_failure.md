+++
Description = ""
categories = ['Advent']
date = "2015-12-03T08:00:00+02:00"
pubdate = "2015-12-03T08:00:00+02:00"
draft = false
title = "3 - fail jenkins build on powershell script failure"
type = "post"

+++

So we use jenkins at work, and we use powershell scripts for some of our build steps.

We had this slight little problem that sometimes the powershell script failed. 
<!--more-->
Since the script was written with care it had a try catch clause looking something like this:

{{< highlight powershell >}}
try {
    # some code
}
catch [System.Exception] {
    Write-Host $_.Exception.ToString()
    exit 1
}
{{< /highlight >}}

I called the powershell scripts using the simple method 
```powershell scriptname paramaters```
However since the script ran inside a batch command step it hadn't failed the job.
This happens due to the way the powershell command pass the error value back to the caller.

There are some great posts on the internet explaining the problem but eventually the real valid solution (after trying many including the powershell plugin) was using the batch file method as shown at [http://joshua.poehls.me/2012/powershell-script-module-boilerplate/#bat-wrapper].

is simply requires creating a batch file with the name of my script but with a .bat 

so if my script is called jenkins_subtask.ps1 my batch is called jenkins_subtask.bat and it gets all the same paramaters from before.

below is the batch file again to make it easier to find. PLEASE note that I did not write it originally.
{{< highlight batch >}}
:: script.bat

@ECHO OFF
PowerShell.exe -NoProfile -NonInteractive -ExecutionPolicy unrestricted -Command "& %~d0%~p0%~n0.ps1" %*
EXIT /B %errorlevel%
{{< /highlight >}}

Hope it helps


