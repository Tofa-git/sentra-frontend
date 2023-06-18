import { useContext, useEffect, useState } from "react";
import Input from "../../components/input";
import Select from "../../components/select";
import { CityContext } from "../../context/city/reducer";
import { CityLocationContext } from "../../context/cityLocation/reducer";
import { CountryContext } from "../../context/country/reducer";
import {
  createHotel,
  updateHotel,
  uploadFile,
} from "../../context/hotel/actions";
import Map from "../../components/map";
import Swal from "sweetalert2";

// const Map = dynamic(() => import("../../components/map/index"), { ssr: false });

const initForm = {
  countryCode: "",
  cityCode: "",
  locationCode: "",
  name: "",
  code: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  zipCode: "",
  latitude: "",
  longitude: "",
  checkInTime: "",
  checkOutTime: "",
  star: "",
  totalRoom: "",
  status: "1",
  fileIds: [],
};

const statusData = [
  { id: "1", name: "Yes" },
  { id: "0", name: "No" },
];

const initImage = {
  image1: null,
  image2: null,
  image3: null,
  image4: null,
};

const CreateForm = (props) => {
  const { isEdit, selectedData } = props;
  const [form, setForm] = useState(initForm);
  const { state: countryState } = useContext(CountryContext);
  const { state: cityState } = useContext(CityContext);
  const { state: cityLocationState } = useContext(CityLocationContext);

  const [images, setImages] = useState(initImage);

  useEffect(() => {
    setForm(isEdit ? selectedData : initForm);
  }, [selectedData, isEdit]);

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
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
      let fileIds = [];
      const uploadedImage = Object.values(images).filter((i) => i !== null);
      if (uploadedImage.length > 0) {
        const formData = new FormData();
        Object.values(uploadedImage).map((i) => formData.append("image", i));
        const files = await uploadFile(formData);
        console.log({ files });
      }
      // await createHotel(form);
    }

    await props.handleGet();
    document.getElementById("cancelModal").click();
  };

  const handleDeleteImage = (key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setImages({ ...images, [key]: null });
      }
    });
  };

  const handleCancel = () => {
    setForm(initForm);
    setImages(initImage);
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
              {isEdit ? "Edit" : "Add"} Hotel
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
                  label={"Hotel Name"}
                  value={form.name}
                  onChange={(val) =>
                    handleInputChange("name", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Hotel Code"}
                  value={form.code}
                  onChange={(val) =>
                    handleInputChange("code", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Select
                  label={"Country"}
                  value={form.countryCode}
                  options={countryState?.dropdownData}
                  onChange={(val) =>
                    handleInputChange("countryCode", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Select
                  label={"City"}
                  options={cityState?.dropdownData}
                  value={form.cityCode}
                  onChange={(val) =>
                    handleInputChange("cityCode", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Phone"}
                  value={form.phone}
                  onChange={(val) =>
                    handleInputChange("phone", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Address"}
                  value={form.address}
                  onChange={(val) =>
                    handleInputChange("address", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Zip Code"}
                  value={form.zipCode}
                  onChange={(val) =>
                    handleInputChange("zipCode", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Email"}
                  value={form.email}
                  onChange={(val) =>
                    handleInputChange("email", val.target.value)
                  }
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Check In Time"}
                  value={form.checkInTime}
                  onChange={(val) =>
                    handleInputChange("checkInTime", val.target.value)
                  }
                  type="time"
                />
              </div>
              <div className="col-6">
                <Input
                  label={"Check Out Time"}
                  value={form.checkOutTime}
                  onChange={(val) =>
                    handleInputChange("checkOutTime", val.target.value)
                  }
                  type="time"
                />
              </div>
              <div className="col-3">
                <Input
                  label={"Homepage"}
                  value={form.website}
                  onChange={(val) =>
                    handleInputChange("website", val.target.value)
                  }
                />
              </div>
              <div className="col-3">
                <Input
                  label={"Star"}
                  value={form.star}
                  onChange={(val) =>
                    handleInputChange("star", val.target.value)
                  }
                />
              </div>
              <div className="col-3">
                <Input
                  label={"Room"}
                  value={form.totalRoom}
                  onChange={(val) =>
                    handleInputChange("totalRoom", val.target.value)
                  }
                />
              </div>
              <div className="col-3">
                <Select
                  label={"Status"}
                  options={statusData}
                  value={form.status}
                  onChange={(val) =>
                    handleInputChange("status", val.target.value)
                  }
                />
              </div>
              <div className="col-3">
                <Select
                  label={"Location in City"}
                  options={cityLocationState?.dropdownData}
                  value={form.locationCode}
                  onChange={(val) =>
                    handleInputChange("locationCode", val.target.value)
                  }
                />
              </div>
              <div className="col-3">
                <Input
                  label={"Latitude"}
                  value={form.latitude}
                  onChange={(val) =>
                    handleInputChange("latitude", val.target.value)
                  }
                />
              </div>
              <div className="col-3">
                <Input
                  label={"Longitude"}
                  value={form.longitude}
                  onChange={(val) =>
                    handleInputChange("longitude", val.target.value)
                  }
                />
              </div>
              <div className="col-3 d-flex align-items-end">
                <button className="btn btn-sm btn-primary bg-blue ms-2 rounded-0 d-flex flex-row align-items-center shadow-sm">
                  <span className="ms-2">Open Google Map</span>
                </button>
              </div>
              <div className="col-12 mt-2">
                <Map height={"300px"} />
              </div>
              <div className="row">
                <div className="form-label text-dark mt-4">Hotel Images</div>
                {Object.keys(images).map((i, index) => {
                  if (images[i] !== null) {
                    return (
                      <div className="col-3 mt-2 d-flex flex-column align-items-center">
                        <img
                          key={index}
                          src={images[i]}
                          alt={`Uploaded ${index + 1}`}
                          className="image-hotel"
                        />
                        <span
                          onClick={() => handleDeleteImage(i)}
                          className="text-dark delete-image"
                        >
                          Hapus Gambar
                        </span>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="col-3 mt-2">
                        <label for="images" class="drop-container">
                          <span class="drop-title">
                            Hotel Image {index + 1}
                          </span>
                          <input
                            type="file"
                            id="images"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];

                              if (file) {
                                const reader = new FileReader();

                                reader.onloadend = () => {
                                  const base64String = reader.result;
                                  setImages({ ...images, [i]: base64String });
                                };

                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    );
                  }
                })}
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
