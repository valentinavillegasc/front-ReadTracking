import React, { useEffect, useState } from "react";
import axios from "../utils/axiosConf";
import NavBar from "../components/NavBar";
import user from "../assets/user.png";
import style from "./Styles/UserProfiles.module.css";
import { useNavigate } from "react-router-dom";
import validation from "../validations";

export default function UserProfile() {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState({});
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState({});
  const [pendingChanges, setPendingChanges] = useState({});

  useEffect(() => {
    const id = localStorage.getItem("idSession");
    const user = JSON.parse(localStorage.getItem("userData"));
    setId(id);
    setUserSession(user);
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    setEdit(true);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setEdit(false);
    setPendingChanges({});
  };

  const handleChange = (event) => {
    event.preventDefault();
    const property = event.target.name;
    const value = event.target.value;
    setPendingChanges({ ...pendingChanges, [property]: value });
    setUserSession({ ...userSession, [property]: value });
    setError(validation({ ...userSession, [property]: value }));
  };

  const handleSignOut = () => {
    localStorage.setItem("idSession", "");
    localStorage.setItem("fullname", "");
    localStorage.setItem("email", "");

    localStorage.setItem(
      "userData",
      JSON.stringify({
        fullname: "",
        email: "",
        password: "",
      })
    );
    navigate("/login");
  };

  const handelSave = async () => {
    const isValid = Object.values(validation(pendingChanges)).every(
      (val) => val === ""
    );

    if (
      isValid &&
      window.confirm("¿Estás seguro de que deseas guardar los cambios?")
    ) {
      try {
        await axios.put(`/user/${id}`, pendingChanges);
        localStorage.setItem("fullname", pendingChanges.fullname);
        localStorage.setItem("email", pendingChanges.email);
        localStorage.setItem(
          "userData",
          JSON.stringify({ ...userSession, ...pendingChanges })
        );
        setEdit(false);
        setPendingChanges({});
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        // Manejar el error según sea necesario
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className={style.bar}>
        <h1>Profile</h1>

        {edit ? (
          <>
            <button onClick={handelSave}>Save</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
      <div className={style.profileContainer}>
        <div className={style.profile}>
          <img src={user} alt="Profile" />
          {edit ? (
            <form className={style.editForm}>
              <label className={style.editForm} htmlFor="fullname">
                Fullname
              </label>
              <input
                type="text"
                name="fullname"
                value={pendingChanges.fullname || userSession.fullname}
                onChange={handleChange}
              />
              {error && error.fullname && (
                <p className=" text-redError text-xs py-1 m-0">
                  {error.fullname}
                </p>
              )}
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={pendingChanges.email || userSession.email}
                onChange={handleChange}
              />
              {error && error.email && (
                <p className=" text-redError text-xs py-1 m-0">{error.email}</p>
              )}
              <button className={style.cancel} onClick={handleCancel}>
                Cancel
              </button>
            </form>
          ) : (
            <>
              <h2>{userSession.fullname}</h2>
              <h3>{userSession.email}</h3>
              <button className={style.signOut} onClick={handleSignOut}>
                Sign out
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
