import { createContext, useReducer } from "react";

import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_PROCESS,
  BOOK_SEARCH_SUCCESS,
  BOOK_LIST_FAILED,
  BOOK_LIST_PROCESS,
  BOOK_LIST_SUCCESS,
  BOOK_SEARCH_RESET,
  BOOK_DETAIL_FAILED,
  BOOK_DETAIL_PROCESS,
  BOOK_DETAIL_SUCCESS,
} from "../constant";

const BookContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  dataSearch: [],
  dataList: [],
  details: null,
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
    case BOOK_LIST_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case BOOK_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataList: action.payload.data,
      };

    case BOOK_LIST_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case BOOK_DETAIL_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case BOOK_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        details: action.payload.data,
      };
    case BOOK_DETAIL_FAILED:
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
