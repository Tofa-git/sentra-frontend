import Swal from "sweetalert2";
import {
  HOTEL_FAILED,
  HOTEL_PROCESS,
  HOTEL_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllHotel = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: HOTEL_PROCESS });
  try {
    let url = `${baseUrl}/api/master/hotel?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/hotel-dd`;
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
      type: HOTEL_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: HOTEL_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createHotel = async (body) => {
  try {
    const url = `${baseUrl}/api/master/hotel`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Hotel has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create hotel, please try again later",
      "error"
    );
  }
};

export const uploadFile = async (body) => {
  try {
    const url = `${baseUrl}/api/master/file`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire(
      "Create Success",
      "Hotel has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create hotel, please try again later",
      "error"
    );
  }
};

export const updateHotel = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/hotel/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Hotel has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update hotel, please try again later",
      "error"
    );
  }
};

export const deleteHotel = async (id) => {
  try {
    const url = `${baseUrl}/api/master/hotel/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Hotel has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete hotel, please try again later",
      "error"
    );
  }
};
