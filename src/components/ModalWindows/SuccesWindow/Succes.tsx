import React from 'react';
import './style/Succes.scss';

import { ReactComponent as SuccesIcon } from './img/succes.svg';

export const Succes: React.FC = () => {
  return (
    <div className='succes-pop-up'>
      <SuccesIcon />
      Сохранено!
    </div>
  )
}