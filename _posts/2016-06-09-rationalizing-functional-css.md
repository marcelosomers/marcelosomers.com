---
title: Rationalizing Functional CSS
subtitle: Discovering and debating the merits of functional CSS
layout: post
crosspost_to_medium: true
---

The idea of functional CSS just seemed like the craziest thing I'd ever heard of. "Why would I ever use this? I'm awesome at CSS," I'd tell myself.

If you haven't heard of it, functional CSS (or atomic CSS/utility classes/immutable CSS - I could go on forever. There's not a good name) is the idea that instead of writing big, monolith components in my CSS, I write small, single property, immutable classes that can be assembled into a larger component in HTML.

Your CSS might look like:

```css
.p1 { padding: 0.5rem; }
.flex { display: flex }
.red { color: red; }
```

Which then get constructed into your HTML:

```html
<div class="flex p1 red">
  Hi, I'm a flexbox div with 1 unit of padding and red text!
</div>
```

Crazy, right?

I loved writing really clever, powerful CSS classes. I argued for it because of "ease of developer consumption." My goal was that a developer could add a single class to an element and it would automagically do everything for them. Basically, the opposite of functional CSS.

Then I read Adam Morse's epic essay, [CSS and Scalability](http://mrmrs.io/writing/2016/03/24/scalable-css/). Adam takes you through a very informative journey, so I recommend setting aside 20 minutes to read through his thinking, but if I had to summarize it, it'd be this paragraph:

> In [the monolith] model, you will never stop writing css. Refactoring css is hard and time consuming. Deleting unused css is hard and time consuming. And more often than not - it’s not work people are excited to do. So what happens? People keep writing more and more css.

🤔

Okay, Adam. I'm sold. You're right. It's fun starting a new project and writing all these beautifully architected CSS components, but the fact is, I won't always be there, and in the monolith model, **the team will never stop writing CSS**.

Raise your hand if you've ever walked into a really well architected CSS codebase.

Me neither.

Typically it's not because the codebase started badly. It's because as writers of CSS, we are taught to sling more code to fix any problems.

Much like Adam, I've reached the point in my career where

> I’m not very interested in what I can do with css. I’m interested at this point in what I can help groups of people do with css.

