import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const addToCart =
  (programId, trainerId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `/api/trainers/${trainerId}/programs/${programId}`
      );

      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          trainer: trainerId,
          program: data._id,
          name: data.title,
          category: data.category,
          price: data.price,
          type: data.type,
        },
      });

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    }
  };

export const removeFromCart = (programId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: programId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
  });

  localStorage.removeItem("cartItems");
};
