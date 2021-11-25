import React, { useEffect } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { addPathNameAC, setDataAC } from "../redux/actionCreators/chatAC";
import socket from "../socket";

const PrivateRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch();
  const currentUserName = useSelector(
    (state) => state.chatReducer.currentUserName
  );

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(
      addPathNameAC({ pathname: pathname.slice(1), userName: currentUserName })
    );

    if (currentUserName) {
      const obj = { roomId: pathname.slice(1), userName: currentUserName };
      socket.emit("ROOM:JOIN", obj);

      (async () => {
        const { data } = await axios.get(`/rooms/${obj.roomId}`);
        dispatch(setDataAC(data));
      })();
    }
  }, [pathname, dispatch, currentUserName]);

  return (
    <Route {...rest}>{currentUserName ? children : <Redirect to="/" />}</Route>
  );
};

export default PrivateRoute;
