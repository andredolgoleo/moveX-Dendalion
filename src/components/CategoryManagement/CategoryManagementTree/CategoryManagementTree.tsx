import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ReactComponent as Burger } from '../img/burger.svg';
import { ReactComponent as ActiveBurger } from '../img/activeBurger.svg';
import { ReactComponent as ArrowOpened } from '../img/arrowOpened.svg';
import { ReactComponent as ArrowClosed } from '../img/arrowClosed.svg';

import classnames from 'classnames'

type NodeProps = {
  node: any
}

export const CategoryManagementTreeNode: React.FC<NodeProps> = ({ node }) => {
  const { label, children } = node;

  const [showChildren, setShowChildren] = useState(false);
  const [showBurger, setShowBurger] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <li className='category-management__item'>
        <div className={classnames(
          'category-management__item-content',
          {
            'active-burger': showBurger
          }
        )}>
          {showBurger ? (
            <>
              <div className={classnames(
                'category-management__active-burger',
              )}>
                <div className='category-management__active-burger--flex'>
                  {showChildren ? (
                    <ArrowOpened onClick={handleClick} className='arrow-opened' />
                  ) : (
                    <ArrowClosed onClick={handleClick} className='arrow-opened' />
                  )}

                  {label}

                  <ActiveBurger onClick={() => setShowBurger(!showBurger)} />
                </div>

                
              </div>
              <div className='category-management__active-burger--under'>
                  <span className='active-burger--text purple'>Подкатегория +</span>
                  <span className='active-burger--text yellow'>Редактировать</span>
                  <span className='active-burger--text red'>Удалить</span>
                </div>
            </>
          ) : (
            <>
              <div>
                {showChildren ? (
                  <ArrowOpened onClick={handleClick} className='arrow-opened' />
                ) : (
                  <ArrowClosed onClick={handleClick} className='arrow-opened' />
                )}

                {label}
              </div>
              <Burger onClick={() => setShowBurger(!showBurger)} />
            </>
          )}

        </div>
        {(showChildren && children) && (
          <CategoryManagementTree data={children} />
        )}
      </li>
    </>
  )

}

type Props = {
  data: any[],
};

export const CategoryManagementTree: React.FC<Props> = ({ data }) => {
  return (
    <ul className='category-management__list'>
      {data.map((node) => (
        <CategoryManagementTreeNode key={uuidv4()} node={node} />
      ))}
    </ul>
  );
}