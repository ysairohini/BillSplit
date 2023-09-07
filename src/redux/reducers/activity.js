import {
  ACTIVITY_GET_FAILURE,
  ACTIVITY_GET_SUCCESS,
  LOGOUT,
} from "../actions/types";

const activity = localStorage.getItem("activity");

const initialState = activity ? { activity: activity } : { activity: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ACTIVITY_GET_FAILURE:
      return {
        ...state,
        activity: null,
      };
    case ACTIVITY_GET_SUCCESS:
      return {
        ...state,
        activity: payload.activity,
      };
    default:
      return state;
  }
}
