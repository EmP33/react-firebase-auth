import { createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { auth } from "../firebase";

const initialState = {
  currentUser: {},
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    switchLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const signup = (email, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(authActions.setError(""));
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        console.log(auth.currentUser);
        // dispatch(authActions.setCurrentUser(user));
      } catch (err) {
        dispatch(authActions.setError(err.message));
        console.log(err.message);
      }
    };
    dispatch(authActions.switchLoading());
    await sendRequest();
    dispatch(authActions.switchLoading());
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(authActions.setError(""));
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        // dispatch(authActions.setCurrentUser(user));
      } catch (err) {
        dispatch(authActions.setError(err.message));
        console.log(err.message);
      }
    };
    dispatch(authActions.switchLoading());
    await sendRequest();
    dispatch(authActions.switchLoading());
  };
};

export const logout = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      await signOut(auth);
    };

    await sendRequest();
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(authActions.setError(""));
      try {
        return sendPasswordResetEmail(auth, email);
      } catch (err) {
        dispatch(authActions.setError(err.message));
      }
    };
    dispatch(authActions.switchLoading());
    await sendRequest();
    dispatch(authActions.switchLoading());
  };
};

export const changeEmail = (email) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(authActions.setError(""));
      try {
        return updateEmail(auth.currentUser, email);
      } catch (err) {
        dispatch(authActions.setError(err.message));
      }
    };
    dispatch(authActions.switchLoading());
    await sendRequest();
    dispatch(authActions.switchLoading());
  };
};

export const changePassword = (password) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(authActions.setError(""));
      try {
        return updatePassword(auth.currentUser, password);
      } catch (err) {
        dispatch(authActions.setError(err.message));
      }
    };
    dispatch(authActions.switchLoading());
    await sendRequest();
    dispatch(authActions.switchLoading());
  };
};

export const authActions = authSlice.actions;

export default authSlice;
