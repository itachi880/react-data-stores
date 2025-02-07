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
   * Updates the state and notifies all listeners.
   * @param {Partial<T>} newState - The new state to be merged with the current state.
   * @param {boolean} replace - `false` by default , if `true` replace the entire store object with the value you provide `false` replace only the changed parts
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
 * A custom hook that allows you to use the store's state in a React component.
 *
 * @param {Store<T>} store - The store instance.
 * @param {{ getter : boolean, setter : boolean }} properties - The store instance.
 * @returns {T | [(T), (newState: Partial<T>) => void] | ((newState: Partial<T>) => void)}
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
  if (!properties.getter) return store.setState;
  if (!properties.setter) return store.state;
  return [state, store.setState];
}

/**
 * Creates a store with the given initial state and returns a hook to use the store.
 * @template T
 * @param {T} initialState - The initial state of the store.
 * @returns {{ useStore: (options?: {getter?: boolean, setter?: boolean}) => (T | [(T), (newState: Partial<T>) => void] | ((newState: Partial<T>) => void)) }}
 * An object containing the `useStore` hook, which allows components to subscribe to the store.
 */
function createStore(initialState) {
  const store = new Store(initialState);

  return {
    useStore: ({ getter = true, setter = true }) =>
      useStore(store, { getter, setter }),
  };
}
export { Store, createStore };
