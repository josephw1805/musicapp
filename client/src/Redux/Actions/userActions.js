import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// login action
const loginAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(data);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => async (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile Updated");
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Profile Deleted");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
};
