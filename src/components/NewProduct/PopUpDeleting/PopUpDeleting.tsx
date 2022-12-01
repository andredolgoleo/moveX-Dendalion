import React, {useEffect, useRef} from "react";
import './styles/PopUpDeleting.scss'

type Props = {
  handleOnCancel: () => void,
  handleOnDelete: () => void,
}

export const PopUpDeleting: React.FC<Props> = ({ handleOnCancel, handleOnDelete }) => {

  const popUpRef = useRef(null);

  useEffect(() => {
    const handleOnClick = (e: any) => {
      if (e.target.className !== 'popUpDeleting') return;
      handleOnCancel();
    }

    document.addEventListener('click', handleOnClick, true);

    return () => {
      document.removeEventListener('click', handleOnClick, true);
    }
  }, [popUpRef])

  return (
    <div ref={popUpRef} className={'popUpDeleting'}>
      <div className="popUpDeleting__item">
        <div className="popUpDeleting__text">Удалить это фото?</div>
        <div className="popUpDeleting__buttons">
          <button onClick={handleOnCancel} className="popUpDeleting__button popUpDeleting__button--cancel">Отмена</button>
          <button onClick={handleOnDelete} className="popUpDeleting__button popUpDeleting__button--delete">Удалить</button>
        </div>
      </div>
    </div>
  )
}