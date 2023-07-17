import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createCity, updateCity } from "../../../context/city/actions";
import { CountryContext } from "../../../context/country/reducer";
import Input from "../../../components/input";

const BookDetail = (props) => {
  const { data } = props;
  const { state: countryState } = useContext(CountryContext);

  return (
    <div
      className="modal fade"
      id={props.id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className={props.size + " modal-dialog"}>
        <div className="modal-content rounded-2 shadow">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-black" id={props.id + "Label"}>
              Detail Booking
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-3">
            <div className="row">
              <div className="col-6">
                <Input
                  label={"MG Booking ID"}
                  value={data?.mgBookingID || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Version Booking ID"}
                  value={data?.mgBookingVersionID || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Check In"}
                  value={data?.checkIn || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Check Out"}
                  value={data?.checkOut || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Currency"}
                  value={data?.currency || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input label={"Status"} value={data?.status || "-"} disabled />
              </div>
              <div className="col-8">
                <Input
                  label={"Hotel Name"}
                  value={data?.hotels?.hotel?.name || "-"}
                  disabled
                />
              </div>
              <div className="col-4">
                <Input
                  label={"Rate"}
                  value={data?.hotels?.hotel?.rating || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Net Price"}
                  value={data?.hotels?.hotel?.roomDetails?.netPrice || "-"}
                  disabled
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Gross Price"}
                  value={data?.hotels?.hotel?.roomDetails?.grossPrice || "-"}
                  disabled
                />
              </div>
              <div className="col-12 mt-2">
                <span>Pax Details</span>
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="bg-blue text-white" width="5%">
                        First Name
                      </th>
                      <th className="bg-blue text-white" width="5%">
                        Last Name
                      </th>
                      <th className="bg-blue text-white" width="5%">
                        Salutation
                      </th>
                      <th className="bg-blue text-white" width="5%">
                        Age
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.hotels?.hotel?.roomDetails?.rooms?.room?.map((i) => {
                      return i?.paxDetails?.pax?.map((p) => {
                        return (
                          <tr>
                            <td>{p?.firstName || "-"}</td>
                            <td>{p?.lastName || "-"}</td>
                            <td>{p?.salutation || "-"}</td>
                            <td>{p?.age || "-"}</td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary rounded-0"
              data-bs-dismiss="modal"
              id="cancelModal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
