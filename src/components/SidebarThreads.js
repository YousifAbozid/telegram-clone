import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setThread } from "../features/ThreadSlice";
import db from "../firebase";
import "./SidebarThreads.css";

export const SidebarThreads = ({ id, threadName }) => {
  const dispatch = useDispatch();
  const [threadInfo, setThreadInfo] = useState([]);


  useEffect(() => {
    db.collection("threads")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setThreadInfo(snapshot.docs.map((doc) => doc.data()));
      });
  }, [id]);


  const sidebarThreadHandler = (e) =>{
    dispatch(
      setThread({
        threadId: id,
        threadName: threadName,
      })
    );
  }

  return (
    <div
      className="sidebarThread"
      onClick={sidebarThreadHandler }
    >
      <Avatar src={threadInfo[0]?.photo} />
      <div className="sidebarThread__details">
        <h3>{threadName}</h3>
        <p>{threadInfo[0]
            ? threadInfo[0].message
            : ""}</p>
        <small className="sidebarThread__timestamp">
          {threadInfo[0]
            ? new Date(threadInfo[0].timestamp?.toDate()).toLocaleString()
            : ""}
        </small>
      </div>
    </div>
  );
};
