import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import { formatCurrency } from '../../utils/loanCalculations'

export interface ResultCardProps {
  title: string
  // allow either a numeric value or a preformatted string (e.g. range)
  value: number | string
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
}

export const ResultCard: React.FC<ResultCardProps> = ({
  title,
  value,
  color = 'primary',
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        borderLeft: 4,
        borderLeftColor: `${color}.main`,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          color={`${color}.main`}
          fontWeight="bold"
        >
          {typeof value === 'number' ? formatCurrency(value) : value}
        </Typography>
      </CardContent>
    </Card>
  )
}
