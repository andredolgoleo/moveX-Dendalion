import React, {useContext, useState} from "react";
import classnames from "classnames";
import {ReactComponent as ArrowOpened} from "../../CategoryManagement/img/arrowOpened.svg";
import {ReactComponent as ArrowClosed} from "../../CategoryManagement/img/arrowClosed.svg";
import {ReactComponent as ActiveBurger} from "../../CategoryManagement/img/activeBurger.svg";
import {ReactComponent as Burger} from "../../CategoryManagement/img/burger.svg";
import {v4 as uuidv4} from "uuid";

import './styles/CategoryTreeViewNewProduct.scss';
import {ContextNewProductCategory} from "../../Context/ContextNewProductCategory";

type Props = {
  data: any
}

export const CategoryTreeViewProduct: React.FC<Props> = ({data}) => {

  return (
    <>
      <ul className='category-management-new-product__list'>
        {data.map((node: any) => (
          <CategoryTreeViewProductNode key={uuidv4()} node={node}/>
        ))}
      </ul>
    </>
  )
}

type NodeProps = {
  node: any
}

export const CategoryTreeViewProductNode: React.FC<NodeProps> = ({node}) => {
  const {label, children} = node;

  const { handleOnClick } = useContext(ContextNewProductCategory);

  const [showChildren, setShowChildren] = useState(false);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };

  return (
    <>
      <li className='category-management-new-product__item'>
        <div className={classnames(
          'category-management-new-product__item-content',
        )}>
          <>
            <div className={classnames('category-management-new-product__active-burger')}>
              <div className='category-management-new-product__active-burger--flex'>
                {showChildren ? (
                  <ArrowOpened onClick={handleClick} className='arrow-opened'/>
                ) : (
                  <ArrowClosed onClick={handleClick} className='arrow-opened'/>
                )}
                <span onClick={() => handleOnClick(label)}>{label}</span>
              </div>
            </div>
          </>
        </div>
        {(showChildren && children) && (
          <CategoryTreeViewProduct data={children}/>
        )}
      </li>
    </>
  )
}
