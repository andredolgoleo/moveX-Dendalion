import React, {useEffect, useRef, useState, useContext, Fragment} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Context} from '../../Context/Context';

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import {ReactComponent as ArrowDown} from '../img/arrowDown.svg';
import {ReactComponent as ArrowUp} from '../img/arrowUp.svg';
import {ReactComponent as Actions} from '../img/actions.svg';
import {ReactComponent as Cross} from '../img/cross.svg';
import {ReactComponent as ActualIcon} from '../img/actualIcon.svg';

import classNames from 'classnames';

import {Data} from '../Types/Data';
import {ResizeableTable} from '../Resizeable';
import {ContextCheckBoxTable} from "../../Context/ContextCheckBoxTable";


type Props = {
  data: Data[],
  currentPage: number,
  onPageChange: (pageNumber: number, foundedItems?: Data[]) => void,
  isImageView: boolean,
  settingFields: boolean,
  handleOnSort: (type: string, fieldName: string) => void,
  tableHeaders: string[],
  // handleOnCheckbox: (item: Data) => void,
  // newItems: any[],
}

export const Table: React.FC<Props> = ({
                                         data,
                                         isImageView,
                                         settingFields,
                                         handleOnSort,
                                         tableHeaders,
                                         // handleOnCheckbox,
                                       }) => {
  const [isCheckedHeader, setIsCheckedHeader] = useState(false);
  const [headers, setHeaders] = useState<string[]>(tableHeaders);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [cellSize, setCellSize] = useState(false);
  const [width, setWidth] = useState(0);

  // const [checkedItems, setCheckedItems] = useState([]);

  const [columnSize, setColumnSize] = useState<string[]>(`218px 65px 77px 40px 57px 71px 82px 130px`.split(' '));

  const [windowWidth, setWindowWidth] = useState(window.screen.width);

  const tableRef = useRef<any>(null);
  const theadRef = useRef<any>(null);

  const {handleOnCheckBox, checkedItems} = useContext(ContextCheckBoxTable);

  const resizeHandler = (e: any) => {
    setWindowWidth(e.currentTarget.innerWidth);
    setWidth(tableRef.current.offsetWidth);
  };

  useEffect(() => {
    setHeaders(tableHeaders);
    setWidth(tableRef.current.offsetWidth);

    window.addEventListener('resize', (e: any) => {
      resizeHandler(e);
    });

    if (tableHeaders.length > columnSize.length) {
      const diff = tableHeaders.length - columnSize.length;
      const newSizes: string[] = [];

      for (let i = 0; diff > i; i++) {
        newSizes.push('150px');
      }
      ;

      setTimeout(() => {
        setColumnSize([...columnSize, ...newSizes]);
      }, 50)
    }

    if (tableHeaders.length < columnSize.length) {
      const newArr = [];

      for (let i = 0; columnSize.length - 1 > i; i++) {
        newArr.push(columnSize[i])
      }

      const newColumnSize = async (arr: string[]) => {

        await setColumnSize(arr)
      }

      newColumnSize(newArr)
    }

    if (tableRef.current.offsetWidth < theadRef.current.offsetWidth) {
      setCellSize(true);
    }
    if (tableRef.current.offsetWidth > theadRef.current.offsetWidth) {
      setCellSize(false);
    }

    return () => {
      window.removeEventListener('resize', resizeHandler);
    }
  }, [tableHeaders, tableRef, windowWidth]);

  const swapElements = (array: string[], index1: number, index2: number,) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    const copy = [...array];
    setHeaders(copy);
  };

  const swapElementsSize = (array: string[], index1: number, index2: number,) => {
    const temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;

    const copy = [...array];
    setColumnSize(copy);
  };

  return (
    <>
      {settingFields ? (
          <ResizeableTable
            data={data}
            swapElementsSize={swapElementsSize}
            swapElements={swapElements}
            size={columnSize}
            headers={headers}
          />
        )
        : (
          <table ref={tableRef} className='fields__table table'>
            <SimpleBarReact
              style={{
                maxHeight: '75vh',
              }}
              forceVisible="y"
              autoHide={false}
              scrollbarMinSize={303}
            >
              {tableRef && (
                <thead
                  ref={theadRef}
                  style={{
                    display: 'grid',
                    gap: '20px',
                    // width: cellSize ? ('min-content') : '100%',
                    width: columnSize.join(' ').split('px').map(item => +item).reduce((a, b) => a + b) + (23 * (columnSize.length)) > width ? ('min-content') : ('99%'),
                    position: 'sticky',
                    top: 0,
                    zIndex: 20,
                    gridTemplateColumns: `${columnSize.join(' ')} 13px`,
                  }}
                  className='table__thead'
                >
                <>
                  {headers.map((header, i) => {
                    if (i === 0) {
                      return (
                        <div key={uuidv4()} className='table__first-part'>
                          <tr className='table__tr'>
                            <th>
                              <label className="container">
                                <input
                                  type="checkbox"
                                  defaultChecked={isCheckedHeader}
                                  onChange={() => setIsCheckedHeader(!isCheckedHeader)}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </th>
                          </tr>
                          <tr
                            className='table__tr'
                          >
                            <th
                              onClick={(e) => {
                                if (i === activeIndex) {
                                  setActiveIndex(null);
                                }

                                if (i !== activeIndex) {
                                  setActiveIndex(i);
                                }
                                handleOnSort('string', e.currentTarget.innerText)
                              }}
                            >
                              {header} {i === activeIndex ? (
                              <ArrowDown/>
                            ) : (
                              <ArrowUp/>
                            )}
                            </th>
                          </tr>
                        </div>
                      )
                    }
                    return (
                      <tr key={uuidv4()} className='table__tr'>
                        <th
                          onClick={(e) => {
                            if (i === activeIndex) {
                              setActiveIndex(null);
                            }

                            if (i !== activeIndex) {
                              setActiveIndex(i);
                            }
                            handleOnSort('string', e.currentTarget.innerText)
                          }}
                        >
                          {header} {i === activeIndex ? (
                          <ArrowDown/>
                        ) : (
                          <ArrowUp/>
                        )}
                        </th>
                      </tr>
                    )
                  })}
                  <tr className='table__tr'>
                    <th>
                      <Actions/>
                    </th>
                  </tr>
                </>
                </thead>
              )}
              <tbody
                className={classNames(
                  'table__tbody',
                  {
                    'table__flex-column': isImageView,
                  }
                )}>
              {isImageView
                ? (
                  data.map((item) => {

                    return (
                      <div key={uuidv4()} className='photo__card card'>
                        <div className='card--wrapper'>
                          <div className='card__title'>
                            <div className='card__checkbox'>
                              <label className="container">
                                {isCheckedHeader ?
                                  (<input defaultChecked={true} type="checkbox"/>)
                                  : (<input defaultChecked={false} onChange={() => handleOnCheckBox(item)}
                                            type="checkbox"/>)}
                                <span className="checkmark"></span>
                              </label>
                            </div>
                            <h2 className='card__title-text'>{item.name}</h2>
                            <div className='card__title-actions'><Actions/></div>
                          </div>
                          <div className='card__under-title'>
                            <p className='card__serial-num'>{item.vendorCode}</p>
                            <p className='card__item-name'>{item.category}</p>
                            <p className='card__prices'>
                              <span>{item.perchasePrice}$</span>
                              <span className='card__price-second'>{item.salePrice}$</span>
                            </p>
                          </div>
                          <div className='card__img--wrapper'>
                            <img className='card__img'
                                 src="https://cdn.shopify.com/s/files/1/0554/6747/5144/products/Boleslawiecmiska2.2_195x195@2x.png?v=1632312119"
                                 alt=""/>
                          </div>
                          <div className="card__footer">
                            <div>
                                <span className={`table__item item-status item-status-${item.status}`}>
                                  <span className={`item-status__wrapper-${item.status}`}>
                                    {item.status === 'red' ? (
                                      <>
                                        Аннулирован
                                        <span className='item-status__icon'>
                                          <Cross/>
                                        </span>
                                      </>
                                    ) : (
                                      <>
                                        Актуальный
                                        <span className='item-status__icon'>
                                          <ActualIcon/>
                                        </span>
                                      </>
                                    )}
                                  </span>
                                </span>
                            </div>
                            <div className="card__count">
                              <p className="card__count-p">Товар</p>
                              <p className="card__count-p">Шт.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )
                : (
                  <>
                    {data && (
                      data.map((item) => (
                        <tr
                          style={{
                            display: 'grid',
                            gap: '20px',
                            width: columnSize.join(' ').split('px').map((item: any) => +item).reduce((a: any, b: number) => +a + +b) + (23 * (columnSize.length)) > width ? ('min-content') : ('99%'),
                            gridTemplateColumns: `${columnSize.join(' ')} 13px`,
                          }}
                          key={uuidv4()}
                        >
                          <Fragment key={uuidv4()}>
                            {headers.map((header, i) => {
                              if (i === 0) {
                                switch (header) {
                                  case 'Наименование на английском':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>Наименование на английском</td>
                                      </div>
                                    );

                                  case 'Поставщик':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>Поставщик</td>
                                      </div>
                                    );

                                  case 'Наименования':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={(e) => {
                                                  handleOnCheckBox(item);
                                                }} type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>{item.name}</td>
                                      </div>
                                    );
                                  case 'Артикул':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td style={{display: 'block', width: '52px'}}>{item.vendorCode}</td>
                                      </div>
                                    );
                                  case 'Категория':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>{item.category}</td>
                                      </div>
                                    );
                                  case 'Тип':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>{item.type}</td>
                                      </div>
                                    );
                                  case 'Ед.изм.':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>{item.unitType}</td>
                                      </div>
                                    );
                                  case 'Цена зак.':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>{item.perchasePrice}</td>
                                      </div>
                                    );
                                  case 'Цена прод.':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>{item.salePrice}</td>
                                      </div>
                                    );
                                  case 'Статус':
                                    return (
                                      <div className='table__first-part'>
                                        <td>
                                          <label className="container">
                                            {isCheckedHeader ?
                                              (<input defaultChecked={true} type="checkbox"/>)
                                              : (<input
                                                defaultChecked={checkedItems.find((field: Data) => field === item)}
                                                onChange={() => handleOnCheckBox(item)}
                                                type="checkbox"/>)}
                                            <span className="checkmark"></span>
                                          </label>
                                        </td>
                                        <td>
                                            <span className={`table__item item-status item-status-${item.status}`}>
                                              <span className={`item-status__wrapper-${item.status}`}>
                                                {item.status === 'red' ? (
                                                  <>
                                                    Аннулирован
                                                    <span className='item-status__icon'>
                                                      <Cross/>
                                                    </span>
                                                  </>
                                                ) : (
                                                  <>
                                                    Актуальный
                                                  </>
                                                )}
                                              </span>
                                            </span>
                                        </td>
                                      </div>
                                    );

                                  default:
                                    break;
                                }
                              }

                              switch (header) {
                                case 'Наименование на английском':
                                  return (
                                    <td>Наименование на английском</td>
                                  );

                                case 'Поставщик':
                                  return (
                                    <td>Поставщик</td>
                                  );

                                case 'Габариты':
                                  return (
                                    <td>Габариты</td>
                                  );

                                case 'Объем':
                                  return (
                                    <td>Объем</td>
                                  );

                                case 'Масса':
                                  return (
                                    <td>Масса</td>
                                  );

                                case 'Партийный вид':
                                  return (
                                    <td>Партийный вид</td>
                                  );

                                case 'Мин. цена продажи':
                                  return (
                                    <td>Мин. цена продажи</td>
                                  );

                                case 'Макс. цена скидки':
                                  return (
                                    <td>Макс. цена скидки</td>
                                  );

                                case 'ПДВ':
                                  return (
                                    <td>ПДВ</td>
                                  );

                                case 'ID':
                                  return (
                                    <td>ID</td>
                                  );

                                case 'Описание':
                                  return (
                                    <td>Описание</td>
                                  );

                                case 'Наименования':
                                  return (
                                    <td>{item.name}</td>
                                  );
                                case 'Артикул':
                                  return (
                                    <td>{item.vendorCode}</td>
                                  );
                                case 'Категория':
                                  return (
                                    <td>{item.category}</td>
                                  );
                                case 'Тип':
                                  return (
                                    <td>{item.type}</td>
                                  );
                                case 'Ед.изм.':
                                  return (
                                    <td>{item.unitType}</td>
                                  );
                                case 'Цена зак.':
                                  return (
                                    <td>{item.perchasePrice}</td>
                                  );
                                case 'Цена прод.':
                                  return (
                                    <td>{item.salePrice}</td>
                                  );
                                case 'Статус':
                                  return (
                                    <div className='table__last-part'>
                                      <td>
                                          <span className={`table__item item-status item-status-${item.status}`}>
                                            <span className={`item-status__wrapper-${item.status}`}>
                                              {item.status === 'red' ? (
                                                <>
                                                  Аннулирован
                                                  <span className='item-status__icon'>
                                                    <Cross/>
                                                  </span>
                                                </>
                                              ) : (
                                                <>
                                                  Актуальный
                                                  <span className='item-status__icon'>
                                                    <ActualIcon/>
                                                  </span>
                                                </>
                                              )}
                                            </span>
                                          </span>
                                      </td>
                                    </div>
                                  );

                                default:
                                  break;
                              }
                            })}
                            <td style={{overflow: 'initial', width: '15px', height: '40px'}}>
                              <div style={{position: 'relative'}}><Action/></div>
                            </td>
                          </Fragment>
                        </tr>
                      ))
                    )}
                  </>
                )
              }

              </tbody>
            </SimpleBarReact>
          </table>
        )
      }

    </>
  );
}

