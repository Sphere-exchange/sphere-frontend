export const filterImgSrc = (token: string): string => {
  if (token) {
    switch (token.toLocaleUpperCase()) {
      // USDT
      case '0xf9529E6c0951eFa422d96Ca39f8EE582054fd55d'.toLocaleUpperCase():
        return '/token/usdt.png'
      case 'USDT':
        return '/token/usdt.png'
      // BTC:
      case '0x697E9835be58C6C6cDd6D4cbD998E0bD5bb2d05f'.toLocaleUpperCase():
        return '/token/btc.png'
      case 'BTC':
        return '/token/btc.png'
      // SPHERE
      case '0x7B60044d76b8baD89dAFa9cCe4Ff1419a3989d4e'.toLocaleUpperCase():
        return '/icon.jpg'
      case 'SPHERE':
        return '/icon.jpg'
      // ETH
      case '0x9E23Efb00426A3d4b51357c048791AB6C3Fa5eA0'.toLocaleUpperCase():
        return '/token/eth.png'
      case 'ETH':
        return '/token/eth.png'

      default:
        return '/token/question.png'
    }
  }
  return '/token/question.png'
}

export const filterAddressToSymbol = (token: string): string => {
  if (token) {
    switch (token.toLocaleUpperCase()) {
      // USDT
      case '0xf9529E6c0951eFa422d96Ca39f8EE582054fd55d'.toLocaleUpperCase():
        return 'USDT'
      // BTC:
      case '0x697E9835be58C6C6cDd6D4cbD998E0bD5bb2d05f'.toLocaleUpperCase():
        return 'BTC'
      // SPHERE
      case '0x7B60044d76b8baD89dAFa9cCe4Ff1419a3989d4e'.toLocaleUpperCase():
        return 'SPHERE'
      // ETH
      case '0x9E23Efb00426A3d4b51357c048791AB6C3Fa5eA0'.toLocaleUpperCase():
        return 'ETH'
      default:
        return 'Unknow token'
    }
  }
  return 'Unknow token'
}
