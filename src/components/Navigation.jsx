import React from 'react'
import { DashDivSty, DashPsty, LinkSty, NavDivSty, NavP } from '../styledComponents/StyledComponents'

import graph from '../assets/graph.svg'
import SvgCart from '../styledComponents/svg/SvgCart'
import SvgShop from '../styledComponents/svg/SvgShop'
import SvgChart from '../styledComponents/svg/SvgChart'
import SvgSms from '../styledComponents/svg/SvgSms'
import SvgSettings from '../styledComponents/svg/SvgSettings'
import SvgMeasure from '../styledComponents/svg/SvgMeasure'

const buttonVariants = { 
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255, 255, 255)",
      boxShadow: "0px 0px 8px #5D5FEF"
    }
  }

const Navigation = () => {
  return (
    <div>
        <DashDivSty
            variants={buttonVariants}        
            whileHover="hover"         
        >
            <img src={graph} alt="graph" />
            <DashPsty to='https://oil-mern.vercel.app/login' >განაცხადები</DashPsty>
        </DashDivSty>
        <NavDivSty>
            <LinkSty to='/'>
                <SvgMeasure/>
                <NavP text='აზომვის ცდომილება'/>
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