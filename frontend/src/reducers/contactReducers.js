// reducers/contactReducers.js
import {
  CONTACT_EMAIL_REQUEST,
  CONTACT_EMAIL_SUCCESS,
  CONTACT_EMAIL_FAIL,
} from "../constants/contactConstants";

export const contactEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case CONTACT_EMAIL_REQUEST:
      return { loading: true };
    case CONTACT_EMAIL_SUCCESS:
      return { loading: false, success: true };
    case CONTACT_EMAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
