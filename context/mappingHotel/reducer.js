import { createContext, useReducer } from "react";

import { MAPPING_HOTEL_FAILED, MAPPING_HOTEL_PROCESS, MAPPING_HOTEL_SUCCESS } from "../constant";

const MappingHotelContext = createContext();

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
    case MAPPING_HOTEL_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case MAPPING_HOTEL_SUCCESS:
      const changedState = {
        isLoading: false,
        isError: false,
        errorMessage: null,
      };
      console.log(action.payload)
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
      } else {
        return {
          ...state,
          ...changedState,
          data: action.payload.data,
        };
      }
    case MAPPING_HOTEL_FAILED:
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

function MappingHotelContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MappingHotelContext.Provider value={{ state, dispatch }}>
      {children}
    </MappingHotelContext.Provider>
  );
}

export { MappingHotelContext, MappingHotelContextProvider };
