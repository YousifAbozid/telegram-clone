import React, { useEffect } from "react";
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search";
import {
  BorderColorOutlined,
  PhoneOutlined,
  QuestionAnswerOutlined,
  Settings,
} from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";
import { SidebarThreads } from "./SidebarThreads";
import db, { auth } from "../firebase";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/userSlice";
import { useState } from "react";

export const Sidebar = () => {
  const [threads, setThreads] = useState([]);
  // const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("threads").onSnapshot((snapshot) => {
      setThreads(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const addThread = () => {
    const threadName = prompt("Enter Thread Name");
    if (threadName) {
      db.collection("threads").add({
        threadName: threadName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__search">
          <SearchIcon className="sidebar__searchIcon" />
          <input placeholder="Search" className="sidebar__input" type="text" />
        </div>
        <IconButton variant="outlined" id="sidebar__button" onClick={addThread} >
          <BorderColorOutlined  />
        </IconButton>
      </div>
      <div className="sidebar__threads">
        {threads.map(({ id, data: { threadName } }) => (
          <SidebarThreads key={id} id={id} threadName={threadName} />
        ))}
      </div>
      <div className="sidebar__bottom">
        <Avatar
          className="sidebar__bottom_avatar"
          onClick={() => auth.signOut()}
        />
        <IconButton>
          <PhoneOutlined />
        </IconButton>
        <IconButton>
          <QuestionAnswerOutlined />
        </IconButton>
        <IconButton>
          <Settings />
        </IconButton>
      </div>
    </div>
  );
};