const Action: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div>
        {show ? (
          <div style={{
            display: 'flex',
            // justifyContent: 'flex-end',
            // alignItems: 'center',
            flexDirection: 'column',
            position: 'absolute',
            width: '158px',
            height: '47px',
            lineHeight: '0',
            background: '#fff',
            boxSizing: 'border-box',
            right: '-55%',
            zIndex: 2,
            padding: '8px',
            boxShadow: '-6px 6px 12px rgba(224, 224, 224, 0.2), 6px -6px 12px rgba(224, 224, 224, 0.2), -6px -6px 12px rgba(255, 255, 255, 0.9), 6px 6px 15px rgba(224, 224, 224, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.3), inset -1px -1px 2px rgba(224, 224, 224, 0.5)',

          }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'Montserrat',
                fontWeight: '500',
                fontSize: '8px',
                marginBottom: '11px'
              }}
            >
              <div>
                ID товара: 23R855YK209
              </div>
              <Actions
                onClick={() => {
                  setShow(!show)
                }}/>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <div className='yellow'>Редактировать</div>
              <div className='red'>Списать <Cross/></div>
            </div>
          </div>
        ) : (
          <Actions onClick={
            () => {
              setShow(!show)
            }
          }/>
        )}
      </div>
    </>
  )
}

function moviePropsAreEqual(prevTotal: any, nextTotal: any) {
  console.log(prevTotal.data[0], nextTotal.data[0])
  return prevTotal.currentPage === nextTotal.currentPage;
}

export const MemoizedTable = React.memo(Table, moviePropsAreEqual);
