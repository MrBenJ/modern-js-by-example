---
path: "/book/007-web-apis"
title: "Web APIs"
chapter: 7
---

Web APIs with JavaScript
========================

**JavaScript is the defacto language for the web at the time of this writing**. To understand the basics of how to do simple `Document Object Model` mutations and manipulations is something that many newbies start off with.

**IMPORTANT**: The code snippets for this section will only work on modern browsers that support ES2015 or beyond. For the most part, this will work in **Google Chrome**, **Firefox Quantum**, and **Microsoft Edge**. These examples will *not* work with *Internet Explorer 11 or below*

For this section, I am already assuming you, the reader, understand the basics of the following concepts:

* [Basics of HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [`id` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id)
* [`class` HTML attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class)
* [Basics of CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [CSS Selector Strings](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors)
* [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Glossary/XHR_(XMLHttpRequest))
  * **Note**: This was discussed briefly in **Chapter 5**

With that out of the way, let's look at some examples :).

## DOM Manipulation APIs

In this section, I'm going to refrain from using common libraries that function as convenience methods or wrappers around vanilla JavaScript, like `lodash`, `underscore`, or `jQuery`. While these particular tools have been instrumental in the development of the language, the features and functionality these libraries have been adopted into the JavaScript language itself.

### DOM Data Structures and Return Types

#### Element and Node

For the most part, Elements and Nodes are one in the same. In practical usage, these terms are used interchangeably, since Elements are technically Nodes.

`Node` is the generic name for **any type of object in the DOM**.

`Element` is one specific kind of `Node` - it can be a `Text Node`, a `Comment Node`, a `<div> Node`

For your day-to-day work as a developer, this stuff is good to know, but from a pragmatic and practical standpoint, they're very much similar, and in my typical day-to-day, (opinion!) I use the term "Element."

#### HTMLCollection and NodeList

`HTMLCollection` and `NodeList` are extremely similar, in that they're both `return` types from very common `document` methods like `querySelectorAll` and `getElementsByClassName`.

The biggest difference between the two is:

`HTMLCollection` is a **live and updating reference** to a list of `Elements`. As elements on the page change, so do the values inside of HTMLCollection.

`getElementsByClassName`, and `getElementsByTagName` will return an **`HTMLCollection`**.

`NodeList` is **static and non-updating**. If the Elements or nodes on the document change, the values inside of NodeList will not change.

`querySelector` and `querySelectorAll` return a **`NodeList`**.

For reference, you can look at the extensive MDN documentation for both [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection) and [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/nodelist)
##### Gotchas

HTMLCollection and NodeList return an "Array-like" object that you can use in a loop without any problems.

```js
const selectedElements = document.getElementsByClassName('js-selected');

selectedElements.length // => a Number
selectedElements[0] // => First element found (<div class="js-selected">...</div>)
```

But we won't be able to do things like this:
```js
// Grab all our form elements
const formElements = document.getElementsByTagName('form');

selectedElements.forEach( form => { /* ... */ }); // => Error! forEach is undefined
```

HTMLCollection doesn't have all the `Array` methods on it like `map`, `forEach`, `reduce`, `join`, etc.

If you want to get around this, you can use `Array.from()` and create a new array from an `HTMLCollection` or `NodeList`.

```js
const selectedArray = Array.from(document.getElementsByClassName('js-selected'));

selectedArray.forEach( item => { /* ... */}); // Works!
selectedArray.map( item => { /* ... */}); // Also Works!
selectedArray.reduce( (accum, item) => { /* ... */}); // Yay! It works!
```

A strange oddity to note is that `NodeList` **does have** `.forEach`, but it's only supported in modern browsers. There are some very nuanced differences in methods between `NodeList` and `HTMLCollection`, but for the most part, these are "good to know" concepts and tools.

### DOM Manipulations and Queries Everyone Should Know

At the heart of any Javascript framework like `React`, `Angular`, or `Vue` is one major component - **DOM Manipulation**.  It's important to know that no matter what you're doing on the web to make elements appear, disappear, move, grow, shrink, etc - you're doing **DOM Manipulation**.

This is a small reference of what I find to be the most important parts of basic DOM manipulation that I strongly feel every developer should know. While vanilla DOM manipulation in single page applications is seldom, if not frowned upon (looking at you `React`!) it's still good to know and have this knowledge should someone fall into limitations where they can't use tools or frameworks to do simple things.

#### getElementsByClassName

Running `document.getElementsByClassName()` grabs all the elements on the HTML document. Returns an `HTMLCollection`.

```js
// Grab all of the bold text elements on the page:
const boldTextElements = document.getElementsByClassName('bold');
```

Since `class` attributes are often attributed to styling with CSS, you can grab particularly styled elements (like bold text or selected elements) and restyle them with `classList` methods.

```js
/**
 *  Unbolds all the elements on the page
 *  @return {undefined}
 *
 */
function unboldElements() {
  // Using Array.from() so we can use forEach
  const boldTextElements = Array.from(document.getElementsByClassName('bold'));

  boldTextElements.forEach( boldText => {
    boldText.classList.remove('bold');
  });
}
```

#### getElementsByTagName

This grabs all the elements by their tag name, like `div`, `span`, `article`, or `form`. Returns an `HTMLCollection`.

```js
// Grab all the <form> elements
const forms = document.getElementsByTagName('form');
```

If there's no matching tags, an empty `HTMLCollection` will be returned.

#### querySelector

Grabs **only the first** element from a CSS selector string

```js
// Grabs the first <form> element on a page
const form = document.querySelector('form');
```

```js
// Grabs the first element with the class "selected"
const selectedItem = document.querySelector('.selected');
```

Returns `null` if there's no match.

#### querySelectorAll

Same as `querySelector`, except it returns a `NodeList` of all matching elements.

```js
// Grab ALL elements with the `selected` class
const allSelectedItems = document.querySelectorAll('.selected');
```

Returns an empty `NodeList` if nothing is found.

#### Element.classList

`Element.classList` contains all of the class name operations one could ever ask for:

##### classList.add()
Takes a string or strings as arguments.
Adds the class(es) you pass in:

Single class to add
```js
// <div id="my_element" class="some-class"></div>
const element = document.getElementById('my_element');

element.classList.add('selected');

// <div id="my_element" class="some-class selected"></div>
```

For multiple classes:
```js
// <div id="my_element" class="some-class"></div>
const element = document.getElementById('my_element');

element.classList.add('selected', 'magical', 'unicorn');

// <div id="my_element" class="some-class selected magical unicorn"></div>
```

##### classList.remove()

Removes the class(es) passed in.

**NOTE** - Removing classes that aren't on the element **will not** throw an error.

Removing one class
```js

// <div id="my_element" class="some-class selected"></div>
const element = document.getElementById('my_element');

element.classList.remove('selected');

// <div id="my_element" class="some-class"></div>
```

Removing multiple classes

```js

// <div id="my_element" class="some-class selected magical unicorn"></div>
const element = document.getElementById('my_element');

element.classList.remove('selected', 'magical', 'bears');

// <div id="my_element" class="some-class unicorn"></div>
```
Note that `"bears"` didn't exist on the previous class. This is fine and **will not throw an error**

##### classList.toggle()

Toggles the class. If the element has the class passed into the method, `toggle` will remove it. If the element **does not** have the class, it adds it. Great for checkboxes and selecting/unselecting.

```js
// <div id="my_element"></div>
const element = document.getElementById('my_element');

element.classList.toggle('selected');
// <div id="my_element" class="selected"></div>

element.classList.toggle('selected');
// <div id="my_element"></div>
```

#### Element.setAttribute()

`Element.setAttribute` takes 2 parameters:
```js
Element.setAttribute(nameOfAttribute: String, valueOfAttribute: any)
```

`nameOfAttribute` is the attribute to set on an element, like if you wanted to give an `id` to an element, it would look like this:

```js
const element = document.getElementsByTagName('div')[0]; // Grab the first div on the page
element.setAttribute('id', 'my_element');
// element => <div id="my_element"></div>
```

#### Element.getAttribute()

Like its predecessor, `setAttribute`, this just returns the value of an attribute like so:

```js
const element = document.getElementsByTagName('div')[0]; // Grab the first div on the page
// element => <div id="my_element"></div>

console.log(element.getAttribute('id')); // => 'my_element'
```

### Dataset and data-* attributes

If you want an element to hold onto data without showing anything inside of it, you can use a `data-attribute`. As long as the name of the attribute starts with `data-` - You can pretty much put in anything after that.
```html
<div class="my-item" data-name="sprinkler" data-created="11/16/2018">
  Bobby the Sprinkler
</div>
```
