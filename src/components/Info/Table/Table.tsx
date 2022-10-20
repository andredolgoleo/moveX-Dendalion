import React, { useEffect, useState } from 'react';

import { ReactComponent as ArrowDown } from '../img/arrowDown.svg';
import { ReactComponent as ArrowUp } from '../img/arrowUp.svg';
import { ReactComponent as Actions } from '../img/actions.svg';
import { ReactComponent as Cross } from '../img/cross.svg';
import { ReactComponent as ActualIcon } from '../img/actualIcon.svg';
import { ReactComponent as CheckedCheckBox } from '../img/checkedCheckBox.svg';
import { ReactComponent as CheckBox } from '../img/checkBox.svg';

import { Data } from '../Types/Data';


type Props = {
  data: Data[],
  currentPage: number,
  onPageChange: (pageNumber: number, foundedItems?: Data[]) => void,
  total: Data[],
}

export const Table: React.FC<Props> = ({ data }) => {
  const [isCheckedHeader, setIsCheckedHeader] = useState<boolean>(false);

  return (
    <table className='fields__table table'>
      <thead className='table__thead'>
        <tr>
          <th>
            <label className='table__checkbox'>
              {isCheckedHeader ? (
                <CheckedCheckBox />
              ) : (
                <CheckBox />
              )}

              <input onClick={() => setIsCheckedHeader(!isCheckedHeader)} type="checkbox" />
            </label>
          </th>
        </tr>
        <tr>
          <th>Наименование <ArrowDown />
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
      <tbody className='table__tbody'>
        {data && (
          data.map((item, index) => (
            <tr key={index}>
              <td>
                <label className='table__checkbox'>
                  <CheckBox />
                  <input type="checkbox" />
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

        <tr>
          <td>
            <CheckedCheckBox />
          </td>
          <td>Gorgeous Glass Bowl 17х20х12 Pearl</td>
          <td>0457894</td>
          <td>Тарелки</td>
          <td>Товар</td>
          <td>Шт.</td>
          <td>218$</td>
          <td>Цена прод. <ArrowDown /></td>
          <td>
            <div className='table__item item-status item-status-green'>
              <span className='item-status__wrapper-green'>
                Актуальный
                <span className='item-status__icon'>
                  <ActualIcon />
                </span>
              </span>
            </div>
          </td>
          <td><Actions /></td>
        </tr>

        <tr className='photo__card card'>
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
            <h2 className='card__title-text'>Gorgeous Glass Bowl (USA)</h2>
            <div className='card__title-actions'><Actions /></div>
          </div>
          <div className='card__under-title'>
            <p className='card__serial-num'>0457984</p>
            <p className='card__item-name'>Тарелки</p>
            <p className='card__prices'>
              <span>219$</span>
              <span className='card__price-second'>260$</span>
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
        </tr>
      </tbody>
    </table >
  );
}

function higherOrderComponent(MyComponent: any) {
  throw new Error('Function not implemented.');
}
