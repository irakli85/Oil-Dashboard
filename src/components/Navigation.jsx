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
    <NavCont>
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
                <LinkSty to='/settings'>
                    <SvgSettings isClicked={isClicked6}/>
                    <NavP text='პარამეტრები' onClick={handleClick6} isClicked={isClicked6}/>
                </LinkSty>
            </motion.div>            
        </NavDivSty>
        <SvgWorld/>
        <CopyRight>2023 © All Rights Reserved </CopyRight>
    </NavCont>
  )
}

export default Navigation