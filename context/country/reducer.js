import { createContext, useReducer } from "react";

import { COUNTRY_FAILED, COUNTRY_PROCESS, COUNTRY_SUCCESS } from "../constant";

const CountryContext = createContext();

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
    case COUNTRY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case COUNTRY_SUCCESS:
      const changedState = {
        isLoading: false,
        isCountryenticated: true,
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
