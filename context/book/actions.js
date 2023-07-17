import Swal from "sweetalert2";
import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_PROCESS,
  BOOK_SEARCH_SUCCESS,
  BOOK_LIST_FAILED,
  BOOK_LIST_PROCESS,
  BOOK_LIST_SUCCESS,
  BOOK_DETAIL_FAILED,
  BOOK_DETAIL_PROCESS,
  BOOK_DETAIL_SUCCESS,
  BOOK_SEARCH_RESET,
  baseUrl,
} from "../constant";
import axios from "axios";

export const getAllBookSearch = async (dispatch, body) => {
  dispatch({ type: BOOK_SEARCH_PROCESS });
  try {
    const url = `${baseUrl}/api/integration/search-hotel`;
    const token = localStorage.getItem("AUTH_TOKEN");

    const book = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire(
      "Search Success",
      "Check list hotel Available on the Table",
      "success"
    );

    dispatch({
      type: BOOK_SEARCH_SUCCESS,
      payload: book.data,
    });
    return { data: book?.data, status: book.status };
  } catch (error) {
    dispatch({
      type: BOOK_SEARCH_FAILED,
      payload: error,
    });

    Swal.fire(
      "Search Failed",
      "Error when search hotel, please try again later",
      "error"
    );
    return { data: [], status: 500 };
  }
};

export const getAllBookList = async (
  dispatch,
  page = 1,
  limit = 12,
  name = ""
) => {
  dispatch({ type: BOOK_LIST_PROCESS });
  try {
    let url = `${baseUrl}/api/integration/booking-list?page=${page}&limit=${limit}`;

    if (name.length > 0) {
      url += `&name=${name}`;
    }

    const token = localStorage.getItem("AUTH_TOKEN");

    const book = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire("Get List Success", "Successfully get list booking", "success");

    dispatch({
      type: BOOK_LIST_SUCCESS,
      payload: book.data,
    });
    return { data: book?.data, status: book.status };
  } catch (error) {
    console.log(error);
    dispatch({
      type: BOOK_LIST_FAILED,
      payload: error,
    });

    Swal.fire(
      "Get List Failed",
      "Error when Get List booking, please try again later",
      "error"
    );
    return { data: [], status: 500 };
  }
};

export const recheckBookSearch = async (body) => {
  try {
    const url = `${baseUrl}/api/integration/recheck`;
    const token = localStorage.getItem("AUTH_TOKEN");

    const book = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: book?.data, status: book.status };
  } catch (error) {
    Swal.fire(
      "Recheck Failed",
      "Error when recheck hotel, please try again later",
      "error"
    );
    return { data: [], status: 500 };
  }
};

export const createBook = async (body) => {
  try {
    const url = `${baseUrl}/api/integration/booking`;
    const token = localStorage.getItem("AUTH_TOKEN");

    const book = await axios.post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire(
      "Book Success",
      `Successfully booked, your Booking ID is: ${book.data.data.mgBookingID}`,
      "success"
    );

    return { data: book?.data, status: book.status };
  } catch (error) {
    Swal.fire(
      "Booking Failed",
      "Error when booking hotel, please try again later",
      "error"
    );
    return { data: [], status: 500 };
  }
};

export const getDetailBook = async (dispatch, bookingId) => {
  dispatch({ type: BOOK_DETAIL_PROCESS });
  try {
    let url = `${baseUrl}/api/integration/booking-detail/${bookingId}`;

    const token = localStorage.getItem("AUTH_TOKEN");

    const book = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: BOOK_DETAIL_SUCCESS,
      payload: book.data,
    });
    return { data: book?.data, status: book.status };
  } catch (error) {
    dispatch({
      type: BOOK_DETAIL_FAILED,
      payload: error,
    });
    return { data: [], status: 500 };
  }
};

export const cancelBooking = async (bookingId) => {
  try {
    let url = `${baseUrl}/api/integration/booking-cancel/${bookingId}`;

    const token = localStorage.getItem("AUTH_TOKEN");

    const book = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: book?.data, status: book.status };
  } catch (error) {
    console.log(error);
    return { data: [], status: 500, message: error.response.data.message };
  }
};
