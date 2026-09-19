import React, { useState } from 'react'
import { DashDivSty, DashPsty, LinkSty, NavDivSty, NavP, NavCont, CopyRight } from '../styledComponents/StyledComponents'
import { motion } from 'framer-motion';


import graph from '../assets/graph.svg'
import SvgSettings from '../styledComponents/svg/SvgSettings'
import SvgMeasure from '../styledComponents/svg/SvgMeasure'
import SvgColba from '../styledComponents/svg/SvgColba'
import SvgTank from '../styledComponents/svg/SvgTank'
import SvgWorld from '../styledComponents/svg/Svgworld'
import SvgPrice from '../styledComponents/svg/SvgPrice'
import SvgDocs from '../styledComponents/svg/SvgDocs'

const ShipNavIcon = ({ isClicked }) => (
  <ShipIconWrapper isClicked={isClicked} viewBox='0 0 120 120' aria-hidden='true'>
    <defs>
      <linearGradient id='shipNavGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor={isClicked ? '#1aac83' : '#737791'} stopOpacity='1' />
        <stop offset='100%' stopColor={isClicked ? '#0d8261' : '#5d6477'} stopOpacity='1' />
      </linearGradient>
    </defs>
    <circle cx='60' cy='60' r='52' fill={isClicked ? 'rgba(26,172,131,0.12)' : 'rgba(115,119,145,0.10)'} />
    <path d='M24 67L52 33H96L102 51L92 67H24Z' fill='url(#shipNavGradient)' opacity='0.98' />
    <path d='M48 33V18H69V33' fill='none' stroke={isClicked ? '#1aac83' : '#737791'} strokeWidth='5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M60 18V53' fill='none' stroke={isClicked ? '#1aac83' : '#737791'} strokeWidth='5' strokeLinecap='round' />
    <path d='M49 53H90' fill='none' stroke={isClicked ? '#1aac83' : '#737791'} strokeWidth='5' strokeLinecap='round' />
    <path d='M34 71H96' fill='none' stroke={isClicked ? '#1aac83' : '#737791'} strokeWidth='4' strokeLinecap='round' opacity='0.8' />
    <path d='M30 79C42 76 49 75 60 75C73 75 82 77 90 79' fill='none' stroke={isClicked ? '#1aac83' : '#737791'} strokeWidth='4' strokeLinecap='round' opacity='0.8' />
    <path d='M16 87C28 82 39 80 52 80C60 80 67 81 75 83C82 85 89 87 96 87C101 87 105 88 108 90V92H16V87Z' fill={isClicked ? 'rgba(26,172,131,0.18)' : 'rgba(115,119,145,0.12)'} />
    <path d='M20 94H100' fill='none' stroke={isClicked ? 'rgba(26,172,131,0.45)' : 'rgba(115,119,145,0.38)'} strokeWidth='3' strokeLinecap='round' />
  </ShipIconWrapper>
)

const buttonVariants = { 
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255, 255, 255)",
      boxShadow: "0px 0px 8px #5D5FEF"
    }
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: '-100vw'
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 8,
        when: 'beforeChildren',
        staggerChildren: 0.8
      }
    }
  }
  
  const childrenVariants = {
    hidden: {
      opacity: 0,
      x:'-100vw'
    },
    visible: {
      opacity: 1,
      x: 0
    }
  }

 

const ShipIconWrapper = ({ isClicked, ...props }) => (
  <svg
    {...props}
    style={{
      width: '2.6rem',
      height: '2.6rem',
      flexShrink: 0,
      display: 'block',
      filter: isClicked ? 'drop-shadow(0 2px 6px rgba(26,172,131,0.18))' : 'drop-shadow(0 2px 6px rgba(115,119,145,0.10))'
    }}
  />
)

