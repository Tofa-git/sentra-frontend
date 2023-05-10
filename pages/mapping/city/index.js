import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
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
  const [selectedId, setSelectedId] = useState("002");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const toolbarForm = <></>;

  const bodyForm = (
    <div
      className="table-wrapper rounded-0 d-flex h-100"
      style={{ border: "1px solid #dddddd", backgroundColor: "#fff" }}
    >
      <div className="w-100 row">
        <div className="col-sm-6 mt-2">
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
                  <select
                    className="form-select rounded-0"
                    name="is_used"
                    value={"-"}
                  >
                    <option value="-" selected disabled>
                      Choose Country
                    </option>
                    <option value="1" selected>
                      Agoda
                    </option>
                    <option value="2" selected>
                      Dida
                    </option>
                  </select>
                </div>
                <span className="flex-shrink-1 small text-nowrap text-dark pe-2 ps-2">
                  City Code
                </span>
                <div className="flex-fill input-group">
                  <input
                    name="q"
                    type="text"
                    className="form-control bg-white rounded-0"
                    placeholder="City Code"
                  />
                </div>
                <button
                  className="btn btn-sm btn-primary bg-blue rounded-0 align-items-center shadow-sm d-flex flex-row ms-2"
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
                  {dummyData.map((data) => {
                    return (
                      <tr>
                        <td>{data.code}</td>
                        <td>{data.city_name_en}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </span>
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
