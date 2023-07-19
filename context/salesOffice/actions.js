import Swal from "sweetalert2";
import {
  SALES_OFFICE_FAILED,
  SALES_OFFICE_PROCESS,
  SALES_OFFICE_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllSales = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: SALES_OFFICE_PROCESS });
  try {
    let url = `${baseUrl}/api/userSales?page=${page}&limit=${limit}`;

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
      type: SALES_OFFICE_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: SALES_OFFICE_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createSales = async (body) => {
  try {
    const url = `${baseUrl}/api/userSale`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Sales Office has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create sales office, please try again later",
      "error"
    );
  }
};

export const updateSales = async (id, body) => {
  try {
    const url = `${baseUrl}/api/userSale/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Sales Office has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update sales office, please try again later",
      "error"
    );
  }
};

export const deleteSales = async (id) => {
  try {
    const url = `${baseUrl}/api/userSale/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Sales Office has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete sales office, please try again later",
      "error"
    );
  }
};
