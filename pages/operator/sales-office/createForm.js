import { useContext, useEffect, useState } from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";
import { CityContext } from "../../../context/city/reducer";
import { CityLocationContext } from "../../../context/cityLocation/reducer";
import { CountryContext } from "../../../context/country/reducer";
import {
  createHotel,
  updateHotel,
} from "../../../context/hotel/actions";
import Swal from "sweetalert2";

// const Map = dynamic(() => import("../../components/map/index"), { ssr: false });

const initForm = {
  salesOffice: "",
  name: "",
  code: "",
  manager: "",
  fileIds: [],
};

const statusData = [
  { id: "1", name: "Yes" },
  { id: "0", name: "No" },
];

const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const [form, setForm] = useState(initForm);
  const { state: countryState } = useContext(CountryContext);
  const { state: cityState } = useContext(CityContext);
  const { state: cityLocationState } = useContext(CityLocationContext);
  

  useEffect(() => {
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const requiredField = [
        "FileIds",
        "code",
        "name",
        "manager",
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
  
    // const requiredField = ["name", "code", "latitude", "longitude"];
    // const hasError = requiredField.filter(
    //   (i) => form[i] === 0 || form[i]?.length === 0
    // );
    // if (hasError.length > 0) {
    //   return Swal.fire(
    //     "Validate",
    //     `Field ${hasError.join(", ").toLocaleUpperCase()} can't empty or 0`,
    //     "warning"
    //   );
    // }

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
              {isEdit ? "Edit" : "Add"} Sales Office Management
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
            <p className="text-blue fs-5 fw-bold border-bottom">
              Basic Section
            </p>
            <div className="row mt-2">
             <div className="col-6">
                <Input
                  label={"Sales Office ID"}
                  value={form.code}
                  onChange={(val) =>
                    handleInputChange("code", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Sales Office Name"}
                  value={form.name}
                  onChange={(val) =>
                    handleInputChange("name", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Sales Office Manager"}
                  value={form.manager}
                  onChange={(val) =>
                    handleInputChange("manager", val.target.value)
                  }
                />
              </div>

              <div className="col-3">
                <Select
                  label={"USED"}
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
