import Swal from "sweetalert2";
import {
  MAPPING_HOTEL_FAILED,
  MAPPING_HOTEL_PROCESS,
  MAPPING_HOTEL_SUCCESS,
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
  dispatch({ type: MAPPING_HOTEL_PROCESS });
  try {
    let url = `${baseUrl}/api/integration/show-maphotel?page=${page}&limit=${limit}`;
    let method = "GET";
    let body = null;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    if (isSync) {
      url = `${baseUrl}/api/integration/show-maphotel?page=${page}&limit=${limit}`;
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
      type: MAPPING_HOTEL_SUCCESS,
      payload: { data: data?.data, isSync },
    });
    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: MAPPING_HOTEL_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const syncData = async (
  dispatch,
  isSync = true,
  supplierId=0,
  country,
  city,
) => {
  dispatch({ type: MAPPING_HOTEL_PROCESS });
  try {
    let url = `${baseUrl}/api/integration/sync-maphotel/${supplierId}`;
    let body = null;
    
    const token = localStorage.getItem("AUTH_TOKEN");

    body = JSON.stringify({ 
      Country: country,
      City: city
    });

    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: body, 
    };

    const res = await fetch(url, config);
    const data = await res.json();
    dispatch({
      type: MAPPING_HOTEL_SUCCESS,
      payload: { data: data?.data, isSync },
    });

    return { data: data?.data, status: res.status };
  } catch (error) {
    dispatch({
      type: MAPPING_HOTEL_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const createData = async (body) => {
  try {
    const url = `${baseUrl}/api/integration/create-maphotel`;
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
    const url = `${baseUrl}/api/integration/update-maphotel/${id}`;
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

export const getDDLHotel = async (
  dispatch,
  countryId,
  cityId,
  supplierid,
  isDropDown = true,
) => {
  dispatch({ type: MAPPING_HOTEL_PROCESS });
  try {    
    let url = `${baseUrl}/api/integration/maphotel-dd?supplierId=${supplierid}&countryId=${countryId}&cityId=${cityId}`;

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
      type: MAPPING_HOTEL_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });

    return { data: data?.data, status: res.status };
  } catch (error) {
    console.log(error)
    dispatch({
      type: MAPPING_HOTEL_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};

export const getDDLIDHotel = async (
  dispatch,
  id,  
  isDropDown = true,
) => {
  dispatch({ type: MAPPING_HOTEL_PROCESS });
  try {    
    let url = `${baseUrl}/api/integration/maphotelid-dd`;

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
      type: MAPPING_HOTEL_SUCCESS,
      payload: { data: data?.data, isDropDown },
    });

    return { data: data?.data, status: res.status };
  } catch (error) {
    console.log(error)
    dispatch({
      type: MAPPING_HOTEL_FAILED,
      payload: error?.response?.data?.message || "Error",
    });
  }
};