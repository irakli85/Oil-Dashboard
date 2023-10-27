import React, { useState } from 'react'
import { DashDivSty, DashPsty, LinkSty, NavDivSty, NavP } from '../styledComponents/StyledComponents'

import graph from '../assets/graph.svg'
import SvgShop from '../styledComponents/svg/SvgShop'
import SvgChart from '../styledComponents/svg/SvgChart'
import SvgSms from '../styledComponents/svg/SvgSms'
import SvgSettings from '../styledComponents/svg/SvgSettings'
import SvgMeasure from '../styledComponents/svg/SvgMeasure'
import SvgColba from '../styledComponents/svg/SvgColba'

const buttonVariants = { 
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255, 255, 255)",
      boxShadow: "0px 0px 8px #5D5FEF"
    }
  }

 

const Navigation = () => {

    const [isClicked1, setIsClicked1] = useState(true)
    const [isClicked2, setIsClicked2] = useState(false)
    const [isClicked3, setIsClicked3] = useState(false)
    const [isClicked4, setIsClicked4] = useState(false)
    const [isClicked5, setIsClicked5] = useState(false)
    const [isClicked6, setIsClicked6] = useState(false)

    const handleClick1 = () => {
        setIsClicked1(true)
        setIsClicked2 (false)
        setIsClicked3 (false)
        setIsClicked4 (false)
        setIsClicked5 (false)
        setIsClicked6 (false)        
    }

    const handleClick2 = () => {
        setIsClicked1(false)
        setIsClicked2 (true)
        setIsClicked3 (false)
        setIsClicked4 (false)
        setIsClicked5 (false)
        setIsClicked6 (false)        
    }

    const handleClick3 = () => {
        setIsClicked1(false)
        setIsClicked2 (false)
        setIsClicked3 (true)
        setIsClicked4 (false)
        setIsClicked5 (false)
        setIsClicked6 (false)        
    }

    const handleClick4 = () => {
        setIsClicked1(false)
        setIsClicked2 (false)
        setIsClicked3 (false)
        setIsClicked4 (true)
        setIsClicked5 (false)
        setIsClicked6 (false)        
    }

    const handleClick5 = () => {
        setIsClicked1(false)
        setIsClicked2 (false)
        setIsClicked3 (false)
        setIsClicked4 (false)
        setIsClicked5 (true)
        setIsClicked6 (false)        
    }

    const handleClick6 = () => {
        setIsClicked1(false)
        setIsClicked2 (false)
        setIsClicked3 (false)
        setIsClicked4 (false)
        setIsClicked5 (false)
        setIsClicked6 (true)        
    }
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
                <SvgMeasure isClicked={isClicked1}/>
                <NavP text='აზომვის ცდომილება' onClick={handleClick1} isClicked={isClicked1}/>
            </LinkSty>

            <LinkSty to='/wastage'>
                <SvgColba isClicked={isClicked2}/>
                <NavP text='ბუნებრივი დანაკარგები' onClick={handleClick2} isClicked={isClicked2}/>
            </LinkSty>

            <LinkSty to='/products'>
                <SvgShop/>
                <NavP text='პროდუქტები' onClick={handleClick3} isClicked={isClicked3}/>
            </LinkSty>

            <LinkSty to='/sales'>
                <SvgChart/>
                <NavP text='რეპორტი' onClick={handleClick4} isClicked={isClicked4}/>
            </LinkSty>

            <LinkSty to='/message'>
                <SvgSms/>
                <NavP text='საბაჟო საწყობები' onClick={handleClick5} isClicked={isClicked5}/>
            </LinkSty>

            <LinkSty to='/settings'>
                <SvgSettings/>
                <NavP text='პარამეტრები' onClick={handleClick6} isClicked={isClicked6}/>
            </LinkSty>
            
        </NavDivSty>
    </div>
  )
}

export default Navigation