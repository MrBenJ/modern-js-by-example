Asynchronous Tools for Modern JavaScript
========================================

# Promises

JavaScript is totally asynchronous and used to use a callback pattern to guarantee order of execution.

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
Readable? Not really. Fun?  No. This is what keeps JavaScript programmers up at night in a cold sweat.

Of course it's a problem, but now we've got a brand new shiny tool to stop callback hell.

**IMPORTANT**
Promises are extremely important in understanding modern JavaScript architecture and applications. If you don't understand how Promises work, the rest of this book will be very difficult to follow.

## Introduction to Promises

Under the hood, a **Promise** is a `state machine`. There are three (3) main states that a `Promise` can be in:

1. **Pending**
    The promise has started its work, but hasn't finished yet.
2. **Resolved** -or- **Fulfilled**
    The promise has resolved or fulfilled its initial task, and is ready to execute whatever needs to happen next in its `resolve` function.
3. **Rejected**
    Something unfortunate happened and there was an error or exception somewhere in the process.

As a programmer I need to define what constitutes the `Promise` reaching a **resolved/fulfilled state**, or a **rejected** state.

In this example, I'm making a XHR request to `https://www.example.com/api/v2/users.json` to get some JSON data from the internet:

```js
// I'm passing in resolve, and reject, the callbacks that will
// determine if something is successful or not...
const GetUsersAsJSON = new Promise( (resolve, reject) => {
  // The promise is now in the 'Pending' state
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://www.example.com/api/v2/users.json');

  xhr.onreadystatechange = () => {
    if (xhr.readyState < 4) {
      // The XHR request hasn't completed yet, so I'm just going to return here.
      return;
    }

    if (xhr.status !== 200) {
      // The Status code of the request is NOT 200, so it must have failed in some way. Reject the promise
      reject(xhr.response);
      // After calling reject(), the Promise enters 'rejected' state.
    }
    if (xhr.readyState === 4) {
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
// In Node.js style callbacks, the error is the first argument, then the data
GetUsersAsJSON(function(error, users) {
  if (error) {
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

// This example uses Node.js style callbacks where the first argument is an error.
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
      if (xhr.readyState < 4) {
        // The XHR request hasn't completed yet, so I'm just going to return here.
        return;
      }

      if (xhr.status !== 200) {
        // The Status code of the request is NOT 200, so it must have failed in some way. Reject the promise
        reject(xhr.response);
      }
      if (xhr.readyState === 4) {
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

Keep in mind that you can just run the function without `.then()` afterwards. The downside to this is that execution is not guaranteed. If you just need to fetch data without executing something afterwards, doing this is fine:

```js
getJSON('https://www.github.com/api/v2/users/MrBenJ');
```

## Other ways of using Promises

### util.promisify

Node version 8 introduced a new utility called `promisify`, which takes a Node.js style callback (error first, data/result second) and wraps it into a `Promise`.

For instance, let's take the `fs` (filesystem) module in Node and turn the `fs.readFile` call into a Promise based one:

```js
const util = require('util');
const fs = require('fs');

const ReadFilePromise = util.promisify(fs.readFile);

ReadFilePromise('./package.json')
  .then( data => {
    console.log(data); // Text of package.json
  }).catch( error => {
    throw new Error(error)
  });
```

### Fetch API

The `fetch` keyword is becoming more and more commonplace in modern front end web development, as all major browsers (Chrome, Firefox, Opera, and even Edge) have a first class `fetch` keyword available on `window`.

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
  .then( data => { /* do something with the data */ })
  .catch( error => throw error /* oh no, something bad happened  :( */ );
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

There's nothing wrong with either approach, just make sure you and your team agree on which method is preferred.

**IMPORTANT** As of Node v10, Unhandled rejected promises will halt and/or crash the Node process. If you aren't handling rejected promises now, you will need to soon, otherwise your whole program will crash.

### Keep Promises Simple

Promises open up so much in async functionality, making callback hell a thing of the past and multiple REST API calls easy to read and move through.

Because things get easier and the want to create more complex functions grows larger and larger, it's even more imperative that the **Single responsibilty principle** is upheld. For those needing a refresher:

```
The single responsibility principle is a computer programming principle which states that every module or class should have responsibility over a single part of the functionality provided by the software, and that responsibility should be entirely encapsulated by the class.
```

Each `Promise` should be encapsulated in a `function` that does one thing, and does that one thing really well.

This is where principles of composition come in, where the single responsibility functions you write can now start being chained together (if this isn't making sense, it will when we start looking at `async function`s in the next section!).

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

function getUsersTopComment(userInfo) {
  return new Promise( (resolve, reject) => {
    fetch('/api/user/' + userInfo.hash + '/comments')
      .then( comments => {
        const sortedComments = comments.sort( (a, b) => a.score > b.score );
        resolve(sortedComments[0]);
      }).catch(reject);
  });
}
```

