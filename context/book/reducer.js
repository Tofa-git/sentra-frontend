import { createContext, useReducer } from "react";

import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_PROCESS,
  BOOK_SEARCH_SUCCESS,
  BOOK_SEARCH_RESET,
} from "../constant";

const BookContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  dataSearch: [],
};

function reducer(state, action) {
  switch (action.type) {
    case BOOK_SEARCH_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case BOOK_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
      };

    case BOOK_SEARCH_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case BOOK_SEARCH_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}

function BookContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
}

export { BookContext, BookContextProvider };
