import Swal from "sweetalert2";
import {
  BOOK_SEARCH_FAILED,
  BOOK_SEARCH_PROCESS,
  BOOK_SEARCH_SUCCESS,
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
