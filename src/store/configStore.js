import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import bookingReducers from "../reducers/bookingReducer";
import loginReducer from "../reducers/loginReducer";
import userReducer from "../reducers/userReducer";
import ResortReducer from "../reducers/resortsReducer";

const configStore = () => {
  const store = createStore(
    combineReducers({
      isLogIn: loginReducer,
      user: userReducer,
      booking: bookingReducers,
      resortsData: ResortReducer,
    }),
    applyMiddleware(thunk)
  );
 
  return store;
};

export default configStore;
