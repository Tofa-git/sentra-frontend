import "material-icons/iconfont/material-icons.css";

const CreateForm = (options) => {
  const { isEdit, selectedData } = options;
  const dummyCheckData = [
    { id: 1, name: "Albania" },
    { id: 2, name: "Andora" },
    { id: 3, name: "Antigua" },
    { id: 4, name: "Argentina" },
    { id: 1, name: "Amenia" },
    { id: 2, name: "Aruba" },
  ];
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
              {isEdit ? "Edit" : "Add"} City
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
              <div className="col-sm-4 text-black">Region Code</div>
              <div className="col-sm-4">
                <input
                  className="form-control rounded-0"
                  name="code"
                  defaultValue={isEdit ? selectedData.code : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Name</div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control rounded-0"
                  name="region_name"
                  defaultValue={isEdit ? selectedData.region_name : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Rank</div>
              <div className="col-sm-4">
                <input
                  type="number"
                  className="form-control rounded-0"
                  name="rank"
                  defaultValue={isEdit ? selectedData.rank : null}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-4 text-black">Check Region</div>
              <div className="col-sm-3">
                <input type="checkbox" />
                <label className="text-black ms-2">All Check</label>
              </div>
            </div>
            <div className="row mt-2">
              {dummyCheckData.map((i) => {
                return (
                  <div className="col-sm-3">
                    <input type="checkbox" />
                    <label className="text-black ms-2">{i.name}</label>
                  </div>
                );
              })}
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
