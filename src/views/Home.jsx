import React, { useEffect } from "react";
import Books from "../components/Books";
import NavBar from "../components/NavBar";
import style from "./Styles/Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/actions";
import { Link } from "react-router-dom";

export default function Home() {
  const books = useSelector((state) => state.allBooks);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("idSession");

    dispatch(getBooks(id));
  }, [dispatch]);

  console.log(books);
  return (
    <div>
      <NavBar />
      <div className={style.home}>
        <div className={style.bar}>
          <h2>My books</h2>
          <p>Filters</p>
        </div>

        <Books books={books} />
      </div>
      <Link to="/newBook">
        <button>+</button>
      </Link>
    </div>
  );
}
