import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import "material-icons/iconfont/material-icons.css";
import { CityContext } from "../../../context/city/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import { deleteCity, getMasterCity } from "../../../context/city/actions";
import { syncData, getData, createData, updateData } from "../../../context/mappingCity/actions";
import { AUTH_401, AUTH_LOGOUT } from "../../../context/constant";
import Swal from "sweetalert2";
import { getDDLSupp } from "../../../context/supplier/actions";
import { SupplierContext } from "../../../context/supplier/reducer";
import { CountryContext } from "../../../context/country/reducer";
import { MappingCityContext } from "../../../context/mappingCity/reducer";

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
  const [selectedId, setSelectedId] = useState("002");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [keywordLocal, setKeywordLocal] = useState("");
  const [keywordSupplier, setKeywordSupplier] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [idMst, setIdMst] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");

  const [codeMst, setCodeMst] = useState("");
  const [nameMst, setNameMst] = useState("");

  const [idSup, setIdSup] = useState("");
  /*master data from supplier variable*/
  const [countryCodeSup, setCountryCodeSup] = useState("");
  const [countryNameSup, setCountryNameSup] = useState("");
  const [cityCodeSup, setCityCodeSup] = useState("");
  const [cityNameSup, setCityNameSup] = useState("");
  
  /*endSection*/
  const [codeSup, setCodeSup] = useState("");
  const [nameSup, setNameSup] = useState("");

  const [masterMst, setMasterMst] = useState("");
  const { state, dispatch } = useContext(CityContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { state: countryState } = useContext(CountryContext);
  const { state: supplierDDLState, dispatch: supplierDDLDispatch } = useContext(SupplierContext);
  const { state: mappingCityState, dispatch: mappingCityDispatch } = useContext(MappingCityContext);

  useEffect(() => {
    // handleGet();
    handleDropDown();
  }, []);

  useEffect(() => {
    handleGet();
  }, [keywordLocal]);

  useEffect(() => {
    handleGetMapping();
  }, [keywordSupplier, supplierId]);

  const handleGet = async (page = 1, limit = 12) => {
    const city = await getMasterCity(dispatch, false, page, limit, keywordLocal);
    if (city.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleDropDown = async () => {
    const ddl = await getDDLSupp(supplierDDLDispatch, true);
    if (ddl.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleGetMapping = async (page = 1, limit = 12) => {
    const mapping = await getData(mappingCityDispatch, false, page, limit, supplierId, keywordSupplier);
    if (mapping.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteCity(id);
        handleGet();
      }
    });
  };

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (index, id, code, name, countryCode, countryName, master) => {
    // Function to handle row click
    setSelectedData(index)
    setIdMst(id);
    setCodeMst(code);
    setNameMst(name);
    setMasterMst(master);
    setCountryCode(countryCode);
    setCountryName(countryName);
    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  const handleRowSupClick = (index, id, code, name, countryCode, countryName, cityCode, cityName) => {
    // Function to handle row click
    setSelectedData(index)
    setIdSup(id);
    setCodeSup(code);
    setNameSup(name);

    /*Master Section */
    setCountryCodeSup(countryCode);
    setCountryNameSup(countryName);
    setCityCodeSup(cityCode);
    setCityNameSup(cityName);
    /*endSection*/

    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSupplierChange = (event) => {
    // Get the selected supplierId from the event target's value
    const selectedSupplierId = event.target.value;
    setSupplierId(selectedSupplierId);
  };

  const handleSubmit = async () => {

    if (supplierId === 0) {
      return Swal.fire(
        "Validate",
        `You need to choose supplier`,
        "warning"
      );
    }

    const initForm = {
      supplierId: supplierId,
      masterId: master,
      code: code,
      name: name,
      status: 1,
    };

    await updateData(id, initForm);

    handleGetMapping();
  };

  const handleSync = async (page = 1, limit = 12) => {
    const mapping = await syncData(mappingCityDispatch, true, supplierId);
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

            <div className="mt-2">
              {/* Search */}
              <div className="flex-fill input-group">
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
                <div className="d-flex input-group-append">
                  <div className="d-flex btn-group">
                    <a
                      className="btn btn-outline-secondary rounded-0"
                      id="search_button"
                      role="button"
                      title="Go Search"
                      style={{ padding: "2px 5px" }}
                      onClick={() => handleGet(1, 12)}
                    >
                      <i className="material-icons" style={{ verticalAlign: "middle" }}>
                        search
                      </i>
                    </a>
                  </div>
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
                    <th className="bg-blue text-white" width="70%">
                      City
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state?.data?.rows?.map((data, index) => {
                    return (
                      <tr onClick={() => handleRowClick(index, data.id, data.code, data.shortName, data.country.isoId, data.country.name, data.master?.id ?? "")} className="pointer">
                        <td>{data.code}</td>
                        <td>{data.longName}</td>
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
                        {new Array(Number(state?.data?.totalPage)).fill().map((i, key) => {
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
          <span>
            <i
              className="material-icons fs-6 text-black"
              style={{ verticalAlign: "middle" }}
            >
              arrow_right
            </i>
            <span className="ms-2 text-black">Supplier Code</span>
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
                  <option value="-">==SELECT==</option>
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
            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Mst Country
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-gray rounded-0 w-25"
                  value={countryCode}
                  disabled={true}
                  onChange={(val) =>
                    setCountryCode(val.target.value)
                  }
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-gray rounded-0 w-75"
                  value={countryName}
                  disabled={true}
                  onChange={(val) =>
                    setCountryName(val.target.value)
                  }
                />
              </div>

              <span className="flex-shrink-1 small text-nowrap text-dark pe-2  ps-2">
                Mst City
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-gray rounded-0 w-25"
                  disabled={true}
                  value={codeMst}
                  onChange={(val) =>
                    setCodeMst(val.target.value)
                  }
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-gray rounded-0 w-75"
                  value={nameMst}
                  disabled={true}
                  onChange={(val) =>
                    setNameMst(val.target.value)
                  }
                />
              </div>
            </div>

            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Supplier Country
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-25"
                  value={countryCodeSup}
                  onChange={(val) =>
                    setCountryCodeSup(val.target.value)
                  }
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-75"
                  value={countryNameSup}
                  onChange={(val) =>
                    setCountryNameSup(val.target.value)
                  }
                />
              </div>

              <span className="flex-shrink-1 small text-nowrap text-dark pe-2 ps-2">
                Supplier City
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-25"
                  value={codeSup}
                  onChange={(val) =>
                    codeSup(val.target.value)
                  }
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-75"
                  value={nameSup}
                  onChange={(val) =>
                    nameSup(val.target.value)
                  }
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                XML Flag
              </span>
              <div className="">
                <select className="form-select rounded-0" name="is_used">
                  <option value="1" selected>
                    Yes
                  </option>
                  <option value="2" selected>
                    No
                  </option>
                </select>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-end py-2">
              <button
                onClick={() => handleSync()}
                className="btn bg-warning rounded-1 text-black ms-2"
              >
                Sync
              </button>
              <button
                className="btn bg-blue rounded-1 text-white ms-2"
                onClick={() => handleSubmit()}
                disabled={codeSup ? false : true}
              >
                Save
              </button>
            </div>
          </div>


          <div className="mt-2">
            {/* Search */}
            <div className="flex-fill input-group">
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
              <div className="d-flex input-group-append">
                <div className="d-flex btn-group">
                  <a
                    className="btn btn-outline-secondary rounded-0"
                    id="search_button"
                    role="button"
                    title="Go Search"
                    style={{ padding: "2px 5px" }}
                    onClick={() => handleGetMapping(1, 12)}
                  >
                    <i className="material-icons" style={{ verticalAlign: "middle" }}>
                      search
                    </i>
                  </a>
                </div>
              </div>
            </div>
          </div>


          <div className="mt-2">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white">Country Code</th>
                  <th className="bg-blue text-white">City Code</th>
                  <th className="bg-blue text-white">Country Code</th>
                  <th className="bg-blue text-white">City Code</th>
                  <th className="bg-blue text-white">City</th>
                  <th className="bg-blue text-white">Hotel Qty</th>
                </tr>
              </thead>
              <tbody>
                {mappingCityState?.data.rows?.map((data, index) => {

                  return (
                    <tr onClick={() => handleRowSupClick(index, data.id, data.code, data.name, data.masterCountry.isoId, data.masterCountry.name, data.master[0].code, data.master[0].short_name)} className="pointer">
                      <td>{data.master[0]?.isoId}</td>
                      <td>{data.master[0]?.code}</td>
                      <td>{data.masterCountry?.isoId}</td>
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                      <td>{0}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* "Supplier Code Total" section */}
            <div className="col-3 d-flex align-items-center">
              <span className="p-1 px-2 small text-primary">
                {/* {console.log(mappingCityState)} */}
                Total Data: {mappingCityState?.data?.count}
              </span>
            </div>
            {/* "Supplier Code Pagination" section */}
            <div className="row w-100 mt-2">
              <div className="col-md-6">
                <div className="d-flex">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {mappingCityState?.data?.totalPage > 5 ? (
                        <>
                          <li className={`page-item ${1 === mappingCityState?.data?.page && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCityState?.data?.page - 1)}>
                              Previous
                            </a>
                          </li>
                          {mappingCityState?.data?.page > 3 && (
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
                          {new Array(Number(mappingCityState?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            if (
                              current === mappingCityState?.data?.page ||
                              (current >= mappingCityState?.data?.page - 2 && current <= mappingCityState?.data?.page + 2)
                            ) {
                              return (
                                <li className={`page-item ${current === mappingCityState?.data?.page && "active"}`}>
                                  <a className="page-link" onClick={() => handleGetMapping(current)}>
                                    {current}
                                  </a>
                                </li>
                              );
                            }
                            return null;
                          })}
                          {mappingCityState?.data?.page < mappingCityState?.data?.totalPage - 2 && (
                            <>
                              <li className="page-item">
                                <a className="page-link">...</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" onClick={() => handleGetMapping(mappingCityState?.data?.totalPage)}>
                                  {mappingCityState?.data?.totalPage}
                                </a>
                              </li>
                            </>
                          )}
                          <li className={`page-item ${!mappingCityState?.data?.hasNext && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCityState?.data?.page + 1)}>
                              Next
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className={`page-item ${1 === mappingCityState?.data?.page && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCityState?.data?.page - 1)}>
                              Previous
                            </a>
                          </li>
                          {new Array(Number(mappingCityState?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            return (
                              <li className={`page-item ${current === mappingCityState?.data?.page && "active"}`}>
                                <a className="page-link" onClick={() => handleGetMapping(current)}>
                                  {current}
                                </a>
                              </li>
                            );
                          })}
                          <li className={`page-item ${!mappingCityState?.data?.hasNext && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCityState?.data?.page + 1)}>
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
        caption="City Mapping"
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
