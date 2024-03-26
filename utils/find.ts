import { HardCodeSymbol1, HardCodeTokne0, HardCodeTokne1 } from "./valueConst"

export const findPriceByPair = (
  list: TypeListPairOrder[],
  pairName: string
): string => {
  let price = ''
  list.map((item) => {
    let namePair = item.symbolToken0 + '-' + item.symbolToken1
    if (namePair.toLocaleLowerCase().includes(pairName.toLocaleLowerCase())) {
      price = item.price
    }
  })
  return Number(price).toFixed(2)
}

export const findCHGByPair = (
  list: TypeListPairOrder[],
  pairName: string
): string => {
  let CHG = ''
  list.map((item) => {
    let namePair = item.symbolToken0 + '-' + item.symbolToken1
    if (namePair.toLocaleLowerCase().includes(pairName.toLocaleLowerCase())) {
      CHG = item.change24H
    }
  })
  return Number(CHG).toFixed(2) + ' %'
}
export const findVOLByPair = (
  list: TypeListPairOrder[],
  pairName: string
): string => {
  let VOL = ''
  list.map((item) => {
    let namePair = item.symbolToken0 + '-' + item.symbolToken1
    if (namePair.toLocaleLowerCase().includes(pairName.toLocaleLowerCase())) {
      VOL = item.volumeToken124H
    }
  })
  return Number(VOL).toFixed(2)
}

export const findAllHeaderDataByAddress = (
  list: TypeListPairOrder[],
  addressToken0: string,
  addressToken1: string
): TypeListPairOrder => {
  let result = {
    addressToken0: '-',
    addressToken1: '-',
    addressContractPair: '-',
    symbolToken0: '-',
    symbolToken1: '-',
    price: '-',
    totalSuplly: '-',
    totalVolumeToken0: '-',
    totalVolumeToken1: '-',
    change24H: '-',
    high24H: '-',
    low24H: '-',
    volumeToken024H: '-',
    volumeToken124H: '-',
  }
   if(addressToken0 && addressToken1 ){
     list.map((item) => {
       if (item.addressToken0.toLocaleLowerCase() == addressToken0.toLocaleLowerCase() && item.addressToken1.toLocaleLowerCase() == addressToken1.toLocaleLowerCase()) {
         result = item
   
       }
     })
   }
  return result
}

export const finPriceByAddressToken = (
  listPair: TypeListPairOrder[],
  addressToken: string,
): string => {
  if(addressToken.toLocaleLowerCase() == HardCodeTokne1.toLocaleLowerCase()){
    return '1'
  }
  let price = '0'
  listPair.map((item) => {
      if (item.addressToken0.toLocaleLowerCase() == addressToken.toLocaleLowerCase() && item.addressToken1.toLocaleLowerCase() == HardCodeTokne1.toLocaleLowerCase()) {
      price = item.price
    }
  })
  return price
}

export const findValueWalletBylistToken = (
  listPair: TypeListPairOrder[],
  listToken: TypeListAddressToken[],
): {
  'valueUSD' :string,
  'valueBTC':string
} => {
  let valueUSD = 0
  listToken.map((item) => {
    valueUSD +=  Number(item.total) * Number(finPriceByAddressToken(listPair,item.addressToken))
  })
  let btcPrice = finPriceByAddressToken(listPair,HardCodeTokne0)
  return {
   'valueUSD': Number(valueUSD).toFixed(2),
   'valueBTC' : (valueUSD/Number(btcPrice)).toFixed(6)
  }
}

 
