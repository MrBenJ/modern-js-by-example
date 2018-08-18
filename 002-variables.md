Variables and Simple Data Types
===============================

Let's talk basics of the basics.

## String

Strings are text. They're surrounded by either
* Single quotation marks (' ') or
* Double quotation marks (" ")  or
* Backticks (` `) - They're to the left of the "1" key on your (US) keyboard

```js
'Hello! I am a string'
"I am also a string"
`Me too. We are all strings`
```

## Number

Numbers are... Numbers. They represent numerical value.

```js
10
-1
200192003
5
```

These are all numbers.

## Booleans

Straightforward either true, or false

```js
true
false
```

## Declaring variables: `var`, `let`, and `const`

Variables store data, whether they're in a `String`, `Number`, or `Boolean` form. They're also used to store more complex data types, but we'll get there later.

```js
var hello = 'hello';
const MyAge = 29;
let isOldEnoughToParty = true;
```

Running `console.log()` against any of these variables will print out what their value is:

```js
console.log(hello); // => 'hello'
console.log(MyAge); // => 29
console.log(isOldEnoughToParty); // true
```

### The Significance of `var`

Before ES2015, aka ES6, there was ES5, the older version of Javascript.

The only way to declare a variable in this version was with using `var`.

`var` is a little quirky, because it's scope lives at the `function` level. It can also be redeclared.

```js
var i = 'oh dang';

function MyFunction() {
  var i = 10;
  var i = 1;
  var i = false;
}
```

What's the value of `i`? I don't really know this example... What do?

**Unless you need function scope, do not use var**

### Using `let` and `const`

Unlike `var`, `let` and `const` are block scoped, and not function scoped.

Take a look at this `for` loop:

```js

for(var i = 0; i < array.length; i++) {
  // Loop!
}

console.log(i); // => array.length
```

The `i` variable is still able to be accessed outside of the `for` loop because it's function scoped. If we used `let` instead, this would happen instead:

```js

for(let i = 0; i < array.length; i++) {
  // Loop!
}

console.log(i); // => undefined
```

This is much better because block scoping, while it being stricter, is much more maintainable than function scoping. If you had a gigantic function from a legacy project that had `var x = ...` declared multiple times, it would be pretty diffuciult to find the value and scope of `x`.

`let` and `const` aren't able to have the same identifiers between themselves or others.

```js

let first = 10;
first  += 5;

const first = 20; // => Exception: Identifier 'first' has already been declared
```

With block scoping, it's more limited and stricter, so just by looking at where the `let/const` is being used, you'll be able to understand the scope utilizing much less brainpower and thinking :D.

#### `let` vs `const`

`let` can be reassigned, and `const` cannot.

```js
let first = 10;

first = 20; // => OK

const second = 1000;
second = 2000; // => Exception: Cannot reassign 'const' value

```

Understand that you can still run methods on `const`, and those methods can change the value of a `const` variable.

```js
const myArray = [ 'raining', 'cats', 'and', 'dogs'];

myArray.pop();

console.log(myArray); // => [ 'raining', 'cats', 'and' ]

```

Just because something is a `const` does not mean that it's immutable.

## Destructuring

@TODO: Write stuff about destructuring!

## Symbol

@TODO: Write about Symbol

## Variable Shorthand and Syntax

Javascript now has some really great shorthand and convenience syntax when it comes to `Object`s.

Look at this excerpt, we used to have to do stuff like this:
```js
function onServerResponse(response) {

  var body = response.body;
  var firstName = body.firstName;   // Judy
  var lastName = body.lastName;     // Jenson
  var age = body.age;               // 32
  var occupation = body.occupation; // Programmer

  return {
    firstName: firstName,
    lastName: lastName,
    age: age,
    occupation: occupation
  };
}
```

There's quite a bit of repeated code with variables here, and it looks pretty repetitive. If a variable name will be the `key` of an object, you can just pass that in as the object.

```js
function onServerResponse(response) {

  var body = response.body;
  var firstName = body.firstName;   // Judy
  var lastName = body.lastName;     // Jenson
  var age = body.age;               // 32
  var occupation = body.occupation; // Programmer

  return {
    firstName,
    lastName,
    age,
    occupation
  };
  // returns { firstName: 'Judy', lastName: 'Jenson', age: 32, occupation: 'Programmer' }
}
```

Of course, if we add in destructuring, we can make this even shorter and more compact:

```js
function onServerResponse(response) {

  const { firstName, lastName, age, occupation } = response.body;

  return {
    firstName,
    lastName,
    age,
    occupation
  };
}
```

We can make this even shorter with the **Object Rest Spread Operator** too:

```js
function onServerResponse(response) {
  return { ...response.body };
}
```
Just be careful and make sure you're in agreement with your team about how explicit you want to be with this :).

## Object Method Shorthand

Defining methods on objects are usually done like this:
```js

var SomeObject = {
  performMagic: function(magic) {
    console.log('Alakazam! ', magic);
  }
};
```

Now we can do this instead:

```js

const SomeObject = {
  performMagic(magic) {
    console.log('Alakazam! ', magic);
  }
};
```
