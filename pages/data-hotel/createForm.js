import Input from "../../components/input";
import Select from "../../components/select";

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
              {isEdit ? "Edit" : "Add"} Hotel
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-3">
            <p className="text-blue fs-5 fw-bold border-bottom">
              Basic Section
            </p>
            <div className="row mt-2">
              <div className="col-6">
                <Input label={"Hotel Name"} />
              </div>
              <div className="col-6">
                <Input label={"Hotel Code"} />
              </div>
              <div className="col-6">
                <Select label={"Country"} />
              </div>
              <div className="col-6">
                <Select label={"City"} />
              </div>
              <div className="col-6">
                <Input label={"Phone"} />
              </div>
              <div className="col-6">
                <Input label={"Fax"} />
              </div>
              <div className="col-6">
                <Input label={"Address 1"} />
              </div>
              <div className="col-6">
                <Input label={"Address 2"} />
              </div>
              <div className="col-6">
                <Input label={"Address 3"} />
              </div>
              <div className="col-6">
                <Input label={"Address 4"} />
              </div>
              <div className="col-6">
                <Input label={"Zip Code"} />
              </div>
              <div className="col-6" />
              <div className="col-4">
                <Input label={"Email"} />
              </div>
              <div className="col-4">
                <Input label={"Rq to email"} />
              </div>
              <div className="col-4">
                <Input label={"CC Email"} />
              </div>
              <div className="col-4">
                <Input label={"Homepage"} />
              </div>
              <div className="col-4">
                <Select label={"Star"} />
              </div>
              <div className="col-4">
                <Input label={"Room"} />
              </div>
              <div className="col-3">
                <Select label={"Location in City"} />
              </div>
              <div className="col-3">
                <Input label={"Latitude"} />
              </div>
              <div className="col-3">
                <Input label={"Longitude"} />
              </div>
              <div className="col-3 d-flex align-items-end">
                <button className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm">
                  <span className="ms-2">Open Google Map</span>
                </button>
              </div>
              <div className="col-3">
                <Input label={"Rank"} />
              </div>
              <div className="col-9" />
              <div className="col-12">
                <div className="row mt-2">
                  <div className="col-4">
                    <span className="d-flex flex-row align-items-center">
                      <span className="text-dark">Event</span>
                      <button className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 align-items-center shadow-sm">
                        <span className="ms-2">Remark History</span>
                      </button>
                    </span>
                  </div>
                  <div className="col-8" />
                  <div className="col-8 mt-2 d-flex flex-row align-items-center">
                    <input type="checkbox" />
                    <span className="text-dark ms-2 w-25">Hot Deal</span>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="col-8 mt-2 d-flex flex-row align-items-center">
                    <input type="checkbox" />
                    <span className="text-dark ms-2 w-25">Recommended</span>
                    <input className="form-control" type="text" />
                  </div>
                </div>
              </div>
              <div className="col-12 mt-2">
                <span className="text-dark">Event (EN)</span>
                <textarea className="form-control" />
              </div>
              <div className="col-12 mt-2">
                <span className="text-dark">Youtube Link</span>
                <textarea className="form-control" />
                <span className="text-secondary">
                  display video clip add part of sauce :
                  https://www.youtube.com/embed/T4NueeuPL-Y this part only
                </span>
              </div>
              <div className="col-12">
                <Input label={"Manager"} />
              </div>
              <div className="col-12 mt-2">
                <span className="text-dark">Internal Remark</span>
                <textarea className="form-control" />
              </div>
              <div className="col-12 d-flex flex-row align-items-end">
                <Select label={"Supplier"} />
                <button className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 h-50 d-flex flex-row align-items-center shadow-sm">
                  <span>+</span>
                </button>
                <button className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 h-50 d-flex flex-row align-items-center shadow-sm">
                  <span>-</span>
                </button>
                <input className="form-control ms-2" />
              </div>
              <div className="col-12 mt-2 mb-2">
                <Select label={"Cxl Policy"} />
              </div>
              <div className="col-3">
                <span className="text-dark w-25">Pre Payment</span>
                <input className="ms-2" type="checkbox" />
              </div>
              <div className="col-3">
                <span className="text-dark w-25">Non XML</span>
                <input className="ms-2" type="checkbox" />
              </div>
              <div className="col-3">
                <span className="text-dark w-25">Non Tarif</span>
                <input className="ms-2" type="checkbox" />
              </div>
              <div className="col-3">
                <span className="text-dark w-25">Is Used</span>
                <input className="ms-2" type="checkbox" />
              </div>
              <div className="col-12 mt-2 mb-2">
                <Input label={"Last Update"} />
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
