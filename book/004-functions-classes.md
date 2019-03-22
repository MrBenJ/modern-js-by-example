---
path: "/book/004-functions-classes"
title: "Functions and Classes"
chapter: 4
---

## Classes

In old versions of JavaScript, classes were just `function`s using the `this` keyword as context:

```js
function MyCustomObjectClass(color, name) {
  this.color = color;
  this.name = name;
}

var custom = new MyCustomObjectClass('blue', 'Tim');

custom.color; // => 'blue'
custom.name; // => 'Tim'
```

If you wanted to add methods to this "class" - you'd add your methods to the `prototype` chain.

```js
MyCustomObjectClass.prototype.introduceSelf = function() {
  console.log('Hello, my name is ' + this.name + ' and I have a color of ' + this.color);
}
```

In modern JavaScript, we now have `class` objects:

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

We can even extend our classes like we would in `Java` or `C++`.

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

custom.introduceSelf(); // => 'Hello, my name is Tim and I have a color of blue'
```

**NOTE** : The new `class` syntax is just sugar over the `prototype` chain inheritance.

That means this fancy ES2015+ code:

```js
class Animal {
  constructor(name, species) {
    this.name = name;
    this.species = species;
  }

  sayName() {
    console.log(this.name);
  }
}

const Doggie = new Animal('Jeff', 'Dog');
```

Does the exact same thing as this ES5 code:

```js
function Animal(name, species) {
  this.name = name;
  this.species = species;
}

Animal.prototype.sayName = function() {
  console.log(this.name);
}

var Doggie = new Animal('Jeff', 'Dog');
```

There's nothing magical or new here, it's just different syntax for doing the exact same thing.

## Static Properties and Methods

Especially prevalent in modern JavaScript frameworks are `static` methods and properties. These are used to define properties and methods on the `class` itself, and not the `instance`.

In short, you can't use the `this` keyword inside of a `static` method.

Here's a quick example to help illustrate what's happening:

```js
class Vehicle {
  constructor(vehicleParts) {
     // ... omitted for brevity
  }

  static factorySignature() {
    return {
      factoryId: '39d9eabc401de3a',
      location: 'Detroit, MI',
      securityHash: 'abe493b665f7467000bcf8c373b323fd',
      parentCorporation: 'JavaScript Vehicles Inc.'
    }
  }
  // other stuff in here...
}
```

Let's say I'm a car manufacturer with a factory that's sitting in Detroit, MI, and all my vehicles that come off the assembly line get secured with the `securityHash` above.

When I create a new vehicle:

```js
const sedan = new Vehicle(vehicleParts);
```

The static properties can be used internally within `Vehicle` to ensure whatever `new Vehicle()` comes out, it's good to go.

However, I won't be able to see the `factorySignature` on `sedan` here:

```js
sedan.factorySignature; // => undefined
```

But I can see the `Vehicle` static properties with `Vehicle.factorySignature`

```js
console.log(Vehicle.factorySignature());
/*
  {
    factoryId: '39d9eabc401de3a',
    location: 'Detroit, MI',
    securityHash: 'abe493b665f7467000bcf8c373b323fd'
    parentCorporation: 'JavaScript Vehicles Inc.'
  }
 */
```

The `factorySignature` doesn't exist inside `Sedan`, it exists inside `Vehicle`.

It's not just properties and objects you can keep as static values. You can create your own static methods too:

```js
class Coffee {
  constructor(coffeeProps) {
    // build coffee I guess... Omitted for brevity, but kept for self amusement
    this.quality = coffeeProps.quality;
  }

  static isExcellentCoffee(Coffee) {
    return Coffee.quality > 80;
  }
}
```

We can now use this static method as a utility to determine if a `Coffee` instance is good or not.

```js
const MyCoffee = new Coffee(coffeeProps);

Coffee.isExcellentCoffee(MyCoffee);
```

Keep in mind that `static` properties and methods are not hoisted or inherited. You'll need to use `Object.assign()` to hoist those statics to the newly extended class to do so.

```js
class AmazingCoffee extends ExcellentCoffee {
  constructor(coffeeProps) {
    super(coffeeProps);
  }
}

