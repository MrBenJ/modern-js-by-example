Functions and Classes
=====================

## Classes

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

If you wanted to add methods to this "class" - you'd add your methods to the `prototype`

```js
MyCustomObjectClass.prototype.introduceSelf = function() {
  console.log('Hello, my name is ' + this.name + ' and I have a color of ' + this.color);
}

```

In modern Javascript, we now have `class` objects:

```js
class MyCustomObjectClass {
  constructor(color, name) {
    this.color = color;
    this.name = name;
  }
}

const custom = new MyCustomObjectClass('blue', 'Tim');
```

And we can add methods to it like this:

```js
class MyCustomObjectClass {
  constructor(color, name) {
    this.color = color;
    this.name = name;
  }

  introduceSelf() {
    console.log('Hello, my name is ' + this.name + ' and I have a color of ' + this.color);
  }
}

const custom = new MyCustomObjectClass('blue', 'Tim');
```

We can even extend our classes like we would in `Java` or `C++`

```js
class ExtraCoolClass extends MyCustomObjectClass {
  constructor(color, name, isCool) {
    super(color, name);
    this.isCool = isCool || true;
  }

  isCool() {
    return true;
  }
}

const custom = ExtraCoolClass('blue', 'Tim', true);

custom.introduceSelf() // => 'Hello, my name is Tim and I have a color of blue'
```


**NOTE** : The new `class` syntax is just sugar over the `prototype` chain inheritance
