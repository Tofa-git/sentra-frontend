import Swal from "sweetalert2";
import {
  COUNTRY_FAILED,
  COUNTRY_PROCESS,
  COUNTRY_SUCCESS,
  CURRENCIES_SUCCESS,
  CURRENCIES_FAILED,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllCountry = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: COUNTRY_PROCESS });
  try {
    let url = `${baseUrl}/api/master/country-code?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/country-code-dd`;
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
      type: COUNTRY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: COUNTRY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createCountry = async (body) => {
  try {
    const url = `${baseUrl}/api/master/country-code`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Country has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create country, please try again later",
      "error"
    );
  }
};

export const updateCountry = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/country-code/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Country has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update country, please try again later",
      "error"
    );
  }
};

export const deleteCountry = async (id) => {
  try {
    const url = `${baseUrl}/api/master/country-code/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Country has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete country, please try again later",
      "error"
    );
  }
};

export const getCurrencies = async (dispatch) => {
  try {
    let url = `${baseUrl}/api/master/currencies`;

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
      type: CURRENCIES_SUCCESS,
      payload: { data: data?.data },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: CURRENCIES_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const getSupplierCountry = async (dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = "") => {

};

