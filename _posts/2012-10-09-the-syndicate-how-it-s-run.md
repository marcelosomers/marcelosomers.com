---
title: The Syndicate - How It's Run
layout: post
---

Tools are just enablers for us to get our work done. When I launched The Syndicate, I didn't figure out how I'd actually operate it until the week before we launched our first campaign. As nerds, we have this innate desire to fiddle with tools, which can quickly become a hindrance to launching a business. When I was alone for a weekend launching The Syndicate, I wanted to fiddle with my business tools (invoicing! content collection! content distribution!), but that would have only held me up.

<em><strong>Lesson:</strong> Early on in your business, focus on launching something that people will pay for, not the tools you'll use to make it.</em>

With that lesson aside - I wanted to give a bit of insight into how we run the network each week. It's evolved over the last year as I've learned. The key to developing a business operating workflow is to iterate as you learn, and stay flexible.

#### Sponsor Management
I still haven't found a better way to manage my calendar than a spreadsheet. I'm a huge fan of Google Docs for this - it's orders of magnitude faster than Excel or Numbers to load, and I can access my calendar from anywhere.

Invoicing is run through [Ballpark](http://www.getballpark.com/), simply because it was the simplest, low cost solution for invoicing. I didn't need time tracking or any other bells and whistles. The built in PayPal payments is fantastic as well.

All payments are run through PayPal or check. I don't love PayPal, but their fees are still lower than Stripe or anyone else, and when you're dealing with thousands of dollars, fees ad up quick.

#### The Email
Sending content started with a simple email. Each week I'd send out something that looked like this:

![The Syndicate Email](http://behindcompanies.com/wp-content/uploads/2012/10/email.jpg)

An email each week is how I ran the business for the first 6 months or so. It was low friction with an easy ramp up. When you're bootstrapping a business, it's definitely more important to get it out the door than to try and predict how the business will be operated.

Unfortunately, there were several issues with the email method:

* There was a lot of room for error with the myself and the writers. They're smart guys, but we are all prone to mistakes, and when a sponsor is paying a few grand for a campaign, you don't want to mess it up.
* I'm bound to make mistakes or miss typos. Sending an email update could easily get lost, be confusing, or just be plain annoying, jamming up the guys' inboxes.

#### The Website
After several months, I had gotten fed up with the email each week, so on a free weekend, I decided to move things to the web. With only knowledge of HTML and CSS, I built a few templates that I could reuse each week. I'd email the writers a link to a landing page with the schedule:

![Website 1](http://behindcompanies.com/wp-content/uploads/2012/10/website1.jpg)

Once they click through, the page would give the content:

![Website 2](http://behindcompanies.com/wp-content/uploads/2012/10/website2.jpg)

This system was powered by TextMate and a lot of Find & Replace. It was a lot easier for the writers with less room for error. Unfortunately, it meant nearly 20-30min each week just to prep the content to send out. I dreaded this part.

#### The CMS
Finally, I got fed up with the complications of find and replace in TextMate, and decided it was time to [learn to build my own stuff](http://behindcompanies.com/2012/08/learning-programming-isnt-daunting/). My project of choice in learning PHP and MySQL was a CMS to power this content process.

Today I've got a fully functional CMS with three areas: sponsors, admin, and writers.

Each sponsor gets a unique login where they are able to see past and upcoming campaigns, along with their click data:

![CMS Sponor Home](http://behindcompanies.com/wp-content/uploads/2012/10/cms_sponsor.jpg)

And they are able to submit their content:

![CMS Sponsor Content](http://behindcompanies.com/wp-content/uploads/2012/10/cms_sponsor_content.jpg)

I'm notified with an email whenever they submit their content, which also flips a switch for me to approve it. From the admin panel, I can see upcoming campaigns, measure click data, and approve sponsor content:

![CMS Admin Home](http://behindcompanies.com/wp-content/uploads/2012/10/cms_admin_home.jpg)

When I'm approving content, I'm able to auto-generate short URLs for each site, as well as adjust post dates as needed:

![CMS Admin Approve](http://behindcompanies.com/wp-content/uploads/2012/10/cms_admin_approve.jpg)

The writers then login to the CMS, where they can track their performance on previous campaigns, and see the upcoming ones:

![CMS Writer Home](http://behindcompanies.com/wp-content/uploads/2012/10/cms_writer_home.jpg)

From there, they grab the weekly post content:

![CMS Writer Content](http://behindcompanies.com/wp-content/uploads/2012/10/cms_writer_content.jpg)

The CMS is working wonderfully thus far. It's the least flexible solution, but it makes it so that I can send out the content each week with a couple of clicks in a few minutes. The downside is that for special requests (like site-specific copy), I have to build that entire feature, which can become quite time consuming for major issues.

The CMS itself is in constant evolution. I've got a big backlog of items to add, and just poke around as time allows.

#### Analytics
In any ad network, it's crucial to be able to track performance. You use this data to adjust pay to your sites, and to see if you're truly delivering the value you promise to sponsors.

I started off with a hack: I'd build an HTML page that had a meta refresh that redirected the page to the sponsors URL. The Syndicate's writers would link to their site's page, and then I'd grab the server logs and grep through them to see how many times each site's page got hit.

This is super unreliable: web crawlers and other automated tools are all accessing this data regularly. It is by no means a representation of true performance, and sponsors that would compare to what I reported saw a huge discrepancy, since Google Analytics and other tools filter out non-humans. It would also take forever to track stats on a spreadsheet by hand. I was wasting another hour or so each week updating campaign performance.

So I decided to move to bit.ly. I housed our click throughs there for some time, and it was a good option until they deployed their redesign which disallowed pasting in several URLs to shorten. This added a ton of time to my process (during my already drawn out time of copy and paste in TextMate), so I knew I needed something more automated. I also don't like business dependencies on 3rd parties.

That's when I discovered a self-hosted URL shortener, [Yourls](http://yourls.org/). It even has a built in API that I use to report this data back in the CMS with a simple call, as well as do bulk shortening of URLs with a single click. I highly recommend this script to anyone that needs to run their own URL shortener.

#### Sidebar Ad
The final piece of the puzzle is the sidebar text ad, which you can see on the right of this page. The best alternative I found was the free version of Google's [DoubleClick for Publishers](http://google.com/dfp). Each week I load up a single campaign to run starting at 12:00am on Monday through 11:59pm on Sunday.

The click through URL still runs through Yourls, so I can track it easily through my admin dashboard on the CMS.

DFP is by no means a great solutions. It loads a ton of extra JavaScript on publishers' pages, and you're still dependent on Google. Styling the text on each site is a bit of a hack too. If anyone has any suggestions for better tools, please let me know in the comments.

The lesson learned in building this workflow is to start with low friction tools and iterate as you discover. I could never have predicted everything I'd need when I first started building the business. The original emails were far from perfect, but they were low friction, and if I'd told myself I needed to learn PHP and build a CMS before launching The Syndicate, I have no doubt it would have fizzled out and never come to fruition.
