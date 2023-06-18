import React from "react";

export default function Select({
  multiple = false,
  label = "",
  isInvalid = false,
  required = true,
  errors = [],
  bgColor = "text-light",
  options = [],
  onChange = () => {},
  value = null,
}) {
  return (
    <div className="mt-2">
      <div className={`form-label ${label !== "" ? "text-dark" : bgColor}`}>
        {label !== "" ? label : "-"}
      </div>
      <div className="input-group-sm">
        <select
          class={`form-select form-select-sm ${isInvalid ? "is-invalid" : ""}`}
          required={required}
          multiple={multiple}
          onChange={onChange}
          value={value}
        >
          <option value="-">Choose Country</option>
          {options?.map((opt) => {
            return <option value={opt.id}>{opt.name || opt.shortName}</option>;
          })}
        </select>
      </div>
      {errors.map((v) => (
        <div className="form-text text-danger">{v}</div>
      ))}
    </div>
  );
}
