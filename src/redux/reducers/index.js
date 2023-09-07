import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import group from "./group";
import activity from "./activity";

export default combineReducers({
  auth,
  message,
  group,
  activity
});