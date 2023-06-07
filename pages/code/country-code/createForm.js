import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { createCountry, updateCountry } from "../../../context/country/actions";
import { CountryContext } from "../../../context/country/reducer";

const initForm = {
  isoId: "",
  iso3: "",
  sequence: 0,
  name: "",
  dial: "",
  basicCurrency: "IDR",
  descCurrency: "Rupiah",
  status: 1,
};

const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const [form, setForm] = useState(initForm);
  const { state } = useContext(CountryContext);

  useEffect(() => {
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredField = [
      "isoId",
      "iso3",
      "name",
      "basicCurrency",
      "descCurrency",
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
      await updateCountry(selectedData.id, form);
    } else {
      await createCountry(form);
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
              {isEdit ? "Edit" : "Add"} Country
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
              <div className="col-sm-4 text-black">ISO ID</div>
              <div className="col-sm-4">
                <input
                  className="form-control rounded-0"
                  required
                  value={form.isoId}
                  onChange={(val) =>
                    handleInputChange("isoId", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">ISO 3</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="iso3"
                  required
                  value={form.iso3}
                  onChange={(val) =>
                    handleInputChange("iso3", val.target.value)
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
                  name="name"
                  required
                  value={form.name}
                  onChange={(val) =>
                    handleInputChange("name", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Basic Currency</div>
              <div className="col-sm-5">
                <select
                  className="form-select rounded-0"
                  name="currency"
                  value={form.basicCurrency}
                  onChange={(val) =>
                    handleInputChange("basicCurrency", val.target.value)
                  }
                  defaultValue="0"
                >
                  <option value="0">Choose Currency</option>
                  {state?.currencyData.map((i, key) => (
                    <option key={key} value={i.basicCurrency}>
                      {i.basicCurrency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Desc Currency</div>
              <div className="col-sm-5">
                <select
                  className="form-select rounded-0"
                  name="descCurrency"
                  value={form.descCurrency}
                  onChange={(val) =>
                    handleInputChange("descCurrency", val.target.value)
                  }
                >
                  <option value="0">Choose Currency</option>
                  {state?.currencyData.map((i, key) => (
                    <option key={key} value={i.descCurrency || i.basicCurrency}>
                      {i.descCurrency || i.basicCurrency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Dial</div>
              <div className="col-sm-4">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="dial"
                  value={form.dial}
                  onChange={(val) =>
                    handleInputChange("dial", val.target.value)
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
                    handleInputChange("sequence", val.target.value)
                  }
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Status</div>
              <div className="col-sm-4">
                <select
                  className="form-select rounded-0"
                  name="status"
                  value={form.status}
                  onChange={(val) =>
                    handleInputChange("status", val.target.value)
                  }
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
