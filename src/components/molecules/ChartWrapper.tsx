import React from 'react'
import { Paper, Typography } from '@mui/material'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'

type ReactApexProps = React.ComponentProps<typeof Chart>

export interface ChartWrapperProps {
  title: string
  chartOptions: ApexOptions
  series: ReactApexProps['series']
  type: ReactApexProps['type']
  height?: number
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  title,
  chartOptions,
  series,
  type,
  height = 350,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h6" gutterBottom textAlign="center" fontWeight="600">
        {title}
      </Typography>
      <Chart
        options={chartOptions}
        series={series}
        type={type}
        height={height}
      />
    </Paper>
  )
}
