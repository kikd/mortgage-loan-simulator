import { useState } from 'react'
import { LoanCalculation, LoanFormData } from '../types'
import { calculateLoan } from '../utils/loanCalculations'

export const useLoanCalculator = () => {
  const [formData, setFormData] = useState<LoanFormData>({
    loanAmount: 35000000,
    interestRate: 1.5,
    loanYears: 35,
  })
  
  const [calculation, setCalculation] = useState<LoanCalculation | null>(null)

  const updateFormData = (field: keyof LoanFormData, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const performCalculation = () => {
    const result = calculateLoan(formData)
    setCalculation(result)
  }

  return {
    formData,
    calculation,
    updateFormData,
    performCalculation,
  }
}