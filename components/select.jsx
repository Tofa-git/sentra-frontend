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
  placeholder = "Select Data",
  target = "general",
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
          <option value="-">{placeholder}</option>
          {options?.map((opt) => {
            return (
              <option value={target === "general" ? opt.id : opt.code}>
                {opt.name || opt.shortName || opt.email || opt.code}
              </option>
            );
          })}
        </select>
      </div>
      {errors.map((v) => (
        <div className="form-text text-danger">{v}</div>
      ))}
    </div>
  );
}
