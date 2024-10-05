/**
 * @description
 * you can use as many stors as you want to have each store manage a deferent kinde of data
 * @example
 * //data1Store.js
 * export const data=new Store({counter:0})
 * //compognent1.js
 * import {data} from "./path to/data1Store"
 * export default function CompExp (){
 *  const [data_,setdata]=useState(data.getState())
 *  useEffect(()=>{
 *      const unsubscribe=data.subscribe(setdata)
 *      return ()=>{
 *      unsubscribe()
 *      }
 *  }
 * ,[])
 * return <button onclick={()=>{
 *  data.setState({counter:data_.counter+1})
 * }}>increess{data_.counter}</button>
 * }
 * //compognent2.js
 *import {data} from "./path to/data1Store"
 *export default function CompExp (){
 * const [data_,setdata]=useState(data.getState())
 * useEffect(()=>{
 *     const unsubscribe=data.subscribe(setdata)
 *     return ()=>{
 *     unsubscribe()
 *     }
 * }
 *,[])
 *return <p>counter value{data_.counter}</p>
 *}
 */
class Store {
  #state = null;
  #listeners = [];
  static navigator = () => {};
  constructor(initialState) {
    this.#state = initialState;
  }
  getState() {
    return this.#state;
  }

  setState(newState) {
    this.#state = { ...this.#state, ...newState };
    this.#listeners.forEach((listener) => listener(this.#state));
  }

  subscribe(listener) {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }
}
export default Store;
