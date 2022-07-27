import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "../scss/pagination.scss";
import { useGlobalContext } from "../context";

export default function PaginationC() {
  const { pageIndex, setPageIndex, presentedRecipes, itemsPerPage } =
    useGlobalContext();

  const [paginationNumbers, setPaginationNumbers] = useState([]);

  useEffect(() => {
    setPaginationNumbers(
      Array(Math.ceil(presentedRecipes.length / itemsPerPage))
        .fill()
        .map((_, idx) => 1 + idx)
    );
  }, [presentedRecipes]);

  return (
    <div className="pagination-container">
      <Pagination>
        <Pagination.First
          disabled={pageIndex === 1 ? true : false}
          onClick={() => setPageIndex(1)}
        />
        <Pagination.Prev
          disabled={pageIndex === 1 ? true : false}
          onClick={() =>
            setPageIndex((pV) => {
              return pV - 1;
            })
          }
        />
        {paginationNumbers.map((number) => {
          return (
            <Pagination.Item
              className={
                Math.abs(number - pageIndex) > 2
                  ? "no-display"
                  : number === pageIndex
                  ? "active"
                  : ""
              }
              key={number}
              onClick={() => setPageIndex(number)}
            >
              {number}
            </Pagination.Item>
          );
        })}
        <Pagination.Next
          disabled={
            pageIndex === paginationNumbers[paginationNumbers.length - 1]
              ? true
              : false
          }
          onClick={() =>
            setPageIndex((pV) => {
              return pV + 1;
            })
          }
        />
        <Pagination.Last
          disabled={
            pageIndex === paginationNumbers[paginationNumbers.length - 1]
              ? true
              : false
          }
          onClick={() =>
            setPageIndex(paginationNumbers[paginationNumbers.length - 1])
          }
        />
      </Pagination>
    </div>
  );
}
