import React, {useEffect, useRef, useState, useContext} from 'react';

import {ReactComponent as SettingIcon} from './img/settingIcon.svg';
import {ReactComponent as SettingIconDisabled} from './img/settingIconDisabled.svg';
import {ReactComponent as DoubleChevron} from './img/doubleChevron.svg';
import {ReactComponent as Search} from './img/searchIcon.svg';
import {ReactComponent as SettingsFieldsIcon} from './img/settingsFieldsIcon.svg';
import {ReactComponent as ShowImagIcon} from './img/showImageIcon.svg';

import {Context} from '../../Context/Context';
import {ContextButtonHide} from "../../Context/ContextButtonHide";

import useClickOutSide from '../../myHook/useClickOutSide/useClickOutSide';

import {v4 as uuidv4} from 'uuid';

import './styles/Functionality.scss';
import {Link} from "react-router-dom";
import {ContextCheckBoxTable} from "../../Context/ContextCheckBoxTable";

type Props = {
  onChangeImageView: (state: boolean) => void,
  onCategoryButton: (state: boolean) => void,
  handleOnSettingsFields: (state: boolean) => void,
  handleOnChangeDublicateButton: (state: boolean) => void,
  handleOnFilter: ({name, status}?: any) => void,
  handleOnCategoryManagementChange: () => void,
  handleOnClear: () => void,
  handleOnCheckbox: (item: string) => void,
  headers: string[],
}

export const Functionality: React.FC<Props> = ({
                                                 onChangeImageView,
                                                 onCategoryButton,
                                                 handleOnSettingsFields,
                                                 handleOnChangeDublicateButton,
                                                 handleOnFilter,
                                                 handleOnCategoryManagementChange,
                                                 handleOnClear,
                                                 handleOnCheckbox,
                                                 headers,
                                               }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [listening, setListening] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSettingsFields, setIsSettingsFields] = useState(false);

  const [name, setName] = useState('');

  const {ref, isShow, setIsShow} = useClickOutSide();

  const {doubleButtton} = useContext(Context);
  const {hideButton, handleOnHideButton} = useContext(ContextButtonHide)
  const { checkedItems } = useContext(ContextCheckBoxTable);

  const handleClickOnSettingFields = (state: boolean) => {
    handleOnSettingsFields(state);
    setIsSettingsFields(state);
  };

  let status = ''; // don't worry about this

  const names = [
    'Наименования',
    'Артикул',
    'Категория',
    'Тип',
    'Ед.изм.',
    'Цена зак.',
    'Цена прод.',
    'Статус',
    'ПДВ',
    'ID',
    'Описание',
  ];

  const namesTwo = [
    'Наименование на английском',
    'Поставщик',
    'Габариты',
    'Объем',
    'Масса',
    'Партийный вид',
    'Мин. цена продажи',
    'Макс. цена скидки',
  ];

  const settingsOpenRef = useRef<any>(null);

  // useEffect(
  //   listenForOutsideClicks(listening, setListening, settingsOpenRef, setIsSettingsOpen
  //   ));

  return (
    <>
      <div className="menu__header">
        <span className='menu__title'>
          <h1 className='title'>Товары</h1>
          {isShow
            ? (
              <div ref={ref} className='settings'>
                <SettingIcon className='settings__icon' onClick={() => {
                  setIsShow(!isShow)
                  // setIsSettingsOpen(!isSettingsOpen)
                }}/>
                <div className="settings__open">
                  <div className='settings__open--actions'>
                    <span>Параметры для отображения</span>
                    <div className='settings__open--actions-buttons'>
                      <div className='settings__open-fields-settings--wrapper'>
                        <div
                          className='settings__open--fields-settings'
                          onClick={() => handleClickOnSettingFields(!isSettingsFields)}
                        >
                          <SettingsFieldsIcon/> Настройка полей
                        </div>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <div>
                      {names.map(name => (
                        <Checkbox headers={headers} handleOnCheckbox={handleOnCheckbox} key={uuidv4()} name={name}/>
                      ))}
                    </div>
                    <div>
                      {namesTwo.map(name => (
                        <Checkbox headers={headers} handleOnCheckbox={handleOnCheckbox} key={uuidv4()} name={name}/>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            )
            : (
              <div ref={settingsOpenRef} className='settings'>
                <SettingIcon className='settings__icon' onClick={() => {
                  setIsShow(!isShow)
                  setIsSettingsOpen(!isSettingsOpen)
                }}/>
                {!hideButton && (
                  <div className='settings__show-image-switcher'>
                    <ShowImagIcon
                      onClick={() => {
                        onChangeImageView(!showImage)
                        setShowImage(!showImage);
                      }}
                    />
                  </div>
                )}
              </div>
            )}
        </span>
        <span
          className='menu__hide_switcher'
          onClick={() => handleOnHideButton()}
        >
          <DoubleChevron/> {!hideButton ? ('Скрыть') : ('Раскрыть')}
        </span>
      </div>
      {!hideButton && (
        <div className="menu__buttons buttons">
          <div className='menu__buttons-first-section'>
            <input
              value={name}
              type="text"
              placeholder='Введите запрос...'
              onInput={(e) => {
                setName(e.currentTarget.value);

                if (e.currentTarget.value.length < 1) {
                  handleOnFilter({name, status})
                }

                if (e.currentTarget.value.length > 2) {
                  handleOnFilter({name, status})
                  return;
                }
              }}
            />
            <button type='button' className='buttons__search-icon'><Search/></button>
          </div>

          <div className="menu__buttons-second-section">
            <Link to={'new-product'}>
              <button className='buttons__button'>Товар + </button>
            </Link>
          </div>
          {/*onClick={() => handleOnChangeNewProduct(true)}*/}
          <div className="menu__buttons-fourth-section">
            <button onClick={() => handleOnChangeDublicateButton(true)} disabled={doubleButtton} className='buttons__button'>Дублировать товар(-ы)</button>
          </div>

          <div className="menu__buttons-third-section">
            <button
              className='buttons__button'
              onClick={() => {
                setIsCategoryOpen(true);
                onCategoryButton(true);
              }}
            >
              <div className='buttons__button--text'>Категория +</div>
            </button>
          </div>

          <div className="menu__buttons-fifth-section">
            <button onClick={() => {
              handleOnCategoryManagementChange()
            }} className='buttons__button'>Управление категориями
            </button>
          </div>

          <div className="menu__buttons-sixth-section">
            <button disabled className='buttons__button'>Посмотреть остатки</button>
          </div>

          <div className="menu__buttons-seventh-section">
            <button className='buttons__button smaller__button'>Импорт</button>
            <button className='buttons__button smaller__button'>Экспорт</button>
            <button className='buttons__button smaller__button'>Печать</button>
          </div>
        </div>
      )}
    </>
  );
};

type CheckboxProps = {
  name: string,
  headers: string[],
  handleOnCheckbox: (item: string) => void,
}

const Checkbox: React.FC<CheckboxProps> = ({name, handleOnCheckbox, headers}) => {
  const [visible, setSVisiable] = useState(false);

  useEffect(() => {
    if (headers.find(item => item === name)) {
      setSVisiable(true);
    }
  }, []);

  return (
    <label
      onClick={(e) => {
        if (headers.find(item => item === name)) {
          setSVisiable(false)
          // return
        }
        handleOnCheckbox(e.currentTarget.innerText)
      }}
      className="container"
    >
      <span className='active'>
        {name}
      </span>
      <input checked={visible} type="checkbox"/>
      <span className="checkmark active"></span>
    </label>
  );
}


