import React from 'react'
import { AsideSty, LogoDivSty, Psty } from '../styledComponents/StyledComponents'
import Logo from '../styledComponents/Logo'
import Navigation from './Navigation'


const Aside = () => {
  return (
    <AsideSty>
      <LogoDivSty>
        <Logo/>
        <Psty>ნავთობი</Psty>
      </LogoDivSty>
      <Navigation/>
      
    </AsideSty>
  )
}

export default Aside