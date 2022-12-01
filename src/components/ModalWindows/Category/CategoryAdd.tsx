import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as PopUpClose } from './img/popUpClose.svg';
import { ReactComponent as RedStarValidation } from './img/validationIcon.svg';
import { ReactComponent as DropDownIcon } from './img/dropDown.svg';
import { Tree } from "./Tree";

import './styles/Pop-up.scss';
import classNames from 'classnames';

import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";

import useClickOutSide from '../../myHook/useClickOutSide/useClickOutSide'

type Props = {
  handleOnCategoryButton: (state: boolean) => void,
  handleOnCreateNewCategory: (label: string, childrenArr: string, description: string) => void,
  handleOnSuccesMassage: () => void,
  data: any[]
}

export const CategoryAdd: React.FC<Props> = ({ handleOnCategoryButton, handleOnCreateNewCategory, data, handleOnSuccesMassage }) => {
  const [categoryName, setCategoryName] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>('');
  const [categoryChildren, setCategoryChildren] = useState<undefined | any[]>(undefined);
  const [description, setDescription] = useState<string>('');

  const { ref, isShow, setIsShow } = useClickOutSide(false);

  const popUpRef = useRef<any>(null);

  useEffect(() => {
    const handleOnClick = (e: MouseEvent) => {

      if (popUpRef) {
        if (popUpRef.current && !popUpRef.current.contains(e.target)) {
          handleOnCategoryButton(false)
        }
      }
    }

    document.addEventListener('click', handleOnClick, true);

    return () => {
      document.removeEventListener('click', handleOnClick, true);
    }
  }, [])

  const validationFunction = (categoryName: string, categoryValue: string) => {
    if (categoryName && categoryValue) {
      return true;
    }

    return false;
  }

  const handleOnInput = (value: string, setState: (value: string) => void) => {
    setState(value);
  }

  const handleOnCategorySelect = (value: string, childrenArr: any[]) => {
    console.log(value);
    
    setCategoryValue(value);
    setCategoryChildren(childrenArr)
  }

  return (
    <div className="category-plus__pop-up pop-up">
      <div className="pop-up__container">
        <div ref={popUpRef} className="pop-up__item">
          <div className="pop-up__close">
            <PopUpClose onClick={() => {
              handleOnCategoryButton(false)
            }} />
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();

              handleOnCategoryButton(false);
              handleOnSuccesMassage()
              handleOnCreateNewCategory(categoryName, categoryValue, description);

            }}
            className="pop-up__form form"
          >
            <h2 className='form__title'>Добавить категорию</h2>
            <div className="form__input--wrapper">
              <input
                maxLength={50}
                placeholder='Имя категории'
                className='form__input'
                type="text"
                value={categoryName}
                onInput={(e) => (
                  handleOnInput(e.currentTarget.value, setCategoryName)
                )}
              />
              {!categoryName && (
                <RedStarValidation className="form__input--validation" />
              )}
            </div>

            <div className="form__input--wrapper">
              <div
                className='form__input drop-down--open'
              >
                <div
                  className={classNames({ 'drop-down--open-active': isShow, 'drop-down--open-value': categoryValue })}
                  onClick={() => setIsShow(!isShow)}
                >
                  {categoryValue ? (
                    categoryValue
                  ) : (
                    'Входит в категорию'
                  )}
                  <div className="form__input--icons-wrapper">
                    <DropDownIcon />

                    {!categoryValue && (
                      <RedStarValidation />
                    )}
                  </div>
                </div>
                {isShow && (

                  <div ref={ref} className="form__input-drop-down--wrapper">
                    <SimpleBarReact
                      style={{
                        maxHeight: 160,
                      }}
                      forceVisible="y"
                      autoHide={false}
                      scrollbarMinSize={15}
                    >
                      <Tree handleOnCategorySelect={handleOnCategorySelect} treeData={data} />
                    </SimpleBarReact>
                  </div>


                )}
              </div>

            </div>

            <div className="form__input--wrapper">
              <textarea
                onInput={(e) => {
                  setDescription(e.currentTarget.value);
                }}
                value={description}
                maxLength={150}
                placeholder='Описание'
                className='form__input description'
              />
            </div>
            <div className="form__button--wrapper">
              <button
                type="submit"
                disabled={!validationFunction(categoryName, categoryValue)}
                className={classNames(
                  'form__button',
                  'button__save-new-category',
                  { 'button__save-new-category--active': validationFunction(categoryName, categoryValue) },
                )}
              >
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
}