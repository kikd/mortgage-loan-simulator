import React from 'react'
import { TextField, TextFieldProps } from '@mui/material'

export interface NumberInputProps extends Omit<TextFieldProps, 'type' | 'onChange'> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)
    if (!isNaN(newValue)) {
      onChange(newValue)
    }
  }

  return (
    <TextField
      {...props}
      type="number"
      value={value}
      onChange={handleChange}
      inputProps={{
        min,
        max,
        step,
      }}
      fullWidth
      variant="outlined"
    />
  )
}