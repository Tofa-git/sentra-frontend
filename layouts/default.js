import { useState, useEffect, useContext } from "react";
import Headers from "../components/layouts/header";
import Ribbons from "../components/layouts/ribbon";
import Footers from "../components/layouts/footer";
import { AuthContext } from "../context/auth/reducer";
import { useRouter } from "next/router";
import { AUTH_SUCCESS } from "../context/constant";
import "material-icons/iconfont/material-icons.css";
import Swal from "sweetalert2";

const Layout = ({ children, selectId }) => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  const recheckToken = () => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      dispatch({ type: AUTH_SUCCESS });
    }

    if (!state.isAuthenticated && !token) {
      router.push("/authentication/login");
    }
  };

  useEffect(() => {
    recheckToken();
  }, []);

  return (
    <>
      <div
        className="d-flex flex-column flex-fill min-vh-100"
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
