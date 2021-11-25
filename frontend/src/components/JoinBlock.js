import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { v1 as uuidv1 } from "uuid";

function JoinBlock({ onLogin }) {
  const [userName, setUserName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const pathname = useSelector((state) => state.chatReducer.pathname);

  const onEnter = async () => {
    if (!userName) {
      return alert("Неверные данные");
    }
    const obj = {
      roomId: pathname ? pathname : uuidv1(),
      userName,
    };
    setLoading(true);
    await axios.post("/rooms", obj);
    onLogin(obj);
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Ваше имя"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button
        disabled={isLoading}
        onClick={onEnter}
        className="btn btn-success"
      >
        {isLoading ? "ВХОД..." : "ВОЙТИ"}
      </button>
    </div>
  );
}

export default JoinBlock;
