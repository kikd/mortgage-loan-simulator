import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import { formatCurrency } from '../../utils/loanCalculations'

export interface ResultCardProps {
  title: string
  value: number
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
        <Typography variant="h4" component="div" color={`${color}.main`} fontWeight="bold">
          {formatCurrency(value)}
        </Typography>
      </CardContent>
    </Card>
  )
}