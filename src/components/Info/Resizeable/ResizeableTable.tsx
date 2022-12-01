import React, { useEffect, useRef, useState } from 'react';
import './styles/ResizeableTable.scss'

import { ReactComponent as ArrowLeft } from './img/arrowLeft.svg'
import { ReactComponent as ArrowRight } from './img/arrowRight.svg'
import { getAllData } from '../../api/api';

import classnames from 'classnames';
import {Data} from "../Types/Data";

type Props = {
  data: Data[],
  headers: string[],
  size: string[]
  swapElements: (array: string[], current: number, next: number) => void,
  swapElementsSize: (array: string[], current: number, next: number) => void,
}

// const data = getAllData();

export const ResizeableTable: React.FC<Props> = ({ headers, data, size, swapElements, swapElementsSize }) => {

  const tableRef = useRef<any>([]);
  const refRight = useRef<any>([]);
  const refLeft = useRef<any>([]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const mouseDown = (index: number) => {
    setActiveIndex(index);
  }

  useEffect(() => {

    if (typeof activeIndex === 'number') {
      const resizeableEle = tableRef.current[activeIndex];
      const styles = window.getComputedStyle(resizeableEle);
      let width = parseInt(styles.width, 10);
      let x = 0;
      // Right
      const onMouseMoveRightResize = (event: any) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width + dx;
        if (width > 450 || width < 30) return;
        resizeableEle.style.width = `${width}px`;
      };

      const onMouseUpRightResize = () => {
        document.removeEventListener("mousemove", onMouseMoveRightResize);
      };

      const onMouseDownRightResize = (event: any) => {
        x = event.clientX;
        resizeableEle.style.left = styles.left;
        resizeableEle.style.right = null;
        document.addEventListener("mousemove", onMouseMoveRightResize);
        document.addEventListener("mouseup", onMouseUpRightResize);
      };

      // Left

      const onMouseMoveLeftResize = (event: any) => {
        const dx = event.clientX - x;
        x = event.clientX;
        width = width - dx;
        resizeableEle.style.width = `${width}px`;
      };

      const onMouseUpLeftResize = (event: any) => {
        document.removeEventListener("mousemove", onMouseMoveLeftResize);
      };

      const onMouseDownLeftResize = (event: any) => {
        x = event.clientX;
        resizeableEle.style.right = styles.right;
        resizeableEle.style.left = null;
        document.addEventListener("mousemove", onMouseMoveLeftResize);
        document.addEventListener("mouseup", onMouseUpLeftResize);
      };

      const resizerRight = refRight.current[activeIndex];
      resizerRight.addEventListener("mousedown", onMouseDownRightResize);
      const resizerLeft = refLeft.current[activeIndex];
      resizerLeft.addEventListener("mousedown", onMouseDownLeftResize);

      return () => {
        resizerRight.removeEventListener('mousedown', onMouseDownRightResize)
        resizerLeft.removeEventListener('mousedown', onMouseDownRightResize)
      }
    }

  }, [activeIndex]);


  return (
    <>
      <div className='resizeable'>
        {headers.map((item, i) => (
          <>
            <table
              ref={ref => (tableRef.current[i] = ref)}
              key={item}
              className='resizeable__table'
            >
              <thead className='resizeable__thead'>
                <tr className='resizeable__tr'>
                  <th className='resizeable__th'>
                    <div className='resizeable__thead-word'>{item}</div>
                    <div className='resizeable__thead-arrows'>
                      <div>
                        <ArrowLeft
                          onClick={() => {
                            if (i === 0) {
                              return;
                            }

                            swapElements(headers, i, i - 1)
                            swapElementsSize(size, i, i - 1)
                          }}
                        />
                      </div>
                      <div>
                        <ArrowRight
                          onClick={() => {
                            if (i === headers.length - 1) {
                              return;
                            }
                            swapElements(headers, i, i + 1)
                            swapElementsSize(size, i, i + 1)
                          }}
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className='resizeable__tbody'>
                <tr>
                  <td className='resizeable__tbody-td'>
                    {data.map(dataItem => {
                      switch (item) {
                        case 'Наименования':
                          return (
                            <div>{dataItem.name}</div>
                          );
                        case 'Артикул':
                          return (
                            <div>{dataItem.vendorCode}</div>
                          );
                        case 'Категория':
                          return (
                            <div>{dataItem.category}</div>
                          );
                        case 'Тип':
                          return (
                            <div>{dataItem.type}</div>
                          );
                        case 'Ед.изм.':
                          return (
                            <div>{dataItem.unitType}</div>
                          );
                        case 'Цена зак.':
                          return (
                            <div>{dataItem.perchasePrice}</div>
                          );
                        case 'Цена прод.':
                          return (
                            <div>{dataItem.salePrice}</div>
                          );
                        case 'Статус':
                          return (
                            <div>{dataItem.status}</div>
                          );

                        default:
                          break;
                      }
                    })}
                  </td>
                </tr>
              </tbody>
              <div
                ref={ref => (refRight.current[i] = ref)}
                className={classnames(
                  'resizer',
                  { 'resizer--disabled': i === headers.length - 1 }
                )}
                onMouseDown={(e) => {
                  if (i === headers.length - 1) {
                    return;
                  }
                  mouseDown(i)
                }}
              />

              <div
                ref={ref => (refLeft.current[i] = ref)}
                className={classnames(
                  'resizer',
                  'resizer--last',
                  { 'resizer--disabled': i === 0 }
                )}
                onMouseDown={() => {
                  if (i === 0) {
                    return;
                  }
                  mouseDown(i)
                }}
              />

            </table>
          </>

        ))}
      </div>
    </>
  )
}