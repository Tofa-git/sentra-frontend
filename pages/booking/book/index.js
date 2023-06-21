import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { CountryContext } from "../../../context/country/reducer";
import { NationalityContext } from "../../../context/nationality/reducer";
import { CityContext } from "../../../context/city/reducer";
import { CityLocationContext } from "../../../context/cityLocation/reducer";
import {
  getAllBookSearch,
  recheckBookSearch,
} from "../../../context/book/actions";
import { BookContext } from "../../../context/book/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getAllUserDD } from "../../../context/auth/actions";
import { BOOK_SEARCH_RESET } from "../../../context/constant";
import { toIDR } from "../../../utlis/helper";

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

const initialForm = {
  checkIn: "",
  checkOut: "",
  nationality: "",
  country: "",
  city: "",
  adults: 2,
  children: 0,
  childAge: 0,
  roomNo: 1,
  codeHotel: "",
};

const roomData = new Array(Number(31))
  .fill()
  .map((i, key) => ({ id: key + 1, name: key + 1 }));

const Index = (props) => {
  const router = useRouter();

  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedAgent, setSelectedAgent] = useState({});
  const [recheckData, setRecheckData] = useState(null);

  const { state, dispatch } = useContext(BookContext);
  const { state: cityState } = useContext(CityContext);
  const { state: countryState } = useContext(CountryContext);
  const { state: nationalityState } = useContext(NationalityContext);
  const { state: cityLocationState } = useContext(CityLocationContext);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const [form, setForm] = useState(initialForm);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleGet = async () => {
    setSelectedHotel({});
    setSelectedRoom({});
    setRecheckData(null);

    Swal.fire({
      icon: "info",
      title: "Search Available Hotel",
      showConfirmButton: false,
      timer: 1000 * 60,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const book = await getAllBookSearch(dispatch, form);
    if (book.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }

    setTimeout(() => {
      Swal.close();
    }, 1500);
  };

  const handleRecheck = async (room) => {
    setSelectedRoom(room);
    Swal.fire({
      icon: "info",
      title: "Loading Checking Available Room",
      showConfirmButton: false,
      timer: 1000 * 60,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const body = {
      ...form,
      hotelCode: selectedHotel.code,
      sessionId: state?.data?.sessionId,
      roomCode: room?.code,
      mealPlan: room?.mealPlan,
      rateKey: room?.rooms?.room?.[0]?.rateKey,
      cancelPolicyType: room?.cancellationPolicyType,
    };
    delete body.codeHotel;

    const _recheck = await recheckBookSearch(body);
    setRecheckData(_recheck.data.data);

    setTimeout(() => {
      Swal.close();
    }, 1500);
  };

  const handleReset = () => {
    dispatch({ type: BOOK_SEARCH_RESET });
    setForm(initialForm);
    setSelectedHotel({});
    setSelectedRoom({});
    setRecheckData(null);
    setSelectedAgent({});
  };

  useEffect(() => {
    getAllUserDD(authDispatch);
  }, []);

  return (
    <div className="mx-3">
      <div className="row p-3">
        <div className="col-lg-6">
          <div className="text-dark mb-1">Booking</div>
          <div className="bg-white py-3 row">
            <div className="col-12">
              <Select
                label={"Agent"}
                options={authState?.listUsers}
                onChange={(val) => {
                  const user = authState?.listUsers?.find(
                    (i) => i.id === Number(val.target.value)
                  );
                  setSelectedAgent(user);
                }}
              />
            </div>
            <div className="col-12">
              <Select
                label={"Nationality"}
                target="home"
                // value={form.nationality}
                options={nationalityState?.dropdownData}
                onChange={(val) => handleInputChange("nationality", "ID")}
              />
            </div>
            <div className="col-6">
              <Select
                label={"Country"}
                target="home"
                value={form.country}
                options={countryState?.dropdownData}
                onChange={(val) => {
                  handleInputChange("country", val.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <Select
                label={"City"}
                target="home"
                value={form.city}
                options={cityState?.dropdownData}
                onChange={(val) => handleInputChange("city", val.target.value)}
              />
            </div>
            <div className="col-3">
              <Input
                type="date"
                label="Check In"
                value={form.checkIn}
                onChange={(val) => handleInputChange("checkIn", val)}
              />
            </div>
            <div className="col-3">
              <Input
                type="date"
                label="Check Out"
                value={form.checkOut}
                onChange={(val) => handleInputChange("checkOut", val)}
              />
            </div>
            <div className="col-3">
              <Input type="number" label="Night" />
            </div>
            <div className="col-3">
              <Select />
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
              <Input
                label="Rooms"
                type="number"
                value={form.roomNo}
                onChange={(val) =>
                  handleInputChange("roomNo", val.target.value)
                }
              />
            </div>
            <div className="col-4">
              <Input
                label="Adults"
                type="number"
                value={form.adults}
                onChange={(val) =>
                  handleInputChange("adults", val.target.value)
                }
              />
            </div>
            <div className="col-4">
              <Input
                label="Children"
                type="number"
                value={form.children}
                onChange={(val) =>
                  handleInputChange("children", val.target.value)
                }
              />
            </div>
            <div className="col-4">
              <Input
                label="Child Age"
                type="number"
                value={form.childAge}
                onChange={(val) =>
                  handleInputChange("childAge", val.target.value)
                }
              />
            </div>
            <div className="col-12">
              <Select
                label="City Location"
                target="home"
                value={form.cityLocation}
                options={cityLocationState?.dropdownData}
                onChange={(val) =>
                  handleInputChange("cityLocation", val.target.value)
                }
              />
            </div>
            <div className="col-12">
              <Select label="Hotel" />
            </div>
            <div className="col-8">
              <Input label="Designate Hotel" />
            </div>
            <div className="col-4 align-items-end d-flex">
              <button
                disabled={state.isLoading}
                onClick={() => handleGet(form)}
                className="btn bg-blue rounded text text-white"
              >
                Search
              </button>
              <button
                onClick={() => handleReset()}
                className="btn bg-blue rounded ms-2 text-white"
              >
                Reset
              </button>
            </div>
            <div className="col-8">
              <Input label="Quick Search" />
            </div>
            <div className="col-4 align-items-end d-flex">
              <button className="btn bg-blue rounded text-white">Search</button>
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
                    Code
                  </th>
                  <th className="bg-blue text-white" width="30%">
                    Hotel
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    ★
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Gross Price
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Net Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {state?.data?.hotels.map((data) => {
                  const isSelected = data.code === selectedHotel?.code;
                  const sortedData = data?.roomDetails?.sort(
                    (a, b) => a.grossPrice - b.grossPrice
                  )[0];
                  return (
                    <tr
                      onClick={() => {
                        setSelectedHotel(data);
                        setSelectedRoom({});
                        setRecheckData(null);
                      }}
                      className={`${isSelected ? "bg-selected" : ""} pointer`}
                    >
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                      <td>{data.rating}</td>
                      <td>{toIDR(sortedData.grossPrice)}</td>
                      <td>{toIDR(sortedData.grossPrice)}</td>
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
                    Code
                  </th>
                  <th className="bg-blue text-white" width="20%">
                    Name
                  </th>
                  <th className="bg-blue text-white" width="10%">
                    Gross Price
                  </th>
                  <th className="bg-blue text-white" width="10%">
                    Net Price
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Plan
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Supplier
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedHotel?.roomDetails?.map((data) => {
                  const isSelected = data.id === selectedRoom?.id;
                  return (
                    <tr
                      onClick={() => handleRecheck(data)}
                      className={`${isSelected ? "bg-selected" : ""} pointer`}
                    >
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                      <td>{toIDR(data.grossPrice)}</td>
                      <td>{toIDR(data.netPrice)}</td>
                      <td>{data.mealPlanName}</td>
                      <td>MGJ</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-dark mb-1">
            Rate: <span className="text-primary">{selectedRoom?.name}</span>
          </div>
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
                <tr>
                  <td>{recheckData ? form.checkIn : "-"}</td>
                  <td>0</td>
                  <td>
                    {recheckData?.roomDetails
                      ? toIDR(recheckData?.roomDetails?.grossPrice)
                      : 0}
                  </td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>
                    {recheckData?.roomDetails
                      ? toIDR(recheckData?.roomDetails?.netPrice)
                      : 0}
                  </td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td className="text-primary text-center" colSpan={3}>
                    CXL DEADLINE
                  </td>
                  <td className="text-danger text-center" colSpan={3}>
                    {recheckData?.roomDetails?.cancellationPolicies?.policy?.[0]
                      ?.fromDate || "Non Refundable"}
                  </td>
                  <td className="text-primary text-center" colSpan={3}>
                    SPLY DEADLINE
                  </td>
                  <td className="text-danger text-center" colSpan={3}>
                    {recheckData?.roomDetails?.cancellationPolicies?.policy?.[
                      recheckData?.roomDetails?.cancellationPolicies?.policy
                        ?.length - 1
                    ]?.toDate || "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-dark mb-1 d-flex justify-content-between">
            <span>Booking</span>
            <div>
              <button className="btn bg-blue rounded-1 text-white ms-2">
                Wish
              </button>
              <button className="btn bg-blue rounded-1 text-white ms-2">
                Quotation
              </button>
            </div>
          </div>
          <div className="bg-white row mx-0 py-2">
            <div className="col-4">
              <Input label={"Group No"} />
            </div>
            <div className="col-4">
              <Input label={"Book No"} disabled={true} />
            </div>
            <div className="col-4">
              <Input label={"Book Type"} value={"internal"} disabled={true} />
            </div>
            <div className="col-6">
              <Input
                label={"Agent"}
                value={selectedAgent?.firstName}
                disabled={true}
              />
            </div>
            <div className="col-6">
              <Input label={"Manager"} disabled={true} />
            </div>
            <div className="col-6">
              <Input
                label={"Markup"}
                value={"Net + 0  or  Net × 0%"}
                disabled={true}
              />
            </div>
            <div className="col-6">
              <Input
                label={"Credit"}
                value={"0.00 / 0.00 (IDR)"}
                disabled={true}
              />
            </div>
            <div className="col-6">
              <Input label={"Tel"} />
            </div>
            <div className="col-6">
              <Input label={"Mobile"} value={selectedAgent?.mobile} />
            </div>
            <div className="col-6">
              <Input label={"Email"} value={selectedAgent?.email} />
            </div>
            <div className="col-6">
              <Input label={"Operator"} disabled={true} />
            </div>
            <div className="col-12">
              <Input
                label={"If Over (no) Credit"}
                disabled={true}
                value={"Book only before CXL dead line"}
              />
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
              <select className="form-select rounded-0 text-white" value="-">
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
              <select className="form-select rounded-0 text-white" value="-">
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
              <button className="btn bg-blue rounded-1 text-white ms-2">
                Book
              </button>
              <button className="btn bg-blue rounded-1 text-white ms-2">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
