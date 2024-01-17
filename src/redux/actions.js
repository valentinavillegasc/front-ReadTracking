import axios from "axios";
import {
  GET_BOOKS_BY_USER_ID,
  GET_BOOK_BY_ID,
  USER_DETAIL,
} from "./action-types";

axios.defaults.baseURL = "http://localhost:3001";

//Books
export const getBooks = (id) => {
  return async function (dispatch) {
    try {
      const books = await axios.get(`/user/books/${id}`);
      dispatch({ type: GET_BOOKS_BY_USER_ID, payload: books.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getBookById = (id) => {
  return async function (dispatch) {
    try {
      const book = await axios.get(`/book/${id}`);
      dispatch({ type: GET_BOOK_BY_ID, payload: book.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//User

export const getUserDetail = (id) => {
  return async function (dispatch) {
    try {
      const userDetail = await axios.get(`/user/${id}`);
      dispatch({ type: USER_DETAIL, payload: userDetail.data });
    } catch (error) {}
  };
};
