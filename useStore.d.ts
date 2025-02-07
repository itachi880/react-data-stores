// useStore.d.ts
export type UseStoreReturn<
  T,
  Getter extends boolean,
  Setter extends boolean
> = Setter extends false
  ? T
  : Getter extends false
  ? setState<T>
  : [T, setState<T>];
/**
 * Updates the state and notifies all listeners.
 * @param {Partial<T>} newState - The new state to be merged with the current state.
 * @param {boolean} replace - `false` by default , if `true` replace the entire store object with the value you provide `false` replace only the changed parts
 */
export type setState<T> = (newState: Partial<T>, replace?: boolean) => void;
