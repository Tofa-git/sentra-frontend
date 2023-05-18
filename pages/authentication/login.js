import Layout from "../../layouts/login";
import Image from "next/image";
import "material-icons/iconfont/material-icons.css";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/auth/reducer";
import { login } from "../../context/auth/actions";

const Login = (props) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState([]);
  const { state, dispatch } = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault();
    await login(dispatch, email, password);
  };

  if (state.isAuthenticated) {
    router.push("/dashboard");
  }

  return (
    <Layout>
      <div className="row justify-content-sm-center align-items-sm-center h-100">
        <div
          className="col-sm-4 p-4 mh-100 bg-white shadow text-center"
          style={{
            borderRadius: "10px",
            minWidth: "350px",
            backgroundColor: "rgba(255,255,255,0.75)",
            boxShadow: "0px 0px 10px #aaaaaa",
          }}
        >
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Image
              src={Logo}
              alt="Logo Sentra Hotel"
              className="img-fluid"
              style={{ height: "60px", width: "auto" }}
            />
            <span className="lh-sm fs-6 mt-2">Click and Book Everywhere</span>
          </div>
          <form onSubmit={loginHandler}>
            <div className="d-flex mt-5">
              <div className="position-absolute p-2">
                <i className="material-icons text-secondary">people</i>
              </div>
              <input
                type="text"
                className="rounded-0 ps-5 form-control "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username or Email"
              />
              <div
                className="p-2 bg-secondary d-flex clearValue"
                style={{ cursor: "pointer" }}
                title="Clear username"
              >
                <i className="material-icons align-self-center text-white fs-5">
                  clear
                </i>
              </div>
            </div>
            <div className="d-flex mt-3">
              <div className="position-absolute p-2">
                <i className="material-icons text-secondary">lock</i>
              </div>
              <input
                type="password"
                className="rounded-0 ps-5 form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <div
                className="p-2 bg-secondary d-flex clearValue"
                style={{ cursor: "pointer" }}
                title="Clear username"
              >
                <i className="material-icons align-self-center text-info fs-5">
                  visibility_off
                </i>
              </div>
            </div>
            {console.log({ erorr: state.errorMessage })}
            {state.isError ? (
              <div className="text-danger">{state.errorMessage}</div>
            ) : (
              <div />
            )}
            <div className="d-flex flex-column mt-5">
              <button
                type="submit"
                className="justify-content-center btn btn-primary bg-gradient d-flex align-items-center"
              >
                <span className="px-2">Next</span>
                {state.isLoading ? (
                  <div
                    class="spinner-border text-light"
                    style={{ height: "24px", width: "24px" }}
                    role="status"
                  >
                    <span class="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <i className="material-icons align-self-center">
                    play_circle_outline
                  </i>
                )}
              </button>
            </div>
            <div className="mt-4 d-flex flex-column align-items-center">
              <span className="text-muted" style={{ fontSize: "10pt" }}>
                ExtraNET V.1.1
              </span>
              <span className="text-muted" style={{ fontSize: "8pt" }}>
                PT. Nama Perusahaan
              </span>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