const Navigation = ({ isMenuOpen = true, onLinkClick }) => {

    const [isClicked1, setIsClicked1] = useState(true)
    const [isClicked2, setIsClicked2] = useState(false)
    const [isClicked3, setIsClicked3] = useState(false)
    const [isClicked4, setIsClicked4] = useState(false)
    const [isClicked5, setIsClicked5] = useState(false)
    const [isClicked6, setIsClicked6] = useState(false)
    const [isClicked7, setIsClicked7] = useState(false)

    const closeMenu = () => {
        if (onLinkClick) onLinkClick()
    }

    const handleClick1 = () => {
        setIsClicked1(true)
        setIsClicked2(false)
        setIsClicked3(false)
        setIsClicked4(false)
        setIsClicked5(false)
        setIsClicked6(false)
        setIsClicked7(false)
        closeMenu()
    }

    const handleClick2 = () => {
        setIsClicked1(false)
        setIsClicked2(true)
        setIsClicked3(false)
        setIsClicked4(false)
        setIsClicked5(false)
        setIsClicked6(false)
        setIsClicked7(false)
        closeMenu()
    }

    const handleClick3 = () => {
        setIsClicked1(false)
        setIsClicked2(false)
        setIsClicked3(true)
        setIsClicked4(false)
        setIsClicked5(false)
        setIsClicked6(false)
        setIsClicked7(false)
        closeMenu()
    }

    const handleClick4 = () => {
        setIsClicked1(false)
        setIsClicked2(false)
        setIsClicked3(false)
        setIsClicked4(true)
        setIsClicked5(false)
        setIsClicked6(false)
        setIsClicked7(false)
        closeMenu()
    }

    const handleClick5 = () => {
        setIsClicked1(false)
        setIsClicked2(false)
        setIsClicked3(false)
        setIsClicked4(false)
        setIsClicked5(true)
        setIsClicked6(false)
        setIsClicked7(false)
        closeMenu()
    }

    const handleClick6 = () => {
        setIsClicked1(false)
        setIsClicked2(false)
        setIsClicked3(false)
        setIsClicked4(false)
        setIsClicked5(false)
        setIsClicked6(true)
        setIsClicked7(false)
        closeMenu()
    }

    const handleClick7 = () => {
        setIsClicked1(false)
        setIsClicked2(false)
        setIsClicked3(false)
        setIsClicked4(false)
        setIsClicked5(false)
        setIsClicked6(false)
        setIsClicked7(true)
        closeMenu()
    }
  return (
    <NavCont $isOpen={isMenuOpen}>
        <DashDivSty
            variants={buttonVariants}        
            whileHover="hover"         
        >
            <img src={graph} alt="graph" />
            <DashPsty to='https://oil-mern.vercel.app/login'>განაცხადები</DashPsty>
        </DashDivSty>
        <NavDivSty
            variants={containerVariants}
            initial='hidden'
            animate='visible'
        >
            <motion.div variants={childrenVariants}>
                <LinkSty to='/'>
                    <SvgMeasure isClicked={isClicked1}/>
                    <NavP text='აზომვის ცდომილება' onClick={handleClick1} isClicked={isClicked1}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/wastage'>
                    <SvgColba isClicked={isClicked2}/>
                    <NavP text='ბუნებრივი დანაკარგები' onClick={handleClick2} isClicked={isClicked2}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/oilprice'>
                    <SvgPrice isClicked={isClicked3}/>
                    <NavP text='ფასების კონტროლი' onClick={handleClick3} isClicked={isClicked3}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/docs'>
                    <SvgDocs isClicked={isClicked4}/>
                    <NavP text='დოკუმენტები' onClick={handleClick4} isClicked={isClicked4}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/terminals'>
                    <SvgTank isClicked={isClicked5}/>
                    <NavP text='საბაჟო საწყობები' onClick={handleClick5} isClicked={isClicked5}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/sanctioned-vessels'>
                    <ShipNavIcon isClicked={isClicked6} />
                    <NavP text='სანქცირებული გემები' onClick={handleClick6} isClicked={isClicked6}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/settings'>
                    <SvgSettings isClicked={isClicked7}/>
                    <NavP text='გემები' onClick={handleClick7} isClicked={isClicked7}/>
                </LinkSty>
            </motion.div>
        </NavDivSty>
        <SvgWorld/>
        <CopyRight>2023 © All Rights Reserved </CopyRight>
    </NavCont>
  )
}

export default Navigation