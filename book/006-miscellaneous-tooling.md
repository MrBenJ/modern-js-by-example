---
path: "/book/006-miscellaneous-tooling"
title: "Miscellaneous Tooling"
chapter: 6
---

This chapter shows the less-common, but still good to know stuff when it comes to JavaScript. For the examples,  I'll do my best to show some real world situations for each one, but for the most part, you wouldn't really be using this stuff often. However, for the specific practical applications that you'll see, they're the perfect tool for doing so.

# Proxy API

A `Proxy` acts as a middle layer between reading/executing a property on an `Object`. It can be used to do a variety of things, like ensure the variables exists, return a default value, etc.

```js
const MyObject = {
  first: 'example',
  second: 2
  // MyObject doesn't have a 'third' property...
};

const MyProxy = new Proxy(MyObject, {
  get(object, property) {

    if (property === 'third') {
      return 3;
    } else {
      return object[property];
    }
  }
});

// MyProxy has all of the values of MyObject
console.log(MyProxy.first); // => 'example'
console.log(MyProxy.second); // => 2

// But MyProxy also has the 'third' property thanks to the get() handler we passed in!
console.log(MyProxy.third); // => 3
```

To create a `Proxy`, you'll pass in a `targetObject` and a `handler`

```js
const MyProxy = new Proxy(targetObject, handler);
```

## A Real World Use of Proxy

One really great use of `Proxy` is accessing environmental variables and validating them. Setting `process.env` as your target.

```js
const envs = new Proxy(process.env, {
  get(env, prop) {
    if (!env[prop]) {
      throw new Error(`Environmental Variable ${prop} is missing`);
    }
    return env[prop];
  }
});

console.log(envs.MY_MISSING_VALUE); // => throws an error
```

If you need to set some default values for your ENV variables, a `Proxy` is a great choice.

```js
// Oh no! Someone forgot to put in their database username!
process.env = {
  DB_USERNAME: 'MrBenJ',
  DB_PASSWORD: '********************'
};

const envs = new Proxy(process.env, {
  get(env, prop) {
    // No problem! Return the default DB url here!
    if(!env[prop] && prop === 'DB_URL') {
      return 'default.db.dev.com:3303';
    }
    return env[prop];
  }
});
```

It's not just `process.env` variables, you set defaults and do validation on just about anything.

Keep in mind that it's not only `get()` that can be sent to the handler. You can validate setting values on an object too:

```js
const Horse = new Proxy({}, {
  set(object, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new Error('age value must be a number');
    }
    object[prop] = value;
  }
});

Horse.age = 15; // OK
Horse.age = 'ageless'; // => Error: age value must be a number
```

Here's a few other methods you can override with a `Proxy` handler:

```js
const MyProxy = new Proxy({}, {
  deleteProperty(object, prop) { /* Handle any 'delete' operation on the target object */ },
  apply(object, thisValue, argumentsList) { /* Handle any function calls */ },
  has(object, prop) { /* Handles use of 'in' operator */}
});
```

To read up more on `Proxy` and all the features, [MDN's documentation is excellent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).
