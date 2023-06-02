import Swal from "sweetalert2";
import {
  NATIONALITY_FAILED,
  NATIONALITY_PROCESS,
  NATIONALITY_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllNationality = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: NATIONALITY_PROCESS });
  try {
    let url = `${baseUrl}/api/master/nationality?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/nationality-dd`;
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
      type: NATIONALITY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: NATIONALITY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createNationality = async (body) => {
  try {
    const url = `${baseUrl}/api/master/nationality`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Nationality has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create nationality, please try again later",
      "error"
    );
  }
};

export const updateNationality = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/nationality/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Nationality has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update nationality, please try again later",
      "error"
    );
  }
};

export const deleteNationality = async (id) => {
  try {
    const url = `${baseUrl}/api/master/nationality/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Nationality has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete nationality, please try again later",
      "error"
    );
  }
};
