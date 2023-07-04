import Swal from "sweetalert2";
import {
  FACILITY_FAILED,
  FACILITY_PROCESS,
  FACILITY_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllFacility = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: FACILITY_PROCESS });
  try {
    let url = `${baseUrl}/api/master/facility?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/facility-code-dd`;
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
      type: FACILITY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: FACILITY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createFacility = async (body) => {
  try {
    const url = `${baseUrl}/api/master/facility`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Facility has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create facility, please try again later",
      "error"
    );
  }
};

export const updateFacility = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/facility/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Facility has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update facility, please try again later",
      "error"
    );
  }
};

export const deleteFacility = async (id) => {
  try {
    const url = `${baseUrl}/api/master/facility/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Facility has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete facility, please try again later",
      "error"
    );
  }
};
