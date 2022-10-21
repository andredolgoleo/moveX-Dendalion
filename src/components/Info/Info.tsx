import React, { useEffect, useState } from 'react';
import { Table } from './Table';
import { ReactComponent as ArrowPrev } from './img/arrowPrev.svg';
import { ReactComponent as ArrowNext } from './img/arrowNext.svg';
import { getAllData } from '../api/api';
import { Data } from './Types/Data';

import classNames from 'classnames';

import './styles/Info.scss';

const data = getAllData().sort(() => Math.random() - 0.5);

type Props = {
  isImageView: boolean,
  isCategoryOpen: boolean
};

const arr = [{}, {}, {}, 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'];

arr.forEach(item => {
  console.log(arr.indexOf(item));
})


export const Info: React.FC<Props> = ({
  isImageView,
  isCategoryOpen
}) => {
  const [perPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Data[]>(data);


  const amountOfPages = Math.ceil(filteredData.length / perPage);

  console.log(amountOfPages);



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
        isImageView={isImageView}
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
          <span
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(currentPage - 1)
            }}
            className={classNames(
              'pagination__word-prev',
              {'pagination__word-prev--disabled': currentPage === 1}
            )}
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
                  className={classNames(
                    'pagination__num',
                    { 'pagination__num--active': currentPage === index + 1 }
                  )}
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
