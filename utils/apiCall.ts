export async function callBestRateSwap(
  initial_amount: number,
  start_token: string,
  destination_token: string
) {
  if (initial_amount <= 0) {
    return {
      result_amount: '0',
      result_distribute: {
        amm: [[0, 0, 0, 0]],
        orderbook: [],
      },
      total_time: '0',
    }
  }

  try {
    let response = await fetch('https://testytaste.vercel.app/optimize_trade', {
      method: 'POST',
      body: JSON.stringify({
        initial_amount,
        start_token,
        destination_token,
      }),
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    let data = await response.json()
    if (data.error) {
      return {
        result_amount: '0',
        result_distribute: {
          amm: [[0, 0, 0, 0]],
          orderbook: [],
        },
        total_time: '0',
      }
    }
    return data as TypeResultBestRate
  } catch (error) {
    console.log(error)
  }
}
