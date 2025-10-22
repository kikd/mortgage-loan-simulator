import React from 'react'
import {
  Paper,
  Typography,
  Box,
  Grid,
  Slider,
  FormControl,
  FormLabel,
} from '@mui/material'
// InputField は使わなくなったため不要
import { PrimaryButton } from '../atoms'
import { LoanFormData } from '../../types'
import { NumberInput } from '../atoms/NumberInput'

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
        {/* 借入金額：表示は万円単位で入力（内部では円で保存） */}
        <FormControl fullWidth margin="normal">
          <FormLabel
            component="legend"
            sx={{ mb: 1, fontWeight: 600, color: 'white' }}
          >
            借入金額（万円）
          </FormLabel>
          <NumberInput
            value={Math.floor(formData.loanAmount / 10000)}
            onChange={val =>
              onFormChange('loanAmount', Math.floor(val * 10000))
            }
            step={10}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          />
        </FormControl>

        {/* 金利（スライダー + 入力） */}
        <FormControl fullWidth margin="normal">
          <FormLabel
            component="legend"
            sx={{ mb: 1, fontWeight: 600, color: 'white' }}
          >
            金利（%）
          </FormLabel>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={formData.interestRate}
                min={0}
                max={10}
                step={0.1}
                onChange={(_, v) =>
                  onFormChange('interestRate', Array.isArray(v) ? v[0] : v)
                }
                aria-labelledby="interest-rate-slider"
                sx={{ color: 'white' }}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <NumberInput
                value={formData.interestRate}
                onChange={val => onFormChange('interestRate', val)}
                step={0.1}
                min={0}
                max={10}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />
            </Grid>
          </Grid>
        </FormControl>

        {/* 借入期間（スライダー + 入力） */}
        <FormControl fullWidth margin="normal">
          <FormLabel
            component="legend"
            sx={{ mb: 1, fontWeight: 600, color: 'white' }}
          >
            借入期間（年）
          </FormLabel>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Slider
                value={formData.loanYears}
                min={1}
                max={50}
                step={1}
                onChange={(_, v) =>
                  onFormChange('loanYears', Array.isArray(v) ? v[0] : v)
                }
                aria-labelledby="loan-years-slider"
                sx={{ color: 'white' }}
              />
            </Grid>
            <Grid item sx={{ width: 120 }}>
              <NumberInput
                value={formData.loanYears}
                onChange={val => onFormChange('loanYears', Math.floor(val))}
                step={1}
                min={1}
                max={50}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              />
            </Grid>
          </Grid>
        </FormControl>

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
