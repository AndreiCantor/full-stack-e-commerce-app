import axios from "axios";
import {
  TRAINER_DETAILS_FAIL,
  TRAINER_DETAILS_REQUEST,
  TRAINER_DETAILS_SUCCESS,
  TRAINER_LIST_FAIL,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_SUCCESS,
} from "../constants/trainerConstants"; // Updated import

export const listTrainers = () => async (dispatch) => {
  // Renamed function to listTrainers
  try {
    dispatch({ type: TRAINER_LIST_REQUEST }); // Updated constant

    const { data } = await axios.get("/api/trainers"); // Updated endpoint

    dispatch({
      type: TRAINER_LIST_SUCCESS, // Updated constant
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_LIST_FAIL, // Updated constant
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTrainerDetails = (id) => async (dispatch) => {
  // Renamed function to listTrainerDetails
  try {
    dispatch({ type: TRAINER_DETAILS_REQUEST }); // Updated constant

    const { data } = await axios.get(`/api/trainers/${id}`); // Updated endpoint

    dispatch({
      type: TRAINER_DETAILS_SUCCESS, // Updated constant
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_DETAILS_FAIL, // Updated constant
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
