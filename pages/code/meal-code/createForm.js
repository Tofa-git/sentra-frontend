import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  createBreakfast,
  updateBreakfast,
} from "../../../context/breakfast/actions";

const initForm = {
  code: "",
  name: "",
};
const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const [form, setForm] = useState(initForm);

  useEffect(() => {
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredField = ["code", "name"];
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
      await updateBreakfast(form.id, form);
    } else {
      await createBreakfast(form);
    }

    await props.handleGet();
    setForm(initForm);
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
              {isEdit ? "Edit" : "Add"} Breakfast
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
              <div className="col-sm-4 text-black">Breakfast Name</div>
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
              onClick={() => handleSubmit()}
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
