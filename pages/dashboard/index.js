import React, { useState } from "react";
import Layout from "../../layouts/default";
import dynamic from "next/dynamic";
import "material-icons/iconfont/material-icons.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Index = (props) => {
  const [selectedId, setSelectedId] = useState("001");

  const [dataChart, setDataChart] = useState({
    series: [
      {
        name: "Net Profit",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
      {
        name: "Revenue",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      },
      {
        name: "Free Cash Flow",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "300px",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands";
          },
        },
      },
    },
  });

  return (
    <Layout selectId={selectedId}>
      <div className="h-100 overflow-auto">
        <div className="container">
          <div className="row p-3">
            <div className="col-sm-3">
              <div
                className="d-flex flex-column bg-white shadow-sm rounded-1 overflow-hidden"
                style={{ height: "100px" }}
              >
                <div className="flex-fill">
                  <span
                    className="small fw-bold mx-2"
                    style={{ color: "#cccccc" }}
                  >
                    Total Booking
                  </span>
                  <div className="d-flex flex-fill align-items-center px-2">
                    <div className="d-flex flex-row w-100">
                      <i className="material-icons">expand_less</i>
                      <span>27.2%</span>
                    </div>
                    <div className="fs-1 text-secondary flex-shrink-1 fw-bold">
                      12.5K
                    </div>
                  </div>
                </div>
                <div
                  className="flex-shrink-1"
                  style={{ borderBottom: "4px solid darkBlue" }}
                ></div>
              </div>
            </div>
            <div className="col-sm-3">
              <div
                className="d-flex flex-column bg-white shadow-sm rounded-1 overflow-hidden"
                style={{ height: "100px" }}
              >
                <div className="flex-fill">
                  <span className="text-muted small fw-bold mx-2">
                    Single Booking
                  </span>
                  <div className="d-flex flex-fill align-items-center px-2">
                    <div className="d-flex flex-row w-100">
                      <i className="material-icons">expand_less</i>
                      <span>27.2%</span>
                    </div>
                    <div className="fs-1 text-secondary flex-shrink-1 fw-bold">
                      12.5K
                    </div>
                  </div>
                </div>
                <div
                  className="flex-shrink-1"
                  style={{ borderBottom: "4px solid darkOrange" }}
                ></div>
              </div>
            </div>
            <div className="col-sm-3">
              <div
                className="d-flex flex-column bg-white shadow-sm rounded-1 overflow-hidden"
                style={{ height: "100px" }}
              >
                <div className="flex-fill">
                  <span className="text-muted small fw-bold mx-2">
                    Group Booking
                  </span>
                  <div className="d-flex flex-fill align-items-center px-2">
                    <div className="d-flex flex-row w-100">
                      <i className="material-icons">expand_less</i>
                      <span>27.2%</span>
                    </div>
                    <div className="fs-1 text-secondary flex-shrink-1 fw-bold">
                      12.5K
                    </div>
                  </div>
                </div>
                <div
                  className="flex-shrink-1"
                  style={{ borderBottom: "4px solid green" }}
                ></div>
              </div>
            </div>
            <div className="col-sm-3">
              <div
                className="d-flex flex-column bg-white shadow-sm rounded-1 overflow-hidden"
                style={{ height: "100px" }}
              >
                <div className="flex-fill">
                  <span className="text-muted small fw-bold mx-2">
                    Available Room
                  </span>
                  <div className="d-flex flex-fill align-items-center px-2">
                    <div className="d-flex flex-row w-100">
                      <i className="material-icons">expand_less</i>
                      <span>27.2%</span>
                    </div>
                    <div className="fs-1 text-secondary flex-shrink-1 fw-bold">
                      12.5K
                    </div>
                  </div>
                </div>
                <div
                  className="flex-shrink-1"
                  style={{ borderBottom: "4px solid #aaaaaa" }}
                ></div>
              </div>
            </div>
            <div className="col-md-6 mixed-chart mt-3">
              <div className="card shadow-sm">
                <div className="card-header d-flex align-items-center">
                  <i className="material-icons">bar_chart</i>
                  <span className="ms-2">Booking Statistic</span>
                </div>
                <div className="card-body p-3">
                  <Chart
                    className="bg-white shadow-sm mt-3"
                    options={dataChart.options}
                    series={dataChart.series}
                    type="bar"
                    width="100%"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mixed-chart mt-3">
              <div className="card shadow-sm">
                <div className="card-header d-flex align-items-center">
                  <i className="material-icons">event</i>
                  <span className="ms-2">List Booking</span>
                </div>
                <div className="card-body p-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
