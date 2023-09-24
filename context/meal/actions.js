import Swal from "sweetalert2";
import {
  MEAL_FAILED,
  MEAL_PROCESS,
  MEAL_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllMeal = async (
  dispatch,
  isDropDown = false,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: MEAL_PROCESS });
  try {
    let url = `${baseUrl}/api/master/meal?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isDropDown) {
      url = `${baseUrl}/api/master/meal-code-dd`;
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
      type: MEAL_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: MEAL_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createMeal = async (body) => {
  try {
    const url = `${baseUrl}/api/master/meal`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Meal has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create meal, please try again later",
      "error"
    );
  }
};

export const updateMeal = async (id, body) => {
  try {
    const url = `${baseUrl}/api/master/meal/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Meal has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update meal, please try again later",
      "error"
    );
  }
};

export const deleteMeal = async (id) => {
  try {
    const url = `${baseUrl}/api/master/meal/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Meal has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete meal, please try again later",
      "error"
    );
  }
};
