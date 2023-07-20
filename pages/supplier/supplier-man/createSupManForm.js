import { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { CityContext } from "../../../context/city/reducer";
import { CityLocationContext } from "../../../context/cityLocation/reducer";
import { CurrencyContext } from "../../../context/currency/reducer";
import { CountryContext } from "../../../context/country/reducer";
import {
  createHotel,
  updateHotel,
} from "../../../context/hotel/actions";
import Swal from "sweetalert2";

// const Map = dynamic(() => import("../../components/map/index"), { ssr: false });

const initForm = {
  username: "",
  name: "",
  phone: "",
  password: "",
  mobile: "",
  email: "",
  status: 1,
};

const statusData = [
  { id: "1", name: "Yes" },
  { id: "0", name: "No" },
];

const categoryData = [
  { id: "Overseas Supplier", name: "Overseas Supplier" },
  { id: "Local Supplier", name: "Local Supplier" },
];

const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const [form, setForm] = useState(initForm);
  const { state: countryState } = useContext(CountryContext);
  const { state: cityState } = useContext(CityContext);
  const { state: cityLocationState } = useContext(CityLocationContext);
  const { state: currencyState } = useContext(CurrencyContext);


  useEffect(() => {    
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredField = [
      "username",
      "phone",
      "name",
      "password",
      "mobile",
      "phone",
      "email",
      "status"
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
      await updateHotel(selectedData.id, form);
    } else {
      await createHotel(form);
    }

    await props.handleGet();
    document.getElementById("cancelModal").click();
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
              {isEdit ? "Edit" : "Add"} Supplier Manager Information
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
              <div className="col-6">
                <Input
                  label={"User ID"}
                  value={form.code}
                  onChange={(val) =>
                    handleInputChange("code", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Select
                  label={"Name"}
                  options={categoryData}
                  value={form.status}
                  onChange={(val) =>
                    handleInputChange("status", val.target.value)
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
                  label={"Phone"}
                  value={form.name}
                  onChange={(val) =>
                    handleInputChange("name", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Mobile"}
                  value={form.password}
                  onChange={(val) =>
                    handleInputChange("password", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Email"}
                  value={form.name}
                  onChange={(val) =>
                    handleInputChange("name", val.target.value)
                  }
                />
              </div>                                                       
              <div className="col-4">
                <Select
                  label={"Used"}
                  options={statusData}
                  value={form.status}
                  onChange={(val) =>
                    handleInputChange("status", val.target.value)
                  }
                />
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
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
