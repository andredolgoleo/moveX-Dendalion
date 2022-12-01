import React, {useEffect, useRef} from "react";
import {ReactComponent as CloseIcon} from "./img/closeIcon.svg";

import './styles/PopUpVerification.scss'
import {log} from "util";

type Props = {
  handleOnConfirm: () => void,
  handleOnCancel: () => void,
}

export const PopUpVerification: React.FC<Props> = ({handleOnConfirm, handleOnCancel}) => {
  const popUpRef = useRef(null);

  useEffect(() => {
    const handleOnClick = (e: any) => {
      if (e.target.className !== 'popUpVerification') return;
      handleOnCancel();
    }

    document.addEventListener('click', handleOnClick, true);

    return () => {
      document.removeEventListener('click', handleOnClick, true);
    }
  }, [popUpRef])

  return (
    <div ref={popUpRef} onClick={(e) => console.log(e.currentTarget)} className={'popUpVerification'}>
      <div className={'popUpVerification__item'}>
        <p className={'popUpVerification__text'}>
          Увага! Ви збираєтесь увімкнути ведення партійного обліку для даного товару. Після погодження дану дію
          неможливо буде відмінити! А також в усіх рухах по товару обов’язково потрібно буде вказувати партію товару
        </p>

        <div className="popUpVerification__buttons">
          <button className="popUpVerification__button popUpVerification__button--confirm" onClick={handleOnConfirm}>Погодитись</button>
          <button className="popUpVerification__button popUpVerification__button--cancel" onClick={handleOnCancel}>Скасувати</button>
        </div>
      </div>
    </div>
  )
}