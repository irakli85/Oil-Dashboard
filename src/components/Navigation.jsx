import React from 'react'
import { DashDivSty, DashPsty, LinkSty, NavDivSty, NavP } from '../styledComponents/StyledComponents'

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
                <NavP text='ლიდერბორდი'/>
            </LinkSty>

            <LinkSty to='/order'>
                <SvgCart/>
                <NavP text='შეკვეთა'/>
            </LinkSty>

            <LinkSty to='/products'>
                <SvgShop/>
                <NavP text='პროდუქტები'/>
            </LinkSty>

            <LinkSty to='/sales'>
                <SvgChart/>
                <NavP text='რეპორტი'/>
            </LinkSty>

            <LinkSty to='/message'>
                <SvgSms/>
                <NavP text='შეტყობინება'/>
            </LinkSty>

            <LinkSty to='/settings'>
                <SvgSettings/>
                <NavP text='პარამეტრები'/>
            </LinkSty>
            
        </NavDivSty>
    </div>
  )
}

export default Navigation