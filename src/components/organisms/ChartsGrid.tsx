import React from 'react'
import { Grid, Box } from '@mui/material'
import { ChartWrapper } from '../molecules'
import { LoanCalculation } from '../../types'
import { ApexOptions } from 'apexcharts'
import { formatCurrency } from '../../utils/loanCalculations'

export interface ChartsGridProps {
  calculation: LoanCalculation
}

export const ChartsGrid: React.FC<ChartsGridProps> = ({ calculation }) => {
  // 年別データの準備（12ヶ月ごと）
  const yearlyData = calculation.paymentSchedule.filter((_, index) => index % 12 === 0)
  
  // 年別返済内訳チャートデータ
  const paymentBreakdownData = {
    series: [
      {
        name: '元本',
        data: yearlyData.map(item => Math.round(item.principal)),
      },
      {
        name: '利息',
        data: yearlyData.map(item => Math.round(item.interest)),
      },
    ],
    categories: yearlyData.map(item => `${Math.floor((item.month - 1) / 12) + 1}年`),
  }

  const paymentBreakdownOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: paymentBreakdownData.categories,
      title: { text: '年' },
    },
    yaxis: {
      title: { text: '金額（円）' },
      labels: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    legend: {
      position: 'top',
    },
    colors: ['#1976d2', '#ff9800'],
    dataLabels: { enabled: false },
  }

  // ローン残高推移チャートデータ
  const balanceData = {
    series: [
      {
        name: '残高',
        data: yearlyData.map(item => Math.round(item.balance)),
      },
    ],
    categories: paymentBreakdownData.categories,
  }

  const balanceOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: { show: false },
    },
    xaxis: {
      categories: balanceData.categories,
      title: { text: '年' },
    },
    yaxis: {
      title: { text: '残高（円）' },
      labels: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    colors: ['#f44336'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 4,
    },
    grid: {
      borderColor: '#e0e0e0',
    },
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <ChartWrapper
            title="年別返済内訳（元本・利息）"
            chartOptions={paymentBreakdownOptions}
            series={paymentBreakdownData.series}
            type="bar"
          />
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <ChartWrapper
            title="ローン残高推移"
            chartOptions={balanceOptions}
            series={balanceData.series}
            type="line"
          />
        </Grid>
      </Grid>
    </Box>
  )
}