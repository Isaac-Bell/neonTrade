import React from 'react'

const TradeAmountInput = ({ tradeAmount, setTradeAmount }) => (
  <div>
    <h3>Trade Amount</h3>
    <input
      type="number"
      value={tradeAmount}
      onChange={(e) => setTradeAmount(e.target.value)}
    />
  </div>
)

export default TradeAmountInput
