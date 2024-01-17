import React, { useState } from "react";
import style from "./Styles/Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axiosConf";
import validation from "../validations";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    setError(validation({ ...form, [property]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/user/register", form);
      navigate("/checkemail");
    } catch (error) {
      console.log("Error during form submission:", error);
      console.log(form);
    }
  };

  return (
    <div className={style.register}>
      <div className={style.contenedorRegister}>
        <h2>Read Tracker</h2>
        <h1>Register</h1>
        <form className={style.form}>
          <div className={style.formGroup}>
            <label htmlFor="">Full Name</label>
            <input
              type="fullname"
              name="fullname"
              placeholder="Pepito Perez"
              onChange={handleChange}
              value={form.fullname}
            />
            {error.fullname && (
              <p className=" text-redError text-xs py-1 m-0">
                {error.fullname}
              </p>
            )}
          </div>
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
            {error.password && (
              <p className=" text-redError text-xs py-1 m-0">
                {error.password}
              </p>
            )}
          </div>
          {/* <div className={style.formGroup}>
            <label htmlFor="">Repeat Password</label>
            <input type="password" placeholder="************" />
          </div> */}
        </form>
        <button onClick={handleSubmit}>Register</button>

        <Link className={style.link} to="/login">
          <p>Already have an account?</p>
        </Link>
      </div>
    </div>
  );
}
