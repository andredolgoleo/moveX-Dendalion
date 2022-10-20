import React from 'react';

import { ReactComponent as SaveButton } from './img/saveButton.svg';


import './styles/Filter.scss'

export const Filter: React.FC = () => {
  return (
    <>
      <h2 className='filter__title'>Фильтры</h2>
      <form className='filter__form form' action="">
        <input className='form__input' type="text" placeholder='Наименование'/>
        <input className='form__input' type="text" placeholder='Наименование на английском'/>
        <input className='form__input' type="text" placeholder='Описание'/>
        <input className='form__input' type="text" placeholder='Категория'/>

        <span className='form__input--group first-group'>
          <input className='form__input' type="text" placeholder='Тип'/>
          <input className='form__input' type="text" placeholder='Артикул'/>
        </span>

        <span className='form__input--group second-group'>
          <input className='form__input' type="text" placeholder='ID товара'/>
          <input className='form__input' type="text" placeholder='Партийный учёт'/>
          <input className='form__input' type="text" placeholder='ПДВ'/>
        </span>

        <input className='form__input' type="text" placeholder='Масса'/>
        <input className='form__input' type="text" placeholder='Объём'/>
        <input className='form__input' type="text" placeholder='Ед.измерения'/>

        <span className='form__buttons'>
          <button className='form__accept' type="submit">Применить</button>
          <button className='form__reset' type="reset">Очистить</button>
          <div className='form__save'><SaveButton /></div>
        </span>
      </form>
    </>
  );
}