import { createContext, useReducer } from "react";

import { MAPPING_CITY_FAILED, MAPPING_CITY_PROCESS, MAPPING_CITY_SUCCESS } from "../constant";

const MappingCityContext = createContext();

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
};

function reducer(state, action) {
  switch (action.type) {
    case MAPPING_CITY_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case MAPPING_CITY_SUCCESS:
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
      }  else if (action.payload.isDropDown) {        
        return {
          ...state,
          ...changedState,
          dropdownData: action.payload.data,
        };
      }else {
        return {
          ...state,
          ...changedState,
          data: action.payload.data,
        };
      }
    case MAPPING_CITY_FAILED:
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

function MappingCityContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MappingCityContext.Provider value={{ state, dispatch }}>
      {children}
    </MappingCityContext.Provider>
  );
}

export { MappingCityContext, MappingCityContextProvider };
