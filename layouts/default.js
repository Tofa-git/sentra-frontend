import { useState, useEffect } from "react";
import Headers from "../components/layouts/header";
import Ribbons from "../components/layouts/ribbon";
import Footers from "../components/layouts/footer";

const Layout = ({ children, selectId }) => {
  return (
    <>
      <div
        className="d-flex flex-column flex-fill vh-100"
        style={{ backgroundColor: "#dddddd" }}
      >
        <Headers />
        <Ribbons selected={selectId} />
        <main className="flex-grow-1">{children}</main>
        <Footers />
      </div>
    </>
  );
};

export default Layout;
