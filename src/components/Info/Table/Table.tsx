import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as ArrowDown } from '../img/arrowDown.svg';
import { ReactComponent as ArrowUp } from '../img/arrowUp.svg';
import { ReactComponent as Actions } from '../img/actions.svg';
import { ReactComponent as Cross } from '../img/cross.svg';
import { ReactComponent as ActualIcon } from '../img/actualIcon.svg';
import { ReactComponent as CheckedCheckBox } from '../img/checkedCheckBox.svg';
import { ReactComponent as CheckBox } from '../img/checkBox.svg';

import classNames from 'classnames';

import { Data } from '../Types/Data';


type Props = {
  data: Data[],
  currentPage: number,
  onPageChange: (pageNumber: number, foundedItems?: Data[]) => void,
  total: Data[],
  isImageView: boolean,
}

console.log(document.querySelectorAll('input'));


export const Table: React.FC<Props> = ({
  data,
  currentPage,
  onPageChange,
  total,
  isImageView
}) => {
  const [isCheckedHeader, setIsCheckedHeader] = useState<boolean>(false);
  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current.click();
  }, [])

  return (
    <table className='fields__table table'>
      <thead className='table__thead'>
        <tr>
          <th>
            <label className="container">
              <input ref={ref} type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </th>
        </tr>
        <tr>
          <th onClick={() => {
            ref.current.click()
          }}>Наименование <ArrowDown />
          </th>
        </tr>
        <tr>
          <th>
            Артикул <ArrowDown />
          </th>
        </tr>
        <tr>
          <th>
            Категория <ArrowUp />
          </th>
        </tr>
        <tr>
          <th>
            Тип <ArrowDown />
          </th>
        </tr>
        <tr>
          <th>
            Ед.изм.
          </th>
        </tr>
        <tr>
          <th>
            Цена зак. <ArrowDown />
          </th>
        </tr>
        <tr>
          <th>
            Цена прод. <ArrowDown />
          </th>
        </tr>
        <tr>
          <th>
            Статус
            <ArrowDown />
          </th>
        </tr>
        <tr>
          <th>
            <Actions />
          </th>
        </tr>
      </thead>
      <tbody className={classNames(
        'table__tbody',
        {
          'table__flex-column': isImageView,
        }
      )}>
        {isImageView
          ? (
            data.map(item => (
              <tr className='photo__card card'>
                <td className='photo__card--wrapper'>
                  <div className='card__title'>
                    <div className='card__checkbox'>
                      <label className='table__checkbox'>
                        {isCheckedHeader ? (
                          <CheckedCheckBox />
                        ) : (
                          <CheckBox />
                        )}

                        <input onClick={() => setIsCheckedHeader(!isCheckedHeader)} type="checkbox" />
                      </label>
                    </div>
                    <h2 className='card__title-text'>{item.name}</h2>
                    <div className='card__title-actions'><Actions /></div>
                  </div>
                  <div className='card__under-title'>
                    <p className='card__serial-num'>{item.vendorCode}</p>
                    <p className='card__item-name'>{item.category}</p>
                    <p className='card__prices'>
                      <span>{item.perchasePrice}$</span>
                      <span className='card__price-second'>{item.salePrice}$</span>
                    </p>
                  </div>
                  <div className='card__img'>
                    <img src="https://cdn.shopify.com/s/files/1/0554/6747/5144/products/Boleslawiecmiska2.2_195x195@2x.png?v=1632312119" alt="" />
                  </div>
                  <div className="card__footer">
                    <div className='table__item item-status item-status-green'>
                      <span className='item-status__wrapper-green'>
                        Актуальный
                        <span className='item-status__icon'>
                          <ActualIcon />
                        </span>
                      </span>
                    </div>
                    <div className="card__count">
                      <p>Товар</p>
                      <p>Шт.</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          )
          : (
            <>
              {data && (
                data.map((item, index) => (
                  <tr key={uuidv4()}>
                    <td>
                      <label className="container">
                        <input
                          // onChange={(e) => {
                          //   if (!e.currentTarget.value) {
                          //     e.currentTarget.checked = true;
                          //   }
                          // }}
                          type="checkbox"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.vendorCode}</td>
                    <td>{item.category}</td>
                    <td>{item.type}</td>
                    <td>{item.unitType}</td>
                    <td>{item.perchasePrice}$</td>
                    <td>{item.salePrice}$</td>
                    <td>
                      <span className={`table__item item-status item-status-${item.status}`}>
                        <span className={`item-status__wrapper-${item.status}`}>
                          {item.status === 'red' ? (
                            <>
                              Удалённый
                              <span className='item-status__icon'>
                                <Cross />
                              </span>
                            </>
                          ) : (
                            <>
                              Актуальный
                              <span className='item-status__icon'>
                                <ActualIcon />
                              </span>
                            </>
                          )}
                        </span>
                      </span>
                    </td>
                    <td><Actions /></td>
                  </tr>
                ))
              )}
            </>
          )
        }

      </tbody>
    </table >
  );
}
