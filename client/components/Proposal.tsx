import React, { useState, useEffect } from 'react'
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic'

const Proposal = () => {
  const [proposalData, setProposalData] = useState({})
  const [error, setError] = useState<string | null>(null)

  const getProposal = async () => {
    const app_id = 62062
    const connection = new WebSocket(
      `wss://ws.derivws.com/websockets/v3?app_id=${app_id}`,
    )
    const api = new DerivAPIBasic({ connection })

    const proposal_request = {
      proposal: 1,
      subscribe: 1,
      amount: 10,
      basis: 'payout',
      contract_type: 'CALL',
      currency: 'USD',
      duration: 1,
      duration_unit: 'm',
      symbol: 'R_100',
      barrier: '+0.1',
    }

    const proposalResponse = async (res) => {
      const data = JSON.parse(res.data)
      if (data.error !== undefined) {
        setError(data.error.message)
        connection.removeEventListener('message', proposalResponse, false)
        await api.disconnect()
      } else if (data.msg_type === 'proposal') {
        setProposalData(data.proposal)
      }
    }

    connection.addEventListener('message', proposalResponse)
    await api.proposal(proposal_request)
  }

  useEffect(() => {
    getProposal()
  }, [])

  return (
    <div className="container">
      <button id="proposal" className="submitBtn" onClick={getProposal}>
        Subscribe proposal
      </button>
      <button
        id="proposal-unsubscribe"
        className="resetBtn"
        onClick={() =>
          connection.removeEventListener('message', proposalResponse, false)
        }
      >
        Unsubscribe proposal
      </button>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <ul>
          <li>Longcode: {proposalData.longcode}</li>
          <li>Ask Price: {proposalData.display_value}</li>
          <li>Payout: {proposalData.payout}</li>
          <li>Spot: {proposalData.spot}</li>
        </ul>
      )}
    </div>
  )
}

export default Proposal
