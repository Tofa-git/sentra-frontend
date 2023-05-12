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
              {isEdit ? "Edit" : "Add"} Screen
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
              <div className="col-sm-4 text-black">Screen</div>
              <div className="col-sm-8">
                <select className="form-select rounded-0" name="currency">
                  <option value="0" selected disabled>
                    == select screen ==
                  </option>
                </select>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Title (EN)</div>
              <div className="col-sm-8">
                <input className="form-control rounded-0" name="code" />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Title (CH)</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="country_name_ch"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">TItle (XX)</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="country_name_ch"
                />
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