AmazingCoffee.isDelicious // => undefined

Object.assign(AmazingCoffee, Coffee);

AmazingCoffee.isDelicious // -> function() {}
```

## Practical usage of static properties and methods

Believe it or not, you're already using this stuff if you've used things like:

* Object.keys
* Object.entries

When you're using `Object.keys`, you're not running the `keys()` method on the instance of an `Object`. You're running on the `Object class` itself and passing in the `Object` as an argument.

```js
const Anthony = {
  name: 'Anthony',
  age: 32,
  occupation: 'Dentist'
};

// You can run Object.keys like this:
Object.keys(Anthony); // => ['name', 'age', 'occupation']

// But this won't work...
{}.keys(Anthony);  // => ERROR: keys is not a function

// This won't work either
Anthony.keys(Anthony); // ERROR: no value called 'keys' on 'Anthony'
```

That's because `Anthony` and `{}` are *instances* of `Object`. The static method `keys` lives on the `class Object` itself. If we were able to see a little of the ES6 source code of `Object`, would look a little like this:

```js
class Object {

  static keys(obj) {
    const keys = [];
    for (let key in obj) {
      keys.push(key);
    }
    return keys;
  }
}
```

By doing this, we're able to make specifically targeted helper methods on our classes, giving new versatility and flexibility by making utilities specific to our defined classes.

### Static typing in action

I'm working on a Node.js backend that's handling invoice data. Since I have to deal with `Invoice objects` so often, I'm going to create my own `Invoice` class.

```js
/**
 * class Invoice
 * Represents a single invoice in our backend
 *
 * @param {String} id          - Unique id of the Invoice
 * @param {String} payee       - Person/Company that owes us money
 * @param {Date}   dateCreated - Invoice creation date
 * @param {Date}   dueDate     - Date the amount is due
 * @param {Date}   receivedOn  - Date the amount was received
 * @param {Number} amount      - Amount due on invoice
 */
class Invoice {
  constructor(parameters) {
    const {
      id,
      payee,
      dateCreated,
      dueDate,
      receivedOn,
      amount
    } = parameters;

    this.id = id;
    this.payee = payee;
    this.dateCreated = dateCreated;
    this.dueDate = dueDate;
    this.receivedOn = receivedOn;
    this.amount = amount;
  }
}
```

Our company needs some analytics data to send to our front end developers so they can make some pretty charts and graphs of all this data. Let's create a static method on `Invoice` to total up the value of all these invoices.

```js
/**
 * Returns the total amount of an Array of Invoice objects
 * @param  {Array<Invoice>} invoices - An Array of Invoices
 * @return {Number}                  - Total value of invoices
 */
static getTotal(invoices) {
  let total = 0;
  invoices.forEach( invoice => {
    total = total + invoice.amount;
  });
  return total;
}
```

Now whenever we have a bunch of invoices, we just need to run this code and we'll have our total:

```js
Invoice.getTotal(arrayOfInvoices);
```

### Static properties and methods in modern JavaScript tooling

If you're familiar with `React`, you've most likely had to deal with declaring and checking `propTypes` and `defaultProps`

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  render() {
    const { className, onClick } = this.props;
    return (
      <div className={className} onClick={onClick}>
        Hello World!
      </div>
    );
  }
}

MyComponent.defaultProps = {
  onClick: () => {}
};

MyComponent.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
};
```

`propTypes` is better used as a static property, and it's supported in the latest babel syntax too.

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {

  static defaultProps = {
    onClick: () => {}
  }

  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired
  }

  render() {
    const { className, onClick } = this.props;
    return (
      <div className={className} onClick={onClick}>
        Hello World!
      </div>
    );
  }
}
```

As of `React v0.16.3`, a new lifecycle method was added called `getDerivedStateFromProps()`. Note that this lifecycle method is `static`, so it doesn't have access to `this`. It lives in the `class`, not the `instance`.

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MyComponent extends Component {
  static defaultProps = {
    onClick: () => {}
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.element.isRequired,
    onClick: PropTypes.func.isRequired
  }

  static getDerivedStateFromProps(props) {
    if (props.className === 'super-special') {
      return {
        secretClass: 'selectedColor'
      }
    } else {
      return null;
    }
  }

  state = {
    secretClass: ''
  }

  render() {
    const { className, onClick } = this.props;
    const { secretClass } = this.state;
    return (
      <div className={className} onClick={onClick}>
        <div className={secretClass}>
          {children}
        </div>
      </div>
    );
  }
}
```
If the `className` prop from the parent of `MyComponent` is **super-special** - it would render the first inner div of `MyComponent` with **selectedColor**.

