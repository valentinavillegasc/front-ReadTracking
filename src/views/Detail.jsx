import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Rating from "../components/Rating";
import openbook from "../assets/openedBook.png";
import headphones from "../assets/headphones.png";
import digital from "../assets/kindle.png";
import style from "./Styles/Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookById } from "../redux/actions";

export default function Detail() {
  const book = useSelector((state) => state.book);
  const dispatch = useDispatch();
  const params = useParams();
  console.log(book);
  useEffect(() => {
    dispatch(getBookById(params.id));
  }, [dispatch, params.id]);

  return (
    <div>
      <NavBar />
      <section className={style.detail}>
        <div className={style.cover}>
          <img src={book.cover} alt="" />
          <Rating readOnly={true} initialRating={book.stars} size="3.5rem" />
        </div>
        <div>
          <div className={style.titles}>
            <h1>{book.title}</h1>
            <h3>By {book.author}</h3>
          </div>

          <div className={style.info}>
            <div>
              <h3>Gender:</h3>
              <p> {book.gender?.map((gender) => gender)}</p>
            </div>
            <div>
              <h3>Pages: </h3>
              <p>{book.pages}</p>
            </div>

            <div className={style.dates}>
              <div>
                <h3>Start date: </h3>
                <p>{book.startDate}</p>
              </div>
              <div>
                {" "}
                <h3>End date:</h3>
                <p>{book.endDate}</p>
              </div>
            </div>

            <div className={style.formats}>
              <h3>Format:</h3>
              <div className={style.formatos}>
                <img className={style.format} src={openbook} alt="" />
                <input
                  type="checkbox"
                  name="paper"
                  id="paperCheckbox"
                  checked={book.format?.includes("paper")}
                  readOnly
                />
              </div>
              <div className={style.formatos}>
                <img className={style.format} src={headphones} alt="" />
                <input
                  type="checkbox"
                  name="audio"
                  id="audioCheckbox"
                  checked={book.format?.includes("audio")}
                  readOnly
                />
              </div>
              <div className={style.formatos}>
                <img className={style.format} src={digital} alt="" />
                <input
                  type="checkbox"
                  name="digital"
                  id="digitalCheckbox"
                  checked={book.format?.includes("digital")}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {(book.sinopsis ||
        book.review ||
        (book.quotes && book.quotes.length > 0)) && (
        <section className={style.texts}>
          {book.sinopsis && (
            <div className={style.text}>
              <h3>Sinopsis</h3>
              <p>{book.sinopsis}</p>
            </div>
          )}
          {book.review && (
            <div className={style.text}>
              <h3>Review</h3>
              <p>{book.review}</p>
            </div>
          )}
          {book.quotes && book.quotes.length > 0 && (
            <div className={style.text}>
              <h3>Quotes</h3>
              {book.quotes.map((quote, index) => (
                <p key={index} className={style.quote}>
                  "{quote}"
                </p>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
