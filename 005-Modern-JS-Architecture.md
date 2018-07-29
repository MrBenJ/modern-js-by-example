Modern Javascript Architecture
==============================

As Javascript moves at breakneck speeds, this section can at any time fall behind. By the time you finish reading this sentence, we might already be on Webpack version 8 and Angular 19.

At the time of this writing,
Webpack's latest major version is v4.
React's latest version is v0.16.4
Angular's latest version is v6.

There's 3 major aspects of a modern front end system:

1. Task runners / Automation tasks
2. Bundler or Build System
3. Framework

# Task runners

Back in the ancient Javascript civilizations of 2013, brave warrior and huntress tribes of developers used `grunt` to start automating repetitive and menial tasks.

With the advent of Node JS, there were more and more tools that started appearing in the Javascript ecosystem. We were able to use the command line to:

* Minify/Uglify our JS code
* Use a CSS preprocessor like `Sass` or `Less`.
* Start a small `Express.js` server for local development.

Since `grunt` worked directly with the command line, all of these tasks went from long complicated scripts to:
```sh
grunt serve
```
or
```sh
grunt uglify
```
Naturally, more tooling with `grunt` happened, and more modules were created to support this new ecosystem. Tasks could run concurrently. Development servers could auto-reload whenever a file change was detected. Everything was moving so quickly and efficiently so that us developers could do what we're paid to do faster: **ship code**.

Now all we had to do was type `grunt build` and JS would be uglified, `Sass/Less` code would be compiled to `css`, and we'd get a picture perfect performant web application in a convenient folder, ready to `grunt deploy` onto whatever service we wanted.

A group of Javascript developers one day got together and said, "I wished `grunt` could do ... and have more customization...".

And so, `gulp` was created and also named after a bodily function.

The customizations within `gulp` were far more modular and reusable, being much easier to test and use. The main difference was that `gulp`'s configuration allowed developers to write simple `function`s to do tasks, and not embed commands deeply inside one gigantic `grunt` JSON file.

And so, all new projects and boilerplates began to move away from `grunt`, and everyone started using `gulp`. And everyone was happy.

Except not really because Javascript developers always want to build new things. Developers started making a million and a half task runners with food names because bodily functions are gross. We had a new world of task runners pop up like `Brunch` and `Broccoli` and `Duo` and `Rollup` and many too many more. I don't know what a Duo is, but if it's ice cream, sure. I'll eat it.

All Joking aside, tools like `grunt` and `gulp` are still widely used to this very day, and knowing one is great. I'd recommend getting your feet wet with `gulp` and its large ecosystem of excellent plugins and tools.

In modern Javascript development, the Task runner and Bundler are typically combined into a single tool. We'll talk a little bit more about this later.

# Bundlers and Build Systems

There's 3 main build systems that are of major popularity in Javascript. They are:

1. Webpack
2. Rollup
3. Parcel

Take note that **all three of these tools have some task runner/ task automation capabilities**. Which means all three are extremely powerful.

These tools, while extremely powerful, can also be frustrating to set up.

## Bundlers in a Nutshell

Many times, developers have an _idea_ of what bundlers and build systems do, but don't really understand what's truly happening under the hood. It's not 100% necessary to understand absolutely everything that's occurring underneath the simple commands and tooling, but **having a general idea** is much better than **having no idea at all**.

The bundler configuration usually has what's called an **entry point**. This is the one, single file that loads or builds the whole application from the get go.

In a `React` or `Angular` project, this is the top level `React` component like `app.js`, or a `main.ts` file for `Angular` projects.

The bundler will look for NodeJS `require()` calls, or Babel `import` statements in the entry point, and will go through the files they point to, and find those `require()` and/or `import` statements. This will continue recursively until the bundler creates a manifest of what module is dependent on what, and all of the moving parts of an application.

After creating the manifest, it grabs all of the files and **compiles them all to a single script.js or bundle.js** file, that's meant to be loaded in a web browser.

This one single **script.js** or **bundle.js** file contains all the `node_modules`, `React Components`, and `Angular directives/models/controllers/views` in the single file.

During this build process, each bundler has their own levels of configuration that can allow for certain files that have been `import`ed or `require`'d to be complied in their own special way.

For example:
* Every `scss` file needs to be compiled to `css`.
* All the `css` loaded into the program needs to be extracted into its own single `css` stylesheet as a separate file from **bundle.js**
* Ignore all files that end with the `.example` file extension.

Depending on the size of the application, these build tools have been optimized and heavily tested by the open source community to be extremely fast and reliable if used correctly.

**Learning a build system can be extremely intimidating**, and many developers who haven't set up projects from total scratch can get very lost. Once the build system is set up correctly and done well, _it rarely needs to be touched or modified_. This means that many developers already come into a project with all the architecture and build systems and task runners already set up, and this is just something they won't need to really learn.

Personally speaking here, **I find learning how to configure build systems extremely rewarding** because it allows me to tweak it in ways to help benefit my team to get work done quicker and **ship code**. I know where things can be improved, and where the build system can handle things without worry or flaws.

## Learning to set up a build system

For quick and easy setups with common components and pieces like `React` and `Typescript`, I recommend using `Parcel`.

`Parcel` was created out of the criticism that `Webpack` is complicated and difficult to set up, especially for beginners. _This is 100% true_.

All `Parcel` needs is an `html file` and in just a few milliseconds, it bundles and builds your application for you, auto-configuring itself to suit your needs. Great!

However, after so long and needing new tools, `Parcel` can only go so far.

My recommendation is to learn `Webpack`, because of its rich features and customization, along with quick build times and excellent open source support, it can be configured to do just about anything.

However, `Webpack` is a big and open ecosystem that has lots of moving parts that require hours of dedication and trial + error to truly understand, and is out of the scope of the purpose of this book. I recommend going to https://www.webpackjs.org to learn how to use and configure `Webpack`.

`Rollup` is another fine choice for a bundler and build system. As long as you know either `Webpack` or `Rollup`, you'll be well on your way to mastering Javascript and front end architecture.

# Frameworks

As of this writing, there are 3 major Javascript frameworks:

1. Angular
2. Vue.js
3. React (not really a "framework." More on this later)

Each of these frameworks has their own pros and cons, and there really isn't a _one size fits all_ solution.
