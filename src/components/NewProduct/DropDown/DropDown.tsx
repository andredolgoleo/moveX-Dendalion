import React, {useContext} from "react";
import {ContexDropDown} from "../../Context/ContexDropDown";
import {v4 as uuidv4} from "uuid";

type DropDownProps = {
  options: any[],
  dropDownName: string
}

export const DropDown: React.FC<DropDownProps> = ({options, dropDownName}) => {
  const { handleOnClick } = useContext(ContexDropDown);

  return (
    <>
      <div
        key={uuidv4()}
        style={{
          position: options.length > 10 ? ('relative') : 'absolute',
        }}
        className="new-product__dropdown-menu"
      >
        {options.map((option: any, i) => (
          <>

            <div className='new-product__dropdown-items'>
              <div
                className="new-product__dropdown-item"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => handleOnClick(e.currentTarget.innerText, dropDownName)}
              >
                {option}
              </div>
            </div>

          </>
        ))}
      </div>
    </>
  );
};