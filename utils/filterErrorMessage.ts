export const filterErrorMessage = (message: string | undefined): string => {
  if (message) {
    switch (message) {
      case 'execution reverted: min amount token0':
        return 'execution reverted: minimum trade asset base amount'
      case 'execution reverted: min amount token1':
        return 'execution reverted: minimum trade asset quote amount'
      case 'execution reverted: this address not contract':
        return 'execution reverted: base asset address not contract'
      case 'execution reverted: this address not erc20':
        return 'execution reverted: base asset address not erc20'
      case 'execution reverted: AddressToken1 not in allowlist':
        return 'execution reverted: base asset address not in allowlist'
      case 'execution reverted: position in linked list not order':
        return 'execution reverted: this pair trading is busy now. please wait a moment and try again'
      default:
        return message
    }
  } else {
    return 'wrong network / disconnect wallet'
  }
}
