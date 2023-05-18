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
  return (
    <div className="m-3">
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
                  <button className="bg-blue rounded ms-2 h-50 align-self-end">
                    Search
                  </button>
                  <button className="bg-blue rounded ms-2 h-50 align-self-end">
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
                    EVT
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Book No Group No
                  </th>
                  <th className="bg-blue text-white" width="15%">
                    Book Date
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    BK Status
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    City
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Hotel
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Agent Manager
                  </th>
                  <th className="bg-blue text-white" width="5%">
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
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_code}</td>
                      <td>{data.location_name_ch}</td>
                      <td>{data.location_name_en}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
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
        </div>
      </div>
    </div>
  );
};

export default Index;
