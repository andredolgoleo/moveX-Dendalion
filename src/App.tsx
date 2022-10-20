import React from 'react';
import './App.scss';
import { Menu } from './components/Menu';
import { Info } from './components/Info';

export const App: React.FC = () => {
  return (
    <div className="products">
      <section className='products__menu menu'>
        <Menu />
      </section>
      <section className='products__fields fields'>
        <Info />
      </section>
    </div>
  );
}
