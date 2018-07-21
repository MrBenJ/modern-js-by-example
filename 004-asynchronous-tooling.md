Asynchronous Tools for Modern Javascript
========================================

# Promises

Javascript is totally asynchronous and used to use a callback pattern to guarantee order of execution.

```js

function ExecuteTwoThingsInOrder(callback) {
  console.log('I will execute first');
  callback();
}

ExecuteTwoThingsInOrder(() => {
  console.log('I will execute after the first thing is done');
});
```

Just two things is fine, but what if you were trying to get a bunch of functions executing in order?

```js
DoSomething( callback => {
  callback( callback => {
    callback( callback => {
      callback( callback => {
        callback( callback => {
          callback( callback => {
            console.log('I will execute last, guaranteed!');
          });
        });
      });
    });
  });
});

```
Readable? Not really. Fun?  No. This is what keeps Node programmers up at night in a cold sweat.

Of course it's a problem, but now we've got a brand new shiny tool to stop callback hell.

**IMPORTANT**
Promises are extremely important in understanding modern Javascript architecture and applications. If you don't understand how Promises work, the rest of this book will be very difficult to follow.

## Introduction to Promises

Under the hood, a **Promise** is a `state machine`. There's a 3 main states that a `Promise` can be in:

1. **Pending**
    The promise has started its work, but hasn't finished yet.
2. **Resolved** -or- **Fulfilled**
    The promise has resolved or fulfilled its initial task, and is ready to execute whatever needs to happen next in it's `resolve` function
3. **Rejected**
    Something unfortunate happened and there was an error or exception somewhere in the process.

As a programmer, I need to define what constitute the `Promise` reaching a **resolved/fulfilled state**, or a **rejected** state.

In this example, I'm making a XHR request to `https://www.example.com/api/v2/users.json` to get some JSON data from the internet:
```js
// I'm passing in resolve, and reject, the callbacks that will
// determine if something is successful or not...
const GetUsersAsJSON = new Promise( (resolve, reject) => {
  // The promise is now in the 'Pending' state
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.example.com/api/v2/users.json');

  xhr.onreadystatechange = () => {
    if(xhr.readyState < 4) {
      // The XHR request hasn't completed yet, so I'm just going to return here.
      return;
    }

    if(xhr.status !== 200) {
      // The Status code of the request is NOT 200, so it must have failed in some way. Reject the promise
      reject(xhr.response);
      // After calling reject(), the Promise enters 'rejected' state.
    }
    if(xhr.readyState === 4) {
      // The readyState of the request is '4', which means its done.
      // Parse the response into JSON format and resolve the promise
      resolve(JSON.parse(xhr.response));
      // After calling resolve(), the Promise enters 'resolved' or 'fulfilled' state.
    }
  }
  xhr.send();
});
```

Great! Now if I want to use this data, I'd need to add a `then()` statement after calling the promise:

```js
// .then() takes a function as an argument. The first argument will be whatever value is passed into
// the `resolve()` function.

GetUsersAsJSON.then( users => {
  console.log(users); // => { name: 'Sheryl', occupation: 'Programmer' }
});
```

The `then` statement gives us a plain English way of telling the program what to do next, but what if something wrong happens to our GET request? That's when we chain a `catch` method like this:
```js

GetUsersAsJSON.then( users => {
  console.log(users); // => { name: 'Sheryl', occupation: 'Programmer' }
}).catch( error => {
  console.error(error); // => Error - You aren't connected to the internet (or whatever the error is)
})
```

The old way of doing this with callbacks looks a little something like this:
```js
// In NodeJS style callbacks, the error is the first argument, then the data
GetUsersAsJSON(function(error, users) {
  if(error) {
    throw error; // => Error!
  }
  console.log(users); // => { name: 'Sheryl', occupation: 'Programmer' }
});
```

For one single call, this doesn't look too terrible, but if we were chain 3 or 4 different API calls with this callback pattern, it'll look a little more like this:

```js
GetUsersAsJSON(function(error, users) {
  if (error) {
    throw error;
  }

  GetUserInformation(function(error, userInfo) {
    if (error) {
      throw error;
    }

    GetLinkedCommentDetails(function(error, details) {
      if (error) {
        throw error;
      }

      // This is the third call and note how the code is moving to the right....
    });
  });
});

// This example uses NodeJS style callbacks where the first argument is an error.
// If there is no error, error will be `null`
```

This is just for 3 data calls in a fairly typical REST pattern of making multiple calls to an API. Now let's look at the `Promise` version of the same code:
```js
GetUsersAsJSON()
  .then(GetUserInformation)
  .then(GetLinkedCommentDetails)
  .catch( error => {
    throw error;
  });
```

Instead of manually watching for each error happening along the way, you can just pass in the `function` into `then` and it will run with the resolved data.

## Examples

### Turning a callback into a Promise-ified function

Making a GET request to a server is a very common pattern, but instead of using the callback style `XMLHttpRequest` function, let's make it a `Promise`.

