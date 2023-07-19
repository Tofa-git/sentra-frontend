import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../../layouts/default";
import StdForm from "../../../components/forms/stdForm";
import CreateForm from "./createForm";
import { AuthContext } from "../../../context/auth/reducer";
import { CityContext } from "../../../context/city/reducer";
import { getAllOperator } from "../../../context/operatorMan/actions";
import { OperatorManContext } from "../../../context/operatorMan/reducer";


const Index = (props) => {
    const router = useRouter();
    const selectedId = "006";
    const [selectedData, setSelectedData] = useState();
    const [isEdit, setIsEdit] = useState(false);

    const [keyword, setKeyword] = useState("");
    const { state, dispatch } = useContext(OperatorManContext);
    const { dispatch: authDispatch } = useContext(AuthContext);
    const { state: cityState } = useContext(CityContext);

    const totalPage = state?.data?.totalPage || 0;

    const handleGet = async (page = 1, limit = 12) => {
        const operator = await getAllOperator(dispatch, false, page, limit, keyword);

        if (operator.status === 401) {
            authDispatch({ type: AUTH_401 });
            authDispatch({ type: AUTH_LOGOUT });
            Swal.fire("Token has been Expired", "Please Login Again", "warning");
            router.push("/authentication/login");
        }
    };

    useEffect(() => {
        handleGet();
        console.log(state)
    }, []);
    
    const toolbarForm = (
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
                    Sales Office
                </span>
                <div className="flex-fill input-group">
                    <select className="form-select rounded-0" name="i_field">
                        <option value="-">==SELECT==</option>
                        {cityState?.dropdownData?.map((city) => {
                            return <option value={city.id}>{city.shortName}</option>;
                        })}
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
                    ID/Name
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
                                UID
                            </th>
                            <th className="bg-blue text-white" width="25%">
                                NAME
                            </th>
                            <th className="bg-blue text-white" width="15%">
                                HP
                            </th>
                            <th className="bg-blue text-white" width="20%">
                                EMAIL
                            </th>
                            <th className="bg-blue text-white" width="5%">
                                Sales Office
                            </th>
                            <th className="bg-blue text-white" width="5%">
                                USED
                            </th>
                            <th className="bg-blue text-white" width="5%">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {state?.data?.rows?.map((data) => {
                            console.log(data)
                            return (
                                <tr>
                                    <td>{data.firstName}</td>
                                    <td>{data.lastName}</td>
                                    <td>{data.mobile}</td>
                                    <td>{data.email}</td>
                                    <td>{data.salesOffice}</td>
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
                    {totalPage > 0 &&
                        new Array(totalPage).fill().map((i, key) => {
                            const current = key + 1;
                            return (
                                <li
                                    class={`page-item ${current === state?.data?.page && "active"
                                        }`}
                                >
                                    <a
                                        class="page-link"
                                        onClick={() => handleGet(current)}
                                    >
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

    return (
        <>
            <StdForm
                id={1}
                // icon="grid_on"
                caption=""
                toolbar={toolbarForm}
                body={bodyForm}
                footer={footers}
            />
            <CreateForm
                id="createHotel"
                size="modal-xl"
                isEdit={isEdit}
                selectedData={selectedData}
                handleGet={handleGet}
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
        </>


    );
};

export default Index;
