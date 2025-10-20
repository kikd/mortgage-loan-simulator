import React from 'react'
import { Paper, Typography, Box } from '@mui/material'
import { InputField } from '../molecules'
import { PrimaryButton } from '../atoms'
import { LoanFormData } from '../../types'

export interface CalculatorFormProps {
  formData: LoanFormData
  onFormChange: (field: keyof LoanFormData, value: number) => void
  onCalculate: () => void
  isCalculating?: boolean
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  onFormChange,
  onCalculate,
  isCalculating = false,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Typography variant="h5" gutterBottom fontWeight="600" textAlign="center">
        ローン計算条件
      </Typography>
      
      <Box sx={{ mt: 3 }}>
        <InputField
          label="借入金額（円）"
          value={formData.loanAmount}
          onChange={(value) => onFormChange('loanAmount', value)}
          step={1000000}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        />
        
        <InputField
          label="金利（%）"
          value={formData.interestRate}
          onChange={(value) => onFormChange('interestRate', value)}
          step={0.1}
          min={0}
          max={10}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        />
        
        <InputField
          label="借入期間（年）"
          value={formData.loanYears}
          onChange={(value) => onFormChange('loanYears', value)}
          min={1}
          max={50}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        />
        
        <Box sx={{ mt: 3 }}>
          <PrimaryButton
            onClick={onCalculate}
            loading={isCalculating}
            fullWidth
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            計算する
          </PrimaryButton>
        </Box>
      </Box>
    </Paper>
  )
}