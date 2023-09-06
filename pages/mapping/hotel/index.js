import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import { AuthContext } from "../../../context/auth/reducer";
import { CountryContext } from "../../../context/country/reducer";
import { CityContext } from "../../../context/city/reducer";
import { getAllHotel } from "../../../context/hotel/actions";
import { HotelContext } from "../../../context/hotel/reducer";
import { SupplierContext } from "../../../context/supplier/reducer";
import { getDDLSupp } from "../../../context/supplier/actions";
import { getDDLCountry } from "../../../context/mappingCountry/actions";
import { getDDLCity } from "../../../context/mappingCity/actions";
import { getDDLIDHotel } from "../../../context/mappingHotel/actions";
import { syncData, getData, createData, updateData } from "../../../context/mappingHotel/actions";
import { MappingCityContext } from "../../../context/mappingCity/reducer";
import { MappingCountryContext } from "../../../context/mappingCountry/reducer";
import { MappingHotelContext } from "../../../context/mappingHotel/reducer";
import "material-icons/iconfont/material-icons.css";

const dummyData = [
  {
    id: 1,
    code: "AF",
    city_name_en: "Afghanistan",
  },
  {
    id: 2,
    code: "AL",
    city_name_en: "Albania",
  },
  {
    id: 3,
    code: "AW",
    city_name_en: "Aruba",
  },
];

