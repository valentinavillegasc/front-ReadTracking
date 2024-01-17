import React from "react";
import style from "./Styles/CreateBook.module.css";
import NavBar from "../components/NavBar";
export default function CreateBook() {
  return (
    <div className={style.createBook}>
      <NavBar />
      <h2>Create a new book</h2>
      <div className={style.create}>
        <form className={style.form}>
          <div>
            <label htmlFor="">Cover</label>
            <input type="image" alt="cover" />
          </div>
          <div>
            <label htmlFor="">Title</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Author</label>
            <input type="text" />
          </div>{" "}
          <div>
            <label htmlFor="">Gender</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Stars</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Pages</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Start date</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">End date</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Format</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Sinopsis</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Review</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Quotes</label>
            <input type="text" />
          </div>
        </form>
        <button>Save</button>
      </div>
    </div>
  );
}
