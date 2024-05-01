import React, { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { CountryContext } from "../../../context/country/reducer";
import { NationalityContext } from "../../../context/nationality/reducer";
import { CityContext } from "../../../context/city/reducer";
import { CityLocationContext } from "../../../context/cityLocation/reducer";
import {
  createBook,
  getAllBookSearch,
  getAllBookSearchRoom,
  recheckBookSearch,
} from "../../../context/book/actions";
import { BookContext } from "../../../context/book/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { getAllUserDD } from "../../../context/auth/actions";
import { BOOK_SEARCH_RESET } from "../../../context/constant";
import { toIDR } from "../../../utlis/helper";

const initialForm = {
  checkIn: "",
  checkOut: "",
  lowestPriceOnly: true,
  nationality: "ID",
  currency: "IDR",
  country: "",
  city: "",
  cityCode: "1704",
  adultSG: 0,
  adultDB: 0,
  adultTW: 0,
  adultTP: 0,
  adultQD: 0,
  adults: 0,
  adult: 0,
  children: 0,
  childAge: 0,
  roomNo: 1,
  codeHotel: "",
  night: 0,
};

const ratingsData = [
  {
    id: 1,
    name: "★"
  },
  {
    id: 2,
    name: "★★"
  },
  {
    id: 3,
    name: "★★★"
  },
  {
    id: 4,
    name: "★★★★"
  },
  {
    id: 5,
    name: "★★★★★"
  }

];

const roomData = new Array(Number(31))
  .fill()
  .map((i, key) => ({ id: key + 1, name: key + 1 }));

const Index = (props) => {
  const router = useRouter();
  const [selectedHotel, setSelectedHotel] = useState({});
  const [selectedRoom, setSelectedRoom] = useState({});
  const [selectedAgent, setSelectedAgent] = useState({});
  const [roomHotelData, setRoomHotelData] = useState([]);
  const [recheckData, setRecheckData] = useState(null);
  const [guestData, setGuestData] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [hotelCode, setHotelCode] = useState("");
  const [request, setRequest] = useState("");
  const [bookRequest, setBookRequest] = useState('');
  const [supplierCode, setSupplierCode] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const { state, dispatch } = useContext(BookContext);
  const { state: cityState } = useContext(CityContext);
  const { state: countryState } = useContext(CountryContext);
  const { state: nationalityState } = useContext(NationalityContext);
  const { state: cityLocationState } = useContext(CityLocationContext);
  const { state: authState, dispatch: authDispatch } = useContext(AuthContext);

  const [form, setForm] = useState(initialForm);

  var itemsPerPage = 5;

  var totalPage = 0//Math.ceil(roomHotelData.length / itemsPerPage);

  var startIndex = 0//(currentPage - 1) * itemsPerPage;
  var endIndex = 0//Math.min(startIndex + itemsPerPage, roomHotelData.length);

  // Slice the array to get items for the current page
  var currentPageItems = 0//roomHotelData.slice(startIndex, endIndex);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPageRoom = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPageRoom = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (name, value) => {
    let current = [...guestData];

    switch (name) {
      case "adultSG":
        const sg = name === "adultSG" ? value : form.adultSG;

        setForm({ ...form, [name]: value, adults: form.adults += sg });
        setForm({ ...form, [name]: value, adult: form.adults += sg });
        current.push({
          room: `SG ${value}`,
          salutation: "",
          firstName: "",
          lastName: "",
          age: "",
        });

        break;
      case "adultDB":
        const db = name === "adultDB" ? value : form.adultDB;

        setForm({ ...form, [name]: value, adults: form.adults += db + 1 });
        setForm({ ...form, [name]: value, adult: form.adult += db });

        current.push({
          room: `DB ${value}`,
          salutation: "",
          firstName: "",
          lastName: "",
          age: "",
        });
        break;
      case "adultTW":
        const tw = name === "adultTW" ? value : form.adultTW;

        setForm({ ...form, [name]: value, adults: form.adults += tw + 1 });
        setForm({ ...form, [name]: value, adult: form.adult += tw });
        break;
      case "adultTP":
        const tp = name === "adultTP" ? value : form.adultTP;

        setForm({ ...form, [name]: value, adults: form.adults += tp + 2 });
        setForm({ ...form, [name]: value, adult: form.adult += tp });
        break;
      case "adultQD":
        const qd = name === "adultQD" ? value : form.adultQD;

        setForm({ ...form, [name]: value, adults: form.adults += qd + 3 });
        setForm({ ...form, [name]: value, adult: form.adult += qd });
        break;
      case "checkOut":
        const checkInDate = name === "checkIn" ? value : form.checkIn;
        const checkOutDate = name === "checkOut" ? value : form.checkOut;

        const nightCount = calculateNightCount(checkInDate, checkOutDate);
        setForm({ ...form, [name]: value, night: nightCount });
        break;
      default:
        // Code to execute when name doesn't match any of the cases
        setForm({ ...form, [name]: value });
    };

    setGuestData(current);

  }

  const calculateNightCount = (checkInDate, checkOutDate) => {
    if (checkInDate && checkOutDate) {
      const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nightCount = Math.round(
        Math.abs((checkIn - checkOut) / oneDay)
      );
      return nightCount;
    }
    return 0;
  };

  const handleGuestChange = (id, name, value) => {
    let current = [...guestData];
    current[id][name] = value;
    setGuestData(current);
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

  const handleRoomGet = async (data, supplierId) => {

    Swal.fire({
      icon: "info",
      title: "Search Available Room",
      showConfirmButton: false,
      timer: 1000 * 60,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const body = {
      ...data,
      checkIn: form.checkIn,
      checkOut: form?.checkOut,
      nationality: form?.nationality,
      currency: form?.currency,
      realTimeRoom: 1,
      realTimeValue: 0,
      realTimeAdult: 1,
    };

    const _recheck = await getAllBookSearchRoom(body, supplierId);
    setRoomHotelData(_recheck.data.data.rooms);

    // Calculate the total number of pages
    totalPage = Math.ceil(roomHotelData.length / itemsPerPage);

    // Calculate the start and end index of the current page
    startIndex = (currentPage - 1) * itemsPerPage;
    endIndex = Math.min(startIndex + itemsPerPage, roomHotelData.length);

    // Slice the array to get items for the current page
    currentPageItems = roomHotelData.slice(startIndex, endIndex);

    setTimeout(() => {
      Swal.close();
    }, 1500);
  };

  const handleRecheck = async (room) => {
    setSelectedRoom(room);
    // console.log(room);
    Swal.fire({
      icon: "info",
      title: "Checking Available Room",
      showConfirmButton: false,
      timer: 1000 * 60,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const body = {
      ...form,
      supplierId: room.supplierId,
      hotelCode: room.hotelCode,
      hotelName: room.hotelName,
      sessionId: room.sessionId,
      roomCode: room?.code,
      mealPlan: room?.mealPlan,
      rateKey: room?.rooms?.room[0]?.rateKey,
      cancelPolicyType: room?.cancellationPolicyType,
    };
    delete body.codeHotel;

    const _recheck = await recheckBookSearch(body);
    setRecheckData(_recheck.data.data);

    if (_recheck) {
      setSessionId(_recheck.data.data.sessionId == null ? room.sessionId : _recheck.data.data.sessionId)
      setSupplierId(room.supplierId)
      setHotelCode(_recheck.data.data.code)
    }

    setTimeout(() => {
      Swal.close();
    }, 1500);
  };

  const handleBook = async () => {
    Swal.fire({
      icon: "info",
      title: "Booking Room",
      showConfirmButton: false,
      timer: 1000 * 60,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const body = {
      ...form,
      hotelCode: hotelCode,
      supplierId: supplierId,
      sessionId: sessionId,
      roomCode: selectedRoom?.code,
      mealPlan: selectedRoom?.mealPlan,
      request: bookRequest != "" ? bookRequest + ';' + request : request,
      rateKey: selectedRoom?.rooms?.room?.[0]?.rateKey,
      cancelPolicyType: selectedRoom?.cancellationPolicyType,
      guests: guestData,
      contact: {
        nameFirst: "Agung",
        nameLast: "Wicaksono",
        phone: "6281233661927",
        email: "wicaksono1404@gmail.com",

      },
      agent: selectedAgent

    };
    delete body.codeHotel;

    await createBook(body);

    // setTimeout(() => {
    //   Swal.close();
    //   setSelectedHotel({});
    //   setSelectedRoom({});
    //   setRecheckData(null);
    //   setSelectedAgent({});
    //   setGuestData([]);
    //   setForm(initialForm);
    // }, 4500);
  };

  const handleReset = () => {
    dispatch({ type: BOOK_SEARCH_RESET });
    setForm(initialForm);
    setSelectedHotel({});
    setSelectedRoom({});
    setRecheckData(null);
    setSelectedAgent({});
    setGuestData([]);
  };


  // Function to handle checkbox changes
  const handleCheckboxChange = (e) => {
    // Get the text from the adjacent span element
    const text = e.target.nextElementSibling.textContent.trim();

    // Update the selectedOptions state with the new value
    setRequest((prevSelectedOptions) => {
      // Check if the checkbox is checked
      if (e.target.checked) {
        // Append the text to the existing selectedOptions with a semicolon separator
        if (prevSelectedOptions.length === 0) {
          return text;
        } else {
          return prevSelectedOptions + ';' + text;
        }
      } else {
        // Remove the text from the selectedOptions if the checkbox is unchecked
        return prevSelectedOptions.replace(new RegExp(text + ';?', 'g'), '');
      }
    });

  };

  // Function to handle textarea changes
  const handleTextareaChange = (e) => {
    // Get the value from the textarea
    const text = e.target.value;

    // Update the bookRequest state with the new value
    setBookRequest(text);
  };

  useEffect(() => {
    getAllUserDD(authDispatch);
  }, []);

  useEffect(() => {
    // let current = [...guestData];
    // if (+form.adults < current.length) {

    //   current =
    //     current.length === 0 ? [] : current.slice(0, current.length - 1);
    // } else {

    //   if (+form.adults !== 0) {
    //     for (let i = current.length; i < +form.adults; i++) {
    //       current.push({
    //         room: "",
    //         salutation: "",
    //         firstName: "",
    //         lastName: "",
    //         age: "",
    //       });
    //     }
    //   }
    // }

    // setGuestData(current);
  }, [form.adults]);

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
                    (i) => i.id === Number(val.value)
                  );
                  setSelectedAgent(user);
                }}
              />
            </div>
            <div className="col-12">
              <Select
                label={"Nationality"}
                target="general"
                // value={form.nationality}
                options={nationalityState?.dropdownData}
                onChange={(val) => handleInputChange("nationality", "ID")}
              />
            </div>
            <div className="col-6">
              <Select
                label={"Country"}
                target="general"
                value={form.country}
                options={countryState?.dropdownData}
                onChange={(val) => {
                  handleInputChange("country", val?.target.value);
                }}
              />
            </div>
            <div className="col-6">
              <Select
                label={"City"}
                target="general"
                value={form.city}
                options={cityState?.dropdownData}
                onChange={(val) => handleInputChange("city", val.target.value)}
              />
            </div>
            <div className="col-3">
              <Input
                type="date"
                label="Check In"
                value={checkIn}
                onChange={(val) => {
                  handleInputChange("checkIn", val);
                  setCheckIn(val); // Track the selected Check In date
                  // Reset Check Out date when Check In date changes
                  setCheckOut(null);
                }}
              />
            </div>
            <div className="col-3">
              <Input
                type="date"
                label="Check Out"
                disabled={checkIn === null} // Disable if Check In date is not selected
                value={checkOut}
                onChange={(val) => handleInputChange("checkOut", val)}
                minDate={checkIn} // Pass the selected Check In date as minDate
              />
            </div>
            <div className="col-3">
              <Input type="number" label="Night" value={form.night} readOnly />
            </div>
            <div className="col-3">
              <Select options={ratingsData} />
            </div>
            <div className="col-2">
              <Select options={roomData}
                label="SG"
                value={form.adultSG}
                onChange={(val) => {
                  handleInputChange("adultSG", +val.target.value);
                }} />
            </div>
            <div className="col-2">
              <Select
                options={roomData}
                label="DB"
                value={form.adultDB}
                onChange={(val) => {
                  handleInputChange("adultDB", +val.target.value);
                }}
              />
            </div>
            <div className="col-2">
              <Select options={roomData}
                label="TW"
                value={form.adultTW}
                onChange={(val) => {
                  handleInputChange("adultTW", +val.target.value);
                }} />
            </div>
            <div className="col-2">
              <Select options={roomData}
                label="TP"
                value={form.adultTP}
                onChange={(val) => {
                  handleInputChange("adultTP", +val.target.value);
                }} />
            </div>
            <div className="col-2">
              <Select options={roomData}
                label="QD"
                value={form.adultQD}
                onChange={(val) => {
                  handleInputChange("adultQD", +val.target.value);
                }} />
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
            {/* <div className="col-4">
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
            </div> */}
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
                    Net Price
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Supplier
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

                        if (data.roomDetails.length == 0) {
                          handleRoomGet(data, data.supplierId)
                          setSupplierCode(data.supplierCode);
                        } else {
                          handleRoomGet(data, data.supplierId)
                          // setRoomHotelData(data.roomDetails)
                          setSupplierCode(data.supplierCode);
                          // setSessionId(data.sessionId)
                        }
                      }}
                      className={`${isSelected ? "bg-selected" : ""} pointer`}
                    >
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                      <td>{data.rating}</td>
                      <td>{toIDR(data.netPrice)}</td>
                      <td>{data.supplierCode}</td>
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
                {roomHotelData?.map((data) => {
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
                      <td>{data.supplierCode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* "Search Hotel" section */}
            <div className="col-3 d-flex align-items-center">
              <span className="p-1 px-2 small text-primary">
                Total Data: {roomHotelData?.data?.count}
              </span>
            </div>
            {/* "Search Hotel Pagination" section */}
            <div className="row w-100 mt-2">
              <div className="col-md-6">
                <div className="d-flex">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {Array.from({ length: totalPage }).map((_, index) => (                        
                        <li key={index} className={`page-item ${index + 1 === currentPage && "active"}`}>
                          <a className="page-link" onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                        <a className="page-link" onClick={handlePreviousPageRoom}>
                          Previous
                        </a>
                      </li>
                      <li className={`page-item ${currentPage === totalPage && "disabled"}`}>
                        <a className="page-link" onClick={handleNextPageRoom}>
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
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
                  <th className="bg-blue text-white" width="2%">
                    Room
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    First Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Last Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Salutation
                  </th>
                  <th className="bg-blue text-white" width="1%">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {guestData.map((data, key) => {
                  return (
                    <tr>
                      <td>
                        <input
                          value={data.room}
                          onChange={(val) =>
                            handleGuestChange(
                              key,
                              "room",
                              val.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={data.firstName}
                          onChange={(val) =>
                            handleGuestChange(
                              key,
                              "firstName",
                              val.target.value
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={data.lastName}
                          onChange={(val) =>
                            handleGuestChange(key, "lastName", val.target.value)
                          }
                        />
                      </td>
                      <td>
                        <select
                          value={data.salutation}
                          style={{ minHeight: 30 }}
                          onChange={(val) =>
                            handleGuestChange(
                              key,
                              "salutation",
                              val.target.value
                            )
                          }
                        >
                          <option>== Select ==</option>
                          <option value={"Mr"}>Mr</option>
                          <option value={"Mrs"}>Mrs</option>
                        </select>
                      </td>
                      <td>
                        <input
                          value={data.age}
                          onChange={(val) =>
                            handleGuestChange(key, "age", val.target.value)
                          }
                        />
                      </td>
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
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Honeymoon</span>
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Non-Smoking Room</span>
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Smoking Room Request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Interconnecting rooms</span>
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
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
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">King size bed request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Share bed child request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" />
              <span className="text-dark ms-2">Share bed child age</span>
              <input type="number" className="form-control" />
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Bath tube request</span>
            </div>
            <div className="col-3">
              <input type="checkbox" onChange={handleCheckboxChange} />
              <span className="text-dark ms-2">Hight Speed Internet</span>
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Book Request</div>
            <div className="col-12">
              <textarea className="form-control" value={bookRequest} onChange={handleTextareaChange} />
            </div>
            <div className="col-12 text-dark fw-bold mt-2">Internal Remark</div>
            <div className="col-12">
              <textarea className="form-control" />
            </div>
            <div className="col-12 d-flex justify-content-end py-2">
              <button
                onClick={() => handleBook()}
                className="btn bg-blue rounded-1 text-white ms-2"
              >
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
