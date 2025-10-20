import { LoanCalculation, LoanFormData } from '../types'

export const calculateLoan = (formData: LoanFormData): LoanCalculation => {
  const { loanAmount, interestRate, loanYears } = formData
  const monthlyRate = interestRate / 100 / 12
  const totalMonths = loanYears * 12
  
  // 月々の返済額計算
  const monthlyPayment = 
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)

  // 返済スケジュール計算
  const paymentSchedule = []
  let remainingBalance = loanAmount

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    remainingBalance -= principalPayment

    paymentSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance),
    })
  }

  const totalPayment = monthlyPayment * totalMonths
  const totalInterest = totalPayment - loanAmount

  return {
    principal: loanAmount,
    interestRate,
    years: loanYears,
    monthlyPayment,
    totalPayment,
    totalInterest,
    paymentSchedule,
  }
}

export const formatCurrency = (amount: number): string => {
  return `¥${Math.round(amount).toLocaleString()}`
}