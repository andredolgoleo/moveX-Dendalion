import React from 'react';
import './styles/CategoryManagement.scss';
import { ReactComponent as SettingIcon } from '../Menu/Functionality/img/settingIcon.svg';
import { ReactComponent as Burger } from './img/burger.svg';
import { ReactComponent as ArrowOpened } from './img/arrowOpened.svg';
import SimpleBarReact from "simplebar-react";
import "simplebar/src/simplebar.css";
import { CategoryManagementTree } from './CategoryManagementTree'

type Props = {
  data: any[]
}

export const CategoryManagement: React.FC<Props> = ({ data }) => {

  return (
    <>
      <div className='category-management'>
        <div className="category-management__header">
          <h1 className='category-management__title'>Управление категориями</h1>
          <div className='category-management__header--icon-bottom'><SettingIcon /></div>
        </div>

        <div className='category-management__body'>
          <SimpleBarReact
            style={{
              maxHeight: '70vh',
            }}
            forceVisible="y"
            autoHide={false}
            scrollbarMinSize={303}
          >
            <CategoryManagementTree data={data} />
          </SimpleBarReact>
        </div>

        <div className="category-management__footer">
          <p className='category-management__footer-text'>Максимальная глубина вложений: 5</p>
        </div>
      </div>
    </>
  )
}