import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { HardCodePairOrder } from '../../utils/valueConst'
import { HardCodeTokne0 } from '../../utils/valueConst'
import { HardCodeTokne1 } from '../../utils/valueConst'
type Props = {}

function trade({}: Props) {
  const router = useRouter()
  useEffect(() => {
     router.push(
       `/trade/tradepair?contractaddress=${HardCodePairOrder}&addresstoken0=${HardCodeTokne0}&addresstoken1=${HardCodeTokne1}`
     )
  })
}

export default trade
