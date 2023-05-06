import "material-icons/iconfont/material-icons.css";

const CreateForm = (options) => {
  const { isEdit, selectedData } = options;
  return (
    <div
      className="modal fade"
      id={options.id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className={options.size + " modal-dialog"}>
        <div className="modal-content rounded-2 shadow">
          <div className="modal-header">
            <h1
              className="modal-title fs-5 text-black"
              id={options.id + "Label"}
            >
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
                  value={isEdit ? selectedData.country : 0}
                >
                  <option value="0" selected disabled>
                    Choose Country
                  </option>
                  <option value="USD" selected>
                    Indonesia
                  </option>
                  <option value="IDR" selected>
                    Singapore
                  </option>
                </select>
                <select
                  className="form-select rounded-0 mt-2"
                  name="country"
                  value={isEdit ? selectedData.country : 0}
                >
                  <option value="0" selected disabled>
                    Choose Location
                  </option>
                  <option value="USD" selected>
                    Indonesia
                  </option>
                  <option value="IDR" selected>
                    Singapore
                  </option>
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Location Code</div>
              <div className="col-sm-4">
                <input
                  className="form-control rounded-0"
                  name="code"
                  defaultValue={isEdit ? selectedData.location_code : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Location (EN)</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="location_name_en"
                  defaultValue={isEdit ? selectedData.location_name_en : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Location (CH)</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="location_name_ch"
                  defaultValue={isEdit ? selectedData.location_name_ch : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Is Used</div>
              <div className="col-sm-4">
                <select
                  className="form-select rounded-0"
                  name="is_used"
                  value={isEdit ? selectedData.is_used : null}
                >
                  <option value="-" selected disabled>
                    Choose Status
                  </option>
                  <option value="1" selected>
                    Yes
                  </option>
                  <option value="0" selected>
                    No
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger rounded-0"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary rounded-0">
              {isEdit ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
