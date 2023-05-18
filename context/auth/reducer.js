import { createContext, useReducer } from "react";

import {
  AUTH_FAILED,
  AUTH_PROCESS,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from "../constant";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
};

function reducer(state, action) {
  switch (action.type) {
    case AUTH_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        isError: false,
        errorMessage: null,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isError: true,
        errorMessage: action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: null,
      };
    default:
      return state;
  }
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
