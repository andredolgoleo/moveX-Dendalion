import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './styles/RangeSlider.scss';
import { useEffect, useState } from 'react';
import { Test } from './Test';

type Props = {
  handleOnSetWeight: (value: number[]) => void,
  weight: number[]
};

export const RangeSlider: React.FC<Props> = ({ handleOnSetWeight, weight, }) => {

  const a = weight[1]
  const b = weight[0]

  const [valueFirst, setValueFirst] = useState<number>(b);
  const [valueSecond, setValueSecond] = useState<number>(weight[1]);

  const [value, setValue] = useState<number[]>([valueFirst, valueSecond]);

  console.log(weight[1], valueSecond, a, b)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  useEffect(() => {
    handleOnSetWeight(value);

  }, [value])

  return (
    <div className='range__picker'>
      <Test />

      <div className='range__picker--text'>
        <div className='range__picker--text-text'>
          от
          {/* <div
            onBlur={(e) => {
              setValueFirst(+e.currentTarget.innerText)

              setTimeout(() => {
                setValue([valueFirst, valueSecond])
              }, 50)
            }}
            onKeyUp={(e) => {
              if (+e.currentTarget.innerText > valueSecond) {
                setValueFirst(valueFirst)
                e.preventDefault();
              }
              console.log(123);
            }}
            onKeyDown={(e) => {
              if (e.code.includes('Backsp')) {
                return;
              }
              e.preventDefault()
              console.log(+e.currentTarget.innerText);

              if (e.code.includes('Key')) {
                e.preventDefault();
                return;
              }

              if (e.currentTarget.innerText.length > 2) {
                if (e.code.includes('Backsp')) {
                  return;
                }

                if (e.code.toLowerCase().includes('arr')) {
                  return
                }
                e.preventDefault();
              }

              if (+e.currentTarget.innerText > valueSecond) {
                // setValueFirst(valueFirst)
                e.preventDefault();
              }

            }}
            // onInput={(e: any) => {

            //   if (+e.currentTarget.innerText > 50) {
            //     console.log(123);
            //   }

            //   console.log(e.code)

            //   // setValueFirst(+e.currentTarget.innerText)
            //   console.log(valueFirst, valueSecond)

            // }}
            contentEditable
            suppressContentEditableWarning={true}
            className='range__picker-weight'
          >
            {weight[0]}
          </div> */}
          <input
            min={0}
            onClick={(e) => {
              e.currentTarget.value = b.toString();
            }}
            onInput={(e) => {
              if (+e.currentTarget.value > a) {
                e.preventDefault();
                return;
              }
              setValueFirst(+e.currentTarget.value)
            }}

            value={b} type="number" />
          кг
        </div>

        <div className='range__picker--text-text'>
          до
          <div
            onBlur={(e) => {
              setValueSecond(+e.currentTarget.innerText)
            }}
            onKeyDown={(e) => {
              if (e.code.includes('Key') && e.code.includes('Enter')) {
                e.preventDefault();
                return;
              }

              if (e.currentTarget.innerText.length > 2) {
                if (e.code.includes('Backsp')) {
                  return;
                }

                if (e.code.toLowerCase().includes('arr')) {
                  return
                }
                e.preventDefault();
              }
            }}
            contentEditable
            suppressContentEditableWarning={true}
            className='range__picker-weight'
          >
            {weight[1]}
          </div>
          кг
        </div>
      </div>
      <Box sx={{ width: '100%', margin: 0, zIndex: 1, }}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          sx={{
            'boxShadow': 'none',
            'color': '#5A8FFF',
            // 'color': 'red',
            '& .Mui-active: active': {
              all: 'unset',
            },
            '& css-eg0mwd-MuiSlider-thumb:hover': {
              all: 'unset',
            },
            '& .MuiSlider-track': {
              'border': 'none',
              'background': 'linear-gradient(180deg, #5A8FFF 100%, #003094 100%)'
            },
            '& .MuiSlider-thumb': {
              'width': 4,
              'height': 13,
              'borderRadius': 2,
              'background': 'linear-gradient(180deg, #5A8FFF 0%, #003094 100%)',
              '&::before': {
                'content': 'none'
              },
              '&::after': {
                'content': 'none'
              },
            },
          }}
        />
      </Box>
    </div>
  );
}
