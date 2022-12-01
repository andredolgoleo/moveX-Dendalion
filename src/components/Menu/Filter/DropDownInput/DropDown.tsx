import React, { useState, useEffect, useRef } from 'react';
import './styles/DropDown.scss';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  options: any[],
  handleOnClickDropItem?: (value: string) => void
}

export const DropDown: React.FC<Props> = ({ options, handleOnClickDropItem }) => {

  const labelRef = useRef<any>([]);

  const [showDropDown, setShowDropDown] = useState(true);

  useEffect(() => {
    const handler = () => {

      document.addEventListener('click', handler);

      return () => {
        document.removeEventListener('click', handler);
      };
    }
  }, []);

  const handleInputClick = (e: any) => {
    setShowDropDown(!showDropDown);
  }

  return (
    <>

      {showDropDown && (
        <div className="dropdown-menu">
          {options.map((option: any, i) => (
            <>
              <div className='dropdown-items'>
                <label ref={ref => (labelRef.current[i] = ref)} className="container"><input type="checkbox" /><span className="checkmark"></span></label>
                <div
                  id='option'
                  className="dropdown-item"
                  key={uuidv4()}
                  onClick={(e) => {
                    labelRef.current[i].click();
                    if (handleOnClickDropItem) {
                      handleOnClickDropItem(e.currentTarget.innerText)
                    }

                  }}
                >
                  {option}
                </div>
              </div>
            </>
          ))}
        </div>
      )}

    </>
  );
}