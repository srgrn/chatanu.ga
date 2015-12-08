+++
Description = ""
categories = []
date = "2015-12-11T08:00:00+02:00"
pubdate = "2015-12-11T08:00:00+02:00"
draft = false
title = "11 - Guest Post Evading Antiviruses for fun and profit"
author = "Meitar Keren"
type = "post"

+++

Writing 24 posts for an advent calender is hard on your own. That's why you can ask friends for help.

The post below was written by *Meitar Keren* the CTO at Imali Media.

So, you want to know about the dark side?

Anti-virus companies are like the Jedi, they try to protect your computer, but the dark side is stronger! or is it?

The mission to protect the computer is a hard one, from zero day exploits to many different viruses that are being published every day, not to mention the average computer user that somehow manages to download and install every piece of sh*ty software.

I work in an Ad-tech company, we're really trying our best to find solutions that will give the user actual value and also make money for our clients. The problem is that some of our business is based on installer monetization. In installer monetization, when the user wants to install a software such as "VLC player", we offer him different kinds of programs that he can choose to install or not to install. Some of those are nice, some of those are sh*ty. They're not actually a virus, but the Anti-virus companies like to refer to them as "Potentially Unwanted Software". They put out a big warning, immediately block us and all our invested money in buying this installation goes to drain.

Since currently there is no way to contact the Anti-virus companies and regulate this field, make sure that all the programs and advertising adhere to a specific guidelines that benefits both the users and the Ad-tech companies and due to the aggressive behavior of the Antiviruses (For example some of our offers are Antiviruses themselves, but they block our installer anyway), Ad-tech companies had to react in aggressive behavior and Evade Antiviruses in order to survive or perish, which some of them did.

And now for the technical stuff. I'll list some of the Antiviruses methods of protection and how to get passed them.

Antiviruses have several detection mechanisms:

1. Physical signature of the file - They lock on specific patterns in the file, a string, a code, something that is unique enough to differentiate the file from another regular file.
2. Sandbox Execution - They run the program in an isolated environment to check what it does, if it appears malicious they kill it.
3. Real runtime behavior - They monitor what the program does on your computer and if it appears suspicious they kill it.

Let's start with the first one, you could use/create a packer such as uax. This method means that there"s a stub file and a payload file which contains the real file that you want to execute. The real file is compressed and encrypted. When the file is executed, the code in the stub extracts the real file and runs it. The disadvantage of this method is that most Antiviruses today knows most of the packers in the market and knows how to extract the real file for scanning or just notice that the file is packed and marks it as suspicious. If you have the technical skills of creating your own packer it would be best, but still they could lock on your stub code or just notice that the file looks weird because it"s packed. An amazing work I read about packers is here: https://www.blackhat.com/docs/us-14/materials/us-14-Mesbahi-One-Packer-To-Rule-Them-All-WP.pdf.

Another simpler solution that works it to create a script that creates random code with random strings to your code, this will give something for the Antiviruses to bite on that you can easily change when detected, this way you won't have to change your real important code to avoid being detected.
Another way they detect you is if you import certain DLLs and functions such as wininet for downloading or “ShellExecute” from shell32.dll. They can easily see all those in your import symbols table. What you should do in order to avoid that is to dynamically load the dll and call the function, for example:

{{< highlight c >}}
DWORD WINAPI MyShellExecuteExW( SHELLEXECUTEINFOW *pExecInfo ) 
{
   HMODULE winmmDLL = LoadLibraryW(L"Shell32.dll");

    if (!winmmDLL) 
    {

        return false;
    }

    typedef BOOL (WINAPI *ShellExecuteExW_fn)(
        _Inout_ SHELLEXECUTEINFOW *pExecInfo
    );

    ShellExecuteExW_fn pfnShellExecuteExWProc = (ShellExecuteExW_fn)GetProcAddress(winmmDLL, L"ShellExecuteExW");

    if (!pfnShellExecuteExWProc) 
    {

        FreeLibrary(winmmDLL);
        return false;
    }

    return (*pfnShellExecuteExWProc)(pExecInfo);
}
{{< /highlight >}}

Of course in my real code all the strings used are encrypted and decrypted only during run-time to avoid off-line scanning.

The second one is hard, they run your code inside their sandbox, this way even if you dynamically called ShellExecute, they'll catch on it, no matter how encrypted or obfuscated your code is.

Here you must detect in your code that you're running from a sandbox and create an innocent code to execute for the Anti-virus to think that you're a nice guy/girl. What you could do for example is contact an outside server and expect a specific response. Because you're running from a sandbox the Anti-virus won't let you get outside access and this will result in you knowing you're in a sandbox. There are several more tricks such as loading a non-existing dll, and if you manage to somehow load that fake dll you know it's a sandbox, for example:

{{< highlight c >}}
HMODULE winmmDLL = LoadLibraryW("blablablabla.dll");
if (winmmDLL != NULL)
   return true; //IT'S A SANDBOX!!!
{{< /highlight >}}

The third one is the hardest because here you cannot fake, they sometimes lock on you if your program contacts certain URLs, so you have to keep changing those. If you pass the first 2 stages of detection you might have a chance to execute a code that can silence the Anti-virus. I have found it myself but have not used it since it's too aggressive on my eyes. What I can suggest here is just don't be too obvious in your actions and try to avoid external communications as much as possible.

For every stage here there are some more tricks that I found which are unique and I don't want to publish from obvious reasons :)

There's another important message that I wanted to convey before finishing. When you're experimenting with AV evading you can crash your code on purpose in the beginning.
Don't use ExitProcess, crash it:

{{< highlight c >}}
int *a = NULL;
*a = 666;
or
int a = 0;
int b = 10/a;
{{< /highlight >}}

If you're still being detected, the AV catches your file physically (the first method). Once you're no  longer flagged when you crash your software you can remove the crash code and then move to avoid the sandbox part.

Hope you've enjoyed this little preview to the dark side, but a word of caution my friend: "Once you start down the dark path, forever will it dominate your destiny, consume you it will."
