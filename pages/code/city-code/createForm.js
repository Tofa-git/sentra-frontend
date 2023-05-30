import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createCity, updateCity } from "../../../context/city/actions";
import { CountryContext } from "../../../context/country/reducer";

const initForm = {
  countryId: 0,
  sequence: 1,
  code: "",
  longName: "",
  shortName: "",
  latitude: "",
  longitude: "",
  status: "1",
};

const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const { state: countryState } = useContext(CountryContext);
  const [form, setForm] = useState(initForm);

  useEffect(() => {
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredField = ["countryId", "code", "longName", "shortName"];
    console.log(form);
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
      await updateCity(form.id, form);
    } else {
      await createCity(form);
    }

    await props.handleGet();
    document.getElementById("cancelModal").click();
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
              {isEdit ? "Edit" : "City"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-3">
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Country</div>
              <div className="col-sm-5">
                <select
                  className="form-select rounded-0"
                  name="countryId"
                  value={form.countryId}
                  onChange={(val) =>
                    handleInputChange("countryId", val.target.value)
                  }
                >
                  <option value="0" disabled>
                    Choose Country
                  </option>
                  {countryState?.dropdownData?.map((country) => {
                    return <option value={country.id}>{country.name}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Code</div>
              <div className="col-sm-4">
                <input
                  className="form-control rounded-0"
                  name="code"
                  value={form.code}
                  onChange={(val) =>
                    handleInputChange("code", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Long Name</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="longName"
                  value={form.longName}
                  onChange={(val) =>
                    handleInputChange("longName", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Short Name</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="shortName"
                  value={form.shortName}
                  onChange={(val) =>
                    handleInputChange("shortName", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Latitude</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="latitude"
                  onChange={(val) =>
                    handleInputChange("latitude", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Longitude</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="longitude"
                  onChange={(val) =>
                    handleInputChange("longitude", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Sequence</div>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control rounded-0"
                  name="sequence"
                  value={form.sequence}
                  onChange={(val) =>
                    handleInputChange("code", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Is Used</div>
              <div className="col-sm-4">
                <select
                  className="form-select rounded-0"
                  name="is_used"
                  value={form.status}
                >
                  <option value="-" disabled>
                    Choose Status
                  </option>
                  <option value="1">Yes</option>
                  <option value="0">No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger rounded-0"
              data-bs-dismiss="modal"
              id="cancelModal"
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
