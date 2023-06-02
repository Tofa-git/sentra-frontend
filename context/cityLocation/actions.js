import Swal from "sweetalert2";
import {
  CITY_LOCATION_FAILED,
  CITY_LOCATION_PROCESS,
  CITY_LOCATION_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllCityLocation = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: CITY_LOCATION_PROCESS });
  try {
    let url = `${baseUrl}/api/master/city-location?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/city-location-dd`;
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
      type: CITY_LOCATION_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: CITY_LOCATION_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createCityLocation = async (body) => {
  try {
    const url = `${baseUrl}/api/master/city-location`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "CityLocation has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create cityLocation, please try again later",
      "error"
    );
  }
};

export const updateCityLocation = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/city-location/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "CityLocation has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update cityLocation, please try again later",
      "error"
    );
  }
};

export const deleteCityLocation = async (id) => {
  try {
    const url = `${baseUrl}/api/master/city-location/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "CityLocation has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete cityLocation, please try again later",
      "error"
    );
  }
};
