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









