---
path: "/book/008-modern-js-architecture"
title: "Modern JS Architecture"
chapter: 8
---

As JavaScript moves at breakneck speeds, this section can at any time fall behind. By the time you finish reading this sentence, we might already be on Webpack version 8 and Angular 19.

At the time of this writing,
Webpack's latest major version is v4.
React's latest version is v0.16.7
Angular's latest version is v7.0.2

While stated earlier that the non-coding chatter will be kept to a minimum, this chapter is all about concepts, architecture, and tooling for any size development team. This particular chapter will be focused as a short lecture/discussion about how modern JavaScript tools are set up from scratch.

There's lots of subjectivity and strong opinions on this particular subject, so please take these suggestions with a grain of salt. Some people prefer `stylus` over `Sass`, and others might like `pug` or `jade` over `handlebars`, and those are totally valid opinions.

There's 3 major aspects of a modern front end system:

1. Task runners / Automation tasks
2. Bundler or Build System
3. Framework

# Task runners

Back in the ancient JavaScript civilizations of 2013, brave tribes of developers used `grunt` to start automating repetitive and menial tasks.

With the advent of Node.js, there were more and more tools that started appearing in the JavaScript ecosystem. We were able to use the command line to:

* Minify/Uglify our JS code
* Use a CSS preprocessor like `Sass` or `Less`.
* Start a small `Express.js` server for local development.

Since `grunt` worked directly with the command line, all of these tasks went from long complicated shell scripts to:

```sh
grunt serve
```
or
```sh
grunt uglify
```

Naturally, more tooling with `grunt` happened, and more modules were created to support this new ecosystem. Tasks could run concurrently. Development servers could auto-reload whenever a file change was detected. Everything was moving so quickly and efficiently so that us developers could do what we're paid to do faster: **ship code**.

Now all we had to do was type `grunt build` and JS would be uglified, `Sass/Less` code would be compiled to `css`, and we'd get a picture perfect performant web application in a convenient folder, ready to `grunt deploy` onto whatever service we wanted.

A group of JavaScript developers one day got together and said, "I wished `grunt` could do ... and have more customization...".

And so, `gulp` was created and also named after a bodily function.

The customizations within `gulp` were far more modular and reusable; being much easier to test and use. The main difference was that `gulp`'s configuration allowed developers to write simple `function`s to do tasks, and not embed commands deeply inside one gigantic `gruntfile`.

And so, all new projects and boilerplates began to move away from `grunt`, everyone started using `gulp`, and everyone was happy.

Except not really because JavaScript developers always want to build new things and ~make fun of~ bag on everything that's at least a month old. Developers started making a million and a half task runners with food names because they ran out of bodily functions to name things after. We had a new world of task runners appear like `Brunch` and `Broccoli` and `Duo` and `Rollup` and many, many more. I don't know what a Duo is, but if it's ice cream? Sure. I'll eat it.

All Joking aside, tools like `grunt` and `gulp` are still widely used to this day, and knowing at least one is great. I'd recommend getting your feet wet with `gulp` and its large ecosystem of excellent plugins and tools, as in my personal experience, it's easier to configure and pick up.

In today's modern JavaScript development environments, the Task runner and Bundler are typically combined into a single tool. We'll talk a little bit more about this later.

# Bundlers and Build Systems

There's 3 main build systems that are of major popularity in JavaScript. They are:

1. Webpack
2. Rollup
3. Parcel

Take note that **all three of these tools have some task runner/ task automation capabilities**.

These tools, while extremely powerful, can also be frustrating to set up.

## Bundlers in a Nutshell

Many times, developers have an _idea_ of what bundlers and build systems do, but don't really understand what's truly happening under the hood. It's not 100% necessary to understand absolutely everything that's occurring underneath the simple commands and tooling, but **having a general idea is much better than having no idea at all**.

The bundler configuration usually has what's called an **entry point**. This is the one, single file that loads or builds the whole application from the get go.

In a `React` or `Angular` project, this is the top level `React` component like `app.js`, or a `main.ts` file for `Angular` projects.

The bundler will look for Node.js `require()` calls, or Babel `import` statements in the entry point, and will go through the files they point to, and find those `require()` and/or `import` statements. This will continue recursively until the bundler creates a manifest of what module is dependent on what, and all of the moving parts of an application.

After creating the manifest, it grabs all of the files and **compiles them all to a single script.js or bundle.js** file, that's meant to be loaded in a web browser through your standard `<script>` tag.

This one single **script.js** or **bundle.js** file contains all the `node_modules`, `React Components`, and `Angular directives/models/controllers/views` in the single file.

During this build process, each bundler has their own levels of configuration that can allow for certain files that have been `import`ed or `require`'d to be complied in their own special way.

