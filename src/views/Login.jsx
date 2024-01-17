import React, { useState } from "react";
import style from "./Styles/Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import validation from "../validations";
import axios from "../utils/axiosConf";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState("");

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setError(validation({ ...form, [property]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(form);

    try {
      const response = await axios.post("/user/login", form);
      console.log("Response:", response);

      const user = response.data;

      if (user) {
        localStorage.setItem("idSession", user.userId);
        localStorage.setItem("fullname", user.fullname);
        localStorage.setItem("email", user.email);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            fullname: user.fullname,
            email: user.email,
            password: user.password,
          })
        );

        navigate("/library");
      } else {
        console.log("User data not found in the response");
      }
    } catch (error) {
      console.log("Error:", error);
      setErrorLogin(error);
    }
  };

  return (
    <div className={style.login}>
      <div className={style.contenedorLogin}>
        <h2>Read Tracker</h2>
        <h1>Login</h1>
        <form className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@mail.co"
              onChange={handleChange}
              value={form.email}
            />
            {error.email && (
              <p className=" text-redError text-xs py-1 m-0">{error.email}</p>
            )}
          </div>

          <div className={style.formGroup}>
            <label htmlFor="">Password</label>
            <input
              type="password"
              name="password"
              placeholder="************"
              onChange={handleChange}
              value={form.password}
            />
            {errorLogin && errorLogin && (
              <p className=" text-redError text-xs py-1 m-0">{errorLogin}</p>
            )}
          </div>
        </form>

        <button onClick={handleSubmit}>Login</button>

        <div>
          <Link className={style.link}>
            <p>Forgot your password?</p>
          </Link>
          <Link className={style.link} to="/register">
            <p>Don't have an account yet?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
