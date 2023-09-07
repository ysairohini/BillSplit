import {
  GROUP_ADD_FAILURE,
  GROUP_ADD_SUCCESS,
  GROUP_GET_SUCCESS,
  GROUP_GET_FAILURE,
  SET_MESSAGE,
  ADD_EXP_SUCCESS,
  ADD_EXP_FAILURE,
  SINGLE_GROUP_GET_SUCCESS,
  SINGLE_GROUP_GET_FAILURE,
  ARCH_GROUP_SUCCESS,
  ARCH_GROUP_FAILURE,
  ARCH_EXP_SUCCESS,
  ARCH_EXP_FAILURE,
  CLEAR_DEBTS_SUCCESS,
  CLEAR_DEBTS_FAILURE,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAILURE,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
} from "./types";

import AuthService from "../services/AuthService";

export const addGroup = (obj) => (dispatch) => {
  return AuthService.addGroup(obj).then(
    (response) => {
      dispatch({
        type: GROUP_ADD_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GROUP_ADD_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const getAllGroups = () => (dispatch) => {
  return AuthService.getAllGroups().then(
    (response) => {
      dispatch({
        type: GROUP_GET_SUCCESS,
        payload: {
          groups: response.data.reverse(),
        },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: GROUP_GET_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const addExpense = (id, obj) => (dispatch) => {
  return AuthService.addExpense(id, obj).then(
    (response) => {
      dispatch({
        type: ADD_EXP_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: ADD_EXP_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const getSingleGroups = (groupId) => (dispatch) => {
  return AuthService.getSingleGroup(groupId).then(
    (response) => {
      dispatch({
        type: SINGLE_GROUP_GET_SUCCESS,
        payload: {
          groupSingle: response,
        },
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SINGLE_GROUP_GET_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const archiveGroup = (id, obj) => (dispatch) => {
  return AuthService.archiveGroup(id, obj).then(
    (response) => {
      dispatch({
        type: ARCH_GROUP_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: ARCH_GROUP_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const archiveExpense = (id1, id2, obj) => (dispatch) => {
  return AuthService.archiveExpense(id1, id2, obj).then(
    (response) => {
      dispatch({
        type: ARCH_EXP_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: ARCH_EXP_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const clearDebts = (groupId, obj) => (dispatch) => {
  return AuthService.clearDebts(groupId, obj).then(
    (response) => {
      dispatch({
        type: CLEAR_DEBTS_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: CLEAR_DEBTS_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const deleteExpense = (groupId, expenseId, obj) => (dispatch) => {
  return AuthService.deleteExpense(groupId, expenseId, obj).then(
    (response) => {
      dispatch({
        type: DELETE_EXPENSE_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: DELETE_EXPENSE_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};

export const addNewMember = (groupId, obj) => (dispatch) => {
  return AuthService.addNewMember(groupId, obj).then(
    (response) => {
      dispatch({
        type: ADD_MEMBER_SUCCESS,
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: ADD_MEMBER_FAILURE,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: "Something went wrong.",
      });
      return Promise.reject();
    }
  );
};
