export function getARP(
  RewardRate: number,
  TotalStaked: number,
  priceRewardToken: number,
  priceStakingToken: number,
  finishAt: number
): string {
  let timeNow = Math.round(Date.now() / 1000)
  if (RewardRate == 0 || finishAt == 0 || finishAt < timeNow) {
    return '0.00'
  }
  if (TotalStaked == 0) {
    TotalStaked = 0.0001
  }
  let APR =
    ((RewardRate * 31536000 * priceRewardToken) /
      (TotalStaked * priceStakingToken)) *
    100
  if (isNaN(APR)) {
    APR = 0
  }
 
  if(APR > 1000000){
 
    return  '> 1M'
  } else if(APR > 100000){
 
    return  '> 1K'
  }else if(APR > 1000){
    
    return  (APR/1000).toFixed(2) + 'K'
  }else{
    return APR.toFixed(2)
  }
}

export function fitterSumOrderPrice(orders: Order[], decimal: number): Order[] {
  const combinedOrders = [] as Order[]
  orders.forEach((order) => {
    const existingOrder = combinedOrders.find((o) => o.price === order.price)
    if (existingOrder) {
      existingOrder.total = (
        parseFloat(existingOrder.total) + parseFloat(order.total)
      ).toFixed(decimal)
      existingOrder.amount = (
        parseFloat(existingOrder.amount) + parseFloat(order.amount)
      ).toFixed(decimal)
    } else {
      combinedOrders.push({ ...order })
    }
  })
  return combinedOrders
}

 
