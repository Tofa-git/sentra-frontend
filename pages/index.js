import React, { useEffect, useContext } from "react";
import Layout from "../layouts/default";
import styles from "../styles/Home.module.css";
import "material-icons/iconfont/material-icons.css";
import { useRouter } from "next/router";
import { AuthContext } from "../context/auth/reducer";
import { AUTH_SUCCESS } from "../context/constant";

const Home = (props) => {
  const { state, dispatch } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      dispatch({ type: AUTH_SUCCESS });
    }

    if (state.isAuthenticated || token) {
      router.push("/dashboard");
    } else {
      router.push("/authentication/login");
    }
  }, []);

  return <div>Loading</div>;
};

export default Home;
