export interface LoanCalculation {
  principal: number
  interestRate: number
  years: number
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
  paymentSchedule: PaymentScheduleItem[]
}

export interface PaymentScheduleItem {
  month: number
  payment: number
  principal: number
  interest: number
  balance: number
  cumulativeInterest?: number
}

export interface LoanFormData {
  loanAmount: number
  interestRate: number
  loanYears: number
}

export interface ChartData {
  series: Array<{
    name: string
    data: number[]
  }>
  categories: string[]
}
