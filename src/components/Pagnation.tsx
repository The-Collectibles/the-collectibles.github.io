import * as React from "react";

type PaginationProps = {
  currentPage: number;
  numberOfPages: number;
  url: string;
};

const Pagination = (props: PaginationProps) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {Array.from({length:props.numberOfPages}, (_, i) => (
          
            <li key={"key"+i} className={`page-item ${i===props.currentPage - 1 ? "active" : ""}`}>
              <a className="page-link" href={`${props.url}/${i ===0 ? "" : i+1}`}>
                {i+1}
              </a>
            </li>
        ))}
      </ul>
    </nav>
  )
};

export default Pagination;
