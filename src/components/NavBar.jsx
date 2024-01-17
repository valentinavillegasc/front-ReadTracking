import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./Styles/NavBar.module.css";
import user from "../assets/user.png";
export default function NavBar() {
  const location = useLocation();

  const isLandingPage = location.pathname === "/";

  return (
    <nav>
      <h1 className={style.logo}>Read Tracker</h1>
      <div className={style.menu}>
        {isLandingPage ? (
          <>
            <Link to="/login" className={style.option}>
              Login
            </Link>
            <Link to="/register" className={style.option}>
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/library" className={style.option}>
              Library
            </Link>
            <Link to="/library" className={style.option}>
              Tracker
            </Link>
            <Link to="/profile">
              <img src={user} alt="Profile" className={style.profile} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
