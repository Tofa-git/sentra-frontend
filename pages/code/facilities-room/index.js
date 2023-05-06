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
    code: "*BC",
    facility_name_en: "Business Centre",
    facility_name_ch: "阿富汗",
    is_used: 1,
  },
  {
    id: 2,
    code: "*BQ",
    facility_name_en: "Business Quantro",
    facility_name_ch: "阿富汗",
    is_used: 0,
  },
  {
    id: 3,
    code: "*BP",
    facility_name_en: "Boutique",
    facility_name_ch: "阿尔巴尼亚",
    is_used: 1,
  },
];

const Index = (props) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("002");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const toolbarForm = (
    <div
      className="d-flex flex-row align-items-center bg-light p-2"
      style={{ borderBottom: "1px solid #dddddd" }}
    >
      <span className="flex-shrink-1 pe-1 small text-nowrap text-dark">
        Keyword :
      </span>
      <div className="flex-fill input-group">
        <input
          name="q"
          type="text"
          className="form-control bg-white rounded-0 p-0 px-1"
          placeholder="Facility Name"
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
              <i className="material-icons" style={{ verticalAlign: "middle" }}>
                search
              </i>
            </a>
            <a
              className="btn btn-outline-secondary rounded-0"
              id="filter_button"
              role="button"
              title="Search options"
              style={{ padding: "2px 5px" }}
              data-bs-toggle="offcanvas"
              href="#searchOptions"
              aria-controls="searchOptions"
            >
              <i className="material-icons" style={{ verticalAlign: "middle" }}>
                filter_alt
              </i>
            </a>
          </div>
        </div>
      </div>
      <button
        className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
        data-bs-toggle="modal"
        data-bs-target="#createRoom"
        onClick={() => setIsEdit(false)}
      >
        <i className="material-icons fs-6" style={{ verticalAlign: "middle" }}>
          add
        </i>
        <span className="ms-2">Tambah</span>
      </button>
    </div>
  );

  const bodyForm = (
    <div
      className="table-wrapper rounded-0 d-flex h-100"
      style={{ border: "1px solid #dddddd", backgroundColor: "#fff" }}
    >
      <div className="w-100">
        <table className="table table-bordered table-hover table-striped">
          <thead>
            <tr>
              <th className="bg-blue text-white" width="5%">
                Code
              </th>
              <th className="bg-blue text-white" width="15%">
                Facility (EN)
              </th>
              <th className="bg-blue text-white" width="15%">
                Facility (CH)
              </th>
              <th className="bg-blue text-white" width="5%">
                Is Used
              </th>
              <th className="bg-blue text-white" width="5%">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data) => {
              return (
                <tr>
                  <td>{data.code}</td>
                  <td>{data.facility_name_en}</td>
                  <td>{data.facility_name_ch}</td>
                  <td>{data.is_used ? "Yes" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary bg-blue"
                      data-bs-toggle="modal"
                      data-bs-target="#createRoom"
                      onClick={() => {
                        setIsEdit(true);
                        setSelectedData(data);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
        caption="Facility Room"
        toolbar={toolbarForm}
        body={bodyForm}
        footer={footers}
      />
      <CreateForm
        id="createRoom"
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
