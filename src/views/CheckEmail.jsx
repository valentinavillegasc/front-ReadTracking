import React from "react";
import style from "./Styles/CheckEmail.module.css";
import { Link } from "react-router-dom";
export default function CheckEmail() {
  return (
    <div className={style.check}>
      <div className={style.container}>
        <h1>Read Tracker</h1>
        <div className={style.message}>
          <h2>Welcome to your new favorite place </h2>
          <p>Please check your inbox</p>
          <p>so you can confirm your mail</p>
        </div>
        <Link to="/login">
          <button>Let's begin</button>
        </Link>
      </div>
    </div>
  );
}
