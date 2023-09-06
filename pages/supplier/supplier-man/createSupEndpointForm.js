import { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import CryptoUtils from "../../../components/encrypt/index";
import {
    createSuppEndPoint,
    updateSuppEndPoint,
} from "../../../context/supplier/actions";
import Swal from "sweetalert2";
import { getDDLSupp } from "../../../context/supplier/actions";
import { SupplierContext } from "../../../context/supplier/reducer";

const initForm = {
    id: "",
    supplierId: "",
    name: "",
    endpoint: "",
    method: "",
    code: "",
    user: "",
    url: "",
    password: "",
    body: "",
    status: 1,
};

const namesData = [
    {
        id: "City",
        name: "City"
    },
    {
        id: "Country",
        name: "Country"
    },
    {
        id: "Hotel",
        name: "Hotel"
    },
    {
        id: "Bed",
        name: "Bed Type"
    },
    {
        id: "Meal",
        name: "Meal Type"
    },
    {
        id: "Breakfast",
        name: "Breakfast"
    },
    {
        id: "Search",
        name: "Search"
    },
    {
        id: "Confirm",
        name: "Confirm"
    },
    {
        id: "Book",
        name: "Book"
    }
];

const methodData = [
    {
        id: "GET",
        name: "Get"
    },
    {
        id: "POST",
        name: "Post"
    },
    {
        id: "PUT",
        name: "Put"
    },
    {
        id: "DELETE",
        name: "Delete"
    },
];

const statusData = [
    {
        id: "1",
        name: "Yes"
    },
    {
        id: "0",
        name: "No"
    },
]

const SchemaForm = (props) => {
    const { isEdit, selectedData } = props;
    const [form, setForm] = useState(initForm);
    const [schemaText, setSchemaText] = useState("");
    const [savedSchema, setSavedSchema] = useState(null);
    const { state: supplierDDLState, dispatch: supplierDDLDispatch } = useContext(SupplierContext);

    useEffect(() => {
        handleDropDown();
        setForm(isEdit ? selectedData : initForm);

        if (isEdit) {
            setForm((prevForm) => ({
                ...prevForm,
                endpoint: selectedData.endpoint == null ? "" : CryptoUtils.decryptData(selectedData.endpoint),
                body: selectedData.body == null ? "" : CryptoUtils.decryptData(selectedData.body),
                user: selectedData.user == null ? "" : CryptoUtils.decryptData(selectedData.user),
                password: selectedData.password == null ? "" : CryptoUtils.decryptData(selectedData.password),
                code: selectedData.code == null ? "" : CryptoUtils.decryptData(selectedData.code ?? ""),
                url: selectedData.url == null ? "" : CryptoUtils.decryptData(selectedData.url ?? ""),
            }));
            // console.log(CryptoUtils.decryptData(selectedData.url))
        }

    }, [selectedData, isEdit]);

    const handleSchemaChange = (event) => {
        setSchemaText(event.target.value);
    };

    const handleInputChange = (name, value) => {
        setForm({ ...form, [name]: value });
    };

    const handleDropDown = async () => {
        const ddl = await getDDLSupp(supplierDDLDispatch, true);
        if (ddl.status === 401) {
            authDispatch({ type: AUTH_401 });
            authDispatch({ type: AUTH_LOGOUT });
            Swal.fire("Token has been Expired", "Please Login Again", "warning");
            router.push("/authentication/login");
        }
    };

    const handleSubmit = async () => {
        const requiredField = [
            "supplierId",
            "name",
            "endpoint",
            "method",
            "user",
            "password",
            "body"
        ];
        const hasError = requiredField.filter(
            (i) => form[i] === 0 || form[i]?.length === 0
        );
        if (hasError.length > 0) {
            return Swal.fire(
                "Validate",
                `Field ${hasError.join(", ").toLocaleUpperCase()} can't empty or 0`,
                "warning"
            );
        }

        if (isEdit) {
            console.log(form)
            await updateSuppEndPoint(selectedData.id, form);            
        } else {
            await createSuppEndPoint(form);
        }                
    };

    const handleCancel = () => {
        setForm(initForm);
    };

    return (
        <div
            className="modal fade"
            id={props.id}
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className={props.size + " modal-dialog"}>
                <div className="modal-content rounded-2 shadow">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5 text-black" id={props.id + "Label"}>
                            {isEdit ? "Edit" : "Add"} Supplier EndPoint Management
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={() => handleCancel()}
                        />
                    </div>
                    <div className="modal-body p-3">
                        <div className="row mt-2">
                            {isEdit ? <div></div>
                                :
                                <div className="col-6">
                                    <Select
                                        options={supplierDDLState?.dropdownData}
                                        label="Supplier"
                                        value={form.supplierId}
                                        onChange={(val) =>
                                            handleInputChange("supplierId", val.target.value)
                                        }
                                    />
                                </div>
                            }

                            <div className="col-6">
                                {/* <Input
                                    label={"Name"}
                                    value={form.name}
                                    onChange={(val) =>
                                        handleInputChange("name", val.target.value)
                                    }
                                /> */}
                                <Select
                                    options={namesData}
                                    label="Name"
                                    value={form.name}
                                    onChange={(val) =>
                                        handleInputChange("name", val.target.value)
                                    }
                                />
                            </div>
                            <div className="col-6">
                                <Select
                                    options={methodData}
                                    label="Method"
                                    value={form.method}
                                    onChange={(val) =>
                                        handleInputChange("method", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-6">
                                <Input
                                    label={"Endpoint Url (Leave it blank if the url is same as api url)"}
                                    value={form.url}
                                    onChange={(val) =>
                                        handleInputChange("url", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-6">
                                <Input
                                    label={"Endpoint"}
                                    value={form.endpoint}
                                    onChange={(val) =>
                                        handleInputChange("endpoint", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-6">
                                <Input
                                    label={"User"}
                                    value={form.user}
                                    onChange={(val) =>
                                        handleInputChange("user", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-6">
                                <Input
                                    label={"Password"}
                                    value={form.password}
                                    onChange={(val) =>
                                        handleInputChange("password", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-6">
                                <Input
                                    label={"Code"}
                                    value={form.code}
                                    onChange={(val) =>
                                        handleInputChange("code", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-6">
                                <Select
                                    label={"Is Used"}
                                    value={form.status}
                                    options={statusData}
                                    onChange={(val) =>
                                        handleInputChange("status", val.target.value)
                                    }
                                />
                            </div>

                            <div className="col-12">
                                <div className="mt-2">
                                    <div className={`form-label`}>
                                        Body
                                    </div>
                                    <div className="input-group-sm">
                                        <textarea
                                            rows="10"
                                            className="w-100"
                                            value={form.body}
                                            onChange={(val) =>
                                                handleInputChange("body", val.target.value)
                                            }
                                            placeholder="Input the body of the API, need to put bracket or array if exist `[]` / `{}`"
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger rounded-0"
                            data-bs-dismiss="modal"
                            id="cancelModal"
                            onClick={() => handleCancel()}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                handleSubmit();
                            }}
                            type="button"
                            className="btn btn-primary rounded-0"
                        >
                            {isEdit ? "Edit" : "Add"}
                        </button>
                    </div>
                    {/* <div>
                        <pre>{JSON.stringify(schemaText, null, 2)}</pre>
                    </div> */}
                </div>
            </div>
        </div>

    );
};

export default SchemaForm;