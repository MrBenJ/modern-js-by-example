---
path: "/book/003-complex-data-types"
title: "Complex Data Types"
chapter: 3
---

## Object

Consider a straightforward JavaScript `Object`:

```js
const Person = {
  name: 'Sheryl',
  occupation: 'Programmer',
  id: 18
};

Person.name; // => 'Sheryl'
Person.occupation; // => 'Programmer'
Person.id; // => 18

// Or you can do this:
Person['name']; // => 'Sheryl'
Person['occupation']; // => 'Programmer'
Person['id']; // => 18
```

Objects are containers for named values (properties), sometimes referred to as key/value pairs. Names are always stored as strings, but values can be any type, including objects.

Objects don't keep an order of their properties. If you need to maintain a certain order of values, then use an `Array`.

You can access properties through dot syntax or bracket syntax.
```js
const Person = {};

// Dot Syntax
Person.name = 'Sheryl';

// Bracket Syntax
Person['occupation'] = 'Programmer';

// 'occupation' doesn't have to be a plain string. It can be a variable that's holding a string value
const myKey = 'id';
Person[myKey] = 18;

console.log(Person); // => {name: "Sheryl", occupation: "Programmer", id: 18}
```

A new concept that's becoming more popular is declaring an object's keys dynamically using a combination of bracket and curly brace syntax. It looks a little bit like this:

```js
const key = 'myKey';

const dynamicObject = {
  [key]: 'myValue'
};

console.log(dynamicObject.myKey); // => 'myValue'
console.log(dynamicObject[key]); // => 'myValue'
```

## Arrays

Arrays are ordered values that start at an index of 0. Arrays can store any type, including arrays and objects.

```js
const MyArray = ['hello', 3, true, 'Jeff', { name: 'Sheryl' }, [0, 1, 2, 3, 'hello']];

MyArray[0]; // => 'hello'
MyArray[4]; // => { name: 'Sheryl' }
MyArray[5]; // => [0, 1, 2, 3, 'hello']
```

## Map and WeakMap

`Map` objects create a traditional `get` and `set` interface around data stored in `key/value` pairs.

```js
const MyMap = new Map();

MyMap.set('name', 'Sheryl');
MyMap.set('occupation', 'Programmer');
MyMap.set('id', 18);

MyMap.get('name'); // => 'Sheryl'
MyMap.get('occupation'); // => 'Programmer'
MyMap.get('id'); // => 18
```

When you're constructing a `Map`, you can pass in an `Iterable`, like an `Array`, and it'll create key value pairs based on the object or array you pass in.

```js
const OrderMap = new Map([
  'Welcome',
  'To',
  true,
  'life',
  'programming'
]);

// All the 'keys' will be indexes from the array
OrderMap.get(0); // => 'Welcome'
OrderMap.get(3); // => 'life'
OrderMap.get('whatev'); // => undefined
```

If you use `Object.entries()`, you can actually convert an `Object` to a `Map` pretty easily:

```js
const Person = {
  name: 'Sheryl',
  occupation: 'Programmer',
  id: 18
};

// Creates the same map in the previous example
const PersonMap = new Map(Object.entries(Person));

PersonMap.get('name'); // => 'Sheryl'
PersonMap.get('occupation'); // => 'Programmer'
PersonMap.get(18); // => 18
```

Just like with an object, you can iterate over a `Map`

```js
const Person = {
  name: 'Sheryl',
  occupation: 'Programmer',
  id: 18
};

// Iterating over an object
for (let key in Person) {
  console.log(Person[key]); // 'Sheryl, 'Programmer', 18 - but not guaranteed in that order!
}

// Iterating over a Map
const PersonMap = new Map(Object.entries(Person));

// You can iterate with the built-in #forEach
PersonMap.forEach( (key, value) => {
  console.log(key, value); // => 'name', 'Sheryl', 'occupation', 'Programmer', 'id', 18
});

// Or you can use a for-of loop
for (let [ key, value ] of PersonMap) {
  console.log(key, value); // => 'name', 'Sheryl', 'occupation', 'Programmer', 'id', 18
}

// If you only need keys or values, you can use for-of with the .keys() or .values() methods
for (let key of PersonMap.keys()) {
  console.log(key); // => 'name', 'occupation', 'id'
}

for (let value of PersonMap.values()) {
  console.log(value); // => 'Sheryl', 'Programmer', 18
}
```

Think of `Map` like an enhanced object. Unlike an object, you can find out how many key/value pairs exist inside `Map`

```js
// Finding the size of an Object
Object.keys(Person).length; // => 3

// Finding the size of a Map
PersonMap.size; // => 3
```

The REAL power comes from having non-string keys.

```js
const Dave = {
  id: 19,
  likesBacon: 'yes'
};

const Sheryl = {
  id: 18,
  likesBacon: 'also yes'
};

const ValidationCache = new Map();
ValidationCache.set(Dave, false);
ValidationCache.set(Sheryl, true);

ValidationCache.get(Dave); // false
ValidationCache.get(Sheryl); // true
```

