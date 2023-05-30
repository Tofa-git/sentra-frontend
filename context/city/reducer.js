import { createContext, useReducer } from "react";

import { CITY_FAILED, CITY_PROCESS, CITY_SUCCESS } from "../constant";

const CityContext = createContext();

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
    case CITY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case CITY_SUCCESS:
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
    case CITY_FAILED:
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

function CityContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CityContext.Provider value={{ state, dispatch }}>
      {children}
    </CityContext.Provider>
  );
}

export { CityContext, CityContextProvider };
