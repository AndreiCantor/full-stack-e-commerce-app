import {
  TRAINER_LIST_FAIL,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_SUCCESS,
  TRAINER_DETAILS_FAIL,
  TRAINER_DETAILS_REQUEST,
  TRAINER_DETAILS_SUCCESS,
} from "../constants/trainerConstants"; // Updated import

export const trainerListReducer = (state = { trainers: [] }, action) => {
  // Renamed reducer to trainerListReducer
  switch (action.type) {
    case TRAINER_LIST_REQUEST: // Updated constant
      return { loading: true, trainers: [] }; // Updated property name
    case TRAINER_LIST_SUCCESS: // Updated constant
      return { loading: false, trainers: action.payload }; // Updated property name
    case TRAINER_LIST_FAIL: // Updated constant
      return { loading: false, error: action.payload }; // Updated constant
    default:
      return state;
  }
};

export const trainerDetailsReducer = (
  // Renamed reducer to trainerDetailsReducer
  state = { trainer: { reviews: [] } }, // Updated initial state
  action
) => {
  switch (action.type) {
    case TRAINER_DETAILS_REQUEST: // Updated constant
      return { loading: true, ...state }; // Updated constant
    case TRAINER_DETAILS_SUCCESS: // Updated constant
      return { loading: false, trainer: action.payload }; // Updated constant and property name
    case TRAINER_DETAILS_FAIL: // Updated constant
      return { loading: false, error: action.payload }; // Updated constant
    default:
      return state;
  }
};
