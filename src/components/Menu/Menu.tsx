import React from 'react';

import { Functionality } from './Functionality';
import { Filter } from './Filter';

import './styles/Menu.scss';

type Props = {
  onChangeImageView: (state: boolean) => void,
  onCategoryButton: (state: boolean) => void,
}

export const Menu: React.FC<Props> = ({
  onChangeImageView,
  onCategoryButton
}) => {

  return (
    <>
      <div className='menu__functionality'>
        <Functionality
          onCategoryButton={onCategoryButton}
          onChangeImageView={onChangeImageView}
        />
      </div>

      <div className="menu__filter filter">
        <Filter />
      </div>
    </>
  );
};