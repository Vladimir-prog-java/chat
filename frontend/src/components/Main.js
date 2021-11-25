import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import socket from "../socket";
import JoinBlock from "./JoinBlock";
import { joinChatAC, setDataAC } from "../redux/actionCreators/chatAC";
import { Redirect } from "react-router-dom";

function Main() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.chatReducer);

  const onLogin = async (obj) => {
    dispatch(joinChatAC(obj));
    socket.emit("ROOM:JOIN", obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch(setDataAC(data));
  };

  return (
    <div className="wrapper">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Redirect to={state.currentRoomId} />
      )}
    </div>
  );
}

export default Main;
