# TodoMVC React RxJS

[**Demo**](http://unknown-substance.surge.sh/)

This is an implementation of [TodoMVC](http://todomvc.com/), using [React](http://facebook.github.io/react/) for managing the DOM, and [RxJS](https://github.com/Reactive-Extensions/RxJS) for statelessly managing data.

Although, the application itself has state, the JavaScript code only explicitly initializes immutable variables. And so, absolutely no [`var`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var) or [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) is used. All variables are initialized using [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).

The data itself is stored in [Immutable](https://facebook.github.io/immutable-js/)'s data structures. Immutable exposes the basic mutation methods, however, they do not modify the underlying data; instead it returns a copy with the intended modifications, leaving the original intact.

State is simulated inside an RxJS's [`reduce`](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/reduce.md) operation. To be more specific, the resulting code would look like so:

```javascript
intent.reduce((state, payload) => {
  return someImmutableOperation(state, payload);
});

// Some client code...
intent.onNext(somePayload);
```

## Running the code

Be sure to have Node.js installed.

Then, when checking out this project for the first time, in the root of the project directory, run the following in the shell:

```shell
npm install
```

Then, to finally get the code working, run the following:

```shell
npm run develop
```

Then navigate to `localhost:8080` on your browser and you should see the app running.