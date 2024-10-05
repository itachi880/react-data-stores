# React data stores

A simple state management solution that allows you to create a centralized store for your application. This package provides a `Store` class to manage state and listen for changes.

## Installation

You can install this package via npm:

```bash
npm install react-data-stores
```

## Usage

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

You can listen for state changes by subscribing to the store. The `subscribe` method takes a callback function that will be called whenever the state changes.

```javascript
const unsubscribe = dataStore.subscribe((newState) => {
  console.log("State updated:", newState);
});

// To unsubscribe
unsubscribe();
```

### Example Component

Here’s an example of how to use the `Store` class in a React component:

```javascript
import React, { useState, useEffect } from "react";
import { dataStore } from "./dataStore"; // Import your Store instance

export default function CounterComponent() {
  const [data, setData] = useState(dataStore.getState());

  useEffect(() => {
    //you have to subscribe this component to the store envents to benefit from the ui updates if the data on the store change
    const unsubscribe = dataStore.subscribe(setData);
    return () => {
      unsubscribe();
    };
  }, []);
  //the reason you have to use use effect is you want the unsubscribe to happen after the unmount of the component (for performence and avoiding errors)
  return (
    <div>
      <button onClick={() => dataStore.setState({ counter: data.counter + 1 })}>Increase {data.counter}</button>
    </div>
  );
}
```

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

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
