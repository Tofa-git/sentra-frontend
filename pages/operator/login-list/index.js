import React from "react";
import Input from "../../../components/input";
import Select from "../../../components/select";

const dummyData = [
  {
    id: 1,
    location_code: "ALOR",
    location_name_en: "Alor",
    location_name_ch: "4",
    is_used: 1,
  },
  {
    id: 2,
    location_code: "AMBA",
    location_name_en: "Ambarawa",
    location_name_ch: "3",
    is_used: 1,
  },
  {
    id: 3,
    location_code: "AMQ",
    location_name_en: "Ambon",
    location_name_ch: "5",
    is_used: 0,
  },
];

const Index = (props) => {
  return (
    <>
      <div className="stdFormHeader d-flex flex-shrink-1 align-items-center  p-1 px-2">
      
      </div>
      <div class="d-flex flex-column h-100 stdForm">
        <div class="w-100">
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="30%">
                    OPERATOR
                  </th>
                  <th className="bg-blue text-white" width="35%">
                    DATE TIME
                  </th>
                  <th className="bg-blue text-white" width="35%">
                    IP ADDRESS
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{ }</td>
                      <td>{ }</td>
                      <td>{data.location_name_ch}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </>
  );
};

export default Index;