By doing this, we're able to keep single responsibility with our Promises and have 2 functions we can use through composition and reuse, rather than creating giant functions we only need to use a few times.

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

With the number of direct API calls increasing in modern JavaScript development, async functions provide an incredibly powerful and easy to read way of writing code that **looks synchronous**, and executes in a distinctly clear order.

Let's take a look at this example here:

```js
/**
  Waits a specified number of milliseconds, then resolves the
  Promise with undefined
  @param {Number} time - time in ms to wait
  @return {Promise<undefined>}
*/
function wait(time) {
  return new Promise( resolve => {
    setTimeout(resolve, time);
  });
}

async function sayHelloInOrder() {

  // [1] Wait 2 seconds
  await wait(2000);

  // [2] Say hello!
  console.log('hello 1!');

  // [3] Wait another 1 second
  await wait(1000);

  // [4] Say hello again!
  console.log('hello 2!');

  // [5] return Promise that's resolved value is 'hello'
  return 'hello';
}
```

`async` is one of our new keywords that turns a regular `function` into an `async function`.

The other new keyword is `await`. This keyword expects a `Promise`, and STOPS all execution of the `async function` until the `Promise` is resolved.

If I were to run `sayHelloInOrder()`, this would happen:

1. The entire function hits an `await` keyword and execution STOPS until the `wait()` function's `Promise` resolves. In this case, it's waiting 2 seconds, then resolving.

2. The function hits `console.log('hello 1!')` and continues on.

3. The function hits another `await` statement and STOPS until `wait()`'s `Promise` resolves. Here, it's just waiting 1 second.

4. We say hello a second time. Hello again.

5. The `async function` is finished and returns a `Promise` with a resolved value of `'hello'`.

Because `async function`s **always return a Promise**, it means you can chain `.then()` and `.catch()` to the statements like this:

```js
sayHelloInOrder()
  .then( result => {
    console.log('sayHelloInOrder() has finished executing!');
    console.log(result); // 'hello'
  }).catch( error => {
    console.error('Oh no! Something went really wrong here...');
    console.error(error);
    throw error;
  });
```

### Examples of using async functions

Let's go back to our old example of `getUsersTopComment()` from the Promises section:

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

Instead of using a `.then()` statement like this:

```js
const getUser(userId)
  .then(getUsersTopComment)
  .then( topComment => {
    console.log(topComment); // => { text: "I am awesome!", score: 999999 }
  });
```

We can refactor this code to be used inside an `async function`:

```js
async function getTopCommentByUserId(userId) {
  const user = await getUser(userId);

  const topComment = await getUsersTopComment(user);

  return topComment;
}
```

Instead of just using `await` by itself, the resolved value of the `Promise` is stored in a variable. In this case, it's `user` and `topComment`.

Convenient! But there's just one little thing missing: **what if an API call fails?**

A serious downside of `async function`s is that **if no exceptions are caught, the function call will fail silently**.

In order to mitigate this, it's considered best practice to wrap the content of an `async function` in a `try/catch` block like this:

```js
async function getTopCommentByUserId(userId) {
  try {
    const user = await getUser(userId);

    const topComment = await getUsersTopComment(user);

    return topComment;

  } catch (error) {
    throw error;
  }
}
```

My personal preference is that **all the content async functions, despite if async calls are happening or not** should be wrapped in `try/catch`.

