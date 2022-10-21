import React, { useState } from 'react';

import { Menu } from './components/Menu';
import { Info } from './components/Info';
import { ReactComponent as PopUpClose } from './popUpClose.svg';


import './App.scss';
import './Pop-up.scss'

export const App: React.FC = () => {
  const [isImageView, setIsImageView] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);


  const handleOnChangeImageView = (state: boolean) => {
    setIsImageView(state);
  };

  const handleOnCategoryButton = (state: boolean) => {
    setIsCategoryOpen(state);
  };

  console.log(isImageView);
  return (
    <>
      {
        isCategoryOpen && (
          <div className="category-plus__pop-up pop-up">
            <div className="pop-up__container">
              <div className="pop-up__item">
                <div className="pop-up__close"><PopUpClose onClick={() => {
                  handleOnCategoryButton(!isCategoryOpen)
                }} /></div>
                <form className="pop-up__form form">
                  <h2 className='form__title'>Добавить категорию</h2>
                  <input placeholder='Имя категории' className='form__input' type="text" />
                  <input placeholder='Входит в категорию' className='form__input' type="text" />
                  <input placeholder='Описание' className='form__input description' type="text" />
                  <button className='form__button'>Сохранить</button>
                </form>
              </div>
            </div>
          </div>
        )
      }
      <div className="products">
        <section className='products__menu menu'>
          <Menu
            onCategoryButton={handleOnCategoryButton}
            onChangeImageView={handleOnChangeImageView}
          />
        </section>
        <section className='products__fields fields'>
          <Info isCategoryOpen={isCategoryOpen} isImageView={isImageView} />
        </section>
      </div>
    </>
  );
}
