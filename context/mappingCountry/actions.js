import Swal from "sweetalert2";
import {
  MAPPING_COUNTRY_FAILED,
  MAPPING_COUNTRY_PROCESS,
  MAPPING_COUNTRY_SUCCESS,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getData = async (
  dispatch,
  isSync = false,
  page = 1,
  limit = 12,
  supplierId,
  name = ""
) => {
  dispatch({ type: MAPPING_COUNTRY_PROCESS });
  try {
    let url = `${baseUrl}/api/integration/show-mapcountry?page=${page}&limit=${limit}`;
    let method = "GET";
    let body = null;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isSync) {
      url = `${baseUrl}/api/integration/show-mapcountry?page=${page}&limit=${limit}`;
    } else {
      // Set the method to POST for synchronization
      method = "POST";
      body = JSON.stringify({ supplierId: supplierId ?? 0 });
    }

    const token = localStorage.getItem("AUTH_TOKEN");
    const config = {
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", 
      },
      body: body, 
    };

    const res = await fetch(url, config);
    const data = await res.json();

    dispatch({
      type: MAPPING_COUNTRY_SUCCESS,
      payload: { data: data?.data, isSync },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: MAPPING_COUNTRY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const syncData = async (
  dispatch,
  isSync = true,
  supplierId=0
) => {
  dispatch({ type: MAPPING_COUNTRY_PROCESS });
  try {
    let url = `${baseUrl}/api/integration/sync-mapcountry/${supplierId}`;

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
      payload: { data: data?.data, isSync },
    });

    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: MAPPING_COUNTRY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createData = async (body) => {
  try {
    const url = `${baseUrl}/api/integration/create-mapcountry`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Create Success",
      "Data has been successfully created",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Create Failed",
      "Error when create data, please try again later",
      "error"
    );
  }
};

export const updateData = async (id, body) => {
  try {
    const url = `${baseUrl}/api/integration/update-mapcountry/${id}`;
    const token = localStorage.getItem("AUTH_TOKEN");

    await axios.put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire(
      "Update Success",
      "Data has been successfully updated",
      "success"
    );
  } catch (error) {
    Swal.fire(
      "Update Failed",
      "Error when update data, please try again later",
      "error"
    );
  }
};

export const getDDLCountry = async (
  dispatch,  
  supplierid,
  isDropDown = true,
) => {
  dispatch({ type: MAPPING_COUNTRY_PROCESS });
  try {    
    let url = `${baseUrl}/api/integration/mapcountry-dd?supplierId=${supplierid}`;

    const token = localStorage.getItem("AUTH_TOKEN");
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, config);    
    const data = await res.json();
    console.log(data)
    dispatch({
      type: MAPPING_COUNTRY_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });

    return { data: data?.data, status: res.status };
  } catch (error) {
    console.log(error)
    dispatch({
      type: MAPPING_COUNTRY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const getDDLFilterCountry = async (
  dispatch,  
  supplierid,
  isDropDown = false,
  isFilter = true,
) => {
  dispatch({ type: MAPPING_COUNTRY_PROCESS });
  try {    
    let url = `${baseUrl}/api/integration/mapcountry-dd?supplierId=${2}`;

    const token = localStorage.getItem("AUTH_TOKEN");
    const config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(url, config);    
    const data = await res.json();    
    dispatch({
      type: MAPPING_COUNTRY_SUCCESS,
      payload: { data: data?.data, isDropDown,isFilter },
    });

    return { data: data?.data, status: res.status };
  } catch (error) {
    console.log(error)
    dispatch({
      type: MAPPING_COUNTRY_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};