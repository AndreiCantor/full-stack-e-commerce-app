import axios from "axios";
import {
  CONTACT_EMAIL_REQUEST,
  CONTACT_EMAIL_SUCCESS,
  CONTACT_EMAIL_FAIL,
} from "../constants/contactConstants";

export const sendContactEmail = (name, email, message) => async (dispatch) => {
  try {
    dispatch({ type: CONTACT_EMAIL_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/contact/send", { name, email, message }, config);

    dispatch({ type: CONTACT_EMAIL_SUCCESS });
  } catch (error) {
    dispatch({
      type: CONTACT_EMAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