const Index = (props) => {
  const router = useRouter();
  const selectedId = "006";
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCollapsedMst, setIsCollapsedMst] = useState(true);
  const [isCollapsedSup, setIsCollapsedSup] = useState(true);

  const [keywordLocal, setKeywordLocal] = useState("");
  const [keywordSupplier, setKeywordSupplier] = useState("");

  /* Master Section */
  const [codeMst, setCodeMst] = useState("");
  const [nameMst, setNameMst] = useState("");
  const [chainCodeMst, setChainCodeMst] = useState("");
  const [chainNameMst, setChainNameMst] = useState("");
  const [brandCodeMst, setBrandCodeMst] = useState("");
  const [brandNameMst, setBrandNameMst] = useState("");
  const [phoneMst, setPhoneMst] = useState("");
  const [starMst, setStarMst] = useState("");
  const [addressMst, setAddressMst] = useState("");
  const [zipMst, setZipMst] = useState("");

  /*Supplier Section */
  const [codeSup, setCodeSup] = useState("");
  const [nameSup, setNameSup] = useState("");
  const [chainCodeSup, setChainCodeSup] = useState("");
  const [chainNameSup, setChainNameSup] = useState("");
  const [brandCodeSup, setBrandCodeSup] = useState("");
  const [brandNameSup, setBrandNameSup] = useState("");
  const [phoneSup, setPhoneSup] = useState("");
  const [starSup, setStarSup] = useState("");
  const [addressSup, setAddressSup] = useState("");
  const [zipSup, setZipSup] = useState("");

  /*master data from supplier variable*/
  const [countryCodeSup, setCountryCodeSup] = useState("");
  const [countryNameSup, setCountryNameSup] = useState("");
  const [cityCodeSup, setCityCodeSup] = useState("");
  const [cityNameSup, setCityNameSup] = useState("");
  const [hotelCodeSup, setHotelCodeSup] = useState("");
  const [hotelNameSup, setHotelNameSup] = useState("");

  /* Sync */
  const [supplierId, setSupplierId] = useState("");
  const [masterId, setMasterId] = useState("");
  const [citySync, setCitySync] = useState("");
  const [countrySync, setCountrySync] = useState("");

  const { state, dispatch } = useContext(HotelContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { state: countryState } = useContext(CountryContext);
  const { state: cityState } = useContext(CityContext);
  const { state: supplierDDLState, dispatch: supplierDDLDispatch } = useContext(SupplierContext);
  const { state: mappingCityState, dispatch: mappingCityDispatch } = useContext(MappingCityContext);
  const { state: mappingCountryState, dispatch: mappingCountryDispatch } = useContext(MappingCountryContext);
  const { state: mappingMasterState, dispatch: mappingMasterDispatch } = useContext(MappingHotelContext);
  const { state: mappingHotelState, dispatch: mappingHotelDispatch } = useContext(MappingHotelContext);

  useEffect(() => {
    handleDropDown();
  }, []);

  useEffect(() => {
    handleDropDownCountry();
  }, [supplierId]);

  useEffect(() => {
    handleDropDownCity();
  }, [countrySync]);

  useEffect(() => {
    handleGet();
  }, [keywordLocal]);

  useEffect(() => {
    handleDropDownHotel();
  }, [masterId]);

  useEffect(() => {
    handleGetMapping();
  }, [keywordSupplier, supplierId]);

  const handleDropDown = async () => {
    const ddl = await getDDLSupp(supplierDDLDispatch, true);
    if (ddl.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleDropDownCity = async () => {
    await getDDLCity(mappingCityDispatch, countrySync, supplierId, true);
  };

  const handleDropDownCountry = async () => {
    await getDDLCountry(mappingCountryDispatch, supplierId, true);
  };

  const handleDropDownHotel = async () => {
    await getDDLIDHotel(mappingHotelDispatch, masterId, true);
    console.log(mappingHotelState)
    const selectedHotel = mappingHotelState.dropdownData.find((hotel) => hotel.id === masterId);

    if (selectedHotel) {
      setCodeMst(selectedHotel.code);
      setNameMst(selectedHotel.name);
      setPhoneMst(selectedHotel.phone);
      setStarMst(selectedHotel.star);
      setAddressMst(selectedHotel.address);
      setZipMst(selectedHotel.zipCode);
      setChainCodeMst(selectedHotel.chainCode);
      setChainNameMst(selectedHotel.chainName);
      setBrandCodeMst(selectedHotel.brandCode);
      setBrandNameMst(selectedHotel.brandName);
    }    
  };

  const handleGet = async (page = 1, limit = 12) => {
    const country = await getAllHotel(dispatch, false, page, limit, keywordLocal);
    if (country.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleGetMapping = async (page = 1, limit = 12) => {
    const mapping = await getData(mappingHotelDispatch, false, page, limit, supplierId, keywordSupplier);
    if (mapping.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleSupplierChange = (event) => {
    const selectedSupplierId = event.target.value;
    setSupplierId(selectedSupplierId);
    handleDropDownCountry();
  };

  const handleCountryChange = (event) => {
    const selectedCountryCode = event.target.value;
    setCountrySync(selectedCountryCode);
    handleDropDownCity();
  };

  const handleCityChange = (event) => {
    const selectedCityCode = event.target.value;
    setCitySync(selectedCityCode);
  };

  const handleHotelChange = (event) => {
    const selectedHotelCode = event.target.value;
    setMasterId(selectedHotelCode)    
  };

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (index, id, data) => {
    // Function to handle row click
    setSelectedData(index)
    setCodeMst(data.code)
    setNameMst(data.name)
    setPhoneMst(data.phone)
    setStarMst(data.star)
    setAddressMst(data.address)
    setZipMst(data.zipCode)
    setChainCodeMst(data.chainCode)
    setChainNameMst(data.chainName)
    setBrandCodeMst(data.brandCode)
    setBrandNameMst(data.brandName)
    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleRowSupClick = (index, id, data) => {
    // Function to handle row click
    setSelectedData(index)

    setCodeSup(data.code)
    setNameSup(data.name)
    setPhoneSup(data.phone)
    setStarSup(data.star)
    setAddressSup(data.address)
    setZipSup(data.zipCode)
    setChainCodeSup(data.chainCode)
    setChainNameSup(data.chainName)
    setBrandCodeSup(data.brandCode)
    setBrandNameSup(data.brandName)

    /*Master Section */
    setMasterId(data.master?.id)
    setCountryCodeSup(data.country.code);
    setCountryNameSup(data.country.name);
    setCityCodeSup(data.city.code);
    setCityNameSup(data.city.name);
    setHotelCodeSup(data.master?.code);
    setHotelNameSup(data.master?.name);
    /*endSection*/

    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSubmit = async () => {

    if (supplierId === 0) {
      return Swal.fire(
        "Validate",
        `You need to choose supplier`,
        "warning"
      );
    }

    if (countrySync === "") {
      return Swal.fire(
        "Validate",
        `You need to choose country`,
        "warning"
      );
    }

    if (citySync === "") {
      return Swal.fire(
        "Validate",
        `You need to choose city`,
        "warning"
      );
    }

    const initForm = {
      code: supplierId,
      name: master,
      phone: phoneSup,
      star: starSup,
      address: addressSup,
      zipCode: zipSup,
      chainCode: chainCodeSup,
      chainName: chainNameSup,
      brandCode: brandCodeSup,
      brandName: brandNameSup,
      status: 1,
    };

    await updateData(id, initForm);

    handleGetMapping();
  };

  const handleSync = async (page = 1, limit = 12) => {
    const mapping = await syncData(mappingHotelDispatch, true, supplierId);
    if (supplierId === "") {
      Swal.fire("Information", "Please select a supplier to be sync", "warning");
    }

    if (mapping?.status === 200) {
      Swal.fire("Information", "Sync Success", "success");
      handleGet();
    }
  };

  const toolbarForm = <></>;

  const bodyForm = (
    <div
      className="table-wrapper rounded-0 d-flex h-100"
      style={{ border: "1px solid #dddddd", backgroundColor: "#fff" }}
    >
      <div className="w-100 row">
        <div className="col-sm-6 mt-2">
          {/* "Local Code" section */}
          <span>
            <i
              className="material-icons fs-6 text-black"
              style={{ verticalAlign: "middle" }}
            >
              arrow_right
            </i>
            <span className="ms-2 text-black">Local Code</span>
            <div className="d-flex flex-column bg-light p-2 border">

              <div className="d-flex flex-row align-items-center mt-2">
                <div className="flex-fill input-group w-75">
                  <input
                    name="q"
                    type="text"
                    className="form-control bg-white rounded-0 p-0 px-1"
                    placeholder="Name"
                    onChange={(val) => setKeywordLocal(val.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGet(1, 12);
                      }
                    }}
                  />
                </div>

                <button
                  className="btn btn-sm btn-primary bg-blue rounded-0 align-items-center shadow-sm d-flex flex-row ms-2"
                  onClick={() => handleGet(1, 12)}
                >
                  <i
                    className="material-icons fs-6"
                    style={{ verticalAlign: "middle" }}
                  >
                    search
                  </i>
                  <span className="ms-2">Search</span>
                </button>

                <div className="d-flex flex-row ms-2">
                  <input type="checkbox" />
                  <span
                    className="text-black ms-2"
                    style={{ fontSize: "10px" }}
                  >
                    Sply Hide
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th className="bg-blue text-white" width="30%">
                      Code
                    </th>
                    <th className="bg-blue text-white" width="60%">
                      Hotel Name
                    </th>
                    <th className="bg-blue text-white" width="10%">
                      Star
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state?.data?.rows?.map((data, index) => {
                    return (
                      <tr onClick={() => handleRowClick(index, data.id, data)} className="pointer">
                        <td>{data.code}</td>
                        <td>{data.name}</td>
                        <td>{data.star.replace('Star', '')}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </span>
          {/* "Local Code Total" section */}
          <div className="col-3 d-flex align-items-center">
            <span className="p-1 px-2 small text-primary">
              Total Data: {state?.data?.count}
            </span>
          </div>
          {/* "Local Code Pagination" section */}
          <div className="row w-100 mt-2">
            <div className="col-md-6">
              <div className="d-flex">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    {state?.data?.totalPage > 5 ? (
                      <>
                        <li className={`page-item ${1 === state?.data?.page && "disabled"}`}>
                          <a className="page-link" onClick={() => handleGet(state?.data?.page - 1)}>
                            Previous
                          </a>
                        </li>
                        {state?.data?.page > 3 && (
                          <>
                            <li className="page-item">
                              <a className="page-link" onClick={() => handleGet(1)}>
                                1
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link">...</a>
                            </li>
                          </>
                        )}
                        {new Array(Number(state?.data?.totalPage)).fill().map((i, key) => {
                          const current = key + 1;
                          if (
                            current === state?.data?.page ||
                            (current >= state?.data?.page - 2 && current <= state?.data?.page + 2)
                          ) {
                            return (
                              <li className={`page-item ${current === state?.data?.page && "active"}`}>
                                <a className="page-link" onClick={() => handleGet(current)}>
                                  {current}
                                </a>
                              </li>
                            );
                          }
                          return null;
                        })}
                        {state?.data?.page < state?.data?.totalPage - 2 && (
                          <>
                            <li className="page-item">
                              <a className="page-link">...</a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" onClick={() => handleGet(state?.data?.totalPage)}>
                                {state?.data?.totalPage}
                              </a>
                            </li>
                          </>
                        )}
                        <li className={`page-item ${!state?.data?.hasNext && "disabled"}`}>
                          <a className="page-link" onClick={() => handleGet(state?.data?.page + 1)}>
                            Next
                          </a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className={`page-item ${1 === state?.data?.page && "disabled"}`}>
                          <a className="page-link" onClick={() => handleGet(state?.data?.page - 1)}>
                            Previous
                          </a>
                        </li>
                        {
                          new Array(Number(state?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            return (
                              <li className={`page-item ${current === state?.data?.page && "active"}`}>
                                <a className="page-link" onClick={() => handleGet(current)}>
                                  {current}
                                </a>
                              </li>
                            );
                          })}
                        <li className={`page-item ${!state?.data?.hasNext && "disabled"}`}>
                          <a className="page-link" onClick={() => handleGet(state?.data?.page + 1)}>
                            Next
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          {/* End Section */}
        </div>

        <div className="col-sm-6 mt-2">
          <div>
            {/* "Supplier Code" section */}
            <span>
              <i
                className="material-icons fs-6 text-black"
                style={{ verticalAlign: "middle" }}
              >
                arrow_right
              </i>
              <span className="ms-2 text-black">Sync Data</span>
            </span>

            <div className="d-flex flex-column bg-light p-2 border">
              <div className="d-flex flex-row align-items-center">
                <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                  Supplier
                </span>
                <div className="flex-fill input-group">
                  <select
                    className="form-select rounded-0"
                    name="is_used"
                    value={supplierId}
                    onChange={handleSupplierChange}
                  >
                    <option value="0">==SELECT==</option>
                    {supplierDDLState?.dropdownData?.map((supplier) => {
                      return (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.code + " - " + supplier.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="d-flex flex-row align-items-center mt-2">
                <span className="flex-shrink-1 pe-2 small text-nowrap text-dark pe-2">
                  Country
                </span>
                <div className="flex-fill input-group">
                  <select
                    className="form-select rounded-0"
                    name="is_used"
                    value={countrySync}
                    onChange={handleCountryChange}
                  >
                    <option value="0">==SELECT==</option>
                    {mappingCountryState?.dropdownData?.map((country) => {
                      return (
                        <option key={country.id} value={country.id}>
                          {country.code + " - " + country.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <span className="flex-shrink-1 pe-2 small text-nowrap text-dark pe-2">
                  City
                </span>
                <div className="flex-fill input-group ms-2">
                  <select
                    className="form-select rounded-0"
                    name="is_used"
                    value={citySync}
                    onChange={handleCityChange}
                  >
                    <option value="0">==SELECT==</option>
                    {mappingCityState?.dropdownData?.map((city) => {
                      return (
                        <option key={city.id} value={city.id}>
                          {city.code + " - " + city.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-end py-2">
                <button
                  onClick={() => handleSync()}
                  className="btn bg-warning rounded-1 text-black ms-2"
                  disabled={supplierId && citySync && countrySync ? false : true}
                >
                  Sync
                </button>
              </div>
            </div>
          </div>
          <div className="mt-2">

            <button
              className="btn"
              onClick={() => setIsCollapsedMst(!isCollapsedMst)}
            >
              <span>
                <i className={`material-icons fs-6 text-black ${isCollapsedMst ? 'collapsed' : ''}`} style={{ verticalAlign: "middle" }}>
                  arrow_right
                </i>
                <span className="ms-2 text-black">Local Hotel</span>
              </span>
            </button>
            {isCollapsedMst ?
              <div className="d-flex flex-column bg-light p-2 border">
                <div className="d-flex flex-row align-items-center">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Code
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={codeMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setCodeMst(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Hotel
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={nameMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setNameMst(val.target.value)
                      }
                    />
                  </div>
                </div>{" "}
                <div className="d-flex flex-row align-items-center mt-2">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Phone
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={phoneMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setPhoneMst(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Hotel Grade
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={starMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setStarMst(val.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center pt-2 pb-2">
                  <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                    Adress
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={addressMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setAddressMst(val.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center pb-2">
                  <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                    Zip Code
                  </span>
                  <div className="w-25">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={zipMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setZipMst(val.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mt-2">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Chain Code
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={chainCodeMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setChainCodeMst(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Chain Name
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={chainNameMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setChainNameMst(val.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mt-2">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Brand Code
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={brandCodeMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setBrandCodeMst(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Brand Name
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeMst ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={brandNameMst}
                      disabled={codeMst ? false : true}
                      onChange={(val) =>
                        setBrandNameMst(val.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-end py-2">
                  <button
                    className="btn bg-blue rounded-1 text-white ms-2"
                    onClick={() => handleSubmit()}
                    disabled={codeSup ? false : true}
                  >
                    Save
                  </button>
                </div>
              </div>
              : <div></div>}
          </div>

          <div className="mt-2">
            <button
              className="btn"
              onClick={() => setIsCollapsedSup(!isCollapsedSup)}
            >
              <span>
                <i className={`material-icons fs-6 text-black ${isCollapsedSup ? 'collapsed' : ''}`} style={{ verticalAlign: "middle" }}>
                  arrow_right
                </i>
                <span className="ms-2 text-black">Supplier Hotel</span>
              </span>
            </button>
            {isCollapsedSup ?
              <div className="d-flex flex-column bg-light p-2 border">
                <div className="d-flex flex-row align-items-center mt-2">

                  <span className="flex-shrink-1 pe-2 small text-nowrap text-dark pe-2">
                    Master
                  </span>
                  <div className="flex-fill input-group ms-2">
                    <select
                      className="form-select rounded-0"
                      name="is_used"
                      value={masterId}
                      onChange={handleHotelChange}
                    >
                      <option value="0">==SELECT==</option>
                      {mappingHotelState?.dropdownData?.map((hotel) => {
                        return (
                          <option key={hotel.id} value={hotel.id}>
                            {hotel.code + " - " + hotel.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-end py-2">
                  <button
                    onClick={() => handleSync()}
                    className="btn bg-warning rounded-1 text-black ms-2"
                    disabled={supplierId && citySync && countrySync ? false : true}
                  >
                    Merge
                  </button>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Code
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={codeSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setCodeSup(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Hotel
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={nameSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setNameSup(val.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center mt-2">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Phone
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={phoneSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setPhoneSup(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Room Grade
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={starSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setStarSup(val.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center pt-2 pb-2">
                  <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                    Address
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={addressSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setAddressSup(val.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center pb-2">
                  <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                    Zip Code
                  </span>
                  <div className="w-25">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={zipSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setZipSup(val.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mt-2">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Chain Code
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={chainCodeSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setChainCodeSup(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Chain Name
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={chainNameSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setChainNameSup(val.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mt-2">
                  <span className="flex-shrink-1 pe-1 small text-nowrap text-dark pe-2">
                    Brand Code
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={brandCodeSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setBrandCodeSup(val.target.value)
                      }
                    />
                  </div>
                  <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                    Brand Name
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="q"
                      type="text"
                      className={codeSup ? "form-control bg-white rounded-0 w-25" : "form-control bg-gray rounded-0 w-25"}
                      value={brandNameSup}
                      disabled={codeSup ? false : true}
                      onChange={(val) =>
                        setBrandNameSup(val.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-end py-2">
                  <button
                    className="btn bg-blue rounded-1 text-white ms-2"
                    onClick={() => handleSubmit()}
                    disabled={codeSup ? false : true}
                  >
                    Save
                  </button>
                </div>

              </div>
              : <div></div>}
          </div>

          {/* Search Supplier */}
          <div className="d-flex flex-column bg-light p-2 mt-2 border">
            <div className="d-flex flex-row align-items-center mt-2">
              <div className="flex-fill input-group w-75">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 p-0 px-1"
                  placeholder="Name"
                  onChange={(val) => setKeywordSupplier(val.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleGetMapping(1, 12);
                    }
                  }}
                />
              </div>

              <button
                className="btn btn-sm btn-primary bg-blue rounded-0 align-items-center shadow-sm d-flex flex-row ms-2"
                onClick={() => handleGetMapping(1, 12)}
              >
                <i
                  className="material-icons fs-6"
                  style={{ verticalAlign: "middle" }}
                >
                  search
                </i>
                <span className="ms-2">Search</span>
              </button>

              <div className="d-flex flex-row ms-2">
                <input type="checkbox" />
                <span
                  className="text-black ms-2"
                  style={{ fontSize: "10px" }}
                >
                  Sply Hide
                </span>
              </div>
            </div>
          </div>


          <div className="mt-2">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white">Master Code</th>
                  <th className="bg-blue text-white">Supplier Code</th>
                  <th className="bg-blue text-white">Hotel</th>
                  <th className="bg-blue text-white">Supplier City</th>
                  <th className="bg-blue text-white">Star</th>
                </tr>
              </thead>
              <tbody>
                {mappingHotelState?.data.rows?.map((data, index) => {
                  return (
                    <tr onClick={() => handleRowSupClick(index, data.id, data)} className="pointer">
                      <td>{data.master?.code ?? ""}</td>
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                      <td>{data.city.code}</td>
                      <td>{data.star}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* "Supplier Code Total" section */}
            <div className="col-3 d-flex align-items-center">
              <span className="p-1 px-2 small text-primary">
                {/* {console.log(mappingCityState)} */}
                Total Data: {mappingHotelState?.data?.count}
              </span>
            </div>
            {/* "Supplier Code Pagination" section */}
            <div className="row w-100 mt-2">
              <div className="col-md-6">
                <div className="d-flex">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {mappingHotelState?.data?.totalPage > 5 ? (
                        <>
                          <li className={`page-item ${1 === mappingHotelState?.data?.page && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingHotelState?.data?.page - 1)}>
                              Previous
                            </a>
                          </li>
                          {mappingHotelState?.data?.page > 3 && (
                            <>
                              <li className="page-item">
                                <a className="page-link" onClick={() => handleGetMapping(1)}>
                                  1
                                </a>
                              </li>
                              <li className="page-item">
                                <a className="page-link">...</a>
                              </li>
                            </>
                          )}
                          {new Array(Number(mappingHotelState?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            if (
                              current === mappingHotelState?.data?.page ||
                              (current >= mappingHotelState?.data?.page - 2 && current <= mappingHotelState?.data?.page + 2)
                            ) {
                              return (
                                <li className={`page-item ${current === mappingHotelState?.data?.page && "active"}`}>
                                  <a className="page-link" onClick={() => handleGetMapping(current)}>
                                    {current}
                                  </a>
                                </li>
                              );
                            }
                            return null;
                          })}
                          {mappingHotelState?.data?.page < mappingHotelState?.data?.totalPage - 2 && (
                            <>
                              <li className="page-item">
                                <a className="page-link">...</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" onClick={() => handleGetMapping(mappingHotelState?.data?.totalPage)}>
                                  {mappingHotelState?.data?.totalPage}
                                </a>
                              </li>
                            </>
                          )}
                          <li className={`page-item ${!mappingHotelState?.data?.hasNext && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingHotelState?.data?.page + 1)}>
                              Next
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className={`page-item ${1 === mappingHotelState?.data?.page && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingHotelState?.data?.page - 1)}>
                              Previous
                            </a>
                          </li>
                          {new Array(Number(mappingHotelState?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            return (
                              <li className={`page-item ${current === mappingHotelState?.data?.page && "active"}`}>
                                <a className="page-link" onClick={() => handleGetMapping(current)}>
                                  {current}
                                </a>
                              </li>
                            );
                          })}
                          <li className={`page-item ${!mappingHotelState?.data?.hasNext && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingHotelState?.data?.page + 1)}>
                              Next
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            {/* End Section */}
          </div>
        </div>
      </div>
    </div>
  );

  const footers = (
    <div>
      <span className="p-1 px-2 small text-primary">
        Row 0 to 0 of 0 Eow(s)
      </span>
    </div>
  );

  return (
    <Layout selectId={selectedId}>
      <StdForm
        id={1}
        icon="grid_on"
        caption="Hotel Mapping"
        toolbar={toolbarForm}
        body={bodyForm}
        footer={footers}
      />
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="searchOptions"
        aria-labelledby="searchOptionsLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="searchOptionsLabel">
            Search Options
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <hr />
          <button className="btn btn-outline-primary rounded-0">
            Lakukan Pencarian
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
