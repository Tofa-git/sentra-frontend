import React, { Component, useState } from "react";
import Layout from "../../layouts/default";
import "material-icons/iconfont/material-icons.css";
import OperatorMan from "./operator-man";
import SalesOffice from "./sales-office";
import LoginList from "./login-list";


const bookingButton = [
  {
    id: 0,
    name: "Operator Management",
  },
  {
    id: 1,
    name: "Sales Office",
  },
  {
    id: 2,
    name: "Login List",
  },
  
];

const Index = (props) => {
  const [mode, setMode] = useState(0);

  const renderContent = () => {
    switch (mode) {
      case 0:
        return <OperatorMan />;
      case 1:
        return <SalesOffice />;
      case 2:
        return <LoginList />;
      default:
        break;
    }
  };

  return (
    <Layout selectId={"001"}>
      <div className="d-flex flex-row pt-2 mx-3">
        {bookingButton.map((i) => {
          return (
            <button
              class={`btn ${
                mode === i.id ? "btn-primary bg-blue" : "btn-secondary"
              } me-2`}
              onClick={() => setMode(i.id)}
            >
              <span className="">{i.name}</span>
            </button>
          );
        })}
      </div>
      {renderContent()}
    </Layout>
  );
};

export default Index;
