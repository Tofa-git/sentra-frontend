import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import "material-icons/iconfont/material-icons.css";
import { CityContext } from "../../../context/city/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import { deleteCity, getAllCity } from "../../../context/city/actions";
import { AUTH_401, AUTH_LOGOUT } from "../../../context/constant";
import Swal from "sweetalert2";
import { CountryContext } from "../../../context/country/reducer";

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
  const [keyword, setKeyword] = useState("");
  const { state, dispatch } = useContext(CityContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const { state: countryState } = useContext(CountryContext);

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = async (page = 1, limit = 12) => {
    const country = await getAllCity(dispatch, false, page, limit, keyword);
    if (country.status === 401) {
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
              <div className="d-flex flex-row align-items-center">
                <div className="flex-fill input-group">
                  <select className="form-select rounded-0" name="is_used">
                    <option value="-" selected disabled>
                      Choose Country
                    </option>
                    {countryState?.dropdownData?.map((country) => {
                      return <option value={country.id}>{country.name}</option>;
                    })}
                  </select>
                </div>
                <span className="flex-shrink-1 small text-nowrap text-dark pe-2 ps-2">
                  City Code
                </span>
                <div className="flex-fill input-group">
                  <input
                    name="q"
                    type="text"
                    className="form-control bg-white rounded-0 p-0 px-1"
                    placeholder="City Name"
                    onChange={(val) => setKeyword(val.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleGet(1, 12);
                      }
                    }}
                  />
                </div>
                <div className="d-flex input-group-append">
                  <div className="d-flex btn-group">
                    <a
                      className="btn btn-outline-secondary rounded-0"
                      id="search_button"
                      role="button"
                      title="Go Search"
                      style={{ padding: "0.5px 5px" }}
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
                  {state?.data?.rows?.map((data) => {
                    return (
                      <tr>
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
                  value={"-"}
                >
                  <option value="-" selected disabled>
                    Choose Supplier
                  </option>
                  <option value="1" selected>
                    Agoda
                  </option>
                  <option value="2" selected>
                    Dida
                  </option>
                </select>
              </div>
              <span className="flex-shrink-1 small text-nowrap text-dark ms-2 me-2">
                City
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0"
                  placeholder="City Code / Name"
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Master Country Code
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-25"
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-75"
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Master City Code
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-75"
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Supplier Country Name
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-25"
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-75"
                />
              </div>

              <span className="flex-shrink-1 small text-nowrap text-dark pe-2 ps-2">
                Supplier Country Name
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-25"
                />
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 w-75"
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

            <button
              className="btn btn-sm btn-primary bg-blue rounded-0 align-items-center shadow-sm"
              data-bs-toggle="modal"
              data-bs-target="#createHotel"
              onClick={() => setIsEdit(false)}
            >
              <i
                className="material-icons fs-6"
                style={{ verticalAlign: "middle" }}
              >
                search
              </i>
              <span className="ms-2">Search</span>
            </button>
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
                  <th className="bg-blue text-white">XML Flag</th>
                  <th className="bg-blue text-white">Hotel Qty</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.code}</td>
                      <td>{data.city_name_en}</td>
                      <td>{data.city_name_en}</td>
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
