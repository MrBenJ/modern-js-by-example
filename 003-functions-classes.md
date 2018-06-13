Functions and Classes
=====================

## Lexical `this`

Functions used to create their own `this` context when creating your own "class":

```js
function MyCustomObjectClass(color, name) {
  this.color = color;
  this.name = name;
}

var custom = new MyCustomObjectClass('blue', 'Tim');

custom.color; // => 'blue'
custom.name; // => 'Tim'
```
