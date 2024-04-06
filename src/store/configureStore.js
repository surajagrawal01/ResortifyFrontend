import { createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk"
import productReducer from "../reducers/productReducer";
const configureStore =()=>{
    const store = createStore(combineReducers({
        products:productReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore