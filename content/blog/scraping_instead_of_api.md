+++
Description = ""
date = "2015-08-03T17:06:36+03:00"
draft = false
title = "scraping_instead_of_api"
type = "post"

+++

There are cases when you need to automate a service that doesn't have an API, or have an API but it is missing some required features. In such cases and when the case is clear enough you usually turn to scraping.

<!--more-->
Scraping can be done in many ways using many tools. Some like [phantomJS](http://phantomjs.org/) and its kind allowing you to automate a browser engine. Others are ignoring js and using simple http requests.

Now at my day job were using [Hockeyapp](http://hockeyapp.net/) for our QA builds and while the service is a great one, their API is lacking some of the functionality. 

We have many apps, and sometimes it is required to share an app with external QA people. For that Hockeyapp has a teams feature allowing us to create teams and give them specific permissions to apps. however while you can add an app to a team using the API, you can't create a new team. 

So I created my own Hockeyapp python module (it will be released after some refactoring). I used [requests](http://docs.python-requests.org/en/latest/) and its ability to support sessions to login to hockeyapp and than simply fill in the forms and submit them. 

When the original code was created all that you needed to do for login was to fill in the form with the relevant data and than keep using that session.

The code looked something like:

{{< highlight python >}}
def login(self,username,password)
    session = requests.session()
    login_data = {
        'user[email]': username,
        'user[password]': password,
        'submit': 'commit',
        }
    r = session.post(HA_API_SIGNIN, data=login_data)
    return session
{{< /highlight >}}

This worked well until they changed their login form. The change was very minor it they added simple authentication token to the page, and when posting the form you needed the token as well. Ofcourse since http is stateless by design, and since their login page return HTTP status 200 after login without a token it took some tries to understand where the failure was.

So after changing the code to include the token a new method was created:
{{< highlight python >}}
def get_csrf_token(url,session):
    result = session.get(url)
    if result.status_code != 200:
        raise ValueError("Can't get page.")
    tree = html.fromstring(result.text)
    meta = tree.xpath('//meta[@name="csrf-token"]')
    print meta
    token = meta[0].get('content')
    return token
{{< /highlight >}}
 
The login method was changed to get the missing element:

{{< highlight python >}}
def login(self,username,password)
    session = requests.session()
    login_data = {
        'user[email]': username,
        'user[password]': password,
        'submit': 'commit',
        }
    token = get_csrf_token(HA_API_SIGNIN,session)
    login_data['authenticity_token'] = token
    r = session.post(HA_API_SIGNIN, data=login_data)
    return session
{{< /highlight >}}

Another great use of scraping as an API would be [Spaceship](https://github.com/fastlane/spaceship) which is the base for the amazing [Fastlane](https://fastlane.tools/) tools. 

it uses http requests session cookies and a lot of hard work to allow you to use the apple developer portal easily using code instead of manually pressing the same buttons again and again.

Using spaceship has helped me to check, renew and download many expired profiles.

To conclude this post, scraping is fun but not always easy way of automating boring clicks.

