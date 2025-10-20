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
  let cumulativeInterest = 0

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate
    const principalPayment = monthlyPayment - interestPayment
    remainingBalance -= principalPayment
    cumulativeInterest += interestPayment

    paymentSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance),
      cumulativeInterest,
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

export const calculateLoanEqualPrincipal = (
  formData: LoanFormData
): LoanCalculation => {
  const { loanAmount, interestRate, loanYears } = formData
  const monthlyRate = interestRate / 100 / 12
  const totalMonths = loanYears * 12

  // 月々の元本返済額（一定）
  const monthlyPrincipal = loanAmount / totalMonths

  // 返済スケジュール計算
  const paymentSchedule = []
  let remainingBalance = loanAmount
  let totalPayment = 0
  let cumulativeInterest = 0

  for (let month = 1; month <= totalMonths; month++) {
    const interestPayment = remainingBalance * monthlyRate
    const principalPayment = monthlyPrincipal
    const monthlyPayment = principalPayment + interestPayment
    remainingBalance -= principalPayment
    totalPayment += monthlyPayment
    cumulativeInterest += interestPayment

    paymentSchedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, remainingBalance),
      cumulativeInterest,
    })
  }

  const totalInterest = totalPayment - loanAmount

  return {
    principal: loanAmount,
    interestRate,
    years: loanYears,
    monthlyPayment: paymentSchedule[0].payment, // 初回の返済額
    totalPayment,
    totalInterest,
    paymentSchedule,
  }
}

export const formatCurrency = (amount: number): string => {
  return `¥${Math.round(amount).toLocaleString()}`
}
