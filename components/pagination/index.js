import { useState } from "react";

const Pagination = (props) => {
  const { state, handleGet } = props;
  const totalPages = state?.totalPage;
  const pagesToShow = state?.limit;
  const currentPage = state?.page;

  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  const pageNumbers = [
    ...Array(state?.rows?.length > 0 ? endPage - startPage + 1 : 1).keys(),
  ].map((i) => startPage + i);

  return (
    <div className="d-flex justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class={`page-item ${1 === state?.page && "disabled"}`}>
            <a class="page-link" onClick={() => handleGet(state?.page - 1)}>
              Previous
            </a>
          </li>
          {pageNumbers.map((i) => {
            return (
              <li class={`page-item ${i === state?.page && "active"}`}>
                <a class="page-link" onClick={() => handleGet(i)}>
                  {i}
                </a>
              </li>
            );
          })}
          <li class={`page-item ${!state?.hasNext && "disabled"}`}>
            <a class="page-link" onClick={() => handleGet(state?.page + 1)}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
