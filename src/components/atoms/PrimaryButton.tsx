import React from 'react'
import { Button, ButtonProps } from '@mui/material'

export interface PrimaryButtonProps extends ButtonProps {
  loading?: boolean
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  loading = false,
  ...props
}) => {
  return (
    <Button
      {...props}
      variant="contained"
      color="primary"
      disabled={loading || props.disabled}
      size="large"
      sx={{
        borderRadius: 2,
        textTransform: 'none',
        fontWeight: 600,
        py: 1.5,
        ...props.sx,
      }}
    >
      {loading ? '計算中...' : children}
    </Button>
  )
}
