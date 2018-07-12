Complex Data Types
==================

## Object

We've all worked with straightforward JS Objects before:

```js
const Person = {
  name: 'Sheryl',
  occupation: 'Programmer',
  id: 18
}

Person.name; // => 'Sheryl'
Person.occupation; // => 'Programmer'
Person.id; // => 18
```

Objects don't keep an order of their properties. If you need to maintain a certain order of values, then use an Array.

## Arrays

Arrays are ordered values, that start at an index of 0.

```js
const MyArray = ['hello', 3, true, 'Jeff', { name: 'Sheryl'}];

MyArray[0]; // => 'hello'
MyArray[4]; // => { name: 'Sheryl' }
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

When you're constructing a `Map`, you can pass in an `Iterable` like an  `Array`, and it'll create key value pairs based on the object or array you pass in.

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

If you use `Object.entries()`, you can actually convert an `Object` to a `Map` pretty easily

```js
const Person = {
  name: 'Sheryl',
  occupation: 'Programmer',
  id: 18
}
// Creates the same map in the previous example
const PersonMap = new Map(Object.entries(Person));

PersonMap.get('name'); // => 'Sheryl'
PersonMap.get('occupation'); // => 'Programmer'
PersonMap.get(18); // => 18
```

Just like an object, you can iterate over a `Map`

```js
const Person = {
  name: 'Sheryl',
  occupation: 'Programmer',
  id: 18
}

// Iterating over an object
for (let key of Person) {
  console.log(Person[key]); // 'Sheryl, 'Programmer', 18 - but not guaranteed in that order!
}

// Iterating over a Map
const PersonMap = new Map(Object.entries(Person));

// You can iterate with the built-in #forEach
PersonMap.forEach( (key, value) => {
  console.log(key, value); // => 'name', 'Sheryl', 'occupation', 'Programmer', 'id', 18
});

// Or you can use a for-in loop
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
  isCriminal: 'yes'
};

const Sheryl = {
  id: 18,
  isCriminal: 'no'
};

const ValidationCache = new Map();
ValidationCache.set(Dave, false);
ValidationCache.set(Sheryl, true);

ValidationCache.get(Sheryl); // true
ValidationCache.get(Dave); // false
```

It's not just objects, you can use numbers, NaN, undefined, just about anything.


Unlike `Object`, `Map` is ordered by the order of insertion.

```js

const SomeMap = new Map();
SomeMap.set('first', 1);
SomeMap.set('second', 2);
SomeMap.set('third', 3);

for (let [key, value], in SomeMap) {
  console.log(key, value);
}
// Returns  in order:
// first, 1
// second, 2
// third, 3
```

## Practical Usage in Modern JS

SCENARIO:
We need a quick way to see if some users (represented by objects) are of legal drinking age in our hot "bar loyalty social media site startup".

```js
const LegalAgeCache = new Map();

const ArrayOfUsers = fetch('/users');
ArrayOfUsers.forEach( user => {
  LegalAgeCache.set(user, user.age >= 21); // Assuming we're in the USA. Sorry international students :(
});

// Now wherever we need to check the users that are above age 21...

if(LegalAgeCache.get(John)) { // Assuming John is some user object
  return 'beer';
} else {
  return 'appleJuice';
}
```

## WeakMap

WeakMap is the same as `Map`, but memory from unused references in the map can be cleaned up by JS garbage collection.
In terms of functional usage **WeakMap cannot be interated over** and is better for performance if you don't need to iterate over the map. The only methods available to `WeakMap` are:

* .get(key)
* .set(key, value)
* .has(key)
* .clear() (this removes everything from the WeakMap)

# Set and WeakSet

Set and WeakSet are identical to Map, except for 2 major differences:

1. Instead of `.set` for values, you use `.add()` to create a key value pair to store.
2. All values in a `Set` must be unique and only occur once.

As far as everything else, they are very identical and are ordered.

If you need a `Map`-like storage or cache, but all values must be unique, then `Set` is *perfect*!

Just like WeakMap, WeakSet allows unused references to be garbage collected, and it cannot be iterated upon.
