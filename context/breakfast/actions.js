import Swal from "sweetalert2";
import {
  BREAKFAST_FAILED,
  BREAKFAST_PROCESS,
  BREAKFAST_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllBreakfast = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: BREAKFAST_PROCESS });
  try {
    let url = `${baseUrl}/api/master/breakfast?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/breakfast-code-dd`;
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
      type: BREAKFAST_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: BREAKFAST_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createBreakfast = async (body) => {
  try {
    const url = `${baseUrl}/api/master/breakfast`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Breakfast has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create breakfast, please try again later",
      "error"
    );
  }
};

export const updateBreakfast = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/breakfast/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Breakfast has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update breakfast, please try again later",
      "error"
    );
  }
};

export const deleteBreakfast = async (id) => {
  try {
    const url = `${baseUrl}/api/master/breakfast/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Breakfast has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete breakfast, please try again later",
      "error"
    );
  }
};
