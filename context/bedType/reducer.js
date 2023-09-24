import { createContext, useReducer } from "react";

import {
  BED_TYPE_FAILED,
  BED_TYPE_PROCESS,
  BED_TYPE_SUCCESS,
} from "../constant";

const BedTypeContext = createContext();

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
    case BED_TYPE_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case BED_TYPE_SUCCESS:
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
    case BED_TYPE_FAILED:
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

function BedTypeContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BedTypeContext.Provider value={{ state, dispatch }}>
      {children}
    </BedTypeContext.Provider>
  );
}

export { BedTypeContext, BedTypeContextProvider };
