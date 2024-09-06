import { trainerDetailsReducer } from "./trainerReducers";
import {
  TRAINER_DETAILS_REQUEST,
  TRAINER_DETAILS_SUCCESS,
  TRAINER_DETAILS_FAIL,
} from "../constants/trainerConstants";

describe("trainerDetailsReducer", () => {
  const initialState = { trainer: { reviews: [] } };

  it("should return the initial state", () => {
    expect(trainerDetailsReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle TRAINER_DETAILS_REQUEST", () => {
    const action = { type: TRAINER_DETAILS_REQUEST };
    const expectedState = { loading: true, ...initialState };
    expect(trainerDetailsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle TRAINER_DETAILS_SUCCESS", () => {
    const action = {
      type: TRAINER_DETAILS_SUCCESS,
      payload: { id: 1, name: "John Doe", reviews: [] },
    };
    const expectedState = {
      loading: false,
      trainer: { id: 1, name: "John Doe", reviews: [] },
    };
    expect(trainerDetailsReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle TRAINER_DETAILS_FAIL", () => {
    const action = {
      type: TRAINER_DETAILS_FAIL,
      payload: "Error fetching trainer details",
    };
    const expectedState = {
      loading: false,
      error: "Error fetching trainer details",
    };
    expect(trainerDetailsReducer(initialState, action)).toEqual(expectedState);
  });
});