[Basscss](http://basscss.com/) and Adam's own [Tachyons](http://tachyons.io) were a great starting point for experimentation. I was convinced after testing it out, and I had the chance to kick off a new client project using this approach to writing CSS.

3 months into a functional approach to CSS architecture, I'm addicted. The times I've used the old monolith approach, it's become a tedious challenge in jumping between files constantly. I think I'm convinced, but I'm still trying to rationalize scalability issues as my functional codebases grow and evolve.

I'd love [any feedback](http://twitter.com/marcelosomers) on what I have or haven't considered.

## The Good

### Speed
My goodness I can work fast! I've always said that I can't "design in code" and preferred to start any blank slate design in a tool like Sketch. I joked that it felt like two different sides of my brain that just wouldn't mesh.

What I've realized by using functional CSS is that it was the context switching that killed my creativity. I'd have a great design idea, but then I'd have to toggle over to my CSS file and start building up a component from scratch - naming it, thinking through the box model implications, DOM structure, best architecture practices, etc. This was like my creativity hitting a wall at 100mph.

Instead, I cruise through the DOM, writing HTML and quickly styling each element as I go. Using Basscss plus a few custom CSS classes for my brand colors (less than 75 additional lines total), I was able to build out a home page for a project in an hour that's withstood the test of time.

This alone feels like enough to keep me using this approach. It's addicting, and I don't know that I can ever go back. Jon Gold was right:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&quot;The best CSS is the least CSS possible&quot;</p>&mdash; gold (@jongold) <a href="https://twitter.com/jongold/status/723542422689595392">April 22, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

From a design perspective, Functional CSS frees you from having to make code decisions while designing. The decisions have already been made and you're simply mixing and matching to achieve your desired styles in the same way that you'd use shapes, colors, and spacing in Sketch.

### Transferability

On most projects I work on these days, our design and development teams have settled on the idea of design providing an HTML/CSS prototype and the Dev team porting that into the real environment.

The efficiency gains on these projects have been enormous.

A code prototype gives our designers time to perfect the user interface without the headache of having to learn to work in advanced JS frameworks like React or Angular.

The issue we've found with this approach are the small differences in the HTML required: things like requiring a component or directive to be wrapped in a tag can break your CSS cascade pretty quickly.

In the past, this meant maintaining an app-specific set of overrides, which over time led to more and more bugs (and bad CSS being written).

Instead, small tweaks like margin can be adjusted with a single class change in your HTML. It allows you to **fix bugs without writing any additional CSS**. I can't even tell you how amazing this feels. Writing more code to fix bugs the wrong way to fix your CSS.

### Stop Making (Pointless) Decisions

Basscss provides a standard set of spacing and sizing utilities. Eliminating choice is actually quite liberating. By only being given 8px, 16px, 24px, etc. has spacing, you just pick a small/medium/large and roll with it.

I used to think this would take away all my creativity, but it's just made my life easier as a designer. I can focus on the right problems.

## The Bad

Before into the issues with Functional CSS, I want to be clear - at this point, these are more questions than criticisms. I'm sure much smarter people than me have come up with solutions (or justifications) for these problems.

I'd love to hear how other people are addressing these problems.

### Losing the Cascade

Shifting our style assembly code burden over to HTML means we lose all benefits of the cascade. It's wonderful the first time you create a component, but updating styles in an existing system can be a complicated mess of find and replace and other keyboard shortcuts.

A simple way to update a few close styles in a single file is to use multiple cursors. In Sublime Text and Atom, selecting a string of text and hitting ⌘-D (on Mac) will select the next instance of that string.

<video controls src="/img/multiple-cursors.mp4" class="fit">

But this presumes you created multiple of the same "components" by putting the utility classes in the same order, especially when doing find and replace across multiple pages. Otherwise, there is no easy way to search across your entire application to find where similar components were implemented.

This might be my single biggest concern about implementing functional CSS in a large app. Just imagine a standard "box" component made up of 7-10 utility classes. If you wanted to change the font size inside all the boxes, you'd need find every instance across your app and update each one manually.

That leaves a lot of room for error.

### Reusability of Components

With functional CSS, creating a "component" is simply mashing together a bunch of classes. Reusing the component would require you to happen to use the same classes again in a different place.

Once again: a lot of room for error.

The long-term solution here might come by implementing a Pattern Library to document components and provide simple copy and paste snippets. Even better, by documenting, you easily provide "options" if necessary by describing certain types of classes that could be mixed and matched to achieve variations of the component. For example, maybe a card could have different header colors that are easily swapped by using a `bg-color` class.

Combined with the prior issue of losing the cascade, long term reusability and the ability to update the major challenges I've encountered when working with functional CSS.

A possible fix if you are working with components would be to add a named class for each component. It would be descriptive in that you wouldn't actually apply any CSS to the class, but it would be used to find instances of a particular component throughout your codebase.

```html
<div class="box-component flex p2 bg-blue white h4 bold">
  The .box-component class wouldn't actually style anything, it would merely be a search key for finding instances where the box component gets used.
</div>
```

Utility classes are easier to implement, but long term usability, reusability, and the ability to update for large teams should be considered early on.

### Responsive

Your string of classes is going to get quite complex if your design changes too much throughout breakpoints. Early on, it's nice to do something like `class="m2 md-m0"` to get 2 units of margin up to the medium breakpoint and then 0 margin above that.

But there was one situation in my test project that restyled my navigation as a slide in menu on mobile, but was a standard horizontal list on desktop sizes. It quickly got out of control:

```html
<nav class="fixed top-0 right-0 bottom-0 left-0 z4 bg-red flex-start md-relative md-flex-auto md-min-width-0">

</nav>
```

This was just the start and more classes came on later to style colors. When your design varies substantially between breakpoints, it can be a challenge to implement the classes (and your [class order becomes another problem](#standard-class-order) - we'll discuss that in a bit).

Combat this by establishing standards early on for how to handle responsive - things like naming conventions, breakpoints, and standardizing on min or max width.

### Managing State

A common situation I find myself in is hiding a component by default and then clicking on something to show it. I might write a monolith CSS class like this:

```css
.nav { display: none; }

.nav.is-open { display: block; }
```

Where Javascript would toggle `.is-open`. to show my navigation. Instead, my JavaScript would now be toggling a utility class of `.block` or similar:

```html
<nav class="hide block">
  .block gets toggled by JavaScript to show this element. It's also not terribly readable.
</nav>
```

Not too complicated on a small component for the sake of demonstration. But even in this case, you'd have to ensure that `.block` overrides `.hide` or remove `.hide` altogether (and rememebr to toggle it back). In a more complicated component, say where the position and styles change as well, this is a lot to remember to toggle via JavaScript.

Not a deal breaker, but it's definitely easier to formulate your component in the CSS and just toggle a single class to handle all the styling.

### Standard Class Order

Any project with more than one developer is going to have to set some standards around what order your classes should be put in. Otherwise you're going to be hunting and pecking through your class list to find what's being applied. I'm personally a fan of the [concentric model](https://github.com/brigade/scss-lint/blob/master/data/property-sort-orders/concentric.txt). But on top of source order, your team should decide if all the break points should be grouped together:

```html
<div class="flex m0 p0 md-m2 md-p2">
  The breakpoints are grouped
</div>
```

or the properties themselves:

```html
<div class="flex m0 md-m2 p0 md-p2">
  The properties are grouped
</div>
```

I haven't quite found which I prefer, so I'd be curious to know how other teams are handling this.

### Documentation

In my CSS, I'll often document strange properties and why I put something in a particular spot. Case in point:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Oh IE11, the things I still have to do for you 🖕🏻 <a href="https://t.co/Kca4VgHIJl">pic.twitter.com/Kca4VgHIJl</a></p>&mdash; Marcelo Somers (@marcelosomers) <a href="https://twitter.com/marcelosomers/status/738028428322996224">June 1, 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I could document why an immutable class exists in my CSS, but it'd be a bit more strange to put why I added it to a particular HTML element within my HTML markup.

## Conclusion

Overall I'm very happy with the functional approach to CSS. It's one of those things that once you see you can't unsee, and each time the change-averse part of my brain tries to write a monolith CSS class, I find myself drifting and uninterested in architecting CSS.

I find myself wanting to be done writing CSS. I want to write some classes early on in a project, and get designing by assembling those lego bricks. Having to make code decisions late in a project just feels out of place - like I'm wasting my time writing CSS rather than actually solving real usability problems.

I'd love to [hear from you if you've adopted this approach](https://twitter.com/marcelosomers). If you're interested in learning more about functional CSS I highly recommend following [Adam Morse](https://twitter.com/_mrmrs), [Jon Gold](https://twitter.com/jongold), and [Brent Jackson](https://twitter.com/jxnblk) who are really pushing this forward.
