import { useState, useEffect } from "react";
/**
 * @template T
 * A simple store class to hold and manage state.
 */
class Store {
  #state = null;
  #listeners = [];
  static navigateTo = (path) => {
    console.log("not initialized yet");
  };
  /**
   * @param {T} initialState - The initial state of the store.
   */
  constructor(initialState) {
    this.#state = initialState;
  }

  /**
   * Returns the current state of the store.
   * @returns {T} The current state.
   */
  getState = () => {
    return this.#state;
  };

  /**
   * @type {import("./useStore.d.ts").setState<T>}
   */
  setState = (newState, replace = false) => {
    if (replace) this.#state = newState;
    else this.#state = { ...this.#state, ...newState };
    this.#listeners.forEach((listener) => listener(this.#state));
  };

  /**
   * Subscribes to state changes.
   * @param {(state: T) => void} listener - The listener function to be called when the state changes.
   * @returns {() => void} A function to unsubscribe the listener.
   */
  subscribe = (listener) => {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  };
}

/**
 * @template T
 * @template {boolean} G
 * @template {boolean} S
 * @typedef {import("./useStore.d.ts").UseStoreReturn<T, G extends undefined ? true : G, S extends undefined ? true : S>} UseStoreReturn
 */

/**
 * @template T
 * A custom hook that allows you to use the store's state in a React component.
 * @param {Store<T>} store - The store instance.
 * @param {{ getter : G , setter : S }} [properties] -
 * @returns {UseStoreReturn<T, G , S>}
 * - Returns the state if `getter: true` & `setter: false`.
 * - Returns the setState function if `getter: false` & `setter: true`.
 * - Returns `[state, setState]` if both are `true` or not specified
 */

function useStore(store, properties = { getter: true, setter: true }) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, [store]);
  if (properties?.getter === false) return store.setState;
  if (properties?.setter === false) return state;
  return [state, store.setState];
}

/**
 * Creates a store with the given initial state and returns a hook to use the store.
 * - `useStore` : is the one you will often use inside your components
 *
 * - `setCurrent | getCurrent` : are a helper function inted to let you access and modify the store
 *  state from any where in your code even if it isn't a react component ex.
 *  helper functions or utility functions
 * @template T
 * @param {T} initialState - The initial state of the store.
 * @returns {{
 *   setCurrent: (data:T, replace?:boolean) => void ,
 *   useStore: <G extends boolean = true ,  S extends boolean = true >(options?: {getter: G, setter: S}) => UseStoreReturn<T, G , S> ,
 *   getCurrent: ()=> T ,
 * }}
 */
function createStore(initialState) {
  const store = new Store(initialState);

  return {
    useStore: ({ getter, setter } = {}) =>
      useStore(store, { getter: getter ?? true, setter: setter ?? true }),
    setCurrent: (data, replace = false) => store.setState(data, replace),
    getCurrent: () => store.getState(),
  };
}
export { Store, createStore };