Speaking from personal experience, it's not always API calls that fail. Sometimes it's the response from a server.

### Making multiple REST calls

In REST APIs, it's common to make multiple calls to fetch data. Instead of making multiple calls through Promises, you can use an `async function` to make each call in order.

Let's say we're working on a recipes app where our backend developers have set up the following endpoints:

`POST /create-recipe` - Takes in a recipe object and creates a recipe in the database. Returns the `id` number of the recipe when it's successfully written to our database.

`GET /recipes/:id` - Gets a recipe by id number from the database.

Our product manager says that right as a user creates a new recipe on our app, we need to show all the recipe data on the screen to our user. This means we'll need to do the following:

1. Make a POST request to `/create-recipe` to write to our database and transform it however the business logic requires us to do so.
2. Make a GET request to `/recipes/:id` to grab all of the newly transformed and validated data that's written in our database.

By writing a few functions that return `Promise`s, we can use a handy `async function` that makes both of our calls quickly and cleanly.

Here's our first `createRecipe` function:

```js
/**
  Makes a POST request to /create-recipe to create a recipe
  @param {Object} recipeData - Recipe object to create
  @return {Promise<Number>} - Returns the recipeId
*/
function createRecipe(recipeData) {
  return new Promise( (resolve, reject) => {
    fetch('/create-recipe', {
      method: 'POST',
      body: JSON.stringify(recipeData)
    })
    .then( recipeId => { resolve(recipeId); })
    .catch( error => { reject(error); });
  })
}
```

Now we can make our `getRecipe` function
```js
/**
  Makes a GET request to /recipes/:id and returns recipe data
  @param {Number} recipeId - The id of the recipe to get.
  @param {Object}          - The recipe data
*/
function getRecipe(recipeId) {
  return new Promise( (resolve, reject) => {
    fetch(`/recipes/${recipeId}`)
      .then( recipe => { resolve(recipe); })
      .catch( error => { reject(error); });
  });
}
```

Great! Now we can put these two things together:

```js
import { createRecipe, getRecipe } from '../utilities';
/**
  Creates a recipe in the database, and returns the created recipe
  @param {Object} recipe - The recipe to create and display
  @return {Promise<Object>} - The created recipe as written in the database
*/
async function createNewRecipe(recipe) {
  try {
    const { body: { recipeId }} = await createRecipe(recipe);

    const recipeFromDatabase = await getRecipe(recipeId);

    return recipeFromDatabase;
  } catch (error) {
    throw error;
  }
}
```

Remember, all `async functions` return a `Promise`, so we can use `.then()` and `.catch()` statements after using our `createNewRecipe` function:

```js
import { createNewRecipe } from '../async_functions';
const recipe = { /* Pretend this is some delicious stew or your favorite pie */};

createNewRecipe(recipe)
  .then( recipeEntry => {
    console.log(recipeEntry);
    console.log('mmmm! Delicious!')
  }).catch( error => {
    console.error('Oh no... Something bad happened:');
    console.error(error);
  });
```

Keep in mind that you don't _need_ to limit this to just 2 calls. You can keep doing more calls, run through loops that run multiple `await` statements, the sky's the limit!

# Generators

The usage of Generators are seldom, and there's been a few arguments that _you don't need to learn generators_, but from personal experience and practice, I find at least knowing the bare basics of Generators and **why generators exist** is really helpful in knowing what's happening under the hood.

Generators are extremely similar to `async functions`. In fact, `Generators` are `async functions` with a few more features built in.

Instead of `await`, we use the `yield` keyword.
Instead of the `async` keyword, we use `function* ()`.

Note that you cannot use an `arrow function` as a `Generator`. You have to use the `function*` keyword.

```js
// Declare our generator:
function* myFirstGenerator() {
  yield 'hello!';
  yield 'This';
  yield 'is a generator!';
}
```

Let's use `myFirstGenerator()`. First thing we need to do is initialize it. Note you don't need to use the `new` keyword, just call it like a function and pass in any parameters or arguments.

```js
const myGenerator = myFirstGenerator();
```

Once the generator is initialized, you get some handy methods to play with:

