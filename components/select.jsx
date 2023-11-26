import React, { useEffect, useRef } from "react";
import $ from 'jquery';
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js";

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
  const selectRef = useRef();

  useEffect(() => {
    // Initialize Select2 after component has mounted
    const $select = $(selectRef.current).select2();

    // Handle the Select2 change event
    $select.on("change", (e) => {
      const selectedValues = $(e.target).val();
      onChange({
        target: {
          value: selectedValues,
        },
      });
    });

    // Clean up Select2 instance when component unmounts
    return () => {
      $select.off("change"); // Remove the change event handler
      $select.select2("destroy");
    };
  }, [onChange]);

  return (
    <div className="mt-2">
      <div className={`form-label ${label !== "" ? "text-dark" : bgColor}`}>
        {label !== "" ? label : "-"}
      </div>
      <div className="input-group-sm">
        <select
          ref={selectRef}
          className={`form-select form-select-sm ${
            isInvalid ? "is-invalid" : ""
          }`}
          required={required}
          multiple={multiple}
          value={value}
        >
          <option value="-">{placeholder}</option>
          {options?.map((opt) => (
            <option
              key={target === "general" ? opt.id : opt.code}
              value={target === "general" ? opt.id : opt.code}
            >
              {opt.name || opt.shortName || opt.email || opt.code}
            </option>
          ))}
        </select>
      </div>
      {errors.map((v) => (
        <div className="form-text text-danger">{v}</div>
      ))}
    </div>
  );
}
