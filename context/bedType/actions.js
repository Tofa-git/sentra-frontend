import Swal from "sweetalert2";
import {
  BED_TYPE_FAILED,
  BED_TYPE_PROCESS,
  BED_TYPE_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllBedType = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: BED_TYPE_PROCESS });
  try {
    let url = `${baseUrl}/api/master/bedType?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/bedType-code-dd`;
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
      type: BED_TYPE_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: BED_TYPE_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createBedType = async (body) => {
  try {
    const url = `${baseUrl}/api/master/bedType`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "BedType has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create bedType, please try again later",
      "error"
    );
  }
};

export const updateBedType = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/bedType/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "BedType has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update bedType, please try again later",
      "error"
    );
  }
};

export const deleteBedType = async (id) => {
  try {
    const url = `${baseUrl}/api/master/bedType/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "BedType has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete bedType, please try again later",
      "error"
    );
  }
};
