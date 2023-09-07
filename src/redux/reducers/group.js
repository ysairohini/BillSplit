import {
  ADD_EXP_FAILURE,
  ADD_EXP_SUCCESS,
  GROUP_ADD_FAILURE,
  GROUP_ADD_SUCCESS,
  GROUP_GET_FAILURE,
  GROUP_GET_SUCCESS,
  LOGOUT,
  SINGLE_GROUP_GET_FAILURE,
  SINGLE_GROUP_GET_SUCCESS,
  ARCH_GROUP_SUCCESS,
  ARCH_GROUP_FAILURE,
  ARCH_EXP_SUCCESS,
  ARCH_EXP_FAILURE,
  CLEAR_DEBTS_FAILURE,
  CLEAR_DEBTS_SUCCESS,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
} from "../actions/types";

const groups = JSON.parse(localStorage.getItem("groups"));

const groupSingle = null;

const initialState =
  groups && groupSingle
    ? { groups, groupSingle }
    : { groups: null, groupSingle: null };

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GROUP_ADD_FAILURE:
      return {
        ...state,
      };
    case GROUP_ADD_SUCCESS:
      return {
        ...state,
      };
    case GROUP_GET_FAILURE:
      return {
        ...state,
        groups: null,
      };
    case GROUP_GET_SUCCESS:
      return {
        ...state,
        groups: payload.groups,
      };
    case ADD_EXP_FAILURE:
      return {
        ...state,
      };
    case ADD_EXP_SUCCESS:
      return {
        ...state,
      };
    case SINGLE_GROUP_GET_FAILURE:
      return {
        ...state,
        groupSingle: null,
      };
    case SINGLE_GROUP_GET_SUCCESS:
      return {
        ...state,
        groupSingle: payload.groupSingle,
      };
    case ARCH_GROUP_SUCCESS:
      return {
        ...state,
      };
    case ARCH_GROUP_FAILURE:
      return {
        ...state,
      };
    case ARCH_EXP_FAILURE:
      return {
        ...state,
      };
    case ARCH_EXP_SUCCESS:
      return {
        ...state,
      };
    case CLEAR_DEBTS_FAILURE:
      return {
        ...state,
      };
    case CLEAR_DEBTS_SUCCESS:
      return {
        ...state,
      };
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
      };
    case DELETE_EXPENSE_FAILURE:
      return {
        ...state,
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
      };
    case ADD_MEMBER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
