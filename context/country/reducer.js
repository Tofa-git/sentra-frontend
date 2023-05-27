import { createContext, useReducer } from "react";

import { COUNTRY_FAILED, COUNTRY_PROCESS, COUNTRY_SUCCESS } from "../constant";

const CountryContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  data: [],
  pagination: {
    page: 1,
    limit: 12,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case COUNTRY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case COUNTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isCountryenticated: true,
        isError: false,
        errorMessage: null,
        data: action.payload.data,
        pagination: action.payload.pagination,
      };
    case COUNTRY_FAILED:
      return {
        ...state,
        isLoading: false,
        isCountryenticated: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

function CountryContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CountryContext.Provider value={{ state, dispatch }}>
      {children}
    </CountryContext.Provider>
  );
}

export { CountryContext, CountryContextProvider };
