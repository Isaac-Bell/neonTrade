export const getHistoryData = (
  market: string,
  periodInSeconds: number,
  granularity: number,
) => {
  const currentDate = Math.floor(Date.now() / 1000)
  const startDate = currentDate - periodInSeconds

  return {
    ticks_history: market,
    start: startDate,
    end: 'latest',
    style: 'candles',
    granularity,
    count: 5000,
  }
}

export const getRealTimeSubscription = (market: string) => ({
  ticks: market,
  subscribe: 1,
})

export const handleWebSocketMessage = (
  msg: MessageEvent,
  setChartData: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const response = JSON.parse(msg.data)

  if (response.candles) {
    setChartData({
      labels: response.candles.map((candle: any) =>
        new Date(candle.epoch * 1000).toLocaleDateString(),
      ),
      datasets: [
        {
          label: 'Stock Price',
          data: response.candles.map((candle: any) => candle.close),
          borderColor: '#00C805',
          borderWidth: 2,
          fill: true,
          backgroundColor: 'rgba(0, 200, 5, 0.1)',
        },
      ],
    })
    setLoading(false)
  } else if (response.tick) {
    setChartData((prevData: any) => {
      const newLabels = [...prevData.labels]
      const newData = [...prevData.datasets[0].data]

      const newLabel = new Date(response.tick.epoch * 1000).toLocaleTimeString()

      if (
        newLabels.length === 0 ||
        newLabel !== newLabels[newLabels.length - 1]
      ) {
        newLabels.push(newLabel)
        newData.push(response.tick.quote)

        if (newLabels.length > 100) {
          newLabels.shift()
          newData.shift()
        }
      }

      return {
        ...prevData,
        labels: newLabels,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      }
    })
  }
}
