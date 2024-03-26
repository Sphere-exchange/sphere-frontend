import * as React from 'react'
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import '../styles/font.module.css'

const marks = [
  {
    value: 0,
  },
  {
    value: 25,
  },
  {
    value: 50,
  },
  {
    value: 75,
  },
  {
    value: 99,
  },
]

const PrettoSlider = styled(Slider)({
  color: '#98978D',
  height: 6,
  '& .MuiSlider-track': {
    border: 'none',
    color: '#ffffff',
  },
  '& .MuiSlider-thumb': {
    height: 16,
    width: 16,
    backgroundColor: '#000000',
    border: '3px solid currentColor',
    borderColor: '#ffffff',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#000000',
    height: 10,
    width: 10,
    borderRadius: '50% 50% 50% 50%',
    border: '2px solid #98978D',
    borderColor: '#ffffff',
    '&.MuiSlider-markActive': {
      opacity: 1,
      backgroundColor: '#000000',
      border: '2px solid #ffffff',
    },
  },
  '& .MuiSlider-valueLabel': {
    fontFamily: 'IBM Plex Mono',
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 26,
    height: 26,
    fontWeight: 'bold',
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#ffffff',
    color: 'black',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

interface Props {
  price: string
  balances: string
  value: number
  setAmount: (amount: string) => void
  setTotal: (total: string) => void
  setValue: (value: number) => void
  isBuy?: boolean
  isSell?: boolean
  isMarket?: boolean
}

export default function CustomizedSlider({
  price,
  balances,
  setAmount,
  setTotal,
  setValue,
  value,
  isBuy,
  isSell,
  isMarket,
}: Props) {
  // const [value, setValue] = React.useState<number>(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setValue(newValue)
      if (isMarket == undefined) {
        if (isBuy != undefined && isBuy == true) {
          setAmount(
            ((Number(balances) * (newValue / 100)) / Number(price)).toFixed(5)
          )
          setTotal((Number(balances) * (newValue / 100)).toFixed(5))
        }
        if (isSell != undefined && isSell == true) {
          setAmount((Number(balances) * (newValue / 100)).toFixed(5))
          setTotal(
            (Number(balances) * (newValue / 100) * Number(price)).toFixed(5)
          )
        }
      } else {
        if (isBuy != undefined && isBuy == true) {
          setAmount((Number(balances) * (newValue / 100)).toFixed(5))
        }
        if (isSell != undefined && isSell == true) {
          setAmount((Number(balances) * (newValue / 100)).toFixed(5))
        }
      }
    }
  }

  return (
    <div className="flex w-[90%] sm:w-[95%] lg:w-[98%]">
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        marks={marks}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
