export function convertToOHLC(data: TypesTradingViewOriginal[],timesecode : number) {
  
  data.sort((a, b) => {
  if (a.time < b.time) return -1;
  if (a.time > b.time) return 1;
 
  if (a.BuyOrSell === b.BuyOrSell) {
    return a.BuyOrSell === 0 ? a.price - b.price : b.price - a.price;
  }

  return 0; 
  });


  let lengthTimeSecond = timesecode //60
  let startTime =  Number(data[0].time)
  let Allresult: TypesTradingViewOriginal[][] = []
  let tempResult: TypesTradingViewOriginal[] = []
  data.map((item) => {
    if (Number(item.time) <= startTime + lengthTimeSecond) {
      tempResult.push(item)
    } else { 
      startTime = Number(item.time)
      Allresult.push(tempResult)
      tempResult = []
      tempResult.push(item)
    }
  })
  Allresult.push(tempResult)
  return convertToOHLC2(Allresult)
};


function convertToOHLC2(data:TypesTradingViewOriginal[][]) {
  let result: TypeTradingView[] = []
    data.map((item,i)=>{
      const highest = item.reduce((previous, current) => {
        return current.price > previous.price ? current : previous
      })
      const lowest = item.reduce((previous, current) => {
        return current.price < previous.price ? current : previous
      })
      const dataconvert: TypeTradingView = {
          time: timeToLocal(item[0].time),
          open: item[0].price,
          high: highest.price,
          low: lowest.price,
          close: item[item.length-1].price,
      }
       result.push(dataconvert)
      })
      return result
}


function timeToLocal(originalTime:  number) {
  const d = new Date(originalTime * 1000)
  return (
    Date.UTC(
      d.getFullYear(),
      d.getMonth(),
      d.getDate(),
      d.getHours(),
      d.getMinutes(),
      d.getSeconds(),
      d.getMilliseconds()
    ) / 1000
  )
}