import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  MicNoneOutlined,
  MoreHoriz,
  SendRounded,
  TimerOutlined,
} from "@material-ui/icons";
import "./Thread.css";
import { useState } from "react";
import db from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectThreadId, selectThreadName } from "../features/ThreadSlice";
import { selectUser } from "../features/userSlice";
import { useEffect } from "react";
import { Message } from "./Message";

export const Thread = () => {
  const [input, setInput] = useState("");
  // const [notEmpty, setNotEmpty] = useState(false);
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);


  useEffect(() => {
    if (threadId) {
      db.collection("threads")
        .doc(threadId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [threadId]);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("threads").doc(threadId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });

    setInput("");
  };

  let lastSeen = messages[0]
    ? new Date(messages[0].data.timestamp.toDate()).toLocaleString()
    : "Last Seen";

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header_content">
          <Avatar src={user.photo} />
          <div className="thread__header_content_info">
            <h4>{threadName}</h4>
            <h5>{lastSeen}</h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="threads__header_details" />
        </IconButton>
      </div>
      <div className="thread__messages">
        {messages.map(({ id, data }) => (
          <Message key={id} id={id} data={data} />
        ))}
      </div>
      <div className="thread__input">
        <form>
          <input
            type="text"
            placeholder="Write Message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton>
            <TimerOutlined />
          </IconButton>
          <IconButton disabled={!input} type="submit" onClick={sendMessage}>
            <SendRounded />
          </IconButton>
          <IconButton>
            <MicNoneOutlined />
          </IconButton>
        </form>
      </div>
    </div>
  );
};
