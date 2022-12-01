import React, { useState } from 'react';

export const Test = () => {
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(50);

  return (
    <>
      {/* <input
        onInput={(e) => {
          if (+e.currentTarget.value > value2) {
            e.preventDefault()
            return
          } 
          setValue1(+e.currentTarget.value)
        }}
        value={value1}
        type="number" />
      <input
        onInput={(e) => {
          setValue2(+e.currentTarget.value)
        }}
        value={value2} type="number" /> */}
    </>
  );
}