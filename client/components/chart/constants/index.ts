export const timePeriods = {
  '1min': 60,
  '5min': 60 * 5,
  '15min': 60 * 15,
  '30min': 60 * 30,
  '1D': 86400,
  '2D': 86400 * 2,
  '1M': 86400 * 30,
  '3M': 86400 * 90,
  '6M': 86400 * 180,
  '1Y': 86400 * 365,
}

export const getGranularity = (period: string) => {
  switch (period) {
    case '1min':
      return 60
    case '5min':
    case '15min':
    case '30min':
      return 60
    case '1D':
    case '2D':
      return 300
    case '1M':
    case '3M':
    case '6M':
    case '1Y':
      return 86400
    default:
      return 86400
  }
}
