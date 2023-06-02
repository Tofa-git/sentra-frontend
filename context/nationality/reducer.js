import { createContext, useReducer } from "react";

import {
  NATIONALITY_FAILED,
  NATIONALITY_PROCESS,
  NATIONALITY_SUCCESS,
} from "../constant";

const NationalityContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  data: {
    rows: [],
    limit: 2,
    page: 1,
    totalPage: 0,
    hasNext: false,
    hasPreviouse: false,
  },
  dropdownData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case NATIONALITY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case NATIONALITY_SUCCESS:
      const changedState = {
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
      if (action.payload.isDropDown) {
        return {
          ...state,
          ...changedState,
          dropdownData: action.payload.data,
        };
      } else {
        return {
          ...state,
          ...changedState,
          data: action.payload.data,
        };
      }
    case NATIONALITY_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

function NationalityContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NationalityContext.Provider value={{ state, dispatch }}>
      {children}
    </NationalityContext.Provider>
  );
}

export { NationalityContext, NationalityContextProvider };
