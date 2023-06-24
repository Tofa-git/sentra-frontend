import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { useRouter } from "next/router";
import {
  cancelBooking,
  getAllBookList,
  getDetailBook,
} from "../../../context/book/actions";
import { AuthContext } from "../../../context/auth/reducer";
import Swal from "sweetalert2";
import { BookContext } from "../../../context/book/reducer";
import Pagination from "../../../components/pagination";
import BookDetail from "./modalDetail";

const checklist = [
  { id: 0, value: "ALL" },
  { id: 1, value: "Err Notes" },
  { id: 3, value: "On Process" },
  { id: 4, value: "Pay Failed" },
  { id: 5, value: "Request" },
  { id: 6, value: "Confirm" },
  { id: 7, value: "Amendrq" },
  { id: 8, value: "Amendrs" },
  { id: 9, value: "Cxlrq" },
  { id: 10, value: "Canceled" },
  { id: 11, value: "Reject" },
  { id: 12, value: "Sply Check" },
  { id: 13, value: "Vouchered" },
  { id: 14, value: "Mismatched Status" },
  { id: 15, value: "Hotel Name" },
  { id: 16, value: "Hotem Name" },
];

const Index = (props) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [detailBooking, setDetailBooking] = useState();
  const { state, dispatch } = useContext(BookContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const handleGet = async (page = 1, limit = 12) => {
    const country = await getAllBookList(dispatch, page, limit, keyword);
    if (country.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleDetail = async (bookId) => {
    setDetailBooking({});

    Swal.fire({
      icon: "info",
      title: "Get Detail Book" + `: ${bookId}`,
      showConfirmButton: false,
      timer: 1000 * 60,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const book = await getDetailBook(bookId);
    if (book.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
    setDetailBooking(book.data.data);

    setTimeout(() => {
      Swal.close();
    }, 1500);
  };

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You will cancel ${id}, you won't revert this`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel Booking",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "info",
          title: "Canceling Booking" + `: ${id}`,
          showConfirmButton: false,
          timer: 1000 * 60,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const res = await cancelBooking(id);

        if (res.status === 500) {
          Swal.fire("Error Canceling Book", res.message, "error");
        } else {
          Swal.fire("Successfully Cancel Book", "", "success");
        }

        setTimeout(() => {
          Swal.close();
        }, 1500);
      }
    });
  };

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <div className="m-3">
      <BookDetail
        id="createHotel"
        size="modal-xl"
        handleGet={handleGet}
        data={detailBooking}
      />
      <div className="d-flex h-100">
        <div className="w-100">
          <div className="text-dark mb-2">
            <span>
              <i
                className="material-icons text-dark"
                style={{ verticalAlign: "middle" }}
              >
                arrow_right
              </i>
              <span className="ms-2 text-dark">
                Booking Search (Request : 0 / Amendreq : 0 / Amendrs : 0 /
                Cancelreq : 0 / Reject : 2 / Sply Check : 0 / Mis-matched Status
                : 0 / HotelName Alert : 0 /1 ) Date Format(YY-MM-DD)
              </span>
            </span>
          </div>
          <div className="mb-3 mx-3">
            <div className="bg-white py-3 row">
              <div className="col-2">
                <Select label={"Period"} />
              </div>
              <div className="col-2">
                <div className="d-flex flex-row">
                  <Input label={"Start"} />
                  <Input label={"End"} />
                </div>
              </div>
              <div className="col-2">
                <div className="d-flex flex-row">
                  <Select label={"Type Book"} />
                  <Input label={""} />
                </div>
              </div>
              <div className="col-2">
                <Input label={"Suplier"} />
              </div>
              <div className="col-2">
                <Input label={"Guest Name"} />
              </div>
              <div className="col-2">
                <Input label={"Hotel Name"} />
              </div>
              <div className="col-2">
                <Select label={"Type"} />
              </div>
              <div className="col-2">
                <Select label={"First Operator"} />
              </div>
              <div className="col-2">
                <Select label={"Last Operator"} />
              </div>
              <div className="col-2">
                <Input label={"Agent"} />
              </div>
              <div className="col-2">
                <Input label={"Manager"} />
              </div>
              <div className="col-2"></div>
              <div className="col-2">
                <Select label={"Supplier"} />
              </div>
              <div className="col-2">
                <Select label={"Select Office"} />
              </div>
              <div className="col-2">
                <Select label={"Booking"} />
              </div>
              <div className="col-2">
                <Input label={"Country"} />
              </div>
              <div className="col-2">
                <Input label={"City"} />
              </div>
              <div className="col-2"></div>
              <div className="col-12">
                <div className="text-dark mt-2 mb-1">Status</div>
                <div className="row">
                  {checklist.map((i) => {
                    return (
                      <div className="col-2">
                        <input type="checkbox" className="ms-2" />
                        <span className="text-dark ms-2">{i.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-3">
                <div className="d-flex flex-row">
                  <Select label={"Client Type"} />
                  <button className="bg-blue text-white rounded ms-2 h-50 align-self-end">
                    Search
                  </button>
                  <button className="bg-blue text-white rounded ms-2 h-50 align-self-end">
                    Excel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-dark mb-2">
            <span>
              <i
                className="material-icons text-dark"
                style={{ verticalAlign: "middle" }}
              >
                arrow_right
              </i>
              <span className="ms-2 text-dark">
                Booking List [EVT: P(minus Profit), D(Double book), O(Over
                credit limit), E(Promotion), A(Allotment Confirm), R(Hotel's
                Rmk), G (Guest's Rmk), H (Hotel Cnf No), V (Voucher Issued), C
                (Compare Book) , W (Voucher for hotel)]
              </span>
            </span>
          </div>
          <div style={{ background: "#fff" }}>
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    Booking ID
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Check In
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Check Out
                  </th>
                  <th className="bg-blue text-white" width="15%">
                    Hotel Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Gross Price
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Policy Type
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Room Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Action
                  </th>
                  {/* <th className="bg-blue text-white" width="5%">
                    C-Day
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    CXLDL
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Check IN/OUT
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Bed Type
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Guest Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Profit %
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Sale
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Net
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Type
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Big Income
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    XML
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    First Last Ops
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Sale Office
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {state?.dataList?.rows?.map((data) => {
                  return (
                    <tr>
                      <td>{data?.mgBookingID}</td>
                      <td>{data?.checkIn}</td>
                      <td>{data?.checkOut}</td>
                      <td>{data?.hotelName}</td>
                      <td>{data?.grossPrice}</td>
                      <td>{data?.cancellationPolicyType}</td>
                      <td>{data?.roomName}</td>
                      <td className="d-flex flex-row justify-content-center align-items-center">
                        <button
                          type="button"
                          className="btn btn-primary bg-blue"
                          data-bs-toggle="modal"
                          data-bs-target="#createHotel"
                          onClick={() => handleDetail(data?.mgBookingID)}
                        >
                          Detail
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleCancel(data?.mgBookingID);
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Pagination state={state?.dataList} handleGet={handleGet} />
        </div>
      </div>
    </div>
  );
};

export default Index;
