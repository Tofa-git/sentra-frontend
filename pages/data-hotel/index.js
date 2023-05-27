import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/default";
import StdForm from "../../components/forms/stdForm";
import CreateForm from "./createForm";
import ImgButton from "../../components/button/imgButton";

const dummyData = [
  {
    id: 1,
    code: "ALOR",
    hotel_name: "Alor",
    rank: "阿富汗",
    p_field: "Alor",
    i_field: 1,
  },
  {
    id: 2,
    code: "AMBA",
    hotel_name: "Ambarawa",
    rank: "阿富汗",
    p_field: "Ambarawa",
    i_field: 0,
  },
  {
    id: 3,
    code: "AMQ",
    hotel_name: "Ambon",
    rank: "阿尔巴尼亚",
    p_field: "Ambon",
    i_field: 1,
  },
];

const Index = (props) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("006");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const toolbarForm = (
    <>
      <div
        className="d-flex flex-row align-items-center bg-light p-2"
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <span className="flex-shrink-1 pe-1 small text-nowrap text-dark">
          Country
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-" selected disabled>
              Choose Country
            </option>
            <option value="1" selected>
              Indonesia
            </option>
            <option value="0" selected>
              Singapore
            </option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          City
        </span>
        <div className="flex-fill input-group">
          <select className="form-select rounded-0" name="i_field">
            <option value="-" selected disabled>
              Choose City
            </option>
            <option value="1" selected>
              Bandung
            </option>
            <option value="0">Malang</option>
          </select>
        </div>
        <span className="flex-shrink-1 pe-1 ms-2 small text-nowrap text-dark">
          Code or Hotel Name
        </span>
        <div className="flex-fill input-group">
          <input
            name="q"
            type="text"
            className="form-control bg-white rounded-0 p-0 px-1"
            placeholder="Hotel Name / Code"
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
              <th className="bg-blue text-white" width="25%">
                Hotel
              </th>
              <th className="bg-blue text-white" width="15%">
                Star
              </th>
              <th className="bg-blue text-white" width="20%">
                Rank
              </th>
              <th className="bg-blue text-white" width="5%">
                P
              </th>
              <th className="bg-blue text-white" width="5%">
                L
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
                  <td>{data.hotel_name}</td>
                  <td>{data.rank}</td>
                  <td>{data.p_field}</td>
                  <td>{data.rank}</td>
                  <td>{data.i_field ? "Yes" : "No"}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-primary bg-blue"
                      data-bs-toggle="modal"
                      data-bs-target="#createHotel"
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
        caption="City Codes"
        toolbar={toolbarForm}
        body={bodyForm}
        footer={footers}
      />
      <CreateForm
        id="createHotel"
        size="modal-xl"
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
