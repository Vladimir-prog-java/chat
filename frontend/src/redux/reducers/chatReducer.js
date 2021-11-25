/* eslint-disable import/prefer-default-export */
import {
  JOINED,
  SET_DATA,
  SET_USERS,
  NEW_MESSAGE,
  ADD_PATHNAME,
} from "../actionTypes/chatAT";

const initialState = {
  joined: false,
  currentRoomId: null,
  rooms: [],
  currentUserName: null,
  pathname: null,
};
export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOINED:
      return {
        ...state,
        joined: true,
        currentUserName: action.payload.userName,
        currentRoomId: action.payload.roomId,
        rooms: [
          ...state.rooms,
          {
            roomId: action.payload.roomId,
            users: [],
            messages: [],
          },
        ],
      };

    case SET_DATA:
      return {
        ...state,
        rooms: action.payload.data.map((room) => ({
          roomId: room.roomId,
          users: room.users.map((user) => user.userName),
          messages: room.messages,
        })),
      };

    case SET_USERS:
      return {
        ...state,
        rooms: [
          ...state.rooms.map((room) => {
            if (room.roomId === action.payload.roomId) {
              return {
                ...room,
                users: action.payload.users.map((user) => user.userName),
              };
            } else {
              return room;
            }
          }),
        ],
      };

    case NEW_MESSAGE:
      return {
        ...state,
        rooms: [
          ...state.rooms.map((room) => {
            if (room.roomId === state.currentRoomId) {
              return {
                ...room,
                messages: [
                  ...room.messages,
                  {
                    userName: action.payload.userName,
                    text: action.payload.text,
                    date: action.payload.date,
                  },
                ],
              };
            } else {
              return room;
            }
          }),
        ],
      };
    case ADD_PATHNAME:
      return {
        ...state,
        pathname: action.payload.pathname,
        rooms: [
          ...state.rooms.map((room) => {
            if (room.roomId === state.currentRoomId) {
              return {
                ...room,
                users: [
                  ...room.users.filter(
                    (user) => user !== action.payload.userName
                  ),
                  action.payload.userName,
                ],
              };
            } else {
              return room;
            }
          }),
        ],
        currentRoomId: action.payload.pathname,
      };
    default:
      return state;
  }
};
