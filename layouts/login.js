//import component Navbar

import { useRouter } from "next/router";
import { AuthContext } from "../context/auth/reducer";
import { useContext, useEffect } from "react";
import { AUTH_SUCCESS } from "../context/constant";

export default function Layout({ children }) {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      dispatch({ type: AUTH_SUCCESS });
    }

    if (!state.isAuthenticated && !token) {
      router.push("/authentication/login");
    }
  }, []);

  return (
    <>
      <main
        className="d-flex justify-content-center align-items-center bg-primary"
        style={{ height: "100vh" }}
      >
        {children}
      </main>
    </>
  );
}