`myGenerator.next()` runs the generator until it hits the first `yield` statement and returns an `Iterator`. More on `Iterator` in a bit.
`myGenerator.throw()` throws an error - Great if you're handling errors inside the generator itself and need to test something.

### Introducing Iterators

An `Iterator` is a plain object that follows this shape:
```js
interface Iterator = {
  value: *, // Any data type.
  next: () => (Iterator | null),  // Gets the next value
  done: Boolean  // true if this is the last value of the series, otherwise false.
}
```
Every time we run `.next()` on a `Generator`, the function starts executing until it hits a `yield` statement. Once it hits that statement, the `Generator` returns an `Iterator` object with the value from the `yield` statement.

Let's put all of our code in the next example:

```js
// Declare our generator:
function* myFirstGenerator() {
  yield 'Hello!';
  yield 'This is';
  yield 'a generator!';
}

// Initialize the generator
const myGenerator = myFirstGenerator();

// Grab our first value from our generator
const firstValue = myGenerator.next();

// => { value: 'Hello!', next: function(), done: false }
console.log(firstValue);

// Run the generator again, and get the next value
const secondValue = myGenerator.next();

// => { value: 'This is', next: function(), done: false }
console.log(secondValue);

// If we're just interested in the value, we can just grab the value directly
const thirdValue = myGenerator.next().value;

// => 'a generator!'
console.log(thirdValue);

// If we run next(); again, we'll get another Iterator, but it will say it's done
console.log(myGenerator.next());
// => { done: true }
```

Generators are very similar to `async function`s, as they completely stop the execution of the function and return some sort of value. The big difference is that a `Generator` gives greater control by allowing you to pass in data using `.next()`.

The `.next()` function takes in any value and throws it into the generator.

As an example, we can pass in an object to tell the generator to stop executing, and it will stop.

```js
/**
@var {Object} cars - An array of Car objects that follow this shape:
{
  licensePlate: 'BY43ALK4J',
  make: 'Ford',
  model: 'Mustang',
  year: 2011
}
*/
const cars = [ /* Giant list of cars in this array */];

/**
  Takes in a car model and cycles through the cars
  @param {String} model - The model of car to search for
  @yield {Object}       - A car
*/
function* findCarsByModel(model) {
  for (let i = 0; i < cars.length; i++) {

    // If the car's model matches, yield the value. Otherwise, stop.
    if (cars[i].model === model) {
      // The value we pass into .next() becomes the value of "response"
      const response = yield cars[i];
    }

    // If we send back { stopLooking: true } in .next(), the generator will stop.
    if (response.stopLooking === true) {
      break;
    }
  }
}
```

How we'd use this fancy generator would look like this:

```js
// I need to find a Ford Mustang with a license plate number of 'AAYG48KX'.
// I'll use the findCarsByModel generator to grab any car that's a 'Mustang'

const carGenerator = findCarsByModel('Mustang');

let done;
let foundCar;
// I can use a while loop here to hunt for this car.
// While done is a falsy value, keep iterating!
while (!done) {
  const iterator = carGenerator.next();

  // If we have a matching value come back...
  if (iterator.value.licensePlate === 'AAYG48KX') {
    const foundCar = iterator.value;
    // We found the car! Send in 'stopLooking: true' to stop the generator.
    carGenerator.next({ stopLooking: true});
  }

  done = iterator.done;
}
```

Of course, there's better ways to do this. Instead of:
```js
while (!done) {}
```

We could use
```js
while (!foundCar)
```

Or we could repurpose our generator into a plain function that looks for the car by plate number. There's so many different and better ways to do this instead of unnecessary complications using a `Generator`.

For these reasons and many others **this is why Generators and practical usage is a fairly heated topic in Modern JavaScript**.

## Practical Generator usage

Despite the hot topic and little practical use, **there is one important real-world use of Generators**, and it's with a very popular library called `Redux-Saga`.

`Redux-Saga` is a middleware for `Redux`, a popular state management library that implements `Flux` architecture, which has been an extremely popular and scalable architecture that's used in many modern web applications today (Facebook, AirBnB, Postmates, and GrubHub all use `Redux` as of this writing).

