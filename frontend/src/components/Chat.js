import React, { useState, useRef, useEffect } from "react";
import socket from "../socket";
import TimeAgo from "timeago-react";
import { useDispatch, useSelector } from "react-redux";
import { setUsersAC, newMessageAC } from "../redux/actionCreators/chatAC";
import { Link } from "react-router-dom";

function Chat() {
  const dispatch = useDispatch();
  const { currentUserName, currentRoomId, rooms } = useSelector(
    (state) => state.chatReducer
  );
  const { users, messages } = rooms.find(
    (room) => room.roomId === currentRoomId
  );
  const [messageValue, setMessageValue] = useState("");
  const messagesRef = useRef(null);

  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName: currentUserName,
      roomId: currentRoomId,
      text: messageValue,
    });
    dispatch(
      newMessageAC({
        userName: currentUserName,
        text: messageValue,
        date: new Date(),
      })
    );
    setMessageValue("");
  };

  useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  const setUsers = ({ users, roomId }) => {
    dispatch(setUsersAC({ users, roomId }));
  };

  const addMessage = (message) => {
    dispatch(newMessageAC(message));
  };

  useEffect(() => {
    socket.on("ROOM:SET_USERS", setUsers);
    socket.on("ROOM:NEW_MESSAGE", addMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="wrapper">
      {rooms && (
        <div className="chat">
          <div className="chat-users">
            Комната: <b>{currentRoomId.slice(0, 4)}</b>
            <hr />
            <b>Онлайн ({users.length}):</b>
            <ul>
              {users.map((user, index) => (
                <li key={user + index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="chat-messages">
            <div ref={messagesRef} className="messages">
              {messages.map((message) => (
                <div key={message.date} className="message">
                  <p>{message.text}</p>
                  <div>
                    <span>{message.userName}</span>
                  </div>
                  <div>
                    <span>
                      <TimeAgo datetime={message.date} locale="ru" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <form>
              <textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                className="form-control"
                rows="3"
              ></textarea>
              <button
                onClick={onSendMessage}
                type="button"
                className="btn btn-primary"
              >
                Отправить
              </button>
            </form>
          </div>
          <div className="chat-rooms">
            <h3>Комнаты</h3>
            {rooms.map((room) => (
              <div key={room.roomId}>
                <Link to={`/${room.roomId}`}> {room.roomId.slice(0, 4)} </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
