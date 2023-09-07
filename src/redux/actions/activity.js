import {
  ACTIVITY_GET_SUCCESS,
  ACTIVITY_GET_FAILURE,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/AuthService";

export const getActivity = () => (dispatch) => {
  return AuthService.getActivity().then(
    (response) => {
      dispatch({
        type: ACTIVITY_GET_SUCCESS,
        payload: {
          activity: response.result.activities.reverse(),
        },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: ACTIVITY_GET_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};
