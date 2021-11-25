import {
  JOINED,
  SET_DATA,
  SET_USERS,
  NEW_MESSAGE,
  ADD_PATHNAME,
} from "../actionTypes/chatAT";

export const joinChatAC = (payload) => ({
  type: JOINED,
  payload,
});

export const setDataAC = (payload) => ({
  type: SET_DATA,
  payload,
});

export const setUsersAC = (payload) => ({
  type: SET_USERS,
  payload,
});

export const newMessageAC = (payload) => ({
  type: NEW_MESSAGE,
  payload,
});

export const addPathNameAC = (payload) => ({
  type: ADD_PATHNAME,
  payload,
});
