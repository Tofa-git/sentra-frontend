import { createContext, useReducer } from "react";

import {
  FACILITY_FAILED,
  FACILITY_PROCESS,
  FACILITY_SUCCESS,
} from "../constant";

const FacilityContext = createContext();

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
    case FACILITY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case FACILITY_SUCCESS:
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
    case FACILITY_FAILED:
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

function FacilityContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FacilityContext.Provider value={{ state, dispatch }}>
      {children}
    </FacilityContext.Provider>
  );
}

export { FacilityContext, FacilityContextProvider };
