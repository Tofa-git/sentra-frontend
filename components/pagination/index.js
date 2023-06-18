import { useState } from "react";

const Pagination = (props) => {
  const { state, handleGet } = props;
  const totalPages = state?.data?.totalPage;
  const pagesToShow = state?.data?.limit;
  const currentPage = state?.data?.page;

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
    (i) => startPage + i
  );

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class={`page-item ${1 === state?.data?.page && "disabled"}`}>
            <a
              class="page-link"
              onClick={() => handleGet(state?.data?.page - 1)}
            >
              Previous
            </a>
          </li>
          {pageNumbers.map((i) => {
            return (
              <li class={`page-item ${i === state?.data?.page && "active"}`}>
                <a class="page-link" onClick={() => handleGet(i)}>
                  {i}
                </a>
              </li>
            );
          })}
          <li class={`page-item ${!state?.data?.hasNext && "disabled"}`}>
            <a
              class="page-link"
              onClick={() => handleGet(state?.data?.page + 1)}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
