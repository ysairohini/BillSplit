import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
} from "./types";

import AuthService from "../services/AuthService";

export const register = (obj) => (dispatch) => {
    return AuthService.register(obj).then(
        (response) => {

            const message = "Registration Successful!";

            dispatch({
                type: REGISTER_SUCCESS,
            });

            dispatch({
                type: SET_MESSAGE,

                payload: message,

            });

            return Promise.resolve();
        },
        (error) => {

            const message = "Something went wrong.";

            dispatch({
                type: REGISTER_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const login = (obj) => (dispatch) => {
    return AuthService.login(obj).then(
        (data) => {
            if(data.token === null || data.user.user === null) {
                const message = "Something went wrong.";
                dispatch({
                    type: LOGIN_FAIL,
                });

                dispatch({
                    type: SET_MESSAGE,
                    payload: message,
                });

                return Promise.reject();
            }
            const new_members = data.user.users.filter((item) => item._id !== data.user.user._id)
            const idUserMap = {}
            data.user.users.map((item) => {
                idUserMap[item._id] = item.displayName
            })
            idUserMap[data.user.user._id] = data.user.user.displayName
            console.log(idUserMap);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    members: new_members,
                    user: data.user.user,
                    token: data.token,
                    idUserMap: idUserMap,
                },
            });

            return Promise.resolve();
        },
        (error) => {

            const message = "Something went wrong.";


            dispatch({
                type: LOGIN_FAIL,
            });

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    );
};

export const logout = () => (dispatch) => {
    AuthService.logout();

    dispatch({
        type: LOGOUT,
    });
};