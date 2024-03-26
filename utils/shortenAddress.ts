export const shortenAddress = (address: string | undefined) => {
  if (address == undefined) {
    return ''
  } else {
    return `${address.slice(0, 4)}...${address.slice(address.length - 4)}`
  }
}
