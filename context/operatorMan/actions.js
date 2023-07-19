import Swal from "sweetalert2";
import {
  OPERATOR_MANAGEMENT_FAILED,
  OPERATOR_MANAGEMENT_PROCESS,
  OPERATOR_MANAGEMENT_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllOperator = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: OPERATOR_MANAGEMENT_PROCESS });
  try {
    let url = `${baseUrl}/api/users?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/users-dd`;
    }

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
      type: OPERATOR_MANAGEMENT_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: OPERATOR_MANAGEMENT_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createOperator = async (body) => {
  try {
    const url = `${baseUrl}/api/signup`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Operator has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create operator, please try again later",
      "error"
    );
  }
};

export const updateOperator = async (id, body) => {
  try {
    const url = `${baseUrl}/api/user/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Operator has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update operator, please try again later",
      "error"
    );
  }
};

export const deleteOperator = async (id) => {
  try {
    const url = `${baseUrl}/api/user/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Operator has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete operator, please try again later",
      "error"
    );
  }
};
