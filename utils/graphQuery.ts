import {
  execute,
  SphereQueryPairsDocument,
  SphereQueryPairsQuery,
  SphereQueryTokensDocument,
  SphereQueryTokensQuery,
  SphereQueryHistoryWalletsDocument,
  SphereQueryHistoryWalletsQuery,
  SphereQueryHistoryOrdersDocument,
  SphereQueryHistoryOrdersQuery,
  SphereQueryHistoryMarketsDocument,
  SphereQueryHistoryMarketsQuery,
  SphereQueryDatasPairDocument,
  SphereQueryDatasPairQuery,
} from '../.graphclient'

export async function queryPairs() {
  const data = await execute(SphereQueryPairsDocument, {})
  return data.data as SphereQueryPairsQuery
}

export async function queryTokens() {
  const data = await execute(SphereQueryTokensDocument, {})
  console.log(' data.data ', data.data)
  return data.data as SphereQueryTokensQuery
}

export async function queryWalletHistorys(address: String) {
  const data = await execute(SphereQueryHistoryWalletsDocument, {
    Address: address,
  })
  return data.data as SphereQueryHistoryWalletsQuery
}

export async function queryHistoryOrders(address: String) {
  const data = await execute(SphereQueryHistoryOrdersDocument, {
    Address: address,
  })
  return data.data as SphereQueryHistoryOrdersQuery
}

export async function queryHistoryMarkets(pair: String) {
  const data = await execute(SphereQueryHistoryMarketsDocument, {
    Pair: pair,
  })
  return data.data as SphereQueryHistoryMarketsQuery
}

export async function queryDatasPair(pair: String) {
  const data = await execute(SphereQueryDatasPairDocument, {
    Pair: pair,
  })
  return data.data as SphereQueryDatasPairQuery
}