In `Redux-Saga`, asynchronous calls to services are done using `Generators`, and the sole purpose of these `Generators` is to execute _code that looks synchronous in a testable manner_.

Let's say we're sending a POST request to a server from our application:

```js
import { call, put } from 'redux-saga/effects';

function* sendPost(data) {
  try {
    // Make a POST request to our API with the data object passed in.
    const response = yield call(fetch, {
      method: 'POST',
      url: '/api/v2/data'
      data
    });
    // If the post is successful, put a POST_SUCCESS action in to tell the app we are successful
    yield put({ type: 'POST_SUCCESS', payload: response});
  } catch (error) {
    // If something goes terribly wrong, send a POST_ERROR action to tell the app something went wrong
    yield put ({ type: 'POST_ERROR', payload: error });
  }
}
```

At first glance, this looks just like an `async function` with the `try/catch` block, except that instead of `await`, we are using `yield`. This is intentional, as we're using the `sendPost` function _like an async function_, but `Redux-Saga`'s main goal was to make this whole function _testable without setting up a fake server to intercept calls_.

We need to pass data back into our `Generator` in order to have it keep trucking along like it would in production code. If I were to write some unit tests for this function, I would need to test the following:

1. The API call is being called with the correct data and url.
2. The `sendPost` function returns a `POST_SUCCESS` action if successful.
3. The `sendPost` function returns a `POST_ERROR` action if an exception is thrown.

Here's what the three unit tests would look like:

```js
import sendPost from './sendPost';
import { call, put } from 'redux-saga/effects';

describe('sendPost() tests', () => {
  // [1] - Make sure the API call is being called with the correct data and url
  it('Should make a POST call with the correct data and URL', () => {
    // Create some fake data
    const data = { message: 'Hello!', id: 101 };

    // Initialize the generator
    const sendPostGenerator = sendPost(data);

    // Get the first yield value back from the Generator
    const iterator = sendPostGenerator.next();

    // Make sure the fetch call is made with the correct params
    expect(iterator.value).toEqual(
      call(fetch, {
        method: 'post',
        url: '/api/v2/data',
        data
      })
    );
  });

  // [2] - Make sure the `sendPost` function returns a `POST_SUCCESS` action if successful
  it('Sends a POST_SUCCESS action if successful', () => {
    // Create some fake data (again)
    const data = { message: 'Hello!', id: 101 };

    // Initialize a new instance of the generator
    const sendPostGenerator = sendPost(data);

    // Get to the first yield statement that makes the call.
    sendPostGenerator.next();

    // We know the first test handles the API call, so we're going to get the second yield statement here.
    // We need to send a mock server 'response' in .next(). so let's do that.
    const iterator = sendPostGenerator.next({ statusCode: 200, message: 'OK '});

    // Now we need to make sure the next yield value has our response, and POST_SUCCESS.
    expect(iterator.value).toEqual(
      put({
        type: 'POST_SUCCESS',
        payload: { statusCode: 200, message: 'OK' }
      });
    );
  });

  // [3] - Make sure the `sendPost` function returns a `POST_ERROR` action if an exception is thrown.
  it('Sends a POST_ERROR action if an exception is thrown', () => {
    // Create some fake data (thrice!)
    const data = { message: 'Hello!', id: 101 };

    // Initialize a new (thrice!) instance of the generator
    const sendPostGenerator = sendPost(data);

    // Get to the first yield statement that makes the call.
    sendPostGenerator.next();

    // Let's simulate an error by running `.throw()` instead of ``.next()`
    const response = sendPostGenerator.throw({statusCode: 500, message: 'Internal Server Error'});

    expect(response.value).toEqual(
      put({
        type: 'POST_ERROR',
        payload: { statusCode: 500, message: 'Internal Server Error' }
      })
    );
  });

});
```
Take note that we didn't need to use a fake HTTP server tool like `sinon`. We simulated both good and bad calls by passing data back in using `.next()`. This is why `Generator` was used instead of `async function`s for `Redux-Saga`, and an excellent real-world use case for **practical generator usage**.

In short, if you need to pass logic or data back into an `async function`, it should probably be a `Generator`.
