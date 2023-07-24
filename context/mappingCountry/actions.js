import Swal from "sweetalert2";
import {
  MAPPING_COUNTRY_FAILED,
  MAPPING_COUNTRY_PROCESS,
  MAPPING_COUNTRY_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllMappingCountry = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: MAPPING_COUNTRY_PROCESS });
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
      type: MAPPING_COUNTRY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: MAPPING_COUNTRY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createMappingCountry = async (body) => {
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

export const updateMappingCountry = async (id, body) => {
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

export const deleteMappingCountry = async (id) => {
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
