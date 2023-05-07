import "material-icons/iconfont/material-icons.css";

const CutoffDay = () => {
  return (
    <div className="row">
      <div className="col-sm-4">
        <div className="row mt-2">
          <div class="input-group mb-3">
            <span class="input-group-text">Cut off day</span>
            <input type="text" class="form-control" />
            <span class="input-group-text">days</span>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="row mt-2 align-items-center">
          <span class="text-black col-2">Time</span>
          <select className="form-select rounded-0 col" name="time">
            <option value="0" selected disabled>
              Time
            </option>
            <option value="USD" selected>
              00.00
            </option>
            <option value="IDR" selected>
              00.01
            </option>
          </select>
          <select className="form-select rounded-0 col" name="type">
            <option value="-" selected disabled>
              Type
            </option>
            <option value="0" selected>
              Night Charge
            </option>
            <option value="1" selected>
              Percent Per Night
            </option>
            <option value="1" selected>
              Percent Per Full Charge
            </option>
            <option value="1" selected>
              Fix Amount
            </option>
          </select>
        </div>
      </div>
      <div className="col-sm-2 align-self-center mb-2">
        <input type="text" className="form-control rounded-0" name="day" />
      </div>
    </div>
  );
};

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
              {isEdit ? "Edit" : "Add"} CXL Policy
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
                  defaultValue={isEdit ? selectedData.code : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Remark</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="remark"
                  defaultValue={isEdit ? selectedData.remark : null}
                />
              </div>
            </div>
            <div className="text-black mt-4">
              From Last Cancel Deadline To Check in date
            </div>
            {CutoffDay()}
            {CutoffDay()}
            {CutoffDay()}
            {CutoffDay()}
            <div className="row mt-2 align-items-center">
              <div className="col-sm-2 text-black">No Show</div>
              <div className="col-sm-4">
                <select className="form-select rounded-0" name="type">
                  <option value="-" selected disabled>
                    Type
                  </option>
                  <option value="0" selected>
                    Night Charge
                  </option>
                  <option value="1" selected>
                    Percent Per Night
                  </option>
                  <option value="1" selected>
                    Percent Per Full Charge
                  </option>
                  <option value="1" selected>
                    Fix Amount
                  </option>
                </select>
              </div>
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="remark"
                  defaultValue={isEdit ? selectedData.remark : null}
                />
              </div>
              <div className="col-sm-3 text-black">(From Check in date)</div>
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
