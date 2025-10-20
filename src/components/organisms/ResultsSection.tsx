import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { ResultCard } from '../molecules'
import { LoanCalculation } from '../../types'

export interface ResultsSectionProps {
  calculation: LoanCalculation
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({ calculation }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="600" textAlign="center" mb={3}>
        計算結果
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ResultCard
            title="月々の返済額"
            value={calculation.monthlyPayment}
            color="primary"
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ResultCard
            title="総返済額"
            value={calculation.totalPayment}
            color="info"
          />
        </Grid>
        
        <Grid item xs={12} md={4}>
          <ResultCard
            title="総利息額"
            value={calculation.totalInterest}
            color="warning"
          />
        </Grid>
      </Grid>
    </Box>
  )
}