For example:
* Every `scss` file needs to be compiled to `css`.
* All the `css` loaded into the program needs to be extracted into its own single `css` stylesheet as a separate file from **bundle.js**
* Ignore all files that end with the `.example` file extension.

Depending on the size of the application, these build tools have been optimized and heavily tested by the open source community to be extremely fast and reliable if used correctly.

**Learning a build system can be intimidating**, and many developers who haven't set up projects from total scratch can get very lost. _Once the build system is set up correctly and done well, it rarely needs to be touched or modified_. This means that many developers already come into a project with all the architecture and build systems and task runners already set up, and this is just something they won't need to really learn on the job.

Personally speaking here, **I find learning how to configure build systems extremely rewarding** because it allows me to tweak it in ways to help benefit my team to get work done quicker. Most importantly, it allows me to have a richer and deeper understanding of my **shipped code**. I know where things can be improved, and where the build system can handle things without worry or flaws.

## Learning to set up a build system

For quick and easy setups with common components and pieces like `React` and `TypeScript`, I recommend using `Parcel`.

To my knowledge, `Parcel` is a configuration-free build system and `Webpack` has a tendency to be significantly more complicated and difficult to set up. For those just learning JavaScript, and don't have as much hands-on experience, **Webpack can be intimidating and difficult**.

All `Parcel` needs is an `HTML` file and in just a few milliseconds, it bundles and builds your application for you, auto-configuring itself to suit your needs. Great!

However, after so long and needing new tools, `Parcel` can only go so far.

My recommendation is to learn `Webpack` because of its rich features and customization, along with quick build times and excellent open source support, it can be configured to do just about anything.

However, `Webpack` is a big and open ecosystem that has lots of moving parts that require hours of dedication and trial and error to truly understand, and is out of the scope of the purpose of this book. I recommend going to https://www.webpackjs.org to learn how to use and configure `Webpack`. There will definitely be headaches and learning curves, but after learning how it all works, I guarantee you will come out a much stronger developer.

`Rollup` is another fine choice for a bundler and build system. As long as you know either `Webpack` or `Rollup`, you'll be well on your way to mastering Javascript and front end architecture.

## Learning Webpack

If `Parcel` isn't cutting it for you and you'd like to use more tools in the JavaScript ecosystem (e.g. `flow` instead of `Typescript`), Setting up `Webpack`, while frustrating at times, is an extremely valuable skill to have, and knowing what happens under the hood will make your skills and expertise as an engineer much more valuable.

<!-- alex ignore spas -->
`Webpack` was meant to be used for Single Page Applications, or SPAs for short. Setting up architecture for a single page application with `Webpack` is simple compared to an project with multiple pages and entry points.

# Frameworks

As of this writing, there are 3 major JavaScript frameworks:

1. Angular
2. Vue.js
3. React (not really a "framework." More on this later)

Each of these frameworks has their own positives and negatives, and _there isn't a one size fits all_ solution.

All three of these tools are extremely mature, and have been battle tested in production environments in tech and non-tech companies and products.

## Which Framework Should I Learn?

If you know zero out of infinite frameworks, **Learn any of the most popular frameworks**. Not only will this keep you up to date with the fast changing work of Javascript, but it'll also make you much easier to hire, especially in cities where technology is a core characteristic of the city (think Silicon Valley).

**Frameworks keep the UI state in sync with what's happening server side**. Angular, Vue,js, and React are all battle tested tools to do this. While each has their own unique approach with their own positives and negatives, the end goal is still the same - **Sync UI state with server**.

**It's important to remain agnostic** when learning a framework. Different tools exist to solve different problems. Sometimes, the most popular tool or framework isn't the best for a particular problem. It's important to keep a cool head, not get sucked up into the internet hype machine, and look at the pros and cons of each tool, see why they got popular, and pick the tool that best fits your usage scenario.

While this section lightly outlines each of the three most popular tools and frameworks, I highly encourage you to dig deeper and explore each tool. It doesn't hurt to be know a little bit about each of them, but mastery in one is much more valuable than light knowledge in three.

### Angular 2+

#### What is it?

Angular is a MVC - Model-View-Controller framework for building Single Page Applications. It comes with a robust set of tools that let a developer prototype or build out a basic application fairly quickly with minimal boilerplate.

#### Pros

* Great for prototypes and smaller applications.
* Maintained by Google.

### React

#### What is it?

React is **not a framework**, but a view library. The **ecosystem of React** can turn it into a framework though. We're getting ahead of ourselves here though, let's take a quick step back and look at React, by itself.

#### Pros

* Highly scalable, modular, and flexible in usage.
* Actively maintained by Facebook.
* One of the most popular tools in 2018 with widespread adoption.
* Large and vast ecosystem where there's a tool for everything.


#### Cons

