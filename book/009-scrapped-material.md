Scrapped Material
=================

This section contains scrapped material that I just didn't like, or wanted to just keep around for reference in the future.

## The Three Languages of the Web

We start with `HTML`, or `Hyper Text Markup Language`.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Blank Page</title>
  </head>
  <body>
    <div>This is a blank page</div>
  </body>
</html>
```

The skeleton of a web page is plain HTML text like above. Nothing too intense or exciting to look at unfortunately... But then we'll get to the second language of the web: `CSS`

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Blank Page</title>
    <style>
      body {
        background-color: dodgerblue;
        color: white;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div>This is a blank page</div>
  </body>
</html>
```

Now our blank page is a blank page with dodgerblue as our background-color. Yay!

**HTML** is our skeleton.
**CSS** is what our skeleton wears to look pretty and look nice.
**Javascript** is what makes our skeleton come to life.

## Basic Walkthrough of DOM querying

In this chapter, I'm going to refrain from using common libraries that function as convenience methods or wrappers around vanilla JavaScript, like `lodash`, `underscore`, or `jQuery`. While these particular tools have been instrumental in the development of the language, the features and functionality these libraries have been adopted into the JavaScript language itself.

DOM is an acronym for `Document-Object-Model`, which is what's used to power HTML web pages today.

### Querying the DOM with selector strings

If I wanted to find the first div on a page, I can do this by passing the string `'div'` into `document.querySelector`.

```js
const firstDiv = document.querySelector('div');
```

If I wanted to select **all of the div** elements on the page by using `document.querySelectorAll`. It looks like this:

```js
const divs = document.querySelectorAll('div');
```

Note that `querySelectorAll` returns a special kind of Array-like object called a `NodeList`.

`NodeList` can be iterated over with a `for` loop, but using `Array` methods like `forEach`, `map`, `find`, or `reduce` will not work. You can quickly turn a `NodeList` by using `Array.from()` It'll look like this:

```js
const nodeList = document.querySelectorAll('div');
nodeList.forEach(); // => Error: undefined is not a function
nodeList.map(); // => Error: undefined is not a function

const divs = Array.from(nodeList);

divs.forEach( x => console.log(x)); // => <div></div>
divs.forEach( x => console.log(x)); // => [<div</div>,<div></div>]
```


`querySelector` and `querySelectorAll` both use **CSS Selector Strings** to get what they need from the document. You can learn more about CSS selector strings and how to use them to query the DOM [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors).

In this book, we won't go too much beyond the scope of `id` and `class` selectors, since this is mainly a JavaScript book and not a front end web development book.

To select an element with a specific `class` attribute, add a `.` character to your selector string before you start. It looks like this:

```js
const element = document.querySelector('.some-class');
console.log(element); // => <input class="some-class">
```

To select an element with a specific `id` attribute, use `#` like this:
```js
const element = document.querySelector('#some_el');
console.log(element); // => <select id="some_el">{...} </select>
```


### Some Notes on web application design with `class` and `id` attributes

Everyone does JavaScript just a little bit differently, but there's some inherent "best practices" that I personally feel should be followed all the time, with only some serious exceptions to be made under really _really_ weird and oddball circumstances.

* `class` attributes on HTML elements are to mainly be used for styling, and querying the document with Javascript. You can have multiple classes on an element, and many instances of the same class on different elements.

* `id` attributes **must be unique** according to [W3C specifications](https://html.spec.whatwg.org/multipage/dom.html#the-id-attribute)

Because `id`s **must be unique**, it's considered bad practice to style your document with them.

Don't do this:

```css
#my_secret_id {
  margin: 10px 0;
  padding: 5px;
  background-color: #eee;
  color: #333;
}
```

This is because there's only **1 id on a page**, so we aren't able to reuse these styles.

`id` elements are best used for `Javascript`, and `class` elements are best used to style.

Querying the DOM with `id` is easy with the command, `getElementById`. All you need to do is pass in the `id` as a string, and the first element that has the `id` will be returned to you.

```js
const element = document.getElementById('my_secret_id');
console.log(element); // => <div id="my_secret_id">Hello!</div>
```

Using `getElementById` **is the fastest way to get an id element** on the DOM. Take advantage of the speed boost and use it as often as you need to.

Sometimes, you'll need to select a group of elements with a certain style. Let's say we're trying to select everything with the class name `.is-selected`.

You can do this with two different methods: `document.getElementsByClassName` or `document.querySelectorAll`.

```js
// Notice this method doesn't need the '.'
const selected = document.getElementsByClassName('is-selected'); // NodeList

// This method needs the '.' because it's using a CSS selector string
const selectedAgain = document.querySelectorAll('.is-selected'); // NodeList
```

A convention I've grown to really enjoy if I need to use `class` attributes and select multiple nodes to do JavaScript-like things to them, I'll add `js` to the name of the class.

Let's say I've got a list of `div` elements on a page, and I only want to select the ones that have a "selected" state, so I know to "unselect" these elements.

```html
<div class="checklist-container">
  <div class="checklist-item js-selected">Do Laundry</div>
  <div class="checklist-item">Take out trash</div>
  <div class="checklist-item">Topple Government Regime</div>
  <div class="checklist-item js-selected">Buy new chair online</div>
</div>
```
If I want to select only the `js-selected` classes in this document, I can do:

```js
const selected = document.querySelectorAll('.js-selected');
```

This will return only the `Do Laundry` and `Buy new chair online` elements.

I can then take these elements and remove them from the list if need be like this:

```js
// Remember: querySelectorAll returns a NodeList, not an actual array!
// Use Array.from() to run array methods!
const selected = Array.from(document.querySelectorAll('.js-selected'));

// Now we'll run a loop on all the elements and remove them:
selected.forEach( checklistItem => {
  checklistItem.remove();
});
```

## DOM Manipulations Everyone Should Know

### Adding and Removing Classes

The `classList` methods handle all of your class name needs.

`classList.add('some-class')` Adds `some-class` to an element:

Using this HTML:
```html
<div id="name_element" class="first-name">
  Alex
</div>
```

And running this Javascript:
```js
const element = document.getElementById('name_element');

element.classList.add('super-duper');
```

Yields this:

```js
<div id="name_element" class="first-name super-duper">
  Alex
</div>
```

There's 2 other methods `classList` offers that are similar:

`classList.remove()` will remove a class.
`classList.toggle()` will add the class if the element doesn't have it, or it'll remove the class. Think of it like "toggling a checkbox."

## Making Server Calls with Web APIs

In modern JavaScript, `fetch` is most commonly used to get data from a server because it returns a `Promise`, while its predecessor, `XMLHttpRequest`, uses a callback pattern.

While using `fetch` is more commonplace in modern JavaScript development, I still find it useful to know the basics of `XMLHttpRequest`, since there are still some web browsers ( Ugh... Internet Explorer) that just don't support `fetch`.

### XMLHttpRequest

Here's a quick example of making a quick GET request with `XMLHttpRequest`

```js

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.example.com/users');
xhr.onreadystatechange = () => {
  // xhr.readyState returns 4 if it's done. If it isn't, then just return
  if (xhr.readyState < 4) {
    return;
  }
  // if xhr.status is NOT 200, it means something went wrong
  if (xhr.status !== 200) {
    handleError(xhr);
    return;
  }

  if (xhr.readyState === 200) {
    // The request was successful! Go ahead and handle it:
    onSuccess(xhr.response);
  }
}
xhr.send();
```
