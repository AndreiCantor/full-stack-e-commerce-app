import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Corrected import
import { composeWithDevTools } from "redux-devtools-extension";
import {
  trainerListReducer, // Updated import
  trainerDetailsReducer, // Updated import
} from "./reducers/trainerReducers"; // Updated import
import { cartReducer } from "./reducers/cartReducers";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReduces";

const reducer = combineReducers({
  trainerList: trainerListReducer, // Updated reducer name and key
  trainerDetails: trainerDetailsReducer, // Updated reducer name and key
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
