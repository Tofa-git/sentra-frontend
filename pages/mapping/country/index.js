import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import CreateForm from "./createForm";
import ImgButton from "../../../components/button/imgButton";
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
            <div className="ms-2">
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
            </div>

            <div className="d-flex flex-row align-items-center pt-2 pb-2">
              <span className="flex-shrink-1 small text-nowrap text-dark pe-2">
                Master Code
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0"
                  placeholder="Master Code"
                />
              </div>
              <span className="flex-shrink-1 small text-nowrap text-dark ms-2 pe-2">
                Supplier Code
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0"
                  placeholder="Supplier Master"
                />
              </div>
              <span className="flex-shrink-1 small text-nowrap text-dark ms-2 pe-2">
                Country
              </span>
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0"
                  placeholder="Country"
                />
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
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.code}</td>
                      <td>{data.city_name_en}</td>
                      <td>{data.city_name_en}</td>
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
        caption="City Codes"
        toolbar={toolbarForm}
        body={bodyForm}
        footer={footers}
      />
      <CreateForm
        id="createHotel"
        size="modal-md"
        isEdit={isEdit}
        selectedData={selectedData}
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
