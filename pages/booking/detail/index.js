import React, { useContext } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { BookContext } from "../../../context/book/reducer";

const dummyData = [
  {
    id: 1,
    checkIn: "07-07-2023",
    sglSale: 0,
    dblSale: 0,
    twnSale: 0,
    trpSale: 0,
    quadSale: 0,
    twnSale: 0,
    sglNet: 0,
    dblNet: 0,
    twnNet: 0,
    trpNet: 0,
    quadNet: 0,
    twnNet: 0,
  }
];
const dropdownMrMrs = [
  {
    id: 1,
    name: "Mr"
  },
  {
    id: 2,
    name: "Mrs"
  },
  {
    id: 3,
    name: "Ms"
  }
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
            <div className="col-5">
              <Input
                label={"Booking ID"}
                disabled={true}
                value={details?.mgBookingID}
              />
            </div>
            <div className="col-5">
              <Input
                label={"Booking Version ID"}
                disabled={true}
                value={details?.mgBookingVersionID}
              />
            </div>
            <div className="col-2">
              <Select label="Type" />
            </div>
            <div className="col-4">
              <Input
                label={"Nationality"}
                disabled={true}
                value={details?.nationality}
              />
            </div>
            <div className="col-4">
              <Input
                label={"Country"}
                disabled={true}
                value={details?.nationality}
              />
            </div>
            <div className="col-4">
              <Input
                label={"City"}
                disabled={true}
                value={details?.nationality}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Master Hotel"}
                disabled={true}
                value={details?.hotels.hotel.name}
              />
            </div>
            <div className="col-2">
              <Input
                disabled={true}
                value={details?.hotels.hotel.rating}
              />
            </div>
            <div className="col-4">
              <Input
                label={"Tel"}
                disabled={true}
                value={details?.nationality}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Supplier Hotel"}
                disabled={true}
                value={details?.nationality}
              />
            </div>
            <div className="col-2">
              <Input
                disabled={true}
                value={details?.nationality}
              />
            </div>
            <div className="col-10">
              <Input
                label={"Master Address"}
                disabled={true}
                value={details?.address}
              />
            </div>
            <div className="col-10">
              <Input
                label={"Supplier Address"}
                disabled={true}
                value={details?.address}
              />
            </div>
            <div className="col-5">
              <Input
                label={"Check In"}
                disabled={true}
                value={details?.checkIn}
              />
            </div>
            <div className="col-5">
              <Input
                label={"Check Out"}
                disabled={true}
                value={details?.checkOut}
              />
            </div>
            <div className="col-2">
              <Input type="number" label="Room Night" />
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
              <Select label="TW (C)" />
            </div>

            <div className="col-6">
              <Input type="text" label="XML Ref #" />
            </div>
            <div className="col-6">
              <Input type="text" label="Agent (XO) Ref No" />
            </div>

            <div className="col-6">
              <Input type="text" label="Agent" />
            </div>
            <div className="col-6">
              <Input type="text" label="ID" />
            </div>

            <div className="col-6">
              <Input type="text" label="Phone" />
            </div>
            <div className="col-6">
              <Input type="text" label="Mail" />
            </div>

            <div className="col-7">
              <Input label="Sales Office" />
            </div>

            <div className="col-6">
              <Input label="Manager" />
            </div>
            <div className="col-6">
              <Input label="ID" />
            </div>

            <div className="col-6">
              <Input type="text" label="Phone" />
            </div>
            <div className="col-6">
              <Input type="text" label="Mail" />
            </div>


            <div className="col-6">
              <Input type="text" label="Sub Name" />
            </div>
            <div className="col-6">
              <Input type="text" label="Email" />
            </div>

            <div className="col-6">
              <Input type="text" label="Mobile" />
            </div>
            <div className="col-6">
              <Input type="text" label="Phone" />
            </div>

            <div className="col-6">
              <Select label="First Operator" />
            </div>
            <div className="col-6">
              <Select label="Last Operator" />
            </div>

            <div className="col-12 d-flex justify-content-end py-2">
              <button className="bg-blue rounded-1 ms-2">Save</button>
            </div>

          </div>
          <div className="text-dark mb-1 mt-4">Amount</div>
          <div className="bg-white py-3 row">
            <div style={{ width: "auto" }}>
              <div>
                <table width="auto">
                  <tbody>
                    <tr>
                      <th width="80" rowspan="2"></th>
                      <th width="250" colSpan="2">Sale</th>
                      <th width="250" colSpan="2">Net</th>
                    </tr>
                    <tr>
                      <th width="auto"><span id="sCurr">IDR</span> (1)</th>
                      <th width="auto"><span id="rate1Curr1">IDR</span></th>
                      <th width="auto"><span id="nCurr">IDR</span> (1)</th>
                      <th width="auto"><span id="rate1Curr2">IDR</span></th>
                    </tr>
                    <tr>
                      <td>Room</td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                    </tr>
                    <tr>
                      <td>Add Charge</td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                      <td>
                        <Input />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" align="right">
                        <span>
                          <label htmlFor="comm" className="input_ftitle" style={{ paddingLeft: "47px" }}>Commission</label>
                          <input type="text" name="commId" style={{ width: "50px", textAlign: "right" }} />
                        </span>

                        <label htmlFor="taxName">Tax ()</label>
                        <input type="text" name="taxAmt" style={{ width: "100px", textAlign: "right" }} />

                        <label>Profit</label>
                        <input type="text" name="profit" style={{ width: "100px", textAlign: "right" }} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div className="bg-white py-3 row">
                <label>Exchange Rate</label>
                <div className="col-4">
                  <Input label="IDR(1)" />
                </div>
                <div className="col-4">
                  <Input label="IDR" />
                </div>
                <div className="col-4 align-items-end d-flex">
                  <button className="bg-blue rounded">Search</button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-dark mb-1 d-flex justify-content-between">
            <span>Payment Information</span>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-4">
              <Input label={"Percent"} />
            </div>
            <div className="col-4">
              <Input label={"Fee"} />
            </div>
            <div className="col-4">
              <Input label={"Approval No"} />
            </div>
            <div className="col-12 d-flex justify-content-end py-2">
              <button className="bg-blue rounded-1 ms-2">Save</button>
            </div>
          </div>

          <div className="text-dark mb-1 d-flex justify-content-between">
            <span>Date Information (YY-MM-DD hh:mm:ss) </span>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-4">
              <Input label={"Restotal Status"} />
            </div>
            <div className="col-4">
              <Input label={""} />
            </div>
            <div className="col-4">
              <Input label={"Book Date/Time"} />
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
        </div>
        <div className="col-lg-6">
          <div className="text-dark mb-1">Guest Name or Naming List</div>
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    RT
                  </th>
                  <th className="bg-blue text-white" width="30%">
                    First Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Family Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Sex
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {details?.hotels?.hotel?.roomDetails?.rooms?.room?.paxDetails?.pax?.map((data) => {
                  return (
                    <tr key={data.salutation + data.firstName + data.lastName}>
                      <td>{data.salutation}</td>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.age ? data.age : ""}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="bg-white py-3 row">
              <div className="col-4">
                <Select label="Type" />
              </div>
              <div className="col-4">
                <Input label="Age" />
              </div>
              <div className="col-4">

                <Select value="-" label="Mr/Mrs" options={dropdownMrMrs}>

                </Select>
              </div>
              <div className="col-6">
                <Select label="First Name" />
              </div>
              <div className="col-6">
                <Select label="Family Name" />
              </div>


              <div className="col-12 d-flex justify-content-end py-2">
                <button className="bg-blue rounded-1 ms-2">Save</button>
              </div>
            </div>
          </div>
          <div className="text-dark mb-1">Hotel Rate</div>
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
                    CheckIn
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
                      <td>{data.checkIn}</td>
                      <td>{data.sglSale}</td>
                      <td>{data.dblSale}</td>
                      <td>{data.twnSale}</td>
                      <td>{data.trpSale}</td>
                      <td>{data.quadSale}</td>
                      <td>{data.sglNet}</td>
                      <td>{data.dblNet}</td>
                      <td>{data.twnNet}</td>
                      <td>{data.trpNet}</td>
                      <td>{data.quadNet}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="text-dark mb-1">Add Service</div>
          <div className="bg-white mt-2">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    Service
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Add Charge Sale
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Add Charge Net
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    To Hotel
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
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
            <div className="bg-white py-3 row">
              <div className="col-3">
                <Select label="Extra Item" />
              </div>
              <div className="col-3">
                <Input label="Sale" />
              </div>
              <div className="col-3">
                <Input label="Net" />
              </div>
              <div className="col-3">                             
                <Input type="checkbox" label="To Hotel"/>
              </div>

              <div className="col-12 d-flex justify-content-end py-2">
                <button className="bg-blue rounded-1 ms-2">Save</button>
              </div>
            </div>
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
            <div className="col-12 text-dark fw-bold mt-2">Flight Remark</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Internal Remark</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">CNF/INV Comments</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Voucher Comments</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Book Request to Hotel</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Amend Request to Hotel</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Remark from Hotel</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Book Request</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Message to client</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 d-flex justify-content-end py-2">
              <button className="bg-blue rounded-1 ms-2">Save</button>
              <button className="bg-blue rounded-1 ms-2">Refresh</button>
              <button className="bg-blue rounded-1 ms-2">Supply Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
