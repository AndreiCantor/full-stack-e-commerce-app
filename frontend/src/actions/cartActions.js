import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart =
  (programId, trainerId) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `/api/trainers/${trainerId}/programs/${programId}`
      );

      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          program: data._id,
          name: data.title,
          category: data.category,
          price: data.price,
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
      // Dispatch an action to handle error state in Redux store or display an error message to the user
      // For example:
      // dispatch({ type: CART_ADD_ERROR, payload: error.response?.data || error.message });
    }
  };

export const removeFromCart = (programId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: programId,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
