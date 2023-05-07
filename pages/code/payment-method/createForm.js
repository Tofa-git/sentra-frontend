import "material-icons/iconfont/material-icons.css";

const CreateForm = (options) => {
  const { isEdit, selectedData, mode } = options;
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
              {isEdit ? "Edit" : "Add"} Payment
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
              <div className="col-sm-4 text-black">
                {mode === 2 && "Card "}Name
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="payment_name"
                  defaultValue={isEdit ? selectedData.payment_name : null}
                />
              </div>
            </div>
            {mode === 2 && (
              <>
                <div className="row mt-2">
                  <div className="col-sm-4 text-black">Card Number</div>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      name="Payment_name_ch"
                      defaultValue={
                        isEdit ? selectedData.payment_name_ch : null
                      }
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-4 text-black">Expired Date</div>
                  <div className="col-sm-4">
                    <select className="form-select rounded-0" name="date">
                      <option value="-" selected disabled>
                        Date
                      </option>
                      <option value="1" selected>
                        1
                      </option>
                      <option value="2" selected>
                        2
                      </option>
                    </select>
                  </div>
                  <div className="col-sm-4">
                    <select className="form-select rounded-0" name="year">
                      <option value="-" selected disabled>
                        Year
                      </option>
                      <option value="1" selected>
                        2024
                      </option>
                      <option value="2" selected>
                        2023
                      </option>
                    </select>
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="col-sm-4 text-black">Card Holder</div>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control rounded-0"
                      name="Payment_name_ch"
                      defaultValue={
                        isEdit ? selectedData.payment_name_ch : null
                      }
                    />
                  </div>
                </div>
              </>
            )}
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