```js
/**
  Gets JSON data from a URL you pass in
  @param {String} url - URL to grab data from
  @return {Promise<JSONObject>}
*/
function getJSON(url) {
  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = () => {
      if(xhr.readyState < 4) {
        // The XHR request hasn't completed yet, so I'm just going to return here.
        return;
      }

      if(xhr.status !== 200) {
        // The Status code of the request is NOT 200, so it must have failed in some way. Reject the promise
        reject(xhr.response);
      }
      if(xhr.readyState === 4) {
        // The readyState of the request is '4', which means its done.
        // Parse the response into JSON format and resolve the promise
        resolve(JSON.parse(xhr.response));
      }
    }
    xhr.send();
  });
}
```
Now let's use this function like this:

```js
getJSON('https://www.github.com/api/v2/users/MrBenJ')
  .then( data => {
    console.log(data); // => Data from github!
  }).catch( error => {
    throw error; // Oh no, something bad happened!
  });
```

### util.promisify

Node version 8 introduced a new utility called `promisify`, which takes a NodeJS style callback (error first, data/result second) and wraps it into a `Promise`.

For instance, let's take the `fs` (filesystem) module in Node and turn the `fs.readFile` call into a Promise based one:

```js
const util = require('util');
const fs = require('fs');

const ReadFilePromise = util.promisify(fs.readFile);

ReadFilePromise('./package.json')
  .then( data => {
    console.log(data); // Text of package.json
  });
```

### Fetch API

The `fetch` keyword is becoming more and more commonplace in modern front end web development, as all major browsers (Chrome, Firefox, Opera, and even Internet Explorer) have a first class `fetch` keyword available on `window`.

`Fetch` is just like `XMLHttpRequest` except instead of using a callback pattern with `XMLHttpRequest.onreadystatechange`, it uses a `Promise` instead.

```js

fetch('https://www.github.com/api/v2/users.json')
  .then( users => {
    console.log(users);
  });
```

## Best Practices for Promises

### Catch Rejected Promises with .catch()

There's 2 ways to catch rejected promises:

1. Add a `.catch()` call on your `Promise` chain:

```js
fetch('/some-endpoint/users')
  .then( data => { /* do someting with the data */ })
  .catch( error => throw error /* oh no, something bad happened :( */ ));
```

OR

2. Add a second parameter to `.then()` to handle a rejection

```js
fetch('/some-endpoint/users')
  .then(
    data => { /* do something with the data */ },
    error => { /* do something with the error */ }
  );
```
There's nothing wrong with either approach, just make sure you and your team agrees on which method is preferred.

**IMPORTANT** As of Node v10, Unhandled rejected promises will halt and/or crash the Node process. If you aren't handling rejected promises now, you will need to it soon, otherwise your whole program will straight up crash.

### Keep Promises Simple

Promises open up so much in async functionality, making callback hell a thing of the past and multiple REST API calls easy to read and move through.

However, because things get easier, the desire to create more complex functions that do more than just one thing gets more and more complicated.

This is where principles of composition come in, where your single responsibility functions you write can now start being chained together (if this isn't making sense, it will when we start looking at `async function`s in the next section!)

Don't do this:
```js

function getUsersTopComment(userId) {
  return new Promise( (resolve, reject) => {
    fetch('/api/user/' + userId )
      .then( userInfo => {
        fetch('/api/user/' + userInfo.hash + '/comments')
          .then( comments => {
            const sortedComments = comments.sort( (a, b) => a.votes > b.votes);
            resolve(sortedComments[0]);
          }).catch( error => reject(error));
      }).catch( error => reject(error) )
  });
}
```
This makes 2 different calls, one to `/api/user/:userId`, and another to `/api/user/:userId/comments`. You can already see the code starting to move over to the right, which is a surefire sign of callback hell just waiting to happen.

Instead of making one function that does 2 calls, create 2 different functions that each return a Promise.

```js
function getUser(userId) {
  return new Promise( (resolve, reject) => {
    fetch('/api/user/' + userId)
      .then(resolve)
      .catch(reject)
  });
}

function getUsersTopComment(userInfo)  {
  return new Promise( (resolve, reject) => {
    fetch('/api/user/' + userInfo.hash + '/comments')
      .then( comments => {
        const sortedComments = comments.sort( (a, b) => a.score > b.score );
        resolve(sortedComments[0]);
      }).catch(reject);
  });
}
```
By doing this we're able to keep single responsibility with our Promises, and have 2 functions we can use through composition and reuse, than creating giant functions we only need to use a few times.

If I wanted to get a user's top comment now, it would look a little like this:
```js
const userId = 5;
const getUser(userId)
  .then(getUsersTopComment)
  .then( topComment => {
    console.log(topComment); // => { text: "I am awesome!", score: 999999 }
  });
```

By composing with single responsibility Promise-based functions, we get a more readable syntax that says, "then I'm going to do this, and then..."

But wait, it gets even better with `Promises` when we start using...

# Async Functions

**Important** If you still don't understand Promises and why you would use them, go back and reread/study/practice using `Promise`s in the previous section, otherwise, `async function`s will still be a foreign concept.
