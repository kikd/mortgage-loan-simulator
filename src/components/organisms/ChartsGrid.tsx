import React from 'react'
import { Grid, Box } from '@mui/material'
import { ChartWrapper } from '../molecules'
import { LoanCalculation, LoanFormData } from '../../types'
import { ApexOptions } from 'apexcharts'
import {
  formatCurrency,
  calculateLoanEqualPrincipal,
} from '../../utils/loanCalculations'

export interface ChartsGridProps {
  calculation: LoanCalculation
  formData: LoanFormData
}

export const ChartsGrid: React.FC<ChartsGridProps> = ({
  calculation,
  formData,
}) => {
  // 元金均等方式の計算結果
  const equalPrincipalCalculation = calculateLoanEqualPrincipal(formData)

  // 年別データの準備（12ヶ月ごと）
  const yearlyData = calculation.paymentSchedule.filter(
    (_, index) => index % 12 === 0
  )
  const yearlyDataEqualPrincipal =
    equalPrincipalCalculation.paymentSchedule.filter(
      (_, index) => index % 12 === 0
    )

  // 年別返済内訳チャートデータ（元利均等方式）
  const paymentBreakdownData = {
    series: [
      {
        name: '元本（元利均等）',
        data: yearlyData.map(item => Math.round(item.principal)),
      },
      {
        name: '利息（元利均等）',
        data: yearlyData.map(item => Math.round(item.interest)),
      },
    ],
    categories: yearlyData.map(
      item => `${Math.floor((item.month - 1) / 12) + 1}年`
    ),
  }

  // 年別返済内訳チャートデータ（元金均等方式）
  const paymentBreakdownEqualPrincipalData = {
    series: [
      {
        name: '元本（元金均等）',
        data: yearlyDataEqualPrincipal.map(item => Math.round(item.principal)),
      },
      {
        name: '利息（元金均等）',
        data: yearlyDataEqualPrincipal.map(item => Math.round(item.interest)),
      },
    ],
    categories: yearlyDataEqualPrincipal.map(
      item => `${Math.floor((item.month - 1) / 12) + 1}年`
    ),
  }

  const paymentBreakdownOptions: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      selection: {
        enabled: true,
        type: 'x',
        fill: {
          color: '#24292e',
          opacity: 0.1,
        },
        stroke: {
          width: 1,
          dashArray: 3,
          color: '#24292e',
          opacity: 0.4,
        },
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4,
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1,
          },
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: paymentBreakdownData.categories,
      title: { text: '年' },
      type: 'category',
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
        name: '残高（元利均等）',
        data: yearlyData.map(item => Math.round(item.balance)),
      },
      {
        name: '残高（元金均等）',
        data: yearlyDataEqualPrincipal.map(item => Math.round(item.balance)),
      },
    ],
    categories: paymentBreakdownData.categories,
  }

  const balanceOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      selection: {
        enabled: true,
        type: 'x',
        fill: {
          color: '#24292e',
          opacity: 0.1,
        },
        stroke: {
          width: 1,
          dashArray: 3,
          color: '#24292e',
          opacity: 0.4,
        },
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
        zoomedArea: {
          fill: {
            color: '#90CAF9',
            opacity: 0.4,
          },
          stroke: {
            color: '#0D47A1',
            opacity: 0.4,
            width: 1,
          },
        },
      },
    },
    xaxis: {
      categories: balanceData.categories,
      title: { text: '年' },
      type: 'category',
    },
    yaxis: {
      title: { text: '残高（円）' },
      labels: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: function ({ series, dataPointIndex, w }) {
        const year = w.globals.categoryLabels[dataPointIndex]
        const balance = series[0][dataPointIndex]
        const totalPaid = calculation.principal - balance

        return `
          <div class="apexcharts-tooltip-title" style="font-family: Helvetica, Arial, sans-serif; font-size: 12px; padding: 4px 8px; background: rgba(0, 0, 0, 0.75); color: #fff; border-radius: 4px 4px 0 0;">
            ${year}
          </div>
          <div style="padding: 8px; background: #fff; border-radius: 0 0 4px 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            <div style="color: #f44336; margin: 2px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #f44336; border-radius: 50%; margin-right: 6px;"></span>
              残高: ${formatCurrency(balance)}
            </div>
            <div style="color: #2196f3; margin: 2px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #2196f3; border-radius: 50%; margin-right: 6px;"></span>
              累計支払額: ${formatCurrency(totalPaid)}
            </div>
          </div>
        `
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

  // 累積利息チャートデータ
  const cumulativeInterestData = {
    series: [
      {
        name: '累積利息（元利均等）',
        data: yearlyData.map(item => Math.round(item.cumulativeInterest || 0)),
      },
      {
        name: '累積利息（元金均等）',
        data: yearlyDataEqualPrincipal.map(item =>
          Math.round(item.cumulativeInterest || 0)
        ),
      },
    ],
    categories: paymentBreakdownData.categories,
  }

  const cumulativeInterestOptions: ApexOptions = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true,
      },
    },
    xaxis: {
      categories: cumulativeInterestData.categories,
      title: { text: '年' },
      type: 'category',
    },
    yaxis: {
      title: { text: '累積利息（円）' },
      labels: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => formatCurrency(value),
      },
    },
    colors: ['#1976d2', '#ff9800'],
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    markers: {
      size: 4,
    },
    legend: {
      position: 'top',
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
            title="年別返済内訳（元利均等）"
            chartOptions={paymentBreakdownOptions}
            series={paymentBreakdownData.series}
            type="bar"
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartWrapper
            title="年別返済内訳（元金均等）"
            chartOptions={{
              ...paymentBreakdownOptions,
              colors: ['#4caf50', '#ffc107'],
            }}
            series={paymentBreakdownEqualPrincipalData.series}
            type="bar"
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartWrapper
            title="ローン残高推移（比較）"
            chartOptions={{
              ...balanceOptions,
              colors: ['#1976d2', '#ff9800'],
              tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: (value: number) => formatCurrency(value),
                },
              },
            }}
            series={balanceData.series}
            type="line"
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <ChartWrapper
            title="累積利息推移（比較）"
            chartOptions={cumulativeInterestOptions}
            series={cumulativeInterestData.series}
            type="line"
          />
        </Grid>
      </Grid>
    </Box>
  )
}
