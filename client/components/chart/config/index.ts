import { ChartOptions } from 'chart.js'
export const chartOptions: ChartOptions<'line'> = {
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 7,
        maxRotation: 0,
        minRotation: 0,
      },
    },
    y: {
      display: true,
      grid: {
        color: '#e0e0e0',
      },
      beginAtZero: false,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      mode: 'nearest',
      intersect: false,
    },
  },
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 5,
    },
  },
  animation: {
    duration: 0,
  },
}
