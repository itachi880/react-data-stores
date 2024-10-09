# React data stores

A simple state management solution that allows you to create a centralized stores for your application. This package provides a `Store` class to manage state and listen for changes.

## Installation

You can install this package via npm:

```bash
npm install react-data-stores
```

## Usage (OLD WAY but stil there)

### Creating a Store

You can create a new store instance by passing an initial state to the `Store` class.

```javascript
import Store from "react-data-stores";

const dataStore = new Store({ counter: 0 });
```

### Accessing State

To access the current state of the store, use the `getState` method.

```javascript
const currentState = dataStore.getState(); // { counter: 0 }
```

### Updating State

You can update the state using the `setState` method. This method takes an object containing the new state values.

```javascript
dataStore.setState({ counter: 1 });
```

### Subscribing to State Changes

You can listen for state changes by subscribing to the store. The `subscribe` method takes a callback function that will be called whenever the state changes. and you have to pass a setter as the callback to make the component respond to state changes

> the `subscribe` methode return the `unsubscribe` methode wich do what it named unsubscribe the component from notifications about the state update

```javascript
const unsubscribe = dataStore.subscribe((newState) => {
  console.log("State updated:", newState);
});

// To unsubscribe
unsubscribe();
```

### Example in real use case

Here’s an example of how to use the `Store` class in a React component:

```javascript
import React, { useState, useEffect } from "react";
import { dataStore } from "./dataStore"; // Import your Store instance

export default function CounterComponent() {
  //get the current state of the store
  const [data, setData] = useState(dataStore.getState());

  useEffect(() => {
    //you have to subscribe this component to the store envents to benefit from the ui updates if the data on the store change

    //and to subscribe you can pass any call back function but the ui will not update unless you subscribe with a setter
    const unsubscribe = dataStore.subscribe(setData);
    return () => {
      unsubscribe();
    };
  }, []);
  //the reason you have to use use effect is you want the unsubscribe to happen after the unmount of the component (for performence and avoiding errors)
  return (
    <div>
      <button onClick={() => dataStore.setState({ counter: data.counter + 1 })}>
        {/*up to this far the onclick event will inform any 
            component that is subscribe to the store changes  that the 
            state has been change and what the change is*/}
        Increase {data.counter}
      </button>
    </div>
  );
}
```

## Usage (NEW WAY)

### Creating a Store

You can create a new store by passing an initial state to the `createStore` function.

```javascript
import createStore from "react-data-stores";

const dataStore = createStore({ counter: 0 });
```

### Accessing State

To access the current state of the store, use the `useStore` method.

```javascript
const [currentState, setState] = dataStore.useStore(); // [{ counter: 0 },setter function(){}]
```

### Updating State

You can update the state using the `setState` method. This method takes an object containing the new state values.

```javascript
const [currentState, setState] = dataStore.useStore(); // [{ counter: 0 },setter function(){}]

setState({ counter: 1 });
```

### subscription to changes

> in the old version it is nessecary to `subscribe` to update events now you dont need to doit but the old way still existe

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
      <button onClick={() => setData({ counter: data.counter + 1 })}>
        {/*up to this far the onclick event will inform any 
            component that is subscribe to the store changes  that the 
            state has been change and what the change is*/}
        Increase {data.counter}
      </button>
    </div>
  );
}
```

as you see alot more simpler and cleaner than the old way

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
      > the data my be some thing other than object

- **Methods:**
  - `getState()`: Returns the current state of the store.
  - `setState(newState)`: Updates the state with the provided new values.
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
