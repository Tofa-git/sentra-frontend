import { createContext, useReducer } from "react";

import {
  MEAL_FAILED,
  MEAL_PROCESS,
  MEAL_SUCCESS,
} from "../constant";

const MealContext = createContext();

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
    case MEAL_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case MEAL_SUCCESS:
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
    case MEAL_FAILED:
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

function MealContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MealContext.Provider value={{ state, dispatch }}>
      {children}
    </MealContext.Provider>
  );
}

export { MealContext, MealContextProvider };
