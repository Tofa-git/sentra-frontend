import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../layouts/default";
import StdForm from "../../components/forms/stdForm";
import CreateForm from "./createForm";
import "material-icons/iconfont/material-icons.css";

const dummyData = [
  {
    id: 1,
    name: "HBE",
    code: "AL",
    description: "Albania",
    no_use: true,
  },
  {
    id: 2,
    name: "HBE",
    code: "DZ",
    description: "Algeria",
    no_use: false,
  },
  {
    id: 3,
    name: "HBE",
    code: "AS",
    description: "America Samoa",
    no_use: true,
  },
];

const Index = (props) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("002");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const toolbarForm = (
    <>
      <div className="d-flex flex-row align-items-center bg-light pt-2 ps-2 text-black fw-bold">
        Suplier Country ( Hotel )
      </div>
      <div className="d-flex flex-row align-items-center bg-light p-2">
        <span className="flex-shrink-1 pe-1 small text-nowrap text-dark">
          Suplier :
        </span>
        <div className="input-group">
          <select className="form-select rounded-0" name="is_used">
            <option value="-" selected disabled>
              Choose Country
            </option>
            <option value="1" selected>
              Agoda
            </option>
            <option value="0" selected>
              Dida
            </option>
          </select>
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
            search
          </i>
          <span className="ms-2">Search</span>
        </button>
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
            save
          </i>
          <span className="ms-2">Simpan</span>
        </button>
      </div>
      <div
        className="d-flex flex-row align-items-center bg-light pb-2 ps-2"
        style={{ borderBottom: "1px solid #dddddd" }}
      >
        <div className="d-flex flex-row">
          <input type="radio" />
          <span className="text-black ms-2 me-4">Connect</span>
          <input type="radio" />
          <span className="text-black ms-2">Disconnect</span>
        </div>
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
                Suplier Name
              </th>
              <th className="bg-blue text-white" width="5%">
                Suplier Country Code
              </th>
              <th className="bg-blue text-white" width="15%">
                Suplier Country Description
              </th>
              <th className="bg-blue text-white" width="5%">
                No Use
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((data) => {
              return (
                <tr>
                  <td>{data.name}</td>
                  <td>{data.code}</td>
                  <td>{data.description}</td>
                  <td>
                    <input type="checkbox" checked={data.no_use} />
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
        caption="XML Link Control"
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
