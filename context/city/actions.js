import Swal from "sweetalert2";
import { CITY_FAILED, CITY_PROCESS, CITY_SUCCESS, baseUrl } from "../constant";
import axios from "axios";

export const getAllCity = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: CITY_PROCESS });
  try {
    let url = `${baseUrl}/api/master/city-code?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/city-code-dd`;
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
      type: CITY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: CITY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createCity = async (body) => {
  try {
    const url = `${baseUrl}/api/master/city-code`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "City has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create city, please try again later",
      "error"
    );
  }
};

export const updateCity = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/city-code/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "City has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update city, please try again later",
      "error"
    );
  }
};

export const deleteCity = async (id) => {
  try {
    const url = `${baseUrl}/api/master/city-code/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "City has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete city, please try again later",
      "error"
    );
  }
};
