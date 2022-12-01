import React, { useEffect, useRef, useState } from 'react';

export default function useClickOutSide(isVisiable) {
  const [isShow, setIsShow] = useState(isVisiable);

  const ref = useRef(null);

  const handleOnClick = (e) => {

    if (e.target.tagName === 'SPAN' && !e.target.className.includes('active')) {
      setTimeout(() => {
        setIsShow(false);
      }, 50)
    }
    if (ref.current && !ref.current.contains(e.target)) {
      if (e.target.className.includes('active')) {
        return;
      }
      setIsShow(false);
    }

  }

  useEffect(() => {
    document.addEventListener('click', handleOnClick, true);

    return () => {
      document.removeEventListener('click', handleOnClick, true);
    }
  }, [])

  return { ref, isShow, setIsShow };
}
