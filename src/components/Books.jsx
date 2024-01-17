import React from "react";
import Book from "./Book";
import style from "./Styles/Books.module.css";

export default function Books({ books }) {
  return (
    <div className={style.books}>
      {books?.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          cover={book.cover}
          title={book.title}
          author={book.author}
          stars={book.stars}
        />
      ))}
    </div>
  );
}
