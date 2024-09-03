// Step 1: Data Preparation
const data = [
  { timestamp: 0, price: 10 },
  { timestamp: 33, price: 12 },
  { timestamp: 66, price: 15 },
  { timestamp: 99, price: 18 },
  // ...
]

// Step 2: Consecutive Price Increase
const consecutiveIncreases = []
for (let i = 0; i < data.length - 1; i++) {
  if (data[i + 1].price > data[i].price) {
    consecutiveIncreases.push({
      start: data[i].timestamp,
      end: data[i + 1].timestamp,
    })
  }
}

// Step 3: Count Consecutive Increases
const countConsecutiveIncreases = {}
for (const block of consecutiveIncreases) {
  countConsecutiveIncreases[block.start] =
    (countConsecutiveIncreases[block.start] || 0) + 1
}

// Step 4: Map over 100 seconds
const probabilityArray = []
for (let i = 0; i < 100; i++) {
  const timeFrame = i * 33
  const count = countConsecutiveIncreases[timeFrame] || 0
  const probability = count / (consecutiveIncreases.length / 100)
  probabilityArray.push({ timeFrame, probability })
}

// Step 5: Sort and Add Weighted Variable
probabilityArray.sort((a, b) => a.probability - b.probability)
const weightedArray = probabilityArray.map((item, index) => ({
  ...item,
  weight: index / probabilityArray.length,
}))

// Step 6: Identify Riskiest and Safest Bets
const riskiestBets = weightedArray.slice(0, weightedArray.length / 3)
const safestBets = weightedArray.slice((weightedArray.length * 2) / 3)

// Next Steps:
// Advanced Trend Analysis: Integrate more advanced techniques such as moving averages or RSI (Relative Strength Index) to analyze trends over different timeframes.

// Signal Generation: Implement logic to generate trading signals based on detected trends and probabilities. This could involve more complex statistical models or machine learning approaches to predict future price movements.

// User Interface Enhancements: Add UI controls for users to select different timeframes, view different market types, and see detailed analysis (e.g., showing the market type, displaying arrows, changing colors based on trends, etc.).
