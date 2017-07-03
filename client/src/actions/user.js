import { SIGN_UP, LOG_IN, LOG_OUT, CHANGE_CHANNEL } from './actionTypes';

export const signUp = (username, password) => ({
  type: SIGN_UP,
  username,
  password
});

export const logIn = (username) => ({
  type: LOG_IN,
  username
});

export const logOut = () => ({
  type: LOG_OUT
});

export const changeChannel = channel => ({
  type: CHANGE_CHANNEL,
  channel
});
