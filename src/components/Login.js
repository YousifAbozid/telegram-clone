import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../firebase";
import "./Login.css";
export const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => console.log(error));
  };

  return (
    <div className="login">
      <div className="login__telegram">
        <img src={`${process.env.PUBLIC_URL}telegramLogo.png`} alt="" />
        <h1>Telegram</h1>
      </div>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};
