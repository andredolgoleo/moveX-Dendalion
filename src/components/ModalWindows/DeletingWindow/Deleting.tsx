import React from "react";
import {ReactComponent as DeletingIcon} from "./img/trash.svg";
import './styles/Deleting.scss'

export const Deleting: React.FC = () => {

  return (
    <div className='delete-pop-up'>
      <DeletingIcon />
      Удалено!
    </div>
  )
}