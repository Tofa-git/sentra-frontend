import React from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";

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
  return (
    <div className="mx-3">
      <div className="row p-3">
        <div className="col-lg-6">
          <div className="text-dark mb-1">1:1 Q&A List</div>
          <div className="bg-white py-3 mx-0 mb-2 row">
            <div className="col-4">
              <Select label={"Q&A Type"} />
            </div>
            <div className="col-4">
              <Input type="date" label="Date From" />
            </div>
            <div className="col-4">
              <Input type="date" label="Date To" />
            </div>
            <div className="col-12 pt-2">
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">Request</span>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">Process</span>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">Complete</span>
              <input type="checkbox" className="ms-2" />
              <span className="text-dark ms-2">OPStoCLT</span>
            </div>
            <div className="col-8">
              <Input label="Agent" />
            </div>
            <div className="col-4 align-items-end d-flex">
              <button className="bg-blue rounded">Search</button>
            </div>
          </div>
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    Book #
                  </th>
                  <th className="bg-blue text-white" width="30%">
                    Hotel
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Check-In
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Check-In
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Request Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Date
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Status
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Operator
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="text-dark mb-1 d-flex justify-content-between">
            <span>Booking Info</span>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-6">
              <Input label={"Booking #"} />
            </div>
            <div className="col-6">
              <Input label={"Request Name"} />
            </div>
            <div className="col-12">
              <Input label={"City"} />
            </div>
            <div className="col-12">
              <Input label={"Hotel"} />
            </div>
            <div className="col-12">
              <Input label={"Check-in / Checkout"} />
            </div>
            <div className="col-12">
              <Input label={"Room"} />
            </div>
            <div className="col-12 text-dark mt-2">Pax</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
          </div>

          <div className="text-dark mb-1 d-flex justify-content-between mt-2">
            <span>Booking Info</span>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-6">
              <Input label={"Date"} />
            </div>
            <div className="col-6">
              <Input label={"Re-Date"} />
            </div>
            <div className="col-12 text-dark mt-2">Question</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark mt-2">Answer</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-6">
              <Select label={"Status"} />
            </div>
            <div className="col-6">
              <Select label={"Operator"} />
            </div>
            <div className="col-12">
              <div className="row">
                <div className="col-8">
                  <Input label={"Email"} />
                </div>
                <div className="col-4 align-self-end">
                  <input type="checkbox" className="ms-2" />
                  <span className="text-dark ms-2">Send</span>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex justify-content-end mt-2 pt-2 border-top">
                <button className="bg-blue rounded-1 ms-2">Detail</button>
                <button className="bg-blue rounded-1 ms-2">Save & Email</button>
                <button className="bg-blue rounded-1 ms-2">Reset</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
