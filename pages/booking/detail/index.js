import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { BookContext } from "../../../context/book/reducer";
import { AuthContext } from "../../../context/auth/reducer";


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

const dropdownResStatus = [
  {
    id: 1,
    name: "Not Yet"
  },
  {
    id: 2,
    name: "Acknowledge"
  },
  {
    id: 3,
    name: "Done"
  }
];

const dropdownBookType = [
  {
    id: 1,
    name: "Web"
  },
  {
    id: 2,
    name: "Internal"
  },
  {
    id: 3,
    name: "XML"
  },
  {
    id: 4,
    name: "Offline"
  },
  {
    id: 5,
    name: "WEB"
  }
];

const roomData = new Array(Number(31))
  .fill()
  .map((i, key) => ({ id: key + 1, name: key + 1 }));

const Index = (props) => {
  const { state } = useContext(BookContext);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);
  const details = state?.details ?? null;

  const [roomGrossPrice, setRoomGrossPrice] = useState(details && details.local ? details?.hotels.hotel.roomDetails.grossPrice : 0);
  const [roomNetPrice, setRoomNetPrice] = useState(details && details.local ? details?.hotels.hotel.roomDetails.netPrice : 0);
  const [addGrossCharge, setAddGrossCharge] = useState(0);
  const [addGrossChargeIDR, setAddGrossChargeIDR] = useState(0);
  const [addNetCharge, setAddNetCharge] = useState(0);
  const [addNetChargeIDR, setAddNetChargeIDR] = useState(0);

  const [roomGrossPriceRate, setRoomGrossPriceRate] = useState(0);
  const [roomNetPriceRate, setRoomNetPriceRate] = useState(0);
  const [typeRate, setTypeRate] = useState("");
  const [addGrossChargeRate, setAddGrossChargeRate] = useState(0);
  const [addGrossChargeIDRRate, setAddGrossChargeIDRRate] = useState(0);
  const [addNetChargeRate, setAddNetChargeRate] = useState(0);
  const [addNetChargeIDRRate, setAddNetChargeIDRRate] = useState(0);

  const [roomNight, setRoomNight] = useState(0);

  const [selectedGuest, setSelectedGuest] = useState(null);
  const [selectedFirstOps, setSelectedFirstOps] = useState({});

  const bookingCreatedAt = details && details.local ? details?.local?.bookingCreatedAt : "-";
  const formattedDateTime = formatDateTime(bookingCreatedAt);

  const totalGross = Number(roomGrossPrice) + Number(addGrossCharge);
  const totalNet = roomNetPrice + addNetCharge;
  const totalProfit = totalGross - totalNet;

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    return date.toLocaleString(undefined, options);
  }

  const handleRowGuestClick = (data) => {
    setSelectedGuest(data);
  };

  const handleRowRateClick = (type, grossPrice, netPrice) => {
    setRoomGrossPriceRate(grossPrice);
    setRoomNetPriceRate(netPrice);
    setTypeRate(type);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  };

  useEffect(() => {
    calculateRoomNight();

    console.log(details)
  }, [details]);

  const calculateRoomNight = () => {
    const checkInDate = new Date(details?.checkIn);
    const checkOutDate = new Date(details?.checkOut);
    const timeDifference = checkOutDate.getTime() - checkInDate.getTime();
    const roomNightValue = Math.ceil(timeDifference / (1000 * 3600 * 24));
    setRoomNight(roomNightValue);
  };

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
                value={details?.local?.localBookingId ?? ""}
              />
            </div>
            <div className="col-5">
              <Input
                label={"Booking Version ID"}
                disabled={true}
                value={details?.mgBookingVersionID ?? ""}
              />
            </div>
            <div className="col-2">
              <Select value="1" label="Type" options={dropdownBookType} />
            </div>
            <div className="col-4">
              <Input
                label={"Country"}
                disabled={true}
                value={details?.local?.hotelCountryCode ?? ""}
              />
            </div>
            <div className="col-4">
              <Input
                label={"City"}
                disabled={true}
                value={details?.local?.hotelCityCode ?? ""}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Master Hotel"}
                disabled={true}
                value={details?.hotels.hotel.name ?? ""}
              />
            </div>
            <div className="col-2">
              <Input
                disabled={true}
                value={details?.hotels.hotel.rating ?? ""}
              />
            </div>
            <div className="col-4">
              <Input
                label={"Tel"}
                disabled={true}
                value={details?.local?.hotelPhone ?? "-"}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Supplier Hotel"}
                disabled={true}
                value={details?.local?.bookingHotelName ?? ""}
              />
            </div>
            <div className="col-2">
              <Input
                disabled={true}
                value={details?.hotels.hotel.rating ?? ""}
              />
            </div>
            <div className="col-10">
              <Input
                label={"Master Address"}
                disabled={true}
                value={details?.local?.hotelAddress ?? ""}
              />
            </div>
            <div className="col-10">
              <Input
                label={"Supplier Address"}
                disabled={true}
                value={details?.local?.hotelAddress ?? ""}
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
              <Input type="number" label="Room Night" value={roomNight} />
            </div>

            <div className="col-2">
              <Select options={roomData} label="SG" />
            </div>
            <div className="col-2">
              <Select options={roomData} label="DG" />
            </div>
            <div className="col-2">
              <Select options={roomData} label="TW" />
            </div>
            <div className="col-2">
              <Select options={roomData} label="TP" />
            </div>
            <div className="col-2">
              <Select options={roomData} label="QD" />
            </div>
            <div className="col-2">
              <Select options={roomData} label="TW (C)" />
            </div>

            <div className="col-6">
              <Input
                type="text"
                label="XML Ref #"
                value={details?.local?.xmlRef ?? "-"} />
            </div>
            <div className="col-6">
              <Input
                type="text"
                label="Agent (XO) Ref No"
                value={details?.local?.agentRef ?? "-"} />
            </div>

            <div className="col-6">
              <Input type="text" label="Agent"
                value={details?.local?.userFirstName ?? "-"} />
            </div>
            <div className="col-6">
              <Input type="text" label="ID"
                value={details?.local?.userUsername ?? "-"} />
            </div>

            <div className="col-6">
              <Input type="text" label="Phone"
                value={details?.local?.userMobile ?? "-"} />
            </div>
            <div className="col-6">
              <Input type="text" label="Mail"
                value={details?.local?.userEmail ?? "-"} />
            </div>

            <div className="col-7">
              <Input label="Sales Office"
                value={details?.local?.userSalesOffice ?? "-"} />
            </div>

            <div className="col-6">
              <Input label="Manager"
                value={details?.local?.userManager ?? "-"} />
            </div>
            <div className="col-6">
              <Input label="ID"
                value={details?.local?.userManagerId ?? "-"} />
            </div>

            <div className="col-6">
              <Input
                type="text"
                label="Phone"
                disabled={true}
                value={details?.local?.userManagerMobile ?? "-"} />
            </div>
            <div className="col-6">
              <Input
                type="text"
                label="Mail"
                disabled={true}
                value={details?.local?.userManagerEmail ?? "-"} />
            </div>


            <div className="col-6">
              <Input
                type="text"
                label="Sub Name"
                value={details?.local?.userSubName ?? "-"} />
            </div>
            <div className="col-6">
              <Input type="text" label="Email"
                value={details?.local?.userManagerEmail ?? "-"} />
            </div>

            <div className="col-6">
              <Input type="text" label="Mobile"
                value={details?.local?.userManagerMobile ?? "-"} />
            </div>
            <div className="col-6">
              <Input type="text" label="Phone"
                value={details?.local?.userManagerPhone ?? "-"} />
            </div>

            <div className="col-6">
              <Select
                label="First Operator"
                options={authState?.listUsers}
                onChange={(val) => {
                  const user = authState?.listUsers?.find(
                    (i) => i.id === Number(val.value)
                  );
                  setSelectedFirstOps(user);
                }}
                value={details?.local?.userCreatedBy ?? "-"} />
            </div>
            <div className="col-6">
              <Input
                label="Last Operator"
                disabled={true}
                value={details?.local?.userFirstName ?? "-"} />
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
                        <Input value={formatCurrency(roomGrossPrice) ?? "-"} onChange={(e) => setRoomGrossPrice(e.target.value)} />
                      </td>
                      <td>
                        <Input value={formatCurrency(roomGrossPrice) ?? "-"} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(roomNetPrice) ?? "-"} onChange={(e) => setRoomNetPrice(e.target.value)} />
                      </td>
                      <td>
                        <Input value={formatCurrency(roomNetPrice) ?? "-"} disabled />
                      </td>
                    </tr>
                    <tr>
                      <td>Add Charge</td>
                      <td>
                        <Input type="number" value={addGrossCharge} onChange={(e) => setAddGrossCharge(e.target.value)} />
                      </td>
                      <td>
                        <Input type="number" value={addNetChargeIDR} onChange={(e) => setAddGrossChargeIDR(e.target.value)} disabled />
                      </td>
                      <td>
                        <Input type="number" value={addNetCharge} onChange={(e) => setAddNetCharge(e.target.value)} />
                      </td>
                      <td>
                        <Input type="number" value={addNetChargeIDR} disabled onChange={(e) => setAddNetChargeIDR(e.target.value)} />
                      </td>
                    </tr>
                    <tr>
                      <td>Total</td>
                      <td>
                        <Input value={formatCurrency(totalGross)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalGross)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
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
                        <input type="text" name="profit" value={formatCurrency(totalProfit)} style={{ width: "100px", textAlign: "right" }} />
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
                  <button className="bg-blue rounded">Save</button>
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
              <Input label={"Restotal Status"}
                value={details?.status ?? "-"} />
            </div>
            <div className="col-4">
              <Select value="-" label="" options={dropdownResStatus} />
            </div>
            <div className="col-4">
              <Input label={"Book Date/Time"}
                value={formattedDateTime} disabled />
            </div>
            <div className="col-6">
              <Input label={"Agent"}
                value={"-"} />
            </div>
            <div className="col-6">
              <Input label={"Manager"}
                value={"-"} />
            </div>
            <div className="col-6">
              <Input label={"Supplier"}
                value={details?.supplier ?? "-"} />
            </div>
            <div className="col-6">
              <Input label={"Supply Other #"}
                value={details?.supplierOther ?? "-"} />
            </div>
            <div className="col-6">
              <Input label={"Confirm"}
                value={details?.confirm ?? "-"} />
            </div>
            <div className="col-6">
              <Input label={"Confirm Date"}
                value={details?.confirmDate ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Invoice"}
                value={details?.invoice ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Confirmed"}
                value={details?.confirmed ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Voucher"}
                value={details?.voucher ?? "-"} />
            </div>
            <div className="col-6">
              <Input label={"Supplier DL"}
                value={details?.supplierDl ?? "-"} />
            </div>
            <div className="col-6">
              <Input label={"Supplier CXL Change"}
                value={details?.supplierCxl ?? "0"} />
            </div>
            <div className="col-4">
              <Input label={"CXL DL"}
                value={details?.cancellationPolicies.policy[0].toDate ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Cancelled"}
                value={details?.cancelled ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"CXL Charge"}
                value={details?.cxlCharge ?? "0"} />
            </div>
            <div className="col-6">
              <Input label={"CXL RQ"}
                value={details?.cxlRq ?? "-"} />
            </div>
            <div className="col-6">
              <Input label={"Cancelled By"}
                value={details?.cancelBy ?? "-"} />
            </div>
            <div className="col-12">
              <Input label={"CXL Remark"}
                value={details?.cxlRemark ?? "-"} />
            </div>
            <div className="col-12">
              <Input label={"CXL Policy"} type={"textarea"}
                value={details?.cxlPolicy ?? "-"} />
            </div>
            <div className="col-12">
              <Input label={"Important Info"} type={"textarea"}
                value={details?.info ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Amend RQ"}
                value={details?.info ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Amended"} />
            </div>
            <div className="col-4">
              <Input label={"Amended Confirmed By"} />
            </div>
            <div className="col-6">
              <Input label={"Reject By"} />
            </div>
            <div className="col-6">
              <Input label={"Reject Date"} />
            </div>

          </div>


          <div className="text-dark mb-1 d-flex justify-content-between">
            <span>Booking Close </span>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-4">
              <Input label={"Booking Close"}
                value={details?.status ?? "-"} />
            </div>
            <div className="col-4">
              <Input label={"Closing Date"}
                value={details?.status ?? "-"} />
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
                {details?.local?.guests && details.local.guests.length > 0 ? (
                  details.local.guests.map((data) => (
                    <tr
                      key={data.salutation + data.firstName + data.lastName}
                      onClick={() => handleRowGuestClick(data)}
                    >
                      <td>{data.room}</td>
                      <td>{data.firstName}</td>
                      <td>{data.lastName}</td>
                      <td>{data.age ? data.age : ""}</td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No guest data available</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-white py-3 row">
              <div className="col-4">
                <Input label="Type" value={selectedGuest?.room || ""} />
              </div>
              <div className="col-4">
                <Input label="Age" value={selectedGuest?.age || ""} />
              </div>
              <div className="col-4">
                <Select value={selectedGuest?.salutation || "-"} label="Mr/Mrs" options={dropdownMrMrs} />
              </div>
              <div className="col-4">
                <Input label="First Name" value={selectedGuest?.firstName || ""} />
              </div>
              <div className="col-4">
                <Input label="Last Name" value={selectedGuest?.lastName || ""} />
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
                {
                  details?.local?.guests && details.local.guests.length > 0 ? (
                    <tr
                      onClick={() =>
                        handleRowRateClick(
                          details.local.guests[0].room,
                          details.local.bookingGrossPrice,
                          details.local.bookingNetPrice
                        )
                      }
                    >
                      <td>{details.local.bookingCheckIn}</td>
                      <td>{details.local.guests[0].room === "SG 1" ? formatCurrency(details.local.bookingGrossPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "DB 1" ? formatCurrency(details.local.bookingGrossPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "TW 1" ? formatCurrency(details.local.bookingGrossPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "TP 1" ? formatCurrency(details.local.bookingGrossPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "QD 1" ? formatCurrency(details.local.bookingGrossPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "SG 1" ? formatCurrency(details.local.bookingNetPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "DB 1" ? formatCurrency(details.local.bookingNetPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "TW 1" ? formatCurrency(details.local.bookingNetPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "TP 1" ? formatCurrency(details.local.bookingNetPrice) : 0}</td>
                      <td>{details.local.guests[0].room === "QD 1" ? formatCurrency(details.local.bookingNetPrice) : 0}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="11">No guest data available</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>

          <div className="text-dark mb-1">Add Service</div>
          <div className="bg-white py-3 row">
            <div style={{ width: "auto" }}>
              <div>
                <table width="auto">
                  <tbody>
                    <tr>
                      <th width="auto" rowspan="2"></th>
                      <th width="250" colSpan="2"></th>
                      <th width="250" colSpan="2"></th>
                    </tr>
                    <tr>
                      <th width="auto"><span id="sCurr"></span></th>
                      <th width="auto"><span id="rate1Curr1"></span></th>
                      <th width="auto"><span id="nCurr"></span></th>
                      <th width="auto"><span id="rate1Curr2"></span></th>
                    </tr>
                    <tr>
                      <td>
                        <Input
                          disabled={true}
                          value={details?.checkOut}
                        />
                      </td>
                      <td>
                        <Input value={typeRate == "SG 1" ? formatCurrency(roomGrossPriceRate) : "0"} onChange={(e) => setRoomGrossPriceRate(e.target.value)} />
                      </td>
                      <td>
                        <Input value={typeRate == "DB 1" ? formatCurrency(roomGrossPriceRate) : "0"} onChange={(e) => setRoomGrossPriceRate(e.target.value)} />
                      </td>
                      <td>
                        <Input value={typeRate == "TW 1" ? formatCurrency(roomGrossPriceRate) : "0"} onChange={(e) => setRoomGrossPriceRate(e.target.value)} />
                      </td>
                      <td>
                        <Input value={typeRate == "TP 1" ? formatCurrency(roomGrossPriceRate) : "0"} disabled />
                      </td>
                      <td>
                        <Input value={typeRate == "QD 1" ? formatCurrency(roomGrossPriceRate) : "0"} disabled />
                      </td>
                      <td>
                        Sale (IDR)
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <Input type="number" value={roomNetPriceRate} onChange={(e) => setAddGrossCharge(e.target.value)} />
                      </td>
                      <td>
                        <Input type="number" value={roomNetPriceRate} onChange={(e) => setAddGrossChargeIDR(e.target.value)} disabled />
                      </td>
                      <td>
                        <Input type="number" value={roomNetPriceRate} onChange={(e) => setAddNetCharge(e.target.value)} />
                      </td>
                      <td>
                        <Input type="number" value={roomNetPriceRate} disabled onChange={(e) => setAddNetChargeIDR(e.target.value)} />
                      </td>
                      <td>
                        <Input type="number" value={roomNetPriceRate} disabled onChange={(e) => setAddNetChargeIDR(e.target.value)} />
                      </td>
                      <td>
                        Net (IDR)
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <Input value={formatCurrency(totalGross)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalGross)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        Net (IDR)
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <Input value={formatCurrency(totalGross)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalGross)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        <Input value={formatCurrency(totalNet)} disabled />
                      </td>
                      <td>
                        Total :
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


              <div className="bg-white py-3 row">
                <div className="col-4 align-items-end d-flex">
                  <button className="bg-blue rounded">Save</button>
                </div>
              </div>
            </div>
          </div>

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
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
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
                <Input type="checkbox" label="To Hotel" />
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
