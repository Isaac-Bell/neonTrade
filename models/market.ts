export interface Symbol {
  allow_forward_starting: number
  display_name: string
  display_order: number
  exchange_is_open: number
  is_trading_suspended: number
  market: string
  market_display_name: string
  pip: number
  subgroup: string
  subgroup_display_name: string
  submarket: string
  submarket_display_name: string
  symbol: string
  symbol_type: string
}

export interface Symbols {
  active_symbols: symbol[]
}
