import React, { useRef, useState, useEffect } from 'react';

import { ReactComponent as SaveButton } from './img/saveButton.svg';
import { RangeSlider } from './RangeSlider';
import './styles/Filter.scss';
import { DropDown } from './DropDownInput';

type Props = {
  handleOnFilter: ({ name, status }: any) => void,
  handleOnClear: () => void,
  uniqueNameItems: string[],
};

type PropsRange = {
  opened: any,
  onClose: any,
  weight: any,
  handleOnSetWeight: any
};

const RangePickerArea: React.FC<PropsRange> = ({ opened, onClose, weight, handleOnSetWeight }) => {
  const rangePickerRef = useRef<any>(null);

  useEffect(() => {

    const handleOnClick = (e: any) => {
      if (!opened) {
        return;
      }

      if (!rangePickerRef.current) {
        return;
      }

      if (!rangePickerRef.current.contains(e.target)) {
        onClose();
      }
    }
    setTimeout(() => {
      document.addEventListener('click', handleOnClick);
    }, 200)

    return () => {
      document.removeEventListener('click', handleOnClick);
    }
  }, [opened])


  return (
    <>
      {opened && (
        <div
          className='no_focus'
          ref={rangePickerRef}
        >
          <RangeSlider weight={weight} handleOnSetWeight={handleOnSetWeight} />
        </div>
      )}
    </>
  )
};

export const Filter: React.FC<Props> = ({ handleOnFilter, handleOnClear, uniqueNameItems, }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');

  const [currentUniqueNames, setCurrentUniqueNames] = useState<any[]>([]);

  const [isRangePicker, setIsRangePicker] = useState(false);
  const [weight, setWeight] = useState<number[]>([20, 50]);
  const [weightValue, setWeightValue] = useState<number>(0);

  const [nameDropDown, setNameDropDown] = useState(false);

  const nameDropDownRef = useRef<any>(null);

  const onClose = () => {
    setIsRangePicker(false);
  }

  const handleOnClickDropItem = (value: string) => {
    setName(value);
  };

  useEffect(() => {
    if (weightValue) {
      setWeight([+weightValue, +weightValue])
    }

    const handleOnClick = (e: any) => {
      if (!nameDropDown) {
        return;
      }

      if (!nameDropDownRef.current) {
        return;
      }

      if (!nameDropDownRef.current.contains(e.target)) {
        setNameDropDown(false);
      }
    }
    setTimeout(() => {
      document.addEventListener('click', handleOnClick);
    }, 200)

    return () => {
      document.removeEventListener('click', handleOnClick);
    }
  }, [weightValue, nameDropDown])


  const handleOnSetWeight = (value: number[]) => {
    if (value[0] > value[1]) {
      return;
    }
    setWeight(value)
  }

  return (
    <>
      <h2 className='filter__title'>Фильтры</h2>
      <form
        className='filter__form form'
        action=""
        onSubmit={(e) => {
          e.preventDefault();

          handleOnFilter({ name, status });
        }}
        onReset={(e) => {
          e.preventDefault();
          setName('')
          handleOnClear(); //
        }}
      >
        <div className='form__input-wrapper--first'>
          <input
            value={name}
            onInput={(e) => {
              setName(e.currentTarget.value);

              setTimeout(() => {
                setCurrentUniqueNames(uniqueNameItems.filter(item => item.toLowerCase().includes(name.toLowerCase())))
              }, 50)
            }}
            className='form__input'
            type="text"
            placeholder='Наименование'
            onClick={() => {
              setNameDropDown(!nameDropDown)
            }}
          />

          <div ref={nameDropDownRef}>
            {nameDropDown && (
              <DropDown handleOnClickDropItem={handleOnClickDropItem} options={currentUniqueNames} />
            )}
          </div>

        </div>
        <input
          value={status}
          onInput={(e) => setStatus(e.currentTarget.value)}
          className='form__input'
          type="text"
          placeholder='Наименование на английском'
        />
        <input
          className='form__input'
          type="text"
          placeholder='Описание'
        />
        <input
          className='form__input'
          type="text"
          placeholder='Категория'
        />

        <span className='form__input--group first-group'>
          <input
            className='form__input'
            type="text"
            placeholder='Тип'
          />
          <input
            className='form__input'
            type="text"
            placeholder='Артикул'
          />
        </span>

        <span className='form__input--group second-group'>
          <input
            className='form__input'
            type="text"
            placeholder='ID товара'
          />
          <input
            className='form__input'
            type="text"
            placeholder='Партийный учёт'
          />
          <input
            className='form__input'
            type="text"
            placeholder='ПДВ'
          />
        </span>

        <div className='form__weight'>
          <input
            className='form__input'
            type="text"
            placeholder='Масса'
            // value={`${weight[0]}-${weight[1]}`}
            onInput={(e) => {
              setWeightValue(+e.currentTarget.value)
            }}
            onClick={() => {
              setIsRangePicker(true);
            }}
          />

          <RangePickerArea opened={isRangePicker} onClose={onClose} weight={weight} handleOnSetWeight={handleOnSetWeight} />
        </div>
        <input
          className='form__input'
          type="text"
          placeholder='Объём'
        />
        <input
          className='form__input'
          type="text"
          placeholder='Ед.измерения'
        />

        <span className='form__buttons'>
          <button
            className='form__accept'
            type="submit"
          >
            Применить
          </button>
          <button
            className='form__reset'
            type="reset"
          >
            Очистить
          </button>
          <div className='form__save'><SaveButton /></div>
        </span>
      </form>
    </>
  );
}