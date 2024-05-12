import axios from "axios";
import {
  TRAINER_CREATE_FAIL,
  TRAINER_CREATE_REQUEST,
  TRAINER_CREATE_REVIEW_FAIL,
  TRAINER_CREATE_REVIEW_REQUEST,
  TRAINER_CREATE_REVIEW_SUCCESS,
  TRAINER_CREATE_SUCCESS,
  TRAINER_DELETE_FAIL,
  TRAINER_DELETE_REQUEST,
  TRAINER_DELETE_SUCCESS,
  TRAINER_DETAILS_FAIL,
  TRAINER_DETAILS_REQUEST,
  TRAINER_DETAILS_SUCCESS,
  TRAINER_LIST_FAIL,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_SUCCESS,
  TRAINER_SINGLE_PROGRAM_FAIL,
  TRAINER_SINGLE_PROGRAM_REQUEST,
  TRAINER_SINGLE_PROGRAM_SUCCESS,
  TRAINER_TOP_FAIL,
  TRAINER_TOP_REQUEST,
  TRAINER_TOP_SUCCESS,
  TRAINER_UPDATE_FAIL,
  TRAINER_UPDATE_REQUEST,
  TRAINER_UPDATE_SUCCESS,
} from "../constants/trainerConstants";

export const listTrainers =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: TRAINER_LIST_REQUEST });

      const { data } = await axios.get(
        `/api/trainers?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({
        type: TRAINER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRAINER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTrainerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRAINER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/trainers/${id}`);

    dispatch({
      type: TRAINER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTrainer = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/trainers/${id}`, config);

    dispatch({
      type: TRAINER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTrainer = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/trainers/`, {}, config);

    dispatch({
      type: TRAINER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTrainer = (trainer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRAINER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/trainers/${trainer._id}`,
      trainer,
      config
    );

    dispatch({
      type: TRAINER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTrainerReview =
  (trainerId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: TRAINER_CREATE_REVIEW_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(`/api/trainers/${trainerId}/reviews`, review, config);

      dispatch({
        type: TRAINER_CREATE_REVIEW_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: TRAINER_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listTopTrainers = () => async (dispatch) => {
  try {
    dispatch({ type: TRAINER_TOP_REQUEST });

    const { data } = await axios.get(`/api/trainers/top`);

    dispatch({
      type: TRAINER_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRAINER_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProgramDetails =
  (trainerId, programId) => async (dispatch) => {
    try {
      dispatch({ type: TRAINER_SINGLE_PROGRAM_REQUEST });
      const { data } = await axios.get(
        `/api/trainers/${trainerId}/programs/${programId}`
      );

      dispatch({
        type: TRAINER_SINGLE_PROGRAM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRAINER_SINGLE_PROGRAM_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
