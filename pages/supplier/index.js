import React, { Component, useState } from "react";
import Layout from "../../layouts/default";
import "material-icons/iconfont/material-icons.css";
import Supplier from "./supplier-man";
import Markup from "./supplier-markup";



const supplierButton = [
  {
    id: 0,
    name: "Supplier",
  },
  {
    id: 1,
    name: "Supplier Markup",
  },
];

const Index = (props) => {
  const [mode, setMode] = useState(0);

  const renderContent = () => {
    switch (mode) {
      case 0:
        return <Supplier />;
      case 1:
        return <Markup />;     
      default:
        break;
    }
  };

  return (
    <Layout selectId={"001"}>
      <div className="d-flex flex-row pt-2 mx-3">
        {supplierButton.map((i) => {
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
