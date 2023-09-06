import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import "material-icons/iconfont/material-icons.css";
import { CountryContext } from "../../../context/country/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import { deleteCountry, getAllCountry } from "../../../context/country/actions";
import { syncData, getData, createData, updateData } from "../../../context/mappingCountry/actions";
import { getDDLSupp } from "../../../context/supplier/actions";
import { SupplierContext } from "../../../context/supplier/reducer";
import { MappingCountryContext } from "../../../context/mappingCountry/reducer";
import { AUTH_401, AUTH_LOGOUT } from "../../../context/constant";
import Swal from "sweetalert2";


const Index = (props) => {
  const router = useRouter();
  const selectedId = useState("002");
  const [selectedData, setSelectedData] = useState();  
  const [keywordLocal, setKeywordLocal] = useState("");
  const [keywordSupplier, setKeywordSupplier] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [id, setId] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [master, setMaster] = useState("");
  const { state, dispatch } = useContext(CountryContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { state: supplierDDLState, dispatch: supplierDDLDispatch } = useContext(SupplierContext);
  const { state: mappingCountryState, dispatch: mappingCountryDispatch } = useContext(MappingCountryContext);

  useEffect(() => {
    handleGet();
    handleDropDown();
  }, [keywordLocal]);

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


  const handleGet = async (page = 1, limit = 12) => {
    const country = await getAllCountry(dispatch, false, page, limit, keywordLocal);
    if (country.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };

  const handleGetMapping = async (page = 1, limit = 12) => {
    const mapping = await getData(mappingCountryDispatch, false, page, limit, supplierId, keywordSupplier);
    if (mapping.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
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
    const mapping = await syncData(mappingCountryDispatch, true, supplierId);
    if (supplierId === "") {
      Swal.fire("Information", "Please select a supplier to be sync", "warning");
    }

    if (mapping?.status === 200) {
      Swal.fire("Information", "Sync Success", "success");
      handleGet();
    }
  };

  // State to store the index of the selected row
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (index,id, code, name, master) => {
    // Function to handle row click
    setSelectedData(index)
    setId(id);
    setCode(code);
    setName(name);
    setMaster(master);
    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSupplierChange = (event) => {
    // Get the selected supplierId from the event target's value
    const selectedSupplierId = event.target.value;
    setSupplierId(selectedSupplierId);
  };

  const handleMasterChange = (event) => {    
    const selectedMasterId = event.target.value;
    setMaster(selectedMasterId);
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

            <div className="ms-2" style={{ flexGrow: 1 }}>

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

              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th className="bg-blue text-white" width="30%">
                      Code
                    </th>
                    <th className="bg-blue text-white" width="70%">
                      Country
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state?.data?.rows?.map((data) => {
                    return (
                      <tr>
                        <td>{data.isoId}</td>
                        <td>{data.name}</td>
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
          {/* "Supplier Code" section */}
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

            <div className="d-flex flex-row align-items-center pt-1 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Master Code
              </span>
              <div className="flex-fill input-group">
                {/* <input
                  name="q"
                  type="text"
                  value={master}
                  disabled= {master ? false : true}
                  className="form-control bg-white rounded-0"
                  placeholder="Master Code"
                /> */}
                <select
                  className="form-select rounded-0"
                  name="is_used"
                  value={master}
                  onChange={handleMasterChange}
                  disabled={master ? false : true}
                >
                  <option value="-">Select</option>
                  {state?.dropdownData?.map((master) => {
                    return (
                      <option key={master.id} value={master.id}>
                        {master.code}
                      </option>
                    );
                  })}
                </select>

              </div>
              <span className="flex-shrink-1 small text-nowrap text-dark ms-2 pe-2">
                Supplier Code
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  value={code}
                  disabled={code ? false : true}
                  className="form-control bg-white rounded-0"
                  onChange={(val) =>
                    setCode(val.target.value)
                  }
                  placeholder="Supplier Code"
                />
              </div>
              <span className="flex-shrink-1 small text-nowrap text-dark ms-2 pe-2">
                Country
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  value={name}
                  disabled={name ? false : true}
                  className="form-control bg-white rounded-0"
                  onChange={(val) =>
                    setName(val.target.value)
                  }
                  placeholder="Country"
                />
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
                disabled={code ? false : true}
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
                  <th className="bg-blue text-white" width="25%">
                    Master Code
                  </th>
                  <th className="bg-blue text-white" width="25%">
                    Supplier Code
                  </th>
                  <th className="bg-blue text-white" width="50%">
                    Country
                  </th>
                </tr>
              </thead>
              <tbody>
                {mappingCountryState?.data.rows?.map((data, index) => {
                  return (
                    <tr onClick={() => handleRowClick(index, data.id,data.code, data.name, data.master?.id ?? "")} className="pointer">
                      <td>{data.master?.isoid}</td>
                      <td>{data.code}</td>
                      <td>{data.name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* "Supplier Code Total" section */}
            <div className="col-3 d-flex align-items-center">
              <span className="p-1 px-2 small text-primary">
                Total Data: {mappingCountryState?.data?.count}
              </span>
            </div>
            {/* "Supplier Code Pagination" section */}
            <div className="row w-100 mt-2">
              <div className="col-md-6">
                <div className="d-flex">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {mappingCountryState?.data?.totalPage > 5 ? (
                        <>
                          <li className={`page-item ${1 === mappingCountryState?.data?.page && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCountryState?.data?.page - 1)}>
                              Previous
                            </a>
                          </li>
                          {mappingCountryState?.data?.page > 3 && (
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
                          {new Array(Number(mappingCountryState?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            if (
                              current === mappingCountryState?.data?.page ||
                              (current >= mappingCountryState?.data?.page - 2 && current <= mappingCountryState?.data?.page + 2)
                            ) {
                              return (
                                <li className={`page-item ${current === mappingCountryState?.data?.page && "active"}`}>
                                  <a className="page-link" onClick={() => handleGetMapping(current)}>
                                    {current}
                                  </a>
                                </li>
                              );
                            }
                            return null;
                          })}
                          {mappingCountryState?.data?.page < mappingCountryState?.data?.totalPage - 2 && (
                            <>
                              <li className="page-item">
                                <a className="page-link">...</a>
                              </li>
                              <li className="page-item">
                                <a className="page-link" onClick={() => handleGetMapping(mappingCountryState?.data?.totalPage)}>
                                  {mappingCountryState?.data?.totalPage}
                                </a>
                              </li>
                            </>
                          )}
                          <li className={`page-item ${!mappingCountryState?.data?.hasNext && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCountryState?.data?.page + 1)}>
                              Next
                            </a>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className={`page-item ${1 === mappingCountryState?.data?.page && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCountryState?.data?.page - 1)}>
                              Previous
                            </a>
                          </li>
                          {new Array(Number(mappingCountryState?.data?.totalPage)).fill().map((i, key) => {
                            const current = key + 1;
                            return (
                              <li className={`page-item ${current === mappingCountryState?.data?.page && "active"}`}>
                                <a className="page-link" onClick={() => handleGetMapping(current)}>
                                  {current}
                                </a>
                              </li>
                            );
                          })}
                          <li className={`page-item ${!mappingCountryState?.data?.hasNext && "disabled"}`}>
                            <a className="page-link" onClick={() => handleGetMapping(mappingCountryState?.data?.page + 1)}>
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
        caption="Country Mapping"
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
