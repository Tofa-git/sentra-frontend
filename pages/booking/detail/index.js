import React, { useContext } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { BookContext } from "../../../context/book/reducer";

const dummyData = [
  {
    id: 1,
    location_code: "ALOR",
    location_name_en: "Alor",
    location_name_ch: "4",
    is_used: 1,
  },
  {
    id: 2,
    location_code: "AMBA",
    location_name_en: "Ambarawa",
    location_name_ch: "3",
    is_used: 1,
  },
  {
    id: 3,
    location_code: "AMQ",
    location_name_en: "Ambon",
    location_name_ch: "5",
    is_used: 0,
  },
];

const Index = (props) => {
  const { state } = useContext(BookContext);
  const details = state?.details;

  return (
    <div className="mx-3">
      <div className="row p-3">
        <div className="col-lg-6">
          <div className="text-dark mb-1">Booking Basic</div>
          <div className="bg-white py-3 row">
            <div className="col-6">
              <Input
                label={"Booking ID"}
                disabled={true}
                value={details.mgBookingID}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Booking Version ID"}
                disabled={true}
                value={details.mgBookingVersionID}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Check In"}
                disabled={true}
                value={details?.checkIn}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Check Out"}
                disabled={true}
                value={details?.checkOut}
              />
            </div>
            <div className="col-6">
              <Select label={"City"} />
            </div>
            <div className="col-3">
              <Input type="date" label="Check In" />
            </div>
            <div className="col-3">
              <Input type="date" label="Check Out" />
            </div>
            <div className="col-3">
              <Input type="number" label="Night" />
            </div>
            <div className="col-3">
              <Select />
            </div>
            <div className="col-2">
              <Select label="SG" />
            </div>
            <div className="col-2">
              <Select label="DG" />
            </div>
            <div className="col-2">
              <Select label="TW" />
            </div>
            <div className="col-2">
              <Select label="TP" />
            </div>
            <div className="col-2">
              <Select label="QD" />
            </div>
            <div className="col-2">
              <Select label="Rooms" />
            </div>
            <div className="col-12">
              <Select label="City Location" />
            </div>
            <div className="col-12">
              <Select label="Hotel" />
            </div>
            <div className="col-8">
              <Input label="Designate Hotel" />
            </div>
            <div className="col-4 align-items-end d-flex">
              <button className="bg-blue rounded">Search</button>
              <button className="bg-blue rounded ms-2">Reset</button>
            </div>
            <div className="col-8">
              <Input label="Quick Search" />
            </div>
            <div className="col-4 align-items-end d-flex">
              <button className="bg-blue rounded">Search</button>
            </div>
            <div className="col-6">
              <div className="text-dark mt-2 mb-2">Available Type</div>
              <input type="radio" />
              <span className="text-dark ms-2">Available</span>
              <input type="radio" className="ms-2" />
              <span className="text-dark ms-2">ALL</span>
            </div>
            <div className="col-12">
              <div className="text-dark mt-2 mb-2">Sort</div>
              <input type="radio" />
              <span className="text-dark ms-2">RT + Rate</span>
              <input type="radio" className="ms-2" />
              <span className="text-dark ms-2">Low Price</span>
              <input type="radio" className="ms-2" />
              <span className="text-dark ms-2">Grade</span>
              <input type="radio" className="ms-2" />
              <span className="text-dark ms-2">Hotel</span>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">Tarif</span>
            </div>
            <div className="col-12">
              <div className="text-dark mt-2 mb-2">XML Supplier</div>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">ALL</span>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">HBE</span>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">MGJ</span>
            </div>
          </div>
          <div className="text-dark mb-1 mt-4">Hotel List</div>
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    RT
                  </th>
                  <th className="bg-blue text-white" width="30%">
                    Hotel
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    ★
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Sale
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Net
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Breakfast
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Supplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_code}</td>
                      <td>{data.location_name_en}</td>
                      <td>{data.location_name_ch}</td>
                      <td>{data.is_used ? "Yes" : "No"}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="text-dark mb-1">Hotel</div>
          <div className="bg-white">
            <div className="col-3 px-2 py-2">
              <Input label={"Supply"} />
            </div>
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    RT
                  </th>
                  <th className="bg-blue text-white" width="30%">
                    Hotel
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    ★
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Sale
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Net
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Breakfast
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Supplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_code}</td>
                      <td>{data.location_name_en}</td>
                      <td>{data.location_name_ch}</td>
                      <td>{data.is_used ? "Yes" : "No"}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-dark mb-1">Rate</div>
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th />
                  <th className="text-center bg-blue text-white" colSpan={5}>
                    Sale
                  </th>
                  <th className="text-center bg-blue text-white" colSpan={5}>
                    Net
                  </th>
                </tr>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    Date
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    SGL
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    DBL
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    TWN
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    TRP
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    QUAD
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    SGL
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    DBL
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    TWN
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    TRP
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    QUAD
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_code}</td>
                      <td>{data.location_name_en}</td>
                      <td>{data.location_name_ch}</td>
                      <td>{data.is_used ? "Yes" : "No"}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-dark mb-1 d-flex justify-content-between">
            <span>Booking</span>
            <div>
              <button className="bg-blue rounded-1 ms-2">Wish</button>
              <button className="bg-blue rounded-1 ms-2">Quotation</button>
            </div>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-4">
              <Input label={"Group No"} />
            </div>
            <div className="col-4">
              <Input label={"Book No"} />
            </div>
            <div className="col-4">
              <Input label={"Book Type"} />
            </div>
            <div className="col-6">
              <Input label={"Agent"} />
            </div>
            <div className="col-6">
              <Input label={"Manager"} />
            </div>
            <div className="col-6">
              <Input label={"Markup"} />
            </div>
            <div className="col-6">
              <Input label={"Credit"} />
            </div>
            <div className="col-6">
              <Input label={"Tel"} />
            </div>
            <div className="col-6">
              <Input label={"Mobile"} />
            </div>
            <div className="col-6">
              <Input label={"Email"} />
            </div>
            <div className="col-6">
              <Input label={"Operator"} />
            </div>
            <div className="col-12">
              <Input label={"If Over (no) Credit"} />
            </div>
          </div>
          <div className="bg-white mt-2">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    Room
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    First Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Family Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Gender
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_code}</td>
                      <td>{data.location_name_en}</td>
                      <td>{data.location_name_ch}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-danger mb-1">
            ** Bed Type may not be guaranteed **
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-12 text-dark fw-bold mb-2">Add Request</div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Honeymoon</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Non-Smoking Room</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Smoking Room Request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Interconnecting rooms</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Adjoinning rooms</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Early checkin-at</span>
              <select className="form-select rounded-0" value="-">
                <option value="-" selected disabled>
                  Choose Hours
                </option>
                <option value="1" selected>
                  Indonesia
                </option>
                <option value="0" selected>
                  Singapore
                </option>
              </select>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Late checkin-at</span>
              <select className="form-select rounded-0" value="-">
                <option value="-" selected disabled>
                  Choose Hours
                </option>
                <option value="1" selected>
                  Indonesia
                </option>
                <option value="0" selected>
                  Singapore
                </option>
              </select>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">King size bed request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Share bed child request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Share bed child age</span>
              <input type="number" className="form-control" />
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Bath tube request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Hight Speed Internet</span>
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Book Request</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Internal Remark</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 d-flex justify-content-end py-2">
              <button className="bg-blue rounded-1 ms-2">Book</button>
              <button className="bg-blue rounded-1 ms-2">Reset</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
