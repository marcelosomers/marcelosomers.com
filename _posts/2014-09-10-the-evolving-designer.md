---
title: Pattern Libraries and the Evolving Designer
layout: post
---

I never quite understood the phrase "Design in the Browser."

Maybe it's because I know Photoshop like the back of my hand, and fly over the keyboard cranking out a comp. Or maybe it's what feels like 5x the time to turn out an actual design. But for some reason, I've always felt more comfortable cranking out a design in Photoshop, and then converting it to responsive code.

What I've come to realize though, is that to understand the concept of "designing in the browser," you have to separate two things: developing a visual aesthetic and designing real, functional components.

### Visual Aesthetic
Flat vs Skeumorphic? What shade of blue? Helvetica or Arial? These are decisions that must be pulled together when you can see the big picture. It's also why Photoshop, Sketch, and other similar design tools won't ever die.

When it comes to visual design, a designer works to understand the the overall direction of their design before they get into the nitty gritty details of an appropriate shade of your hover state. That's the true value a visual designer brings to a project - taking big ideas and distilling them into an implement-able vision. So when designing a visual aesthetic, we work from the outside in.

### Building a Functional Component
Building a Pattern Library works in the opposite direction though - you start from the smallest possible pieces and put together the lego bricks to build larger components. This is the basic principle of Brad Frost's [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/).

The [pattern library](http://24ways.org/2012/design-systems/) should be a bridge between your beautiful, pixel perfect Photoshop comp and a real, functional site or app. The pattern library enables us to stop thinking in "screens" and start thinking in **modular** and **re-usable** components. Remember - it wasn't long ago that designers were handing off ["redlines"](https://www.google.com/search?q=design+redlines&safe=off&es_sm=91&source=lnms&tbm=isch&sa=X&ei=Dl8OVPueGMvGsQSnmIKACQ&ved=0CAgQ_AUoAQ&biw=1217&bih=680) to a developer.

The pattern library also enables a developer to test how their components will respond at various screen widths - [MailChimp's](http://ux.mailchimp.com/patterns) is a great example of this.

### The Evolving Designer
This is where a designer *must* evolve from the days of beautiful, custom print layouts. I don't believe designers have to learn to code, but as my friend Matt Baxter [put it at Big Design 2014](https://speakerdeck.com/mbxtr/unleash-your-inner-unicorn), "a designer must be able to balance design and development."

I believe balance means thinking about three things:

1. **Thinking in re-usable components** - how many different table styles, button styles, or checkboxes does a single application need?
2. **Think in responsive** - what will happen to your component when the screen is wider or smaller?
3. **Think about interaction** - how should things animate and respond to a user's interactions?

None of these are illustrated in a Photoshop file. It may not be up to a visual designer to actually write the CSS or JavaScript, but a designer who isn't writing the code must work closely with the developer, or put their trust in the developer's hands if they're going to toss a Photoshop file over the wall.

It also means that in a well oiled team, a designer can lay down a base visual aesthetic, and a design-minded developer can run with that later on in a project to build new components. Not every component calls for a pixel-perfect design comp.

"Design in the Browser" doesn't mean developing your initial design aesthetic. Photoshop, Sketch, and other tools are still fantastic for that. Designing in the Browser means building real, functional components that are usable in a development project, and a Pattern Library is that bridge.

*Also, if you're interested in Pattern Libraries, I'll be [maintaining a list of great public libraries on Github](https://github.com/marcelosomers/pattern-library-directory)*
