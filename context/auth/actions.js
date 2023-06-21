import axios from "axios";
import {
  AUTH_FAILED,
  AUTH_PROCESS,
  AUTH_SUCCESS,
  baseUrl,
  GET_USER_FAILED,
  GET_USER_PROCESS,
  GET_USER_SUCCESS,
} from "../constant";
import Swal from "sweetalert2";

export const getAllUserDD = async (dispatch) => {
  dispatch({ type: GET_USER_PROCESS });
  try {
    let url = `${baseUrl}/api/users-dd`;

    const token = localStorage.getItem("AUTH_TOKEN");
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, config);
    const data = await res.json();

    dispatch({
      type: GET_USER_SUCCESS,
      payload: { data: data?.data },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: GET_USER_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const login = async (dispatch, email, password) => {
  dispatch({ type: AUTH_PROCESS });
  try {
    const url = `${baseUrl}/api/login`;
    const config = {
      method: "post",
      url,
      data: {
        email: email,
        password: password,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const res = await axios(config);
    const data = res.data;
    localStorage.setItem("AUTH_TOKEN", data.data.token);
    Swal.fire("Successfully Login", "", "success");
    dispatch({ type: AUTH_SUCCESS, payload: data.data });
  } catch (error) {
    Swal.fire("Failed", error?.response?.data?.message, "error");
    dispatch({
      type: AUTH_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};
