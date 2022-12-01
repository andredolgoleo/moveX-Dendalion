import React, {Fragment, useContext, useEffect, useState} from 'react';
import {MemoizedTable, Table} from './Table';
import Pagination from '../Pagination/Pagination';
import {ReactComponent as ArrowPrev} from './img/arrowPrev.svg';
import {ReactComponent as ArrowNext} from './img/arrowNext.svg';
import {getAllData} from '../api/api';
import {Data} from './Types/Data';
import {v4 as uuidv4} from 'uuid';
import {ContextButtonHide} from "../Context/ContextButtonHide";

import classNames from 'classnames';

import './styles/Info.scss';
import PaginationSmaller from "../Pagination/PaginationSmaller";

type Props = {
  isImageView: boolean,
  isCategoryOpen: boolean,
  settingFields: boolean,
  data: Data[],
  handleOnSort: (type: string, fieldName: string) => void,
  headers: string[]
};

export const Info: React.FC<Props> = ({
                                        isImageView,
                                        settingFields,
                                        data,
                                        handleOnSort,
                                        headers
                                      }) => {
  const [perPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.screen.width);

  const {hideButton} = useContext(ContextButtonHide);

  const amountOfPages = Math.ceil(data.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage < data.length
    ? currentPage * perPage
    : data.length;

  const foundItems = data.slice(startIndex, endIndex);

  const resizeHandler = (e: any) => {
    setWindowWidth(e.currentTarget.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', (e: any) => {
      resizeHandler(e);
    });

    // setFilteredData(getAllData(filtersSetting))

    return () => {
      window.removeEventListener('resize', resizeHandler)
    }
  }, []);

  const handleOnPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div
        style={{
          marginLeft: hideButton ? '25%' : 0,
        }}
        className="fields__count"
      >
        <span className='fields__count--green counter'>Общ. кол-во: <span>234 поз.</span></span>
        <span className='fields__count--red counter'>Прод. за посл. 7 дн.: <span>16 поз.</span></span>
        <span className='fields__count--purple counter'>Товаров без сделок: <span>749 поз.</span></span>
      </div>
      <Table
        data={foundItems}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
        isImageView={isImageView}
        settingFields={settingFields}
        handleOnSort={handleOnSort}
        tableHeaders={headers}
        // handleOnCheckbox={handleOnCheckbox}
        // newItems={newItems}
      />
      <div className="fields__pagination pagination">
        <span>
          <span>
            <ArrowPrev
              onClick={() => {
                if (currentPage === 1) return;
                setCurrentPage(currentPage - 1)
              }}
            />
          </span>
          {currentPage === 1 ? (
            <div
              onClick={() => {
                if (currentPage === 1) return;
                setCurrentPage(currentPage - 1)
              }}
              className={
                classNames(
                  'pagination__word-prev',
                  'pagination__word-prev--disabled'
                )}
            >
              Пред
            </div>
          ) : (
            <span
              onClick={() => {
                if (currentPage === 1) return;
                setCurrentPage(currentPage - 1)
              }}
              className={
                classNames(
                  'pagination__word-prev',
                  'pagination-item'
                )}
            >
              Пред
            </span>
          )}
          {windowWidth < 1100 ? (
            <PaginationSmaller
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={perPage}
              onPageChange={(page: any) => setCurrentPage(page)}
            />
          ) : (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={data.length}
              pageSize={perPage}
              onPageChange={(page: any) => setCurrentPage(page)}
            />
          )}

          {currentPage === amountOfPages ? (
            <div className='pagination__word-next pagination__word-prev--disabled'
                 onClick={() => {
                   if (currentPage === amountOfPages) return;
                   setCurrentPage(currentPage + 1)
                 }}
            >
              След
            </div>
          ) : (
            <span className='pagination__word-next pagination-item'
                  onClick={() => {
                    if (currentPage === amountOfPages) return;
                    setCurrentPage(currentPage + 1)
                  }}
            >
              След
            </span>
          )}
          <span>
            <ArrowNext
              className='n'
              onClick={() => {
                if (currentPage === amountOfPages) return;
                setCurrentPage(currentPage + 1)
              }}
            />
          </span>
        </span>
      </div>
    </>
  );
}


function moviePropsAreEqual(prevData: any, nextData: any) {
  // console.log();
  return (prevData.data[0] === nextData.data[0] && prevData.headers.length === nextData.headers.length && prevData.isImageView === nextData.isImageView);
}

export const MemoizedInfo = React.memo(Info, moviePropsAreEqual);
