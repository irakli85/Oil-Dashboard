import React from 'react'
import { DashDivSty, DashPsty, LinkSty, NavDivSty } from '../styledComponents/StyledComponents'

import graph from '../assets/graph.svg'
import SvgStats from '../styledComponents/svg/SvgStats'
import SvgCart from '../styledComponents/svg/SvgCart'
import SvgShop from '../styledComponents/svg/SvgShop'
import SvgChart from '../styledComponents/svg/SvgChart'
import SvgSms from '../styledComponents/svg/SvgSms'
import SvgSettings from '../styledComponents/svg/SvgSettings'

const Navigation = () => {
  return (
    <div>
        <DashDivSty>
            <img src={graph} alt="graph" />
            <DashPsty to='https://oil-mern.vercel.app/login'>განაცხადები</DashPsty>
        </DashDivSty>
        <NavDivSty>
            <LinkSty to='/'>
                <SvgStats/>
                <p>ლიდერბორდი</p>
            </LinkSty>

            <LinkSty to='/order'>
                <SvgCart/>
                <p>შეკვეთა</p>
            </LinkSty>

            <LinkSty to='/products'>
                <SvgShop/>
                <p>პროდუქტები</p>
            </LinkSty>

            <LinkSty to='/sales'>
                <SvgChart/>
                <p>რეპორტი</p>
            </LinkSty>

            <LinkSty to='/message'>
                <SvgSms/>
                <p>შეტყობინება</p>
            </LinkSty>

            <LinkSty to='/settings'>
                <SvgSettings/>
                <p>პარამეტრები</p>
            </LinkSty>
            
        </NavDivSty>
    </div>
  )
}

export default Navigation