interface EventMarketOrder {
  Date: number
  Side: number
  amount: string
  price: string
}

interface EventAllOrder {
  Date: number
  Side: number
  amount: string
  price: string
  Type: String
}

interface Order {
  id: number
  addressTrader: string
  BuyOrSell: number
  createdDate: string
  addressToken: string
  amount: string
  price: string
  total: string
  filled: string
}

interface OrderFee {
  tickFeeID: string
  upperPrice: string
  lowerPrice: string
  aprBuy: string
  aprSell: string
}

interface TypesTradingViewOriginal {
  // sortIndex: number
  time: number
  price: number
  BuyOrSell: number
}

interface TypeTradingView {
  time: number
  open: number
  high: number
  low: number
  close: number
}

interface TypeListPairOrder {
  addressToken0: string
  addressToken1: string
  addressContractPair: string
  symbolToken0: string
  symbolToken1: string
  price: string
  totalSuplly: string
  totalVolumeToken0: string
  totalVolumeToken1: string
  change24H: string
  high24H: string
  low24H: string
  volumeToken024H: string
  volumeToken124H: string
}

interface TypeListAddressToken {
  addressToken: string
  symbolToken: string
  nameToken: string
  balanceSpot: string
  balanceTrade: string
  balanceOfToken: string
  total: string
  allowanceToken: string
}

interface TypeWalletHistory {
  Date: number
  Type: string
  addressToken: string
  symbolToken: string
  nameToken: string
  amount: string
  from: string
  to?: string
}

interface TypeOrderHistory {
  Type: string
  isBuy: number
  Action: string
  amount: string
  price: string
  executed: string
  date: number
}

interface TypeOrderMarket {
  // sortIndex: number
  date: number
  isBuy: number
  price: string
  amount: string
}

interface TypeListAllowlistAddressToken1 {
  addressToken: string
  symbolToken: string
}

interface TypeChatHistory {
  user: string
  msg: string
  date: number
}

interface TypeResultBestRate {
  result_amount: string
  result_distribute: {
    amm: any[]
    orderbook: any[]
  }
  total_time: string
}
