import { createContext, useReducer } from "react";
import {
  HOTEL_FAILED,
  HOTEL_PROCESS,
  HOTEL_SUCCESS,
  CURRENCIES_SUCCESS,
} from "../constant";

const HotelContext = createContext();

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
    case HOTEL_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case HOTEL_SUCCESS:
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
    case HOTEL_FAILED:
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

function HotelContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <HotelContext.Provider value={{ state, dispatch }}>
      {children}
    </HotelContext.Provider>
  );
}

export { HotelContext, HotelContextProvider };
