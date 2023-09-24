import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import CreateForm from "./createForm";
import { BedTypeContext } from "../../../context/bedType/reducer";
import { AuthContext } from "../../../context/auth/reducer";
import {
  deleteBedType,
  getAllBedType,
} from "../../../context/bedType/actions";
import Swal from "sweetalert2";
import Pagination from "../../../components/pagination";

const Index = (props) => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState("002");
  const [selectedData, setSelectedData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { state, dispatch } = useContext(BedTypeContext);
  const { dispatch: authDispatch } = useContext(AuthContext);

  useEffect(() => {
    handleGet();
  }, [keyword]);

  const handleGet = async (page = 1, limit = 12) => {
    const country = await getAllBedType(
      dispatch,
      false,
      page,
      limit,
      keyword
    );
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
        await deleteBedType(id);
        handleGet();
      }
    });
  };

  const toolbarForm = <></>;

  const toolbarForm2 = (
    <div
      className="table-wrapper rounded-0 d-flex h-100"
      style={{ border: "1px solid #dddddd", backgroundColor: "#fff" }}
    >


      {/* <div className="flex-fill input-group">
        <input
          name="q"
          type="text"
          className="form-control bg-white rounded-0 p-0 px-1"
          placeholder="BedType Name"
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
      </div> */}
      {/* <button
        className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm"
        data-bs-toggle="modal"
        data-bs-target="#createHotel"
        onClick={() => setIsEdit(false)}
      >
        <i className="material-icons fs-6" style={{ verticalAlign: "middle" }}>
          add
        </i>
        <span className="ms-2">Tambah</span>
      </button> */}
    </div>
  );

  const bodyForm = (
    <div
      className="table-wrapper rounded-0 d-flex h-100"
      style={{ border: "1px solid #dddddd", backgroundColor: "#fff" }}
    >
      <div className="w-100 row">
        <div className="col-sm-8 mt-2">
          {/* "Local Code" section */}
          <span>
            <i
              className="material-icons fs-6 text-black"
              style={{ verticalAlign: "middle" }}
            >
              arrow_right
            </i>
            <span className="ms-2 text-black">BedType List</span>


            <div className="mt-2">
              {/* Search */}
              <div className="flex-fill input-group">
                <input
                  name="q"
                  type="text"
                  className="form-control bg-white rounded-0 p-0 px-1"
                  placeholder="Name"
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
            </div>
            <div className="mt-2">
              <table className="table table-bordered table-hover table-striped">
                <thead>
                  <tr>
                    <th className="bg-blue text-white" width="10%">
                      Code
                    </th>
                    <th className="bg-blue text-white" width="50%">
                      Name
                    </th>
                    <th className="bg-blue text-white" width="50%">
                      Supplier
                    </th>
                    <th className="bg-blue text-white" width="10%">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {state?.data?.rows?.map((data) => {
                    return (
                      <tr id={data.id}>
                        <td>{data.code}</td>
                        <td>{data.name}</td>
                        <td>{data.supplier.code}</td>
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
                          {/* <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() => {
                              handleDelete(data.id);
                            }}
                          >
                            Delete
                          </button> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </span>
        </div>
      </div>
      
    </div>
  );

  const footers = <Pagination state={state?.data} handleGet={handleGet} />;

  return (
    <Layout selectId={selectedId}>
      <StdForm
        id={1}
        icon="grid_on"
        caption="BedType Hotel"
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
    </Layout>
  );
};

export default Index;
