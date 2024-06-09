const mockData = Array(300)
  .fill(0)
  .map((_, index) => ({
    timestamp: `${index + 1}`,
    value: Math.random() * 100,
  }))

console.log(mockData)
