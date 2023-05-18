import axios from "axios";
import { AUTH_FAILED, AUTH_PROCESS, AUTH_SUCCESS, baseUrl } from "../constant";

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
    dispatch({ type: AUTH_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: AUTH_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};
