import React, { useEffect, useState } from "react";
import style from "./Styles/ConfirmEmail.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "../utils/axiosConf";

export default function ConfirmEmail() {
  const { token } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    const confirm = async () => {
      try {
        const response = await axios.get(`/user/confirm/${token}`);
        setConfirmationMessage(response.data.message);
      } catch (error) {
        console.log("Something went wrong :(", error);
        setConfirmationMessage("Error confirming your email.");
      }
    };

    // Solo llama a confirm si hay un token
    if (token) {
      confirm();
    }
  }, [token]);

  return (
    <div className={style.confirm}>
      <div className={style.container}>
        <h1>Read Tracker</h1>
        {confirmationMessage === "Mail confirmed" ? (
          <div className={style.message}>
            <h2>{confirmationMessage}</h2>
            <p>Thank you for confirming your email</p>
            <p>You can now proceed to login.</p>
            <Link to="/login">
              <button>Let's begin</button>
            </Link>
          </div>
        ) : (
          <div className={style.message}>
            <h2>{confirmationMessage}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
