import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Corrected import
import { composeWithDevTools } from "redux-devtools-extension";
import {
  trainerListReducer, // Updated import
  trainerDetailsReducer,
  trainerDeleteReducer,
  trainerCreateReducer,
  trainerUpdateReducer,
  trainerReviewCreateReducer,
  trainerTopRatedReducer,
  programDetailsReducer,
  trainerProgramsReducer,
  trainerProgramCreateReducer,
  trainerProgramUpdateReducer,
  trainerProgramDeleteReducer,
} from "./reducers/trainerReducers"; // Updated import
import { cartReducer } from "./reducers/cartReducers";
import {
  userDeleteReducer,
  userDetailsReducer,
  userEditReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReduces";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/orderReducers";
import { contactEmailReducer } from "./reducers/contactReducers";

const reducer = combineReducers({
  trainerList: trainerListReducer,
  trainerDetails: trainerDetailsReducer,
  trainerDelete: trainerDeleteReducer,
  trainerCreate: trainerCreateReducer,
  trainerUpdate: trainerUpdateReducer,
  trainerReviewCreate: trainerReviewCreateReducer,
  trainerTopRated: trainerTopRatedReducer,
  trainerPrograms: trainerProgramsReducer,
  trainerProgramCreate: trainerProgramCreateReducer,
  trainerProgramUpdate: trainerProgramUpdateReducer,
  trainerProgramDelete: trainerProgramDeleteReducer,
  programDetails: programDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userEdit: userEditReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  contactEmail: contactEmailReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
