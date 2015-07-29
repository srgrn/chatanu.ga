+++
Description = ""
date = "2015-07-29T15:28:01+03:00"
draft = false
title = "Post blog updates to twitter with IFTTT for hugo"
type = "post"

+++

The Hugo blog engine automatically creates rss feed for your site. 
Which means you can easily use IFTTT to tweet about your posts.
<!--more-->

The Default feed is at < YOUR URL >/index.xml and contain the entire content of your posts. This is a problem as it means people will not come to the site and will miss out on all the other amazing posts.

The index.xml file like all other files can be controled from the layouts folder and it looks for rss.xml. Using the following template is replacing the whole body of the post with the summary and adding a read more link to the post

{{< highlight html >}}
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
      <title>{{ .Site.Title }}</title>
      <generator uri="https://hugo.spf13.com">Hugo</generator>
    <link>{{ .Permalink }}</link>
    {{ with .Site.LanguageCode }}<language>{{.}}</language>{{end}}
    {{ with .Site.Author.name }}<author>{{.}}</author>{{end}}
    {{ if .Site.Copyright }}<copyright>{{ .Date.Format "2006"}} {{.Site.Copyright}}</copyright>{{end}}
    <updated>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 MST" }}</updated>
    {{ range first 15 .Data.Pages }}
    {{if eq .Type "post" }}
    <item>
      <title>{{ .Title }}</title>
      <link>{{ .Permalink }}</link>
      <pubDate>{{ .Date.Format "Mon, 02 Jan 2006 15:04:05 MST" }}</pubDate>
      {{with .Site.Author.name}}<author>{{.}}</author>{{end}}
      <guid>{{ .Permalink }}</guid>
      <description>{{ .Summary | html }}
      {{ if .Truncated }}
      {{ "<a href=\"" | html }}{{ .Permalink }}{{ "\">Read More…</a>" | html }}
      {{end}}
      </description>
    </item>
    {{end}}
    {{ end }}
  </channel>
</rss>
{{< /highlight >}}

Using IFTTT Feed option with Twitter means you can now automatically update twitter on each post.
Using a recipe like https://ifttt.com/recipes/311859-post-blog-updates-to-twitter will do it without any problems.

Easy and fun.
