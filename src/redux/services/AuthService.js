import axios from "axios";
import AuthHeader from "./AuthHeader";

const API_URL = "http://localhost:8080/";

const USER_URL = API_URL + "user/";
const GROUP_URL = API_URL + "group/";
const ACTIVITY_URL = API_URL + "activity/";

const register = (obj) => {
  return axios.put(USER_URL + "register", obj);
};

const login = (obj) => {
  return axios.post(USER_URL + "login", obj).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("member");
  localStorage.removeItem("groups");
  localStorage.removeItem("activity");
};

const addGroup = (obj) => {
  return axios.put(GROUP_URL + "new", obj, { headers: AuthHeader() });
};

const getAllGroups = () => {
  return axios
    .get(GROUP_URL + "data", { headers: AuthHeader() })
    .then((response) => {
      if (response.data) {
        localStorage.setItem("groups", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const getActivity = () => {
  return axios.get(ACTIVITY_URL, { headers: AuthHeader() }).then((response) => {
    console.log(response);
    if (response.data) {
      localStorage.setItem(
        "activity",
        JSON.stringify(response.data.result.activities)
      );
    }
    return response.data;
  });
};

const addExpense = (groupId, obj) => {
  return axios
    .put(GROUP_URL + "expense/" + groupId + "/", obj, { headers: AuthHeader() })
    .then((response) => {
      return response.data;
    });
};

const archiveExpense = (groupId, expenseId, obj) => {
  return axios.put(GROUP_URL + groupId + "/expense/" + expenseId + "/", obj, {
    headers: AuthHeader(),
  });
};

const archiveGroup = (groupId, obj) => {
  return axios.put(GROUP_URL + groupId, obj, {
    headers: AuthHeader(),
  });
};

const getSingleGroup = (groupId) => {
  return axios
    .get(GROUP_URL + groupId, { headers: AuthHeader() })
    .then((response) => {
      return response.data;
    });
};

const clearDebts = (groupId, obj) => {
  return axios
    .put(GROUP_URL + "expense/" + groupId + "/", obj, { headers: AuthHeader() })
    .then((response) => {
      return response.data;
    });
};

const deleteExpense = (groupId, expenseId, obj) => {
  return axios.delete(GROUP_URL + groupId + "/expense/" + expenseId, obj, {
    headers: AuthHeader(),
  });
};

const addNewMember = (groupId, obj) => {
  return axios.put(GROUP_URL + groupId + "/members", obj, {
    headers: AuthHeader(),
  });
};

export default {
  register,
  login,
  logout,
  addGroup,
  getAllGroups,
  addExpense,
  getActivity,
  getSingleGroup,
  archiveGroup,
  archiveExpense,
  clearDebts,
  deleteExpense,
  addNewMember,
};
