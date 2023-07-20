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
    <div className="mx-3">
      <div className="row p-3">
        <div className="col-lg-6">
          
          <div className="text-dark mb-1 mt-4">Supplier List</div>
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    Code
                  </th>
                  <th className="bg-blue text-white" width="25%">
                    Name
                  </th>
                  <th className="bg-blue text-white" width="10%">
                    Credit Day
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Telephone
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_code}</td>
                      <td>{data.location_name}</td>
                      <td>{data.location_credit_day}</td>
                      <td>{data.location_telephone}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="text-dark mb-1">Supplier Manager Information</div>
          <div className="bg-white">

            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th className="bg-blue text-white" width="5%">
                    User ID
                  </th>
                  <th className="bg-blue text-white" width="30%">
                    Name
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Phone
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Mobile
                  </th>
                  <th className="bg-blue text-white" width="5%">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_id}</td>
                      <td>{data.location_name}</td>
                      <td>{data.location_phone}</td>
                      <td>{data.location_mobile}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-dark mb-1">Supplier Emergency Contact Information</div>
          <div className="bg-white">
            <table className="table table-bordered table-hover table-striped">
              <thead>
              <tr>
                  <th className="bg-blue text-white" width="30%">
                    Nation/City
                  </th>
                  <th className="bg-blue text-white" width="35%">
                    Telephone 1
                  </th>
                  <th className="bg-blue text-white" width="35%">
                    Telephone 2
                  </th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((data) => {
                  return (
                    <tr>
                      <td>{data.location_nation}</td>
                      <td>{data.location_phone1}</td>
                      <td>{data.location_phone2}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Index;
