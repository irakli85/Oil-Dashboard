import React from 'react'
import { AsideSty, LogoDivSty, Psty } from '../styledComponents/StyledComponents'
import Logo from '../styledComponents/Logo'
import SvgCart from '../styledComponents/svg/SvgCart'


const Aside = () => {
  return (
    <AsideSty>
      <LogoDivSty>
        <Logo/>
        <Psty>ნავთობი</Psty>
      </LogoDivSty>
      
    </AsideSty>
  )
}

export default Aside