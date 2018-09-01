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

Destructuring is a convenient way of getting exactly what you need from a `Object` or `Array`.


### Destructuring Objects

Instead of:
```js
function onServerResponse(response) {
  var body = response.body;

  var firstName = body.firstName;    // 'Ronny'
  var lastName = body.lastName;      // 'Rumples'
  var occupation = body.occupation;  // 'Programmer'
  var age = body.age;                // 44

  //...
}
```

You can grab `body` with some handy curly brace syntax:
```js
function onServerResponse(response) {
    const { body } = response;


    const { firstName, lastName, occupation, age } = body;
    console.log(firstName);   // 'Ronny'
    console.log(lastName);    // 'Rumples'
    console.log(occupation);  // 'Programmer'
    console.log(age)          // 44
    //...
}
```

You can go even more levels deeper like this:
```js
function onServerResponse(response) {
    const { body: {
      firstName,
      lastName,
      occupation,
      age
    } } = response;

    console.log(firstName);   // 'Ronny'
    console.log(lastName);    // 'Rumples'
    console.log(occupation);  // 'Programmer'
    console.log(age)          // 44

    // Note: Understand that 'body' will be undefined here:
    console.log(body); // undefined
}
```

If you wanted to get `body` along with everything else, you can do this:
```js
function onServerResponse(response) {
    const { body: {
      firstName,
      lastName,
      occupation,
      age
  }, body } = response;
    /*
      Above, we tell JS we want to pull firstName, lastName, etc from 'body',
      but we also tell it that we want 'body' declared too.
    */

    console.log(firstName);   // 'Ronny'
    console.log(lastName);    // 'Rumples'
    console.log(occupation);  // 'Programmer'
    console.log(age)          // 44


    console.log(body); // { firstName: 'Ronny', lastName: 'Rumples', ... }
}
```

It doesn't just happen within the body of a function either. You can destructure when you're declaring function parameters/arguments too:

```js
function onServerResponse({ body }) {
    const { firstName, lastName, occupation, age } = body;

    console.log(firstName);   // 'Ronny'
    console.log(lastName);    // 'Rumples'
    console.log(occupation);  // 'Programmer'
    console.log(age)          // 44

    //...
}
```
If the name isn't a valid JS variable name (has '-' or '.' characters), you can alias it through destructuring like this:

```js
function onServerResponse({ body }) {

    // body = { "domain-name": "Google", "google.com": "Established 1998" }
    const { 'domain-name': domainName, 'google.com': searchEngineInfo } = body;

    console.log(domainName);   // 'Google'
    console.log(searchEngineInfo);    // 'Established 1998'

    //...
}
```

Of course, if the name is a valid JS variable name, then you can omit the quotes:

```js
function onServerResponse({ body }) {


    const { firstName: first, lastName: last, occupation: job, age: years } = body;

    console.log(first);   // 'Ronny'
    console.log(last);    // 'Rumples'
    console.log(job);     // 'Programmer'
    console.log(years)    // 44

    // Note: 'firstName', 'lastName', 'occupation', and 'age' will all be undefined
    //...
}
```

### Destructuring Arrays

The party doesn't stop with `Objects`. If you know the array coming just has 2 values, you can destructure like this:

```js
const myArray = [ 'Hello', 'Clarice '];

const [ hello, clarice ] = myArray;

console.log(hello); // 'Hello'
console.log(clarice); // 'Clarise'

```

Of course, you don't need to name them `hello` or `clarice`. You can name them whatever you'd like:

```js
const myArray = [ 'Hello', 'Clarice '];

const [ greeting, name ] = myArray;

console.log(greeting); // 'Hello'
console.log(name); // 'Clarise'
```

A common usage of destrucuring is with `Object.entries`, since it returns an array with the Object's key/value pairs in the form of an Array:

```js
const MyObject = {
  name: 'Jeff',
  personality: 'Wild',
  isAwesome: true
};

Object.entries(MyObject).map( ([key, value]) => {
    console.log(key);  // 'name', 'personality', 'isAwesome'
    console.log(value); // 'Jeff', 'Wild', true
})

```

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

We can make this even shorter with the **Object Rest Spread Operator** too, assuming that `response.body` has only the key/value pairs we want to return in a new object:

```js
function onServerResponse(response) {
  return { ...response.body };
}
```

But what if `response.body` has some extraneous information in it? We can still use the **Object Rest Spread Operator**, but just pick out what we _don't want_ like this:

```js
function onServerResponse(response) {
  const { ssn, birthday, ...rest } = response.body;

  return { ...rest };
}
```

If you're confused about the syntax, the `...` is the **Spread Operator**. We go into much more detail on this operator in the next chapter.

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


## Recapping what we've learned

In this section, we learned about:
* `String`, `Number`, and `Boolean` oh my!
* Declaring variables using `var`, `let`, and `const`, including the differences between all three.
* Destructuring `Object` and `Array` data types
* Variable Shorthand and syntax.

If anything, this section was really meant to be a quick review on some basic variables and popular ES2015+ features like destructuring.

Ready for the next big challenge? Things get interesting in the next chapter!
