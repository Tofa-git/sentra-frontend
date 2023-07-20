import Swal from "sweetalert2";
import {
  CURRENCY_FAILED,
  CURRENCY_PROCESS,
  CURRENCY_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllCurrency = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: CURRENCY_PROCESS });
  try {
    let url = `${baseUrl}/api/master/currency?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/currency-dd`;
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
      type: CURRENCY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: CURRENCY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createCurrency = async (body) => {
  try {
    const url = `${baseUrl}/api/master/currency/`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Currency has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create Currency, please try again later",
      "error"
    );
  }
};

export const updateCurrency = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/currency/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Currency has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update Currency, please try again later",
      "error"
    );
  }
};

export const deleteCurrency = async (id) => {
  try {
    const url = `${baseUrl}/api/master/currency/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Currency has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete Currency, please try again later",
      "error"
    );
  }
};
