import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as SettingIcon } from './img/settingIcon.svg';
import { ReactComponent as SettingIconDisabled } from './img/settingIconDisabled.svg';
import { ReactComponent as DoubleChevron } from './img/doubleChevron.svg';
import { ReactComponent as Search } from './img/searchIcon.svg';
import { ReactComponent as SettingsFieldsIcon } from './img/settingsFieldsIcon.svg';
import { ReactComponent as ShowImagIcon } from './img/showImageIcon.svg';
import listenForOutsideClicks from './handleClickOutSide';

import './styles/Functionality.scss';

type Props = {
  onChangeImageView: (state: boolean) => void,
  onCategoryButton: (state: boolean) => void,
}

export const Functionality: React.FC<Props> = ({
  onChangeImageView,
  onCategoryButton
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [listening, setListening] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  console.log(isCategoryOpen);


  const settingsOpenRef = useRef<any>(null);

  useEffect(
    listenForOutsideClicks(listening, setListening, settingsOpenRef, setIsSettingsOpen
    ));

  return (
    <>
      <div className="menu__header">
        <span className='menu__title'>
          <h1 className='title'>Товары</h1>
          {isSettingsOpen
            ? (
              <div ref={settingsOpenRef} className='settings'>
                <SettingIcon className='settings__icon' onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen)
                }} />
                <div className="settings__open">
                  <div className='settings__open--actions'>
                    <span>Параметры для отображения</span>
                    <div className='settings__open--actions-buttons'>
                      <div className='settings__open-fields-settings--wrapper'>
                        <div className='settings__open--fields-settings'><SettingsFieldsIcon /> Настройка полей</div>
                      </div>
                    </div>
                  </div>
                  <form action="">
                    <span>
                      <label className="container">
                        <span>
                          Наименование
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Артикул
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Категория
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Тип
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Ед.изм
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Цена зак.
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Цена.прод.
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Статус
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          ПДВ
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          ID
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Описание
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </span>
                    <span>
                      <label className="container">
                        <span>
                          <span>Наименование</span>
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Поставщик
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Габариты
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Объект
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Масса
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Партийный вид
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>Мин. цена продажи</span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                      <label className="container">
                        <span>
                          Макс.размер скидки
                        </span>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </span>
                  </form>
                </div>
              </div>
            )
            : (
              <div ref={settingsOpenRef} className='settings'>
                <SettingIcon className='settings__icon' onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen)
                }} />
                <div className='settings__show-image-switcher'>
                  <ShowImagIcon
                    onClick={() => {
                      onChangeImageView(!showImage)
                      setShowImage(!showImage);
                    }}
                  />
                </div>
              </div>
            )}
        </span>
        <span className='menu__hide_switcher'><DoubleChevron /> Скрыть</span>
      </div>
      <div className="menu__buttons buttons">
        <div className='menu__buttons-first-section'>
          <input type="text" placeholder='Введите запрос...' />
          <button type='button' className='buttons__search-icon'><Search /></button>
        </div>

        <div className="menu__buttons-second-section">
          <button className='buttons__button'>Товар +</button>
        </div>

        <div className="menu__buttons-third-section">
          <button
            className='buttons__button'
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              onCategoryButton(!isCategoryOpen);
            }}
          >
            Категория +
          </button>
        </div>

        <div className="menu__buttons-fourth-section">
          <button className='buttons__button'>Дублировать</button>
        </div>

        <div className="menu__buttons-fifth-section">
          <button className='buttons__button'>Управление категориями</button>
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
    </>
  );
};

const higherOrderComponent = (Functionality: any) => {
  class HOC extends React.Component {
    render() {
      return <Functionality />
    }
  }
  return HOC
}