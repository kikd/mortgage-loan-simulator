import React from 'react'
import { Grid, Typography, Box } from '@mui/material'
import { ResultCard } from '../molecules'
import { LoanCalculation, LoanFormData } from '../../types'
import {
  calculateLoanEqualPrincipal,
  formatCurrency,
} from '../../utils/loanCalculations'

export interface ResultsSectionProps {
  calculation: LoanCalculation
  formData: LoanFormData
}

export const ResultsSection: React.FC<ResultsSectionProps> = ({
  calculation,
  formData,
}) => {
  // 元金均等方式の計算
  const equalPrincipal = calculateLoanEqualPrincipal(formData)

  // （範囲表示は廃止）各方式ごとに明示的な値を表示します
  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        fontWeight="600"
        textAlign="center"
        mb={3}
      >
        計算結果
      </Typography>

      <Grid container spacing={3}>
        {/* 元利均等 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" mb={1} fontWeight={600}>
            元利均等方式
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <ResultCard
                title="月々の返済額"
                value={calculation.monthlyPayment}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ResultCard
                title="総返済額"
                value={calculation.totalPayment}
                color="info"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ResultCard
                title="総利息額"
                value={calculation.totalInterest}
                color="warning"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* 元金均等 */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" mb={1} fontWeight={600}>
            元金均等方式
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              {equalPrincipal.paymentSchedule &&
                equalPrincipal.paymentSchedule.length > 0 && (
                  <ResultCard
                    title="月々の返済額（初回〜最終回）"
                    value={`${formatCurrency(equalPrincipal.paymentSchedule[0].payment)} 〜 ${formatCurrency(equalPrincipal.paymentSchedule[equalPrincipal.paymentSchedule.length - 1].payment)}`}
                    color="primary"
                  />
                )}
            </Grid>
            <Grid item xs={12} sm={4}>
              <ResultCard
                title="総返済額"
                value={equalPrincipal.totalPayment}
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ResultCard
                title="総利息額"
                value={equalPrincipal.totalInterest}
                color="warning"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
