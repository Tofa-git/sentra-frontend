import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createCityLocation,
  updateCityLocation,
} from "../../../context/cityLocation/actions";
import { CountryContext } from "../../../context/country/reducer";
import { CityContext } from "../../../context/city/reducer";

const initForm = {
  code: "",
  name: "",
  cityId: 0,
  status: "",
};

const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const [form, setForm] = useState(initForm);
  const { state: countryState } = useContext(CountryContext);
  const { state: cityState } = useContext(CityContext);

  useEffect(() => {
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredField = ["code", "name", "cityId", "status"];
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
      await updateCityLocation(selectedData.id, form);
    } else {
      await createCityLocation(form);
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
              {isEdit ? "Edit" : "Add"} Location
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
              <div className="col-sm-8">
                <select
                  className="form-select rounded-0"
                  name="country"
                  // value={isEdit ? selectedData.country : 0}
                >
                  <option value="0">Choose Country</option>
                  {countryState?.dropdownData?.map((country) => {
                    return <option value={country.id}>{country.name}</option>;
                  })}
                </select>
                <select
                  className="form-select rounded-0 mt-2"
                  name="cityId"
                  value={form.cityId}
                  onChange={(val) =>
                    handleInputChange("cityId", val.target.value)
                  }
                >
                  <option value="0">Choose Location</option>
                  {cityState?.dropdownData?.map((city) => {
                    return <option value={city.id}>{city.shortName}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Location Code</div>
              <div className="col-sm-4">
                <input
                  className="form-control rounded-0"
                  value={form.code}
                  onChange={(val) =>
                    handleInputChange("code", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Name</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  value={form.name}
                  onChange={(val) =>
                    handleInputChange("name", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Is Used</div>
              <div className="col-sm-4">
                <select
                  className="form-select rounded-0"
                  value={form.status}
                  onChange={(val) =>
                    handleInputChange("status", val.target.value)
                  }
                >
                  <option value="-">Choose Status</option>
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
