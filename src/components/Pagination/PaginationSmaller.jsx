import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePaginationSmaller';
import './styles/pagination.scss';

import { v4 as uuidv4 } from 'uuid';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <ul
      className={classnames(
        'pagination-container',
        { [className]: className }
      )}
    >
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li key={uuidv4()} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            key={uuidv4()}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
