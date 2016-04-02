---
title: Chasing The Holy Grail
subtitle: Strategies For Distributing Your Pattern Library and Keeping It in Sync
layout: post
excerpt: 'In our work with Pattern Libraries, we strive to achieve a level of maturity where the Pattern Library documentation is automatically in sync with the app(s) that it powers. Generally, this means sharing the CSS code so developers implementing patterns can just copy and paste snippets of HTML so it “just works.” In practice though, this gets complicated quickly.'
---

![The Holy Grail from Monty Python and the Holy Grail](/img/holy-grail.jpg)

In [our](https://www.slalom.com/locations/dallas) work with Pattern Libraries, we strive to achieve a [level of maturity](https://medium.com/@marcelosomers/a-maturity-model-for-design-systems-93fff522c3ba) where the Pattern Library documentation is automatically in sync with the app(s) that it powers. Generally, this means sharing the CSS code so developers implementing patterns can just copy and paste snippets of HTML so it "just works."

In practice though, this gets complicated quickly, especially with the realities of modern application development workflow. I regularly see situations like:
- Multiple release branches undergoing User Interface (UI) code updates as work makes its way through development, testing, and production
- The desire to share the UI code among multiple codebases so different apps can "look the same"
- The design team pushing forward with prototype ideas that aren't ready for production

Because of this, successful sharing of UI code among multiple applications has a few baseline requirements:
1. UI code must exist as it's own entity
2. UI code must be shared between the pattern library and production application(s)
3. (this includes CSS and possibly front-end templates)
4. UI code must be versioned so various application(s) can be tied down to the
5. design system at different states, and able to be updated as a part of the app's
6. build process
7. The UI code's live examples in the documentation must be automatically updated
8. with any changes
9. The consuming applications must not be able to directly edit the pattern library
10. code (to keep individual implementations from diverging too far)

I've spoken with dozens of teams, and everyone has a different approach to achieving this. Often time it feels like we're chasing the holy grail. This article will explore everything I've tried, successfully and unsuccessfully:
- [Copy and Paste](#copy-and-paste)
- [Host the Library Inside Your Application](#host-your-pattern-library-inside-your-application)
- [Git Submodules](#git-submodules)
- [CDN Hosted](#cdn-hosted-files)
- [Public Registry Package Managers](#public-registry-package-managers)
- [Private Registry Package Managers](#private-registry-package-managers)
- [No Registry Package Managers](#no-registry-package-managers)

If there's something I haven't considered that has worked for your team, leave a response on this post or [let me know on Twitter](http://twitter.com/marcelosomers)!

# Copy and Paste
This is how I've seen many style guides get started sharing code. As updates get made in a prototype or style guide documentation, the files are diff'ed and copied over to a production application.

A slightly upgraded version of this is simply distributing your CSS as a ZIP file. The development team then downloads a newer version and puts those files into their project.

**Why Not:** Do I even need to answer? This is both tedious and inconsistent. There's a good chance your codebases will diverge over time, since the development team has direct edit access to these files, and making changes directly is the path of least resistance.

# Host your Pattern Library Inside Your Application
If you have a single application, you can build your documentation pages within the app and point them at the same UI code. This is a super easy way to handle your

**Why Not:** This makes it nearly impossible for designers to iterate ahead of development. Where do they work without breaking existing code? My experience has also been that production apps are complex to run on your machine, and can often be unstable during development. Designers will not like dealing with this.

# Git Submodules
[Git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules) are a Git tool that allows you to nest another git repository within your project. It basically points to a specific commit and houses those files as a folder inside your project, and you can "pull" new code into your project. I think any developer using Git has seen the concept of Submodules and immediately thought "this will solve all my problems!" This is not reality.

**Why Not:** Nearly every time I've seen someone think Git Submodules are the answer to something, it seems to get ripped out of the project after a few weeks. They're just a headache.

In Pattern Library work, I've encountered two major limiting factors (not including the other headaches that can come with submodules):
1. You can't explicitly version. As soon as you end up with multiple concurrent
2. branches (e.g., develop, qa, and production) you have no way to say "only make
3. this small update to our prod code without pulling in all our recent changes."
4. It's all or nothing.
5. Each developer must run the git submodule update command to get the latest files
6. -- this can lead to code being out of sync just within a single development team
7. if someone forgot to run the command

# CDN Hosted Files
One idea some teams I've worked with have explored is deploying your UI code assets to a CDN, just like public libraries. You'd provide development teams with a versioned URL (e.g., [http://mycdn.com/1.3.5/styles.css)](http://mycdn.com/1.3.5/styles.css)) and upgrading is as simple as bumping the version number in the URL.

This is actually a very viable solution in many situations. Accessing and upgrading the UI code is as simple as changing a version number.

The only roadblock I've hit with this is that it presumes development machines will have internet access. In my work as a consultant, I'm often demoing work in situations where I may have spotty or no internet. It can be frustrating to try and demo a project and have it break because it can't hit the CDN.

However, this this is an option that would suggest to many teams that significantly decreases friction.

# Public Registry Package Managers
So that leaves us with our option that comes closest to finding the holy grail: using a package manager like [npm](http://npmjs.com/). It's how other libraries like Bootstrap are published, so why not publish our own package?

Package managers meet all of our needs: you can download your UI code from a separate codebase, track to a specific version (or even branches and commits), consuming apps can't edit the code, and new projects can easily access the code.

*Note: For example's sake, we're going to stick with npm from here on out. Most of the concepts should extend to any other package manager.*

Here's the catch: as long as you're ok with your code being 100% public, this is really easy! Just deploy to a public Git repository and register your package with the npm and you're set to go. This is how GitHub (among others) [handles their Pattern Library](https://github.com/primer/primer#usage), just bower install primer and you're set.

But the reality is that many companies will want to keep this private. So that throws a serious wrench in our plans. So let's explore some options for distributing our code privately.

*Pro-Tip: If you're going to use a package manager like npm, make sure you include a command to update the local code every time the app gets built. That way if the version of your pattern library in your package.json gets bumped, all developers will get update locally when they rebuild the app. This will save many headaches of "why am I not seeing the latest changes!"*

# Private Registry Package Managers
If you're willing to shell out some cash, npm will either [host a private package for you](https://www.npmjs.com/private-modules) ($7/month), or you can even [host your own registry](https://www.npmjs.com/onsite) ($20/user/month).

A private package seems like a great idea until you dig in a bit. Every person who will be running npm install on your package now will require an npmjs.com account, and someone will need to grant them access. This might work on a small team, but this really doesn't scale well. It gets even worse once you consider that every build machine for your application would need access, [which isn't solved by the current implementation, but supposedly is on their roadmap](https://twitter.com/marcelosomers/status/664557574079942656).

A private registry is probably out of the question due to cost. Kudos to npm for finding a way to monetize, but $20 per user per month is just insane to host our Pattern Library. Anything beyond a small team with a single app and we're talking thousands of dollars a year just to serve up our pattern library.

# No Registry Package Managers
One of the best tricks about npm dependencies is that [you can use a Git URL as a dependency](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies). So instead of having a dependency on a publicly registered package like this:

```
“dependencies”: {
 “bootstrap”: “^3.3.5”
}
```

You'd point to a git repository ([using any of the valid options](https://docs.npmjs.com/files/package.json#git-urls-as-dependencies)):

```
“dependencies”: {
 “my-pattern-library”: “git://github.com/user/project.git#commit-ish”
}
```

Where the #commit-ish at the end can be a tag, commit hash, or branch name (blank just pulls the latest code).

So we're set, right? Maybe. There's a chance the authentication issue from private npm packages comes back into play here. If it's a private repository, running npm install would authenticate just like a git clone command:
1. Check if the user has SSH access to the repository
2. Prompt the user for their credentials

If you're okay making the assumption that every user would have SSH access to the repository (e.g., it's part of the same GitHub organization and every user has access to both), then you're set. Make sure to consider if your build/deployment machines have direct access to these repositories as well.

However, there are many situations where we can't always assume users will always have SSH access to the Pattern Library repo. SSH is awful on Windows, and many developers on that side of the world use HTTPS, which would require you to type your username and password every time you npm install or update. That's not fun.

So there's a few options we've come up with to deal with these situations:
1. Host the Git repository inside your company's VPN and make it "open" to anyone.
2. This would mean anyone running npm install behind the VPN would "just work."
3. Create a read-only user that only has access to your UI Code repository. Then
4. use an http/https URL in your package.json with the embedded credentials:

```
“dependencies”: {
 “my-pattern-library”: “http://user:password@github.com/user/project.git#commit-ish"
}
```

This enables every user and build machine to pull down the code with no fuss. Most developers that don't touch the Pattern Library won't even notice. Sure, embedding credentials in source control is generally a bad practice, but in this case we're keeping it "safe" in that it's a single user that can easily be revoked and updated, and only grants read access to a malicious user.

This last solution of embedding credentials in the package.json file has become somewhat of a standard practice on projects I'm working on. It still feels icky, but it meets our requirements with the added bonus of "just working."

--------------------------------------------------------------------------------

In the end, there is no one right answer of how to host and share your Pattern Library code. Each organization is different, and any of these options could be the right fit. It's up to design and development to work together to find the optimal solution that meets the governance and technical needs of both sides.

If you're successfully using a different model that I haven't covered I'd love to hear [on twitter](http://twitter.com/marcelosomers).

*If you are interested in building a pattern library that follows these conventions, we've created an open source tool called *[PatternPack](http://patternpack.org/)* that makes it easy to build your pattern library, version it, and distribute the code to other applications via npm or bower. Check out the *[Guides & Resources](https://github.com/patternpack/patternpack/blob/master/docs/docs.md)* to get started.*
