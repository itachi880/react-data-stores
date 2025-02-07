# React data stores

A simple state management solution that allows you to create a centralized stores for your application. This package provides a `Store` class to manage state and listen for changes.

## Installation

You can install this package via npm:

```bash
npm install react-data-stores
```

## Usage

### Creating a Store

You can create a new store by passing an initial state to the `createStore` function.

```javascript
import createStore from "react-data-stores";

const dataStore = createStore({ counter: 0, times: 0 });
```

### Accessing State

To access the current state of the store, use the `useStore` method.

```javascript
const options = {
  getter: true, //if you want the getter
  setter: true, //if you want the setter function
};
const [currentState, setState] = dataStore.useStore(options);
// [{ counter: 0 ,times:0},setter function(){}]
```

> you have to know that the options are optional by default the return from the `useStore()` will be `[getter,setter]`
> but if you choose one of the `properties` to be `true` the return will be just the one you choose and the function will not retun a tuple but a single element
> lastly if you choose both to true is like the `default` when you don't specify thr options

### Updating State

You can update the state using the `setState` method. This method takes an object containing the new state values.

```javascript
const [currentState, setState] = dataStore.useStore(); // [{ counter: 0 },setter function(){}]

setState({ counter: 1 }, true); //state={counter:1}
setState({ counter: 1 }, false); //state={counter:1,times:0}
```

`setState` accept two parameters `first` is the data
and `second` is a `boolean`
that indecate is the `new state` sholde overwrite the full store
or just update the `given keys by the new value`

> by default the value is `false` wich means just update and not overwrite the full store data

### Example in real use case

Here’s an example of how to create and use the `store` in a React component:

```javascript
//dataStore.js

import createStore from "react-data-stores";

export const dataStore = createStore({ counter: 0 });

//CounterComponent.js

import React, { useState, useEffect } from "react";
import { dataStore } from "./dataStore"; // Import your Store

export default function CounterComponent() {
  //get the current state of the store
  const [data, setData] = dataStore.useStore();

  return (
    <div>
      <button
      onClick={
        () => {
          setData({ counter: data.counter 1 })
          }
        }>
        Increase {data.counter}
    </button>
    </div>
  );
}
```

## Navigator : static property

> you may encounter `navigator` property whene using stores it's just and feature that take a navigator function that use to manage routing in react and use it anywhere and it's a static property in the Store by default it is a void function but you can assigne it any time

### example

```javascript
import Store from "react-data-stores";
import { useNavigate } from "react-router-dom";
export default function X() {
  Store.navigator = useNavigate();
  return <p>hello</p>;
}
```

> now any where in your app you can use this navigator methode by importing the class and call navigator from it

## API

### `Store`

- **Constructor:** `new Store(initialState)`

  - **Parameters:**
    - `initialState`: An object representing the initial state of the store.

- **Methods:**
  - `getState()`: Returns the current state of the store.
  - `setState(newState,overwrite?)`: Updates the state with the provided new values.
  - `subscribe(listener)`: Adds a listener function that will be called whenever the state changes. Returns an unsubscribe function.

### `createStore`

- **Constructor:** `createStore(initialState)`

  - **Parameters:**
    - `initialState`: An object representing the initial state of the store.
      > the data my be some thing other than object
  - **Methods:**
    - `useStore()`: Returns the array of two element first : the state of the store and second : the setter for update the store data.

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
