Web APIs with JavaScript
========================

**JavaScript is the defacto language for the web at the time of this writing**. To understand the basics of how to do simple `Document Object Model` mutations and manipulations is something that many newbies start off with.

**NOTE**: The code snippets for this section will only work on modern browsers that support ES2015 or beyond.

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

**HTML** is our skeleton
**CSS** is what our skeleton wears to look pretty and look nice

**Javascript** is what makes our skeleton come to life.

## DOM Manipulations Everyone Should Know

In this chapter, I'm going to refrain from using common libraries that function as convenience methods or wrappers around vanilla JavaScript, like `lodash`, `underscore`, or `jQuery`. While these particular tools have been instrumental in the development of the language, the features and functionality these libraries have been adopted into the JavaScript language itself.

### Querying the DOM with selector strings

To query the DOM, you'll need to start off with
Selector strings look a little bit like this:

```
'input'
```

This selects any `<input>` elements on the document.





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

This is b