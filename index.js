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
   */
  setState = (newState) => {
    this.#listeners.forEach((listener) => listener(newState));
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
 * @returns {[T, (newState: Partial<T>) => void]} An array containing the current state and the setState function.
 */
function useStore(store) {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(setState);
    return () => {
      unsubscribe();
    };
  }, [store]);

  return [state, store.setState];
}

/**
 * Creates a store with the given initial state and returns a hook to use the store.
 * @template T
 * @param {T} initialState - The initial state of the store.
 * @returns {{ useStore: () => [T, (newState: Partial<T>) => void] }} An object containing the `useStore` hook.
 */
function createStore(initialState) {
  const store = new Store(initialState);

  return {
    useStore: () => useStore(store),
  };
}

export { Store, createStore };
