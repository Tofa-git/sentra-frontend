import { useContext, useEffect, useState } from "react";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import CreateForm from "./createForm";
import { CountryContext } from "../../../context/country/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import { deleteCountry, getAllCountry } from "../../../context/country/actions";
import { AUTH_401, AUTH_LOGOUT } from "../../../context/constant";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const Index = (props) => {
  const router = useRouter();
  const selectedId = useState("002");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { state, dispatch } = useContext(CountryContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  useEffect(() => {
    handleGet();
  }, []);

  const handleGet = async (page = 1, limit = 12) => {
    const country = await getAllCountry(dispatch, false, page, limit, keyword);
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
        await deleteCountry(id);
        handleGet();
      }
    });
  };

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
          placeholder="Country Name"
          onChange={(val) => setKeyword(val.target.value)}
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
      <button
        className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
        data-bs-toggle="modal"
        data-bs-target="#createHotel"
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
    <>
      <div
        className="table-wrapper rounded-0 d-flex h-100"
        style={{ border: "1px solid #dddddd", backgroundColor: "#fff" }}
      >
        <div className="w-100">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th className="bg-blue text-white" width="5%">
                  ISO ID
                </th>
                <th className="bg-blue text-white" width="10%">
                  ISO 3
                </th>
                <th className="bg-blue text-white" width="15%">
                  Name
                </th>
                <th className="bg-blue text-white" width="15%">
                  Basic Currency
                </th>
                <th className="bg-blue text-white" width="15%">
                  Desc Currency
                </th>
                <th className="bg-blue text-white" width="5%">
                  Dial
                </th>
                <th className="bg-blue text-white" width="5%">
                  Sequence
                </th>
                <th className="bg-blue text-white" width="5%">
                  Status
                </th>
                <th className="bg-blue text-white" width="5%">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {state?.data?.rows?.map((data) => {
                return (
                  <tr key={data.id}>
                    <td>{data?.isoId}</td>
                    <td>{data?.iso3 || "-"}</td>
                    <td>{data?.name}</td>
                    <td>{data?.basicCurrency}</td>
                    <td>{data?.descCurrency}</td>
                    <td>{data?.dial || "-"}</td>
                    <td>{data?.sequence}</td>
                    <td>{data?.status === "1" ? "Yes" : "No"}</td>
                    <td className="d-flex flex-row">
                      <button
                        type="button"
                        className="btn btn-primary bg-blue"
                        data-bs-toggle="modal"
                        data-bs-target="#createHotel"
                        onClick={() => {
                          setIsEdit(true);
                          setSelectedData(data);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          handleDelete(data.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-3 d-flex align-items-center">
        <span className="p-1 px-2 small text-primary">
          Total Data: {state?.data?.count}
        </span>
      </div>
    </>
  );

  const footers = (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class={`page-item ${1 === state?.data?.page && "disabled"}`}>
            <a
              class="page-link"
              onClick={() => handleGet(state?.data?.page - 1)}
            >
              Previous
            </a>
          </li>
          {new Array(Number(state?.data?.totalPage)).fill().map((i, key) => {
            const current = key + 1;
            return (
              <li
                class={`page-item ${current === state?.data?.page && "active"}`}
              >
                <a class="page-link" onClick={() => handleGet(current)}>
                  {current}
                </a>
              </li>
            );
          })}
          <li class={`page-item ${!state?.data?.hasNext && "disabled"}`}>
            <a
              class="page-link"
              onClick={() => handleGet(state?.data?.page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );

  console.log({ selectedData });
  return (
    <Layout selectId={selectedId}>
      <StdForm
        id={1}
        icon="grid_on"
        caption="Country Codes"
        toolbar={toolbarForm}
        body={bodyForm}
        footer={footers}
      />
      <CreateForm
        id="createHotel"
        size="modal-md"
        isEdit={isEdit}
        selectedData={selectedData}
        handleGet={() => handleGet()}
      />
      {/* <div
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
      </div> */}
    </Layout>
  );
};

export default Index;
