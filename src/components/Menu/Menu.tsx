import React from 'react';

import { Functionality } from './Functionality';
import { Filter } from './Filter';

import './styles/Menu.scss';

export const Menu: React.FC = () => {

  return (
    <>
      <div className='menu__functionality'>
        <Functionality />
      </div>

      <div className="menu__filter filter">
        <Filter />
      </div>
    </>
  );
};