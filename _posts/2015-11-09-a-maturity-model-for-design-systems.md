---
title: A Maturity Model for Design Systems
layout: post
---

When I attended [CSS Dev Conference](http://2015.cssdevconf.com/) last month, I
spoke with dozens of designers and developers advocating for Design Systems and
Pattern Libraries within their organizations. It’s a given at this point that
[you should have one](http://alistapart.com/article/creating-style-guides). The
question is, how do we go from where we are today to where we should be?

A useful model for framing up this discussion is a design system maturity model
that [John Gully](http://twitter.com/johngully) and I put together:

![](https://cdn-images-1.medium.com/max/1600/1*F8M5o9rPr3kXt1T5-LbdXQ.jpeg)

### Inconsistent

The absence of any design system. This organization hasn’t even tried to unify
under a single UI paradigm. This sounds crazy, but too many companies live here.

Obviously no one wants this.

### One-Time/Static

This is the standard agency model where you hire an agency to do your branding.
They deliver a gorgeous PDF and every app you build tries to adhere to this
guide. It’s pretty much dead on arrival because the system doesn’t evolve to fit
the needs of growing organizations.

### Manual

This is the first level that attempts to reflect the reality of the sites or
applications you are building. Maybe you’re using a tool like
[KSS](http://warpspire.com/kss/) or [Pattern Lab](http://patternlab.io/) to
capture the live examples and code snippets for developers to use. These pattern
libraries reflect the reality of HTML/CSS and get out of static PDF documents.

> “Unless it’s part of your build, your style guide is just more documentation to
> maintain” –[Phil
Hawksworth](https://speakerdeck.com/philhawksworth/static-sites-go-all-hollywood?slide=61)

The problem is that your Pattern Library is just documentation at this point.
It’s not in sync with your production site, and requires you to come back and
remember to make updates as they happen. Things can get messy and out of date
quickly, even in companies with the best intentions

### Automatic

This is the holy grail of design systems — the moment when your documentation
has no choice but to remain in sync with your production site. There are several
requirements to achieve a truly automatic design system:

* UI code must be shared between the pattern library and production applications
(CSS and possibly front-end templates)
* UI code must be downloaded from a remote location as a part of your
application’s build process
* UI code must be versioned so various applications can be tied down to the design
system at different states
* The UI Code’s live examples in the documentation must be automatically updated
with any changes

An approach to get an automatic style guide is to build your styles and import
them using a package manager like NPM or Bower. [We built
PatternPack](http://patternpack.org/) with this ideal in mind — to make it as
easy as possible to spin up a Pattern Library that is documented, versioned, and
distributed through a package manager.

Achieving an automatic pattern library is much more than a technology problem.
It requires organizational consideration to think through how to govern your
pattern library. When multiple applications are pulling from the same codebase,
making a change is much more complicated than “just update the CSS file.”
Someone has to think through the implications in multiple projects.

At [Slalom Dallas](https://www.slalom.com/locations/dallas), this is the
baseline level we strive to get our clients to. Anything less, and we have seen
the Pattern Libraries fizzle out as soon as we leave.

### The Team

Some companies take things a step further. Salesforce has [spun up an entire
team](https://medium.com/salesforce-ux/the-salesforce-team-model-for-scaling-a-design-system-d89c2a2d404b)
devoted to maintaining their [Lightning Design
System](https://www.lightningdesignsystem.com/). Not every company has to do
this, it all depends on the specific situation you are in.

Nathan Curtis wrote a fantastic article about [Team Models for Scaling a Design
System](https://medium.com/eightshapes-llc/team-models-for-scaling-a-design-system-2cf9d03be6a0)
that is worth evaluating before your team runs off and hires designers and
developers to maintain your pattern library.

The ideal that Nathan recommends is a federated model that brings product
designers from various teams together to construct a meaningful and relevant
design system:

> Such a committee federates a system’s design direction to a representative,
> empowered subset of designers and leaders designated to collaborate on the
system for a period of time.

> They make design decisions collectively, even if only a subset — or others —
> record, build upon and communicate those decisions through artifacts like a
living style guide.

In this situation, the team is not a group of people hired specifically to do
this job, but a committee that works together for the better of the company and
design system.

### Moving Up The Maturity Model

Maybe you want to build a design system? Maybe you have a [Zombie Pattern
Library](https://speakerdeck.com/marcelosomers/fight-the-zombie-pattern-library-css-dev-conf-2015)?

You’ll be glad to know that in our work, more often than not, we’re extracting a
design system from a client’s existing application(s). Here’s how we approach
it:

1.  **Take an inventory of your application ecosystem** — look carefully at the
baseline styles (fonts, colors, icons, etc.), components, and page templates,
and taking careful note of what’s meaningful to your design system, and what
you’re ready to move away from.
1.  **Standardize your inventory** — the bigger your app ecosystem, the more likely
you have variations across pages and even various apps. Bring designers and
developers together to make up their minds for where they want to go.
Standardize your spacing units, plugins, etc.
1.  **Document your design system** — good documentation makes your design system
accessible to developers. Investing time in documenting how to use it is
important. For inspiration, check out this [list of Pattern
Libraries](http://patternlibrari.es/).
1.  **Define your CSS Standards & Refactor to get there** — Most CSS is terrible.
Define where you want to go and work slowly to get there. Rebuild a table or
modal, and then re-implement it across all your applications

Moving up the maturity model takes time, but even going from one step to the
next can yield huge returns for your product and design team. In the end, a
mature design system accelerates design, prototyping, and development and
decreases the time you spend fighting your code.

*****

*If you are interested in building a pattern library that follows these
conventions, we’ve created an open source tool called
*[PatternPack](http://patternpack.org/)* that makes it easy to build your
pattern library, version it, and distribute the code to other applications via
npm or bower. Check out the *[Guides &
Resources](https://github.com/patternpack/patternpack/blob/master/docs/docs.md)*
to get started.*