It's not just objects, you can use numbers, NaN, undefined, just about anything.


Unlike `Object`, `Map` is ordered by the order of insertion.

```js
const SomeMap = new Map();
SomeMap.set('first', 1);
SomeMap.set('second', 2);
SomeMap.set('third', 3);

for (let [key, value] of SomeMap) {
  console.log(key, value);
}
// Returns in order:
// first, 1
// second, 2
// third, 3
```

## Practical Usage in Modern JavaScript

SCENARIO:
We need a quick way to see if some users (represented by objects) are of legal drinking age in our hot "bar loyalty social media site startup".

```js
const LegalAgeCache = new Map();

const ArrayOfUsers = fetch('/users');
ArrayOfUsers.forEach( user => {
  LegalAgeCache.set(user, user.age >= 21); // Assuming we're in the USA. Sorry international students :(
});

// Now wherever we need to check the users that are above age 21...

if (LegalAgeCache.get(John)) { // Assuming John is some user object
  return 'beer';
} else {
  return 'appleJuice';
}
```

## WeakMap

WeakMap is the same as `Map`, but memory from unused references in the map can be cleaned up by JS garbage collection.
In terms of functional usage **WeakMap cannot be iterated over** and is better for performance if you don't need to iterate over the map. The only methods available to `WeakMap` are:

* `.get(key)`
* `.set(key, value)`
* `.has(key)`
* `.clear()` (this removes everything from the WeakMap)

`WeakMap` can only use keys that are of type `Object`, meaning you can't use plain `String` or `Number`, and you can't use primitive data types like `Symbol` either.

```js
const myObject = {
  name: 'Jeff'
};

const myWeakMap = new WeakMap();

// This is fine because myObject is a variable that's of type, Object
myWeakMap.set(myObject, 'Jeff is awesome'); // myWeakMap.get(myObject) => 'Jeff is awesome'

// This will throw an error, because it's a hardcoded string
myWeakMap.set('Jeff', 'Jeff is cool'); // Error: Invalid value used as weak map key
```

Under the hood, if an object has no more references pointing to it, it will be cleaned up by the garbage collector, and in turn, deletes `WeakMap`'s reference to the cleaned up object, which deletes the corresponding value.

# Set and WeakSet

Set and WeakSet are identical to Map, except for 2 major differences:

1. Instead of `.set` for values, you use `.add()` to create a key value pair to store.
2. All values in a `Set` must be unique and only occur once.

As far as everything else, they are very identical and are ordered.

If you need a `Map`-like storage or cache, but all values must be unique, then `Set` is *perfect*!

Just like WeakMap, WeakSet allows unused references to be garbage collected, and it cannot be iterated upon.

# The Spread Operator
<!-- alex ignore periods -->
When you see three dots/periods like this: `...` - it's a brand new operator called the `spread operator`.

## Spread Operator on Arrays

Using `...` on an array will iterate through the array and return all the values in order.

```js
const myArray = ["let's", 'party', 'right', 'now!'];
console.log(...myArray); // => let's party right now
```

`...` also returns a brand new array if you use it like this:

```js
const newArray = [...myArray];
console.log(newArray) // => ["let's", 'party', 'right', 'now!']
```

## Rest Spread Operator

**NOTE**: This feature was recently resolved to Stage-4 on January 28th, 2018 as per TC39. It's now a standard of the language. With this feature being very new to JavaScript, you may need a transpiler like `babel` or `TransformJS` to use this feature. More on this in a future chapter.

### Rest Spread on Arrays

On an `Array`, if you need to grab the first few elements through destructuring and keep the rest for later, you can use the `rest spread operator`.

```js
const selectiveArray = ['important', 'strings', 'here', 'but', 'not', 'these'];

const [ first, second, third, ...rest ] = selectiveArray;

console.log(first); // => 'important'
console.log(second); // => 'strings'
console.log(third); // => 'here'
console.log(rest); // => ['but', 'not', 'these']
```

Keep in mind that the word `rest` is typically used to denote "the rest of the items," and it's not required to use `rest`. You can use any word you want.

```js
const animals = ['corgi', 'dachshund', 'pomeranian', 'dwarf', 'persian', 'calico'];

const [ cutest, shortest, foofiest, ...cats ] = animals;

console.log(cutest); // => 'corgi'
console.log(shortest); // => 'dachshund'
console.log(foofiest); // => 'pomeranian'
console.log(cats); // => ['dwarf', 'persian', 'calico']
```

### Rest Spread on Objects

Using the `spread operator` on an `Object` will iterate through the object and drop key/value pairs accordingly into a new object.

```js
const guy = {
  name: 'Jeff',
  age: 44,
  occupation: 'Pyrotechnician'
};

const copyOfGuy = { ...guy };

console.log(copyOfGuy); // => { name: 'Jeff', age: 44, occupation: 'Pyrotechnician'}
```

