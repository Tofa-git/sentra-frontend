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

export const getDDLSupp = async (
  dispatch,
  isDropDown = true,
) => {
  dispatch({ type: SUPPLIER_PROCESS });
  try {
    let url = `${baseUrl}/api/supplier-dd`;

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

/* Supplier Emergency */
export const createSuppEmerg = async (body) => {
  try {
    const url = `${baseUrl}/api/supplier/emergency`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Supplier Emergency has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create Supplier Emergency, please try again later",
      "error"
    );
  }
};

export const updateSuppEmerg = async (id, body) => {
  try {
    const url = `${baseUrl}/api/supplier/emergency/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Supplier Emergency has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update Supplier Emergency, please try again later",
      "error"
    );
  }
};

export const deleteSuppEmerg = async (id) => {
  try {
    const url = `${baseUrl}/api/supplier/emergency/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Supplier Emergency has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete Supplier Emergency, please try again later",
      "error"
    );
  }
};

/* Supplier EndPoint */
export const createSuppEndPoint = async (body) => {
  try {
    const url = `${baseUrl}/api/supplier/api`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "End Point has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create End Point, please try again later",
      "error"
    );
  }
};

export const updateSuppEndPoint = async (id, body) => {
  try {
    const url = `${baseUrl}/api/supplier/api/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "End Point has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update End Point, please try again later",
      "error"
    );
  }
};

export const deleteSuppEndPoint = async (id) => {
  try {
    const url = `${baseUrl}/api/supplier/api/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "End Point has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete End Point, please try again later",
      "error"
    );
  }
};

/* Supplier Manager */
export const createSuppMan = async (body) => {
  try {
    const url = `${baseUrl}/api/supplier/manager`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Supplier Manager has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create Supplier Manager, please try again later",
      "error"
    );
  }
};

export const updateSuppMan = async (id, body) => {
  try {
    const url = `${baseUrl}/api/supplier/manager/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Supplier Manager has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update Supplier Manager, please try again later",
      "error"
    );
  }
};

export const deleteSuppMan = async (id) => {
  try {
    const url = `${baseUrl}/api/supplier/manager/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Delete Success",
      "Supplier Manager has been successfully deleted",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Delete Failed",
      "Error when delete Supplier Manager, please try again later",
      "error"
    );
  }
};

