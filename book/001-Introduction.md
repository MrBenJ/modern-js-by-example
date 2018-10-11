Modern JavaScript by Example
============================

## Written by Ben Junya

# Introduction

In its humble beginnings, developers saw JavaScript as a toy, a joke, some scripting language that no one really wanted to mess around with. In all honesty, they were right. Why use a single-threaded, event driven, asynchronous language with all its weird callback and event looping when you could do everything synchronously with Java, C#, or Python? Why bother with all the craziness of abusing `setTimeout`, or bothering with loading in a million script files until your `<head />` exploded? Why?

Over time, languages and tools evolved, and as the web grew in size and complexity, more people needed to become proficient in JavaScript, and the front end started getting really complicated... Gone were libraries that you could load in with a `<script />` tag, and now there are frameworks, bundling systems, entire deployment systems all built in JavaScript.

While some old crotchety people will still balk and gripe that JavaScript is "not a real language" and stick to whatever language they're most familiar with, the fact that they, or someone on their team, will have to work with it at one point or another. It's grown so large that it's impossible to ignore today.

As the web evolved, so did the language. JavaScript has, for myself and my colleagues, been an absolute pleasure to work with. It took years of study, discipline, research, and training to get here, but here we are, and JavaScript... Is moving... Way... Too... Fast...

It's moving so fast that some of my favorite books like "Eloquent JavaScript" and "JavaScript - The Good Parts," while still being excellent resources that do their best to stay updated, have fallen behind. The language is constantly evolving, and as I read newer documentation, I find little to no concrete examples that involve real production level code... or the actual real-world use cases for all the new features of the language. In my years of teaching programming bootcamps, leading a development team, and reviewing millions of lines of JavaScript to my coworkers + colleagues, I have noticed a serious lack of resources for code examples and real world snippets that demonstrate **how** and **why** all these new pieces are important. As a result, it has become hard for newcomers to understand what makes Javascript a fun language to thoroughly enjoy and work with on a daily basis.

This book attempts to put in as many real world examples from some of the most popular libraries and tools of the time into an easy to digest format so that all programmers, regardless of their skill level, can enjoy and take value from.

# Prerequisites

This is meant to be an intermediate book on JavaScript. You should already know some of the basics of the language before jumping into this book. We won't take too much time to discuss the basics, as this book is intended to be a guide to intermediate and advanced JavaScript tools and techniques.

If you know:

* Higher Order Functions
* Basic Array methods
  * indexOf() and/or includes()
  <!-- alex ignore dad-mom -->
  * push() and pop()
  * slice()
  * splice()
  * shift() and unshift()
  * reverse()
  * sort() and filter()
* Basic String methods
  * split()
  * slice()
* Closures

You should be alright.

If you feel moderately comfortable with a popular modern framework like `React`, `Angular 2+`, or `Vue.js`, you should be in pretty good shape too. We'll use as many real world examples with these frameworks throughout this book, not just the front end UI stuff, but backend Node scripts and servers as well.

# Navigating the Book

Like many other developers, my eyes immediately move towards snippets of code. This book attempts to show as many examples as possible and keep the non-coding chat to a minimum. All important topics are in header tags for easy maneuvering and link-ability for sending information to colleagues and coworkers.

TODO:

* 006-Modern-JS-Architecture
* Recap sections for all chapters
