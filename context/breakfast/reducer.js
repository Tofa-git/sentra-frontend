import { createContext, useReducer } from "react";

import {
  BREAKFAST_FAILED,
  BREAKFAST_PROCESS,
  BREAKFAST_SUCCESS,
} from "../constant";

const BreakfastContext = createContext();

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
  currencyData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case BREAKFAST_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case BREAKFAST_SUCCESS:
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
    case BREAKFAST_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case CURRENCIES_SUCCESS:
      return {
        ...state,
        currencyData: action.payload.data,
      };
    default:
      return state;
  }
}

function BreakfastContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BreakfastContext.Provider value={{ state, dispatch }}>
      {children}
    </BreakfastContext.Provider>
  );
}

export { BreakfastContext, BreakfastContextProvider };
