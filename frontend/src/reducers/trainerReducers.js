import {
  TRAINER_LIST_FAIL,
  TRAINER_LIST_REQUEST,
  TRAINER_LIST_SUCCESS,
  TRAINER_DETAILS_FAIL,
  TRAINER_DETAILS_REQUEST,
  TRAINER_DETAILS_SUCCESS,
  TRAINER_DELETE_REQUEST,
  TRAINER_DELETE_SUCCESS,
  TRAINER_DELETE_FAIL,
  TRAINER_CREATE_REQUEST,
  TRAINER_CREATE_SUCCESS,
  TRAINER_CREATE_FAIL,
  TRAINER_CREATE_RESET,
  TRAINER_UPDATE_REQUEST,
  TRAINER_UPDATE_SUCCESS,
  TRAINER_UPDATE_FAIL,
  TRAINER_UPDATE_RESET,
  TRAINER_CREATE_REVIEW_REQUEST,
  TRAINER_CREATE_REVIEW_SUCCESS,
  TRAINER_CREATE_REVIEW_RESET,
  TRAINER_CREATE_REVIEW_FAIL,
  TRAINER_TOP_REQUEST,
  TRAINER_TOP_SUCCESS,
  TRAINER_TOP_FAIL,
  TRAINER_SINGLE_PROGRAM_REQUEST,
  TRAINER_SINGLE_PROGRAM_SUCCESS,
  TRAINER_SINGLE_PROGRAM_FAIL,
  TRAINER_PROGRAMS_REQUEST,
  TRAINER_PROGRAMS_SUCCESS,
  TRAINER_PROGRAMS_FAIL,
  TRAINER_PROGRAM_CREATE_REQUEST,
  TRAINER_PROGRAM_CREATE_SUCCESS,
  TRAINER_PROGRAM_CREATE_FAIL,
  TRAINER_PROGRAM_CREATE_RESET,
  TRAINER_PROGRAM_DELETE_REQUEST,
  TRAINER_PROGRAM_DELETE_SUCCESS,
  TRAINER_PROGRAM_DELETE_FAIL,
  TRAINER_PROGRAM_UPDATE_REQUEST,
  TRAINER_PROGRAM_UPDATE_SUCCESS,
  TRAINER_PROGRAM_UPDATE_FAIL,
} from "../constants/trainerConstants";

export const trainerListReducer = (state = { trainers: [] }, action) => {
  switch (action.type) {
    case TRAINER_LIST_REQUEST:
      return { loading: true, trainers: [] };
    case TRAINER_LIST_SUCCESS:
      return {
        loading: false,
        trainers: action.payload.trainers,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case TRAINER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainerDetailsReducer = (
  state = { trainer: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TRAINER_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TRAINER_DETAILS_SUCCESS:
      return { loading: false, trainer: action.payload };
    case TRAINER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_DELETE_REQUEST:
      return { loading: true };
    case TRAINER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TRAINER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_CREATE_REQUEST:
      return { loading: true };
    case TRAINER_CREATE_SUCCESS:
      return { loading: false, success: true, trainer: action.payload };
    case TRAINER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const trainerUpdateReducer = (state = { trainer: {} }, action) => {
  switch (action.type) {
    case TRAINER_UPDATE_REQUEST:
      return { loading: true };
    case TRAINER_UPDATE_SUCCESS:
      return { loading: false, success: true, trainer: action.payload };
    case TRAINER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINER_UPDATE_RESET:
      return { trainer: {} };
    default:
      return state;
  }
};

export const trainerReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case TRAINER_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case TRAINER_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case TRAINER_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const trainerTopRatedReducer = (state = { trainers: [] }, action) => {
  switch (action.type) {
    case TRAINER_TOP_REQUEST:
      return { loading: true, trainers: [] };
    case TRAINER_TOP_SUCCESS:
      return { loading: false, trainers: action.payload };
    case TRAINER_TOP_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const programDetailsReducer = (state = { program: {} }, action) => {
  switch (action.type) {
    case TRAINER_SINGLE_PROGRAM_REQUEST:
      return { loading: true, ...state };
    case TRAINER_SINGLE_PROGRAM_SUCCESS:
      return { loading: false, program: action.payload };
    case TRAINER_SINGLE_PROGRAM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainerProgramsReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case TRAINER_PROGRAMS_REQUEST:
      return { loading: true, programs: [] };
    case TRAINER_PROGRAMS_SUCCESS:
      return { loading: false, programs: action.payload };
    case TRAINER_PROGRAMS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainerProgramCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_PROGRAM_CREATE_REQUEST:
      return { loading: true };
    case TRAINER_PROGRAM_CREATE_SUCCESS:
      return { loading: false, success: true, program: action.payload };
    case TRAINER_PROGRAM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRAINER_PROGRAM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const trainerProgramDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TRAINER_PROGRAM_DELETE_REQUEST:
      return { loading: true };
    case TRAINER_PROGRAM_DELETE_SUCCESS:
      return { loading: false, success: true, program: action.payload };
    case TRAINER_PROGRAM_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const trainerProgramUpdateReducer = (
  state = { program: {} },
  action
) => {
  switch (action.type) {
    case TRAINER_PROGRAM_UPDATE_REQUEST:
      return { loading: true };
    case TRAINER_PROGRAM_UPDATE_SUCCESS:
      return { loading: false, success: true, program: action.payload };
    case TRAINER_PROGRAM_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
