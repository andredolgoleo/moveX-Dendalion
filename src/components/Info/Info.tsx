import React, { useEffect, useState } from 'react';
import { Table } from './Table';
import { ReactComponent as ArrowPrev } from './img/arrowPrev.svg';
import { ReactComponent as ArrowNext } from './img/arrowNext.svg';
import { getAllData } from '../api/api';
import { Data } from './Types/Data';

import './styles/Info.scss';

const data = getAllData().sort(() => Math.random() - 0.5);

export const Info: React.FC = () => {
  const [perPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Data[]>(data);

  const [isVisiable, setIsVisiable] = useState(true);

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage < filteredData.length
    ? currentPage * perPage
    : filteredData.length;

  const foundItems = filteredData.slice(startIndex, endIndex);

  const handleOnPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleOnVisiable = () => {
    setIsVisiable(!isVisiable);
  }

  const handleOnFilter = (data: Data[]) => {
    setCurrentPage(1);
    setFilteredData(data);
  }


  return (
    <>
      <div className="fields__count">
        <span className='fields__count--green counter'>Общее количество: <span>234 поз.</span></span>
        <span className='fields__count--red counter'>Продавались за последние 7 дней: <span>16 поз.</span></span>
        <span className='fields__count--purple counter'>Товаров без сделок: <span>749 поз.</span></span>
      </div>
      <Table
        total={filteredData}
        data={foundItems}
        currentPage={currentPage}
        onPageChange={handleOnPageChange}
      />
      <div className="fields__pagination pagination">
        <span>
          <span>
            <ArrowPrev
              onClick={() => {
                setCurrentPage(currentPage - 1)
              }}
            />
          </span>
          <span
            onClick={() => {
              setCurrentPage(currentPage - 1)
            }}
            className='pagination__word-prev'
          >
            Пред
          </span>
          {data && (
            data.map((_: any, index: number) => {
              if (index === 8) {
                return (
                  <>
                    <span key={index} className='pagination__num pagination__num'>...</span>
                    <span onClick={(e) => {
                      handleOnPageChange(+e.currentTarget.innerText)
                    }} key={index} className='pagination__num pagination__num--active'>{filteredData.length - 2}</span>
                    <span key={index} className='pagination__num pagination__num--active'>{filteredData.length - 1}</span>
                    <span key={index} className='pagination__num pagination__num--active'>{filteredData.length}</span>
                  </>
                )
              }

              if (index > 7) {
                return;
              }

              return (
                <span
                  onClick={(e) => {
                    handleOnPageChange(+e.currentTarget.innerText)
                  }}
                  key={index}
                  className='pagination__num pagination__num--active'
                >
                  {index + 1}
                </span>
              )
            })
          )}
          <span className='pagination__word-next'
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }}
          >
            След
          </span>
          <span>
            <ArrowNext
              onClick={() => {
                setCurrentPage(currentPage + 1)
              }}
            />
          </span>
        </span>
      </div>
    </>
  );
}
