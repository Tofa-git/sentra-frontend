import { createContext, useReducer } from "react";

import {
  AUTH_FAILED,
  AUTH_PROCESS,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_401,
  GET_USER_FAILED,
  GET_USER_PROCESS,
  GET_USER_SUCCESS,
} from "../constant";

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  status: 200,
  listUsers: [],
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
        status: 200,
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
      localStorage.removeItem("AUTH_TOKEN");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        isError: false,
        errorMessage: null,
        status: 200,
      };
    case AUTH_401:
      return { ...state, status: 401 };
    case GET_USER_PROCESS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listUsers: action.payload.data,
      };
    case GET_USER_FAILED:
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

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
