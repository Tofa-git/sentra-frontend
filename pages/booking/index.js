import React, { Component, useState } from "react";
import Layout from "../../layouts/default";
import "material-icons/iconfont/material-icons.css";
import Book from "./book";

const bookingButton = [
  {
    id: 0,
    name: "Book",
  },
  {
    id: 1,
    name: "Search",
  },
  {
    id: 2,
    name: "Detail",
  },
  {
    id: 3,
    name: "Offline",
  },
  {
    id: 4,
    name: "1:1 Q&A",
  },
];

const Index = (props) => {
  const [mode, setMode] = useState(0);
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
      {mode === 0 ? <Book /> : <></>}
    </Layout>
  );
};

export default Index;
