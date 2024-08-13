export interface Trade {
  tradeId: string
  instrument: string
  date: string
  result: string
  timestamp: string
  type: string
  quantity: number
  price: number
  status: string
}


// Market information
export interface Symbol {
  display_name: string
  symbol: string
  market: string
  market_display_name: string
  subgroup: string
  subgroup_display_name: string
  symbol_type: string 
}


//Price Proposal 
export interface PriceProposal {
  proposal: number 
  amount: number 
  barrier?: string
  basis?: string 
  contract_type: string 
  currency: string
  duration?: number 
  duration_unit?: string 
  symbol: string 
  req_id?: number 

}