Under the hood, `React` is using the `static getDerivedStateFromProps` lifecycle method on the `MyComponent` class to derive a state. Like the previous example, it doesn't live in the instance of the class, but the class itself.

## Getters and Setters

To those who are already familiar with Java, C, C++, or any of the sort, `getters` and `setters` are welcome additions to `class`es and `object`s in JavaScript. Unlike other languages, JavaScript has explicit `get` and `set` keywords that allow getters and setters to appear as properties while working as functions.

Let's go back to our `Invoice` class we made earlier, and add a `getter` to see if an invoice has been paid or not.

```js
/**
 * class Invoice
 * Represents a single invoice in our backend
 *
 * @param {String} id          - Unique id of the Invoice
 * @param {String} payee       - Person/Company that owes us money
 * @param {Date}   dateCreated - Invoice creation date
 * @param {Date}   dueDate     - Date the amount is due
 * @param {Date}   receivedOn  - Date the amount was received
 * @param {Number} amount      - Amount due on invoice
 */
class Invoice {
  constructor(parameters) {
    const {
      id,
      payee,
      dateCreated,
      dueDate,
      receivedOn,
      amount
    } = parameters;

    this.id = id;
    this.payee = payee;
    this.dateCreated = dateCreated;
    this.dueDate = dueDate;
    this.receivedOn = receivedOn;
    this.amount = amount;
  }
  // Adding our new getter here
  get isPaid() {

  }
}
```

We don't want the `isPaid` property on our `Invoice` class, so let's make a method that returns `true` or `false` if the invoice has been paid or not.

We can use `Invoice.receivedOn` to determine this.

```js
/**
  Returns a Boolean whether the invoice has been paid or not
  @return {Boolean} - true if paid, false if not paid
*/
get isPaid() {
  return Boolean(this.receivedOn);
}
```

Now if we want to see if an invoice is paid or not, we can just run `Invoice.isPaid()`.

Under the hood, the `isPaid` method is added to the object/classes's `prototype` chain, which gives it access to `this`.

```js
SomeInvoice.isPaid(); // => Boolean
```

Note that there's no `isPaid` attribute on an instance of `Invoice`. `isPaid`  is grabbing and returning `true` or `false` depending on the value of `this.receivedOn`.

Now let's say our client is awesome and paid us for our work (hooray!). Let's create a `setter` to set the `receivedOn` date.

```js
/**
  Pays an invoice and sets the date the invoice was paid.
  @param  {Date}    date - The date the invoice was paid on
  @return {Invoice}
*/
set pay(date) {
  this.receivedOn = date;
  return this;
}
```

Just for safety, I'm setting the return value to `this`. It's also demonstrating how `setters` also have access to `this`, just like `getters`.

If we just got paid today, all we have to do now is the following:

```js
SomeInvoice.pay = new Date();
```

Now if we run `SomeInvoice.isPaid`, it will return `true`, since `this.receivedOn` is truthy:

```js
SomeInvoice.isPaid // => true - Hooray! We got paid!
```

# Real world Examples of Classes

If you're familiar with `React`, you've probably seen `class syntax` when creating stateful React Components:

```js
import React, { Component } from 'react';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      value: ''
    };
  }

  submit = () => {
    // Submit comment!
  }

  render() {
    const { isLoggedIn, value } = this.state;
    return (
      <div className="comment-box">
        <textarea onChange={this.onTextInput} value={value}/>
        <button disabled={!isLoggedIn} onClick={this.submit}>Post</button>
      </div>
    );
  }
}

export default CommentBox;
```

Here we are creating a brand new React Component that extends the `Component` base class from the React package.

It just makes sense to use class syntax for React, since we'll intentionally instantiate many instances of the same React Component.