By doing this, you can merge simple and shallow objects together like this:

```js
const guy = {
  name: 'Jeff',
  age: 44,
  occupation: 'Pyrotechnician'
};

const guyUpdated = {
  name: 'Jeff',
  age: 45,
  occupation: 'Firefighter',
  isReallyHappy: true
};

const mergedCopy = {
  ...guy,
  ...guyUpdated
};

console.log(mergedCopy); // => { name: 'Jeff', age: 45, occupation: 'Firefighter', isReallyHappy: true }
```

Keep in mind that the last `...rest` you do in an object will overwrite all the previous values. If we switched the order above, we'd get this:

```js
const mergedCopy = {
  ...guyUpdated,
  ...guy
};

console.log(mergedCopy); // => { name: 'Jeff', age: 44, occupation: 'Pyrotechnician', isReallyHappy: true }
```

The **age** and **occupation** values were overwritten because `guy` is the last object in the sequence instead of `guyUpdated`

**Note:** This will work for only `Object`s that are one level deep. It is _not recommended_ to try and deep copy and merge nested objects using this method. That's a whole different can of worms.

#### Returning new modified objects and arrays

In functional programming and tools/libraries that require new copies of objects or arrays like `React` and `Redux`, it's common practice to use `Object.assign()` to create some new objects using another as a "base object." Now instead of using `Object.assign()`, it's common (and cleaner, in my personal opinion) to use the `spread operator` in order to return new Objects and Arrays.

Here's the `Object.assign()` way of returning new objects with modifications
```js
// BEFORE

function incrementCount(counterState) {
  // Create a new copy of the counterState object
  const copyOfCounterState = Object.assign({}, counterState);

  // Grab just the value from the old counterState
  const { value } = counterState;

  copyOfCounterState.value = value + 1;
  return copyOfCounterState;
}
```

Let's refactor this to use the `spread operator` on objects:
```js
function incrementCount(counterState) {
  const { value } = counterState;
  return {
    ...counterState, // Iterate through key/value pairs in counterState
    value: value + 1 // overwrite counterState.value with the newly incremented value
  };
}
```

#### Deep copying Objects

Sometimes your objects are nested, and just using `Object.assign()` won't do the trick. You'll need to do a little bit more leg work in order to clone a deeply nested object.

```js
const nestedObject = {
  name: 'Jeff',
  occupation: 'Firefighter',
  siblings: [
    'Annie',
    'Larry'
  ],
  age: 45,
  authorizations: {
    token: 'ffe1895acc3bd3ea2a',
    permissions: ['filesystem', 'coffee', 'fire', 'admin'],
    certifications: {
      fireSafety: true,
      insulation: true,
      educationLicense: false,
      fireworks: true
    }
  }
};
```

This is a pretty deeply nested object here...
```js
// @TODO: Write an example of how to deeply copy an object
```

# Symbol

I felt a bit hesitant about putting `Symbol` in this book because it has such limited usage, and isn't really used often in everyday JavaScript development. However, I find myself consistently seeing this data type in transpiled code, polyfilled, and living inside of libraries and tools that I use everyday.

While I probably won't use `Symbol` very often myself, I find knowing what it actually is quite nice, and makes me think of finding a way to implement it for my own special data types from project to project.

`Symbol()` takes in one optional parameter, a `String` that's used to describe what it is. It can be used for debugging, but not for access to the `Symbol` class itself.

```js
const MyFirstSymbol = Symbol('first one');
console.log(MyFirstSymbol); // 'Symbol('first one')'
```

Running `typeof` on a `Symbol` returns the string: 'symbol', and it's considered a totally unique value and will return false for any comparison or evaluation:
```js
const MyFirstSymbol = Symbol('first one');

console.log(typeof MyFirstSymbol); // 'symbol'
console.log(MyFirstSymbol === Symbol('first one')); // false
```

You'll see `Symbol` used when creating an `Iterator` in the next section below!

Note: MDN's online documentation on `Symbol` is excellent and very well written. [Check it out here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol).


# Iterators and Iteration Protocol

Iterators are a staple data type in other programming languages and have now come to JavaScript.

There's 3 major parts of the `Iterator` interface:
```js
{
  next() { return Iterator; },
  value: 'anything', // Can be anything
  done: false, // Can be true, false, or undefined
}
```

The `Iterator` protocol makes any `Object` that follows the protocol able to be iterated on through loops, spread operator, generators, etc.

```js
// @TODO: Finish up the Iterators section!
```

## Recapping What We've Learned

In this chapter, we talked at great length about:

* `Object` and `Array` data types
* `Map`, `Set`, `WeakMap`, and `WeakSet`, along with all of their differences, and how to construct them.
* The Spread Operator and how it can be used over `Object`s and `Array`s
* Merging and copying `Object` and `Arrays`
