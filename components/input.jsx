import React from "react";
import Datetime from "react-datetime";

export default function Input({
  type = "text",
  label = "",
  isInvalid = false,
  required = true,
  errors = [],
  bgColor = "text-light",
  onChange = () => {},
  value = null,
  multiple = false,
  disabled = false,
}) {
  return (
    <div className="mt-2">
      <div className={`form-label ${label !== "" ? "text-dark" : bgColor}`}>
        {label !== "" ? label : "-"}
      </div>
      <div className="input-group-sm">
        {type === "date" ? (
          <Datetime
            dateFormat="YYYY-MM-DD"
            timeFormat={false}
            onChange={(val) => onChange(val.format("YYYY-MM-DD"))}
            value={value}
          />
        ) : type === "checkbox" ? (
          <input
            type="checkbox"
            className={`form-check-input ${isInvalid ? "is-invalid" : ""}`}
            required={required}
            onChange={onChange}
            checked={value}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            className={`form-control ${isInvalid ? "is-invalid" : ""}`}
            required={required}
            onChange={onChange}
            value={value}
            multiple={multiple}
            disabled={disabled}
          />
        )}
      </div>
      {errors.map((v, i) => (
        <div key={i} className="form-text text-danger">
          {v}
        </div>
      ))}
    </div>
  );
}
