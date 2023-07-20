import Swal from "sweetalert2";
import {
  SUPPLIER_FAILED,
  SUPPLIER_PROCESS,
  SUPPLIER_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllSupplier = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: SUPPLIER_PROCESS });
  try {
    let url = `${baseUrl}/api/suppliers?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/supplier-dd`;
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
      type: SUPPLIER_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: SUPPLIER_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createSupplier = async (body) => {
  try {
    const url = `${baseUrl}/api/supplier`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Supplier has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create Supplier, please try again later",
      "error"
    );
  }
};

export const updateSupplier = async (id, body) => {
  try {
    const url = `${baseUrl}/api/supplier/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Supplier has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update Supplier, please try again later",
      "error"
    );
  }
};

export const deleteSupplier = async (id) => {
  try {
    const url = `${baseUrl}/api/supplier/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Supplier has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete Supplier, please try again later",
      "error"
    );
  }
};
