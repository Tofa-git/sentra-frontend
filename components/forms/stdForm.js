import Link from "next/link";
import React, { useState, useEffect } from "react";
import Stylesheet from "reactjs-stylesheet";

const StdForm = ({ id, caption, icon, type, toolbar, body, footer }) => {
  return (
    <div className="d-flex flex-column h-100 stdForm" style={styles.stdForm}>
      <div className="stdFormHeader d-flex flex-shrink-1 align-items-center bg-secondary text-light p-1 px-2">
        <i className="material-icons fs-6" style={{ verticalAlign: "middle" }}>
          {icon}
        </i>
        <span className="small ms-2">{caption}</span>
      </div>
      <div className="stdFormHeader flex-shrink-1">{toolbar}</div>
      <div className="stdFormBody flex-fill bg-white p-2">{body}</div>
      <div
        className="stdFormHeader flex-shrink-1 bg-light text-primary small p-1 px-2"
        style={styles.stdFormHeader}
      >
        {footer}
      </div>
    </div>
  );
};

export default StdForm;

const styles = Stylesheet.create({
  stdForm: {},
  stdFormHeader: {
    borderTop: "1px solid #dddddd",
  },
});
