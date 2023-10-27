import React, { useState, useEffect } from 'react';
import arrow from '../assets/arrow.svg';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const ScrollToTop = () => {

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }    
    
    
  return (
            
        <TopBtn 
            onClick={handleClick}
            whileHover={{ scale: 1.3,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px #1aac83"}}
            transition={{type: 'spring', stifness: 300}}
            drag
            dragConstraints={{left: 0, top: 0, right: 0, bottom: 0}}
            dragElastic={0.7} >

            <img src={arrow} alt="arrow"/>
        </TopBtn>
    )    
}    


const TopBtn = styled(motion.div)`    
    position: fixed;
    bottom: 5rem;
    right: 5rem;    
    color: white;
    padding: 2rem;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    z-index: 1;
    background: #1aac83;
    box-shadow: 0px 20px 50px 0px rgba(55, 69, 87, 0.10);
`

export default ScrollToTop