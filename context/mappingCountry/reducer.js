import { createContext, useReducer } from "react";

import { MAPPING_COUNTRY_FAILED, MAPPING_COUNTRY_PROCESS, MAPPING_COUNTRY_SUCCESS } from "../constant";

const MappingCountryContext = createContext();

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
  syncData: [],
  dropdownData: [],
  dropdownFilterData: [],
};

function reducer(state, action) {
  switch (action.type) {
    case MAPPING_COUNTRY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case MAPPING_COUNTRY_SUCCESS:
      const changedState = {
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
      if (action.payload.isSync) {                
        return {
          ...state,
          ...changedState,
          syncData: action.payload.data,
        };
      } else if (action.payload.isDropDown) {                
        return {
          ...state,
          ...changedState,
          dropdownData: action.payload.data,
        };
      } else if (action.payload.isFilter) {                
        return {
          ...state,
          ...changedState,
          dropdownFilterData: action.payload.data,
        };
      }else {
        return {
          ...state,
          ...changedState,
          data: action.payload.data,
        };
      }
    case MAPPING_COUNTRY_FAILED:
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

function MappingCountryContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MappingCountryContext.Provider value={{ state, dispatch }}>
      {children}
    </MappingCountryContext.Provider>
  );
}

export { MappingCountryContext, MappingCountryContextProvider };
