# React data stores

A simple state management solution that allows you to create a centralized stores for your application. This package provides a `Store` class to manage state and listen for changes.

## 📦 Installation

You can install this package via npm:

```bash
npm install react-data-stores
```

## 🚀 Usage

### 🔧 Creating a Store

You can create a new store by passing an initial state to the `createStore` function.

```javascript
import createStore from "react-data-stores";

const dataStore = createStore({ counter: 0, times: 0 });
```

### 🔍 Accessing State

To access the current state of the store, use the `useStore` method.

```javascript
const options = {
  getter: true, //if you want the getter
  setter: true, //if you want the setter function
};
const [currentState, setState] = dataStore.useStore(options);
// [{ counter: 0 ,times:0},setter function(){}]
```

```
🔸 options is optional.
🔸 By default, useStore() returns both the getter and setter as a  tuple.
🔸 If you pass { getter: true } or { setter: true } alone,
    useStore() will return just that one (not a tuple).
🔸 If both are true, it’s equivalent to calling useStore() with no options.
```

### 🔄 Updating State

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

### 💡 Real Use Case Example

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

## 🛠️ Helper Functions: `getCurrent & setCurrent`

These functions are available outside of React components, letting you read or update the store without needing to pass setters around.

> **⚠️ Note** : **`getCurrent()`** returns the state at the time of the call. It won't cause a component to **re-render** when state changes. If you want **reactivity**, use **`useStore()`** instead.

### use case

```javascript
// store/counter.js
export const counterStore = createStore({ count: 0 });

// utils/counterUtils.js
export function incrementCounter() {
  const current = counterStore.getCurrent();
  counterStore.setCurrent({ count: current.count + 1 });
}
```

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
