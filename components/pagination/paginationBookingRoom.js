// PaginatedTable.js
import React, { useState, useEffect } from 'react';

const PaginatedBookingRoomTable = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data.slice(startIndex, endIndex);
    setPaginatedData(slicedData);
  }, [data, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th className="bg-blue text-white" width="5%">
              Code
            </th>
            <th className="bg-blue text-white" width="20%">
              Name
            </th>
            <th className="bg-blue text-white" width="10%">
              Gross Price
            </th>
            <th className="bg-blue text-white" width="10%">
              Net Price
            </th>
            <th className="bg-blue text-white" width="5%">
              Plan
            </th>
            <th className="bg-blue text-white" width="5%">
              Supplier
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data, index) => (
            <tr key={index}>
              <td>{data.code}</td>
              <td>{data.name}</td>
              <td>{toIDR(data.grossPrice)}</td>
              <td>{toIDR(data.netPrice)}</td>
              <td>{data.mealPlanName}</td>
              <td>{data.supplierCode}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PaginatedBookingRoomTable;
