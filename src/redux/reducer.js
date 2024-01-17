import {
  GET_BOOKS_BY_USER_ID,
  GET_BOOK_BY_ID,
  USER_DETAIL,
} from "./action-types";

const initialState = {
  userDetail: {},
  allBooks: [],
  book: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS_BY_USER_ID:
      return { ...state, allBooks: action.payload };
    case GET_BOOK_BY_ID:
      return { ...state, book: action.payload };
    case USER_DETAIL:
      return { ...state, userDetail: action.payload };
    default:
      return { ...state };
  }
};

export default reducer;
