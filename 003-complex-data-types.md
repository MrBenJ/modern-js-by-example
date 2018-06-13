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

