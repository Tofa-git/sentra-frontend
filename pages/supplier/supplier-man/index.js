import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Input from "../../../components/input";
import Select from "../../../components/select";
import CreateSupListForm from "./createSupListForm";
import CreateSupManForm from "./createSupManForm";
import CreateSupEmergForm from "./createSupEmergForm";
import CreateSupEndpointForm from "./createSupEndpointForm";
import { AuthContext } from "../../../context/auth/reducer";
import { SupplierContext } from "../../../context/supplier/reducer";
import { getAllSupplier, deleteSupplier } from "../../../context/supplier/actions";


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
  const router = useRouter();
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenManager, setOpenmanager] = useState(false);
  const [isOpenEmergency, setOpenemergency] = useState(false);

  const [keyword, setKeyword] = useState("");
  const { state, dispatch } = useContext(SupplierContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  const [numDivs, setNumDivs] = useState(1);
  const [markupEndValues, setMarkupEndValues] = useState(['0']);

  const handleMarkupEnd1Change = (e) => {
    const newValue = e.target.value;
    setMarkupEndValues([newValue]); // Update the state with a new array containing only the entered value
    setNumDivs(2); // Reset numDivs to 1 when a new value is entered in markup_end1
  };

  const handleMarkupEndInputChange = (index, value) => {
    const updatedValues = [...markupEndValues];
    updatedValues[index] = value;
    setMarkupEndValues(updatedValues);
    setNumDivs(index + 3);
  };

  // State to store the index of the selected row
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (index) => {
    setOpenmanager(true);
    setSelectedRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [selectedRowManIndex, setSelectedRowManIndex] = useState(null);
  const handleRowMan = (index) => {
    setOpenemergency(true);
    setSelectedRowManIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleGet = async (page = 1, limit = 12) => {
    const supplier = await getAllSupplier(dispatch, false, page, limit, keyword);

    if (supplier.status === 401) {
      authDispatch({ type: AUTH_401 });
      authDispatch({ type: AUTH_LOGOUT });
      Swal.fire("Token has been Expired", "Please Login Again", "warning");
      router.push("/authentication/login");
    }
  };


  useEffect(() => {
    handleGet();
  }, []);

  const deleteSuppData = async (id) => {
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
        await deleteSupplier(id);
        handleGet();
      }
    });
  };

  const toolbarSupList = (
    <>
      <div
        className="d-flex flex-row align-items-center bg-light p-2"
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <span className="flex-shrink-1 pe-1 small text-nowrap text-dark">
          Sort By
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-">UID</option>
            <option value="-">Sales Office</option>
            <option value="-">Used</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Used
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-">Yes</option>
            <option value="-">No</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Code/Name
        </span>
        <div className="flex-fill input-group">
          <input
            name="q"
            type="text"
            className="form-control bg-white rounded-0 p-0 px-1"
            placeholder="User ID/Name"
          />
          <div className="d-flex input-group-append">
            <div className="d-flex btn-group">
              <a
                className="btn btn-outline-secondary rounded-0"
                id="search_button"
                role="button"
                title="Go Search"
                style={{ padding: "2px 5px" }}
                href="#"
              >
                <i
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  search
                </i>
              </a>
            </div>
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#createHotel"
          onClick={() => setIsEdit(false)}
        >
          <i
            className="material-icons fs-6"
            style={{ verticalAlign: "middle" }}
          >
            add
          </i>
          <span className="ms-2">Tambah</span>
        </button>
      </div>
    </>
  );

  const toolbarSupEndpoint = (
    <>
      <div
        className="d-flex flex-row align-items-center bg-light p-2"
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Used
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-">Yes</option>
            <option value="-">No</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Supplier Name
        </span>
        <div className="flex-fill input-group">
          <input
            name="q"
            type="text"
            className="form-control bg-white rounded-0 p-0 px-1"
            placeholder="Supplier Name"
          />
          <div className="d-flex input-group-append">
            <div className="d-flex btn-group">
              <a
                className="btn btn-outline-secondary rounded-0"
                id="search_button"
                role="button"
                title="Go Search"
                style={{ padding: "2px 5px" }}
                href="#"
              >
                <i
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  search
                </i>
              </a>
            </div>
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#createSupEndpoint"
          onClick={() => setIsEdit(false)}
        >
          <i
            className="material-icons fs-6"
            style={{ verticalAlign: "middle" }}
          >
            add
          </i>
          <span className="ms-2">Tambah</span>
        </button>
      </div>
    </>
  );

  const toolbarSupMan = (
    <>
      <div
        className="d-flex flex-row align-items-center bg-light p-2"
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <span className="flex-shrink-1 pe-1 small text-nowrap text-dark">
          Sort By
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-">UID</option>
            <option value="-">Sales Office</option>
            <option value="-">Used</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Used
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-">Yes</option>
            <option value="-">No</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Code/Name
        </span>
        <div className="flex-fill input-group">
          <input
            name="q"
            type="text"
            className="form-control bg-white rounded-0 p-0 px-1"
            placeholder="User ID/Name"
          />
          <div className="d-flex input-group-append">
            <div className="d-flex btn-group">
              <a
                className="btn btn-outline-secondary rounded-0"
                id="search_button"
                role="button"
                title="Go Search"
                style={{ padding: "2px 5px" }}
                href="#"
              >
                <i
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  search
                </i>
              </a>
            </div>
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#createSupMan"
          onClick={() => setIsEdit(false)}
        >
          <i
            className="material-icons fs-6"
            style={{ verticalAlign: "middle" }}
          >
            add
          </i>
          <span className="ms-2">Tambah</span>
        </button>
      </div>
    </>
  );

  const toolbarSupEmerg = (
    <>
      <div
        className="d-flex flex-row align-items-center bg-light p-2"
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Used
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="1">Yes</option>
            <option value="0">No</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Country/City
        </span>
        <div className="flex-fill input-group">
          <input
            name="q"
            type="text"
            className="form-control bg-white rounded-0 p-0 px-1"
            placeholder="Country/City"
          />
          <div className="d-flex input-group-append">
            <div className="d-flex btn-group">
              <a
                className="btn btn-outline-secondary rounded-0"
                id="search_button"
                role="button"
                title="Go Search"
                style={{ padding: "2px 5px" }}
                href="#"
              >
                <i
                  className="material-icons"
                  style={{ verticalAlign: "middle" }}
                >
                  search
                </i>
              </a>
            </div>
          </div>
        </div>
        <button
          className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
          data-bs-toggle="modal"
          data-bs-target="#createSupEmerg"
          onClick={() => setIsEdit(false)}
        >
          <i
            className="material-icons fs-6"
            style={{ verticalAlign: "middle" }}
          >
            add
          </i>
          <span className="ms-2">Tambah</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      <div className="d-flex flex-column h-100 stdForm" >
        <div className="stdFormBody flex-fill bg-white p-2">
          <div className="mx-3">
            <div className="row p-3">

              <div className="col-lg-6">
                <div className="text-dark mb-1 mt-4">Supplier List</div>
                <div className="stdFormHeader flex-shrink-1">
                  {toolbarSupList}
                </div>
                <div className="bg-white">
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="bg-blue text-white" width="5%">
                          Code
                        </th>
                        <th className="bg-blue text-white" width="25%">
                          Name
                        </th>
                        <th className="bg-blue text-white" width="10%">
                          Credit Day
                        </th>
                        <th className="bg-blue text-white" width="5%">
                          Telephone
                        </th>
                        <th className="bg-blue text-white" width="20%">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {state?.data?.rows?.map((entry, index) => {
                        return (
                          <React.Fragment key={entry.id}>
                            <tr onClick={() => handleRowClick(index)} className="pointer">
                              <td>{entry.code}</td>
                              <td>{entry.name}</td>
                              <td>{entry.creditDay}</td>
                              <td>{entry.mobile}</td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-primary bg-blue"
                                  data-bs-toggle="modal"
                                  data-bs-target="#createHotel"
                                  onClick={() => {
                                    setIsEdit(true);
                                    setSelectedData(entry);
                                  }}
                                >
                                  Edit
                                </button>
                                {/* <button
                                  type="button"
                                  className="btn btn-danger ms-2"
                                  onClick={() => {
                                    deleteSuppData(data.id);
                                  }}
                                >
                                  Delete
                                </button> */}
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="text-dark mb-1 mt-4">Supplier API</div>
                <div className="stdFormHeader flex-shrink-1">
                  {toolbarSupEndpoint}
                </div>
                <div className="bg-white">
                  {isOpenManager && (
                    <table className="table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="bg-blue text-white" width="15%">
                            Name
                          </th>
                          <th className="bg-blue text-white" width="15%">
                            Method
                          </th>
                          <th className="bg-blue text-white" width="10%">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          state.data.rows.map((entry, index) => {
                            if (selectedRowIndex === index && entry.suppApi && entry.suppApi.length > 0) {
                              return entry.suppApi.map((data) => (
                                <tr>
                                  <td>{data.name}</td>
                                  <td>{data.method}</td>
                                  <td>
                                    <button
                                      type="button"
                                      class="btn btn-primary bg-blue"
                                      data-bs-toggle="modal"
                                      data-bs-target="#createSupEndpoint"
                                      onClick={() => {
                                        setIsEdit(true);
                                        setSelectedData(data);
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-warning ms-2"                                     
                                    >
                                      Detail
                                    </button>
                                  </td>
                                </tr>
                              ));
                            }
                          })
                        }
                      </tbody>
                    </table>
                  )}

                </div>

                <div className="text-dark mb-1 mt-4">Markup By Section</div>
                <div
                  className="d-flex flex-row align-items-center bg-light p-2"
                  style={{ borderBottom: "1px solid #dddddd" }}
                >

                  <div className="flex-fill input-group">
                    <input
                      name="markup_start1"
                      type="text"
                      className="form-control bg-gray rounded-0 p-0 px-1"
                      value="0"
                      disabled="true"
                    />
                  </div>

                  <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
                    ~
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="markup_end1"
                      type="number"
                      className="form-control bg-white rounded-0 p-0 px-1"
                      value={markupEndValues[0]} // Use the state value here
                      onChange={handleMarkupEnd1Change}
                    />
                  </div>
                  <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
                    Net
                  </span>
                  <div className="flex-fill input-group">
                    <input
                      name="markup_net1"
                      type="text"
                      className="form-control bg-white rounded-0 p-0 px-1"
                      value="0"
                    />
                  </div>
                  <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">

                  </span>
                  <div className="flex-fill input-group">
                    <select className="form-control bg-white rounded-0 p-0 px-1" name="markup_type1">
                      <option value="1">Percentage(%)</option>
                      <option value="2">Fix Amount</option>
                    </select>
                  </div>


                </div>
                {/* Render additional divs based on numDivs */}
                {[...Array(numDivs - 1)].map((_, index) => (
                  <div
                    className="d-flex flex-row align-items-center bg-light p-2"
                    style={{ borderBottom: "1px solid #dddddd" }}
                  >
                    <div key={index} className="d-flex flex-row align-items-center bg-light p-2" style={{ borderBottom: "1px solid #dddddd" }}>
                      {/* Replace the input names with appropriate values */}
                      <div className="flex-fill input-group">
                        <input
                          name={`markup_start${index + 2}`}
                          type="text"
                          className="form-control bg-gray rounded-0 p-0 px-1"
                          value="0"
                          disabled
                        />
                      </div>

                      <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
                        ~
                      </span>
                      <div className="flex-fill input-group">
                        <input
                          name={`markup_end${index + 2}`}
                          type="text"
                          className="form-control bg-white rounded-0 p-0 px-1"
                          value={markupEndValues[index]} // Use the state value here for markup_end inputs
                          onChange={(e) => handleMarkupEndInputChange(index, e.target.value)}
                        />
                      </div>
                      <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
                        Net
                      </span>
                      <div className="flex-fill input-group">
                        <input
                          name={`markup_net${index + 2}`}
                          type="text"
                          className="form-control bg-white rounded-0 p-0 px-1"
                          value="0"
                        />
                      </div>
                      <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">

                      </span>
                      <div className="flex-fill input-group">
                        <select className="form-control bg-white rounded-0 p-0 px-1" name={`markup_type${index + 2}`}>
                          <option value="1">Percentage(%)</option>
                          <option value="2">Fix Amount</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>


              <div className="col-lg-6">
                <div className="text-dark mb-1">Supplier Manager Information</div>
                <div className="stdFormHeader flex-shrink-1">
                  {toolbarSupMan}
                </div>
                <div className="bg-white">
                  {isOpenManager && (
                    <table className="table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="bg-blue text-white" width="15%">
                            User ID
                          </th>
                          <th className="bg-blue text-white" width="30%">
                            Name
                          </th>
                          <th className="bg-blue text-white" width="5%">
                            Mobile
                          </th>
                          <th className="bg-blue text-white" width="5%">
                            Email
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          state.data.rows.map((entry, index) => {
                            if (selectedRowIndex === index && entry.suppMan && entry.suppMan.length > 0) {
                              return entry.suppMan.map((data) => (
                                <tr onClick={() => handleRowMan(index)} className="pointer">
                                  <td>{data.uid}</td>
                                  <td>{data.name}</td>
                                  <td>{data.mobile}</td>
                                  <td>{data.email}</td>
                                </tr>
                              ));
                            }
                          })
                        }
                      </tbody>
                    </table>
                  )}

                </div>
                <div className="text-dark mb-1">Supplier Emergency Contact Information</div>
                <div className="stdFormHeader flex-shrink-1">
                  {toolbarSupEmerg}
                </div>
                <div className="bg-white">
                  {isOpenEmergency && selectedRowManIndex !== null && (
                    <table className="table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                          <th className="bg-blue text-white" width="30%">
                            Nation/City
                          </th>
                          <th className="bg-blue text-white" width="35%">
                            Telephone 1
                          </th>
                          <th className="bg-blue text-white" width="35%">
                            Telephone 2
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.data.rows[selectedRowManIndex]?.suppMan.map((manager) => {                          
                          // Check if the manager has suppEmerg data
                          if (state.data.rows[selectedRowIndex].suppMan.length > 0 && manager.suppEmerg && manager.suppEmerg.length > 0) {
                            return manager.suppEmerg.map((data) => (
                              <tr key={data.id}>
                                <td>{data.short_name}</td>
                                <td>{data.phoneFirst}</td>
                                <td>{data.phoneSecond}</td>
                              </tr>
                            ));
                          }

                        })}
                      </tbody>
                    </table>
                  )}
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>


      <CreateSupListForm
        id="createHotel"
        size="modal-xl"
        isEdit={isEdit}
        selectedData={selectedData}
        handleGet={handleGet}
      />

      <CreateSupEndpointForm
        id="createSupEndpoint"
        size="modal-xl"
        isEdit={isEdit}
        selectedData={selectedData}
        handleGet={handleGet}
      />

      <CreateSupManForm
        id="createSupMan"
        size="modal-xl"
        isEdit={isEdit}
        selectedData={selectedData}
        handleGet={handleGet}
      />

      <CreateSupEmergForm
        id="createSupEmerg"
        size="modal-xl"
        isEdit={isEdit}
        selectedData={selectedData}
        handleGet={handleGet}
      />
    </>
  );
};

export default Index;