* Difficult learning curve, especially for those who use MVC frameworks.
* **Too flexible**, and can easily be abused.
* Often the main tool causing **Javascript fatigue**, as the ecosystem can sometimes feel too big.
* Makes hard stuff easy (rendering giant lists), but easy stuff hard (forms)
* Can be difficult to set up from scratch.

#### The React Ecosystem

React has an incredibly large ecosystem that shows off its flexibility and popularity. React's core packages are:

* `react` - The main library
* `react-dom` - The DOM manipulation library

Some other "React specific" libraries that are optional (and sometimes recommended) are:

* [`prop-types`](https://reactjs.org/docs/typechecking-with-proptypes.html) - PropType checking for React if you aren't using a static typechecker like `flow` or `Typescript`.
  * Note: This tool is actively maintained by Facebook, and highly recommended
* [`formik`](https://github.com/jaredpalmer/formik) - A form library for React
* [`react-virtualized`](https://github.com/bvaughn/react-virtualized) - An extremely highly performant rendering library for large lists and tabular data.

There's even some full on frameworks that eat, sleep, and breathe React.js:

* [Next.js](https://nextjs.org/) - An extremely powerful server-side-rendering framework for React.
* [Gatsby](https://www.gatsbyjs.org/) - A "website compiler" designed for Single Page Apps or Progressive Webapps with React and GraphQL.

#### React is _not really_ a Framework

Unless it's treated like a framework, React by itself is _not a framework_.

React is a library for building user interfaces.

Think of React as building out custom HTML tags:

```js
function NameTag(props) {
  return (
    <div className="name-tag">
      <p>Name: {props.name}</p>
      <p>Title: {props.title}</p>
    </div>
  );
}

const node = document.getElementById('root');

ReactDOM.render(
  <NameTag
    name="Jeff"
    title="Master of the Universe"
  />,
  node
);
```

We made our own special React component called `<NameTag/>` here, which houses a `div` and 2 `p` tags. Instead of hand-writing all this HTML if we wanted to render a long list of these duplicate tags, we can just create a single `<NameTag />` component and make a loop to create a bunch of them. That looks a little bit like this:

```js
function ListOfNameTags(props) {
  const { names } = props;
  return (
    <div className="name-tag-list">
      {names.map( person => <NameTag {...person} />)}
    </div>
  );
}

const names = [
  {
    name: "Jeff",
    title: "Master of the Universe"
  },
  {
    name: "Alex",
    title: "Master of the Sky"
  },
  {
    name: "Bubbles",
    title: "Master of Dinner"
  }
];

const node = document.getElementById('root');

ReactDOM.render(
  <ListOfNameTags
    names={names}
  />,
  node
);
```

This would give us the following HTML:

```html
<div id="root">
  <div class="name-tag-list">
    <div class="name-tag">
      <p>Name: Jeff</p>
      <p>Title: Master of the Universe</p>
    </div>
    <div class="name-tag">
      <p>Name: Alex</p>
      <p>Title: Master of the Sky</p>
    </div>
    <div class="name-tag">
      <p>Name: Bubbles</p>
      <p>Title: Master of Dinner</p>
    </div>
  </div>
</div>
```
### Vue

#### What is it?

Vue is an all in one framework and view library that can do both MVC and top-down data architectures.

#### Pros

* You can do either top-down data flow like React, **OR** MVC like Angular
* Incredible community happy to help people out
* Uses plain old templates and HTML (JSX can be daunting to look at, so this is a lovely change!)

#### Cons

* Learning curve - flexible to the point of being abused (like React)

Frameworks can be daunting to pick up, and whichever of these three major frameworks you pick, be prepared to study, learn, and search the web for answers that aren't covered very well in the official documentation.

From personal experience, I've been working with `React` for the last 3 years and it's been an absolute pleasure to work with. It's more of a library than a framework and offers great flexibility if one already has strong Javascript skills.

In fact, I would argue that strong Javascript skills and general strength of the language is your best friend when learning these tools. At the end of the day, **it's just Javascript!**


### TODO: Hey, Why is this chapter unfinished?

When I first started writing this chapter, I just wanted to talk about the basics and the three "macro" level pieces of JS architecture in a modern web application. Unfortunately, the scope of this chapter has grown so large to explain some large level concepts of the three most popular JS frameworks for use on the front end.

I will honestly and humbly admit that I have several years of experience with React, and zero professional years of experience with Angular 2+ or Vue, so I'm going to defer some parts of these frameworks until I sit down and really study up on them.

In the meantime, go ahead and enjoy the little bits of React knowledge in here :). I will continue to update this chapter and book as my current skillset improves and evolves to the ever changing ecosystem that's Javascript!

Love it or hate it, we're at such an exciting time to be a Javascript developer! This book will evolve with the language, and I'm just so excited to continue to share this knowledge with you as I myself continue to develop myself into a better developer and a better person.
