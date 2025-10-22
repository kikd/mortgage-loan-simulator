import React from 'react'
import { FormControl, FormLabel } from '@mui/material'
import { NumberInput, NumberInputProps } from '../atoms'

export interface InputFieldProps extends NumberInputProps {
  label: string
}

export const InputField: React.FC<InputFieldProps> = ({ label, ...props }) => {
  return (
    <FormControl fullWidth margin="normal">
      <FormLabel component="legend" sx={{ mb: 1, fontWeight: 600 }}>
        {label}
      </FormLabel>
      <NumberInput {...props} />
    </FormControl>
  )
}
