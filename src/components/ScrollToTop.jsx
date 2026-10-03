import React, { useState, useEffect } from 'react';
import arrow from '../assets/arrow.svg';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const updateVisibility = () => setIsVisible(window.scrollY > 320)
        updateVisibility()
        window.addEventListener('scroll', updateVisibility, { passive: true })
        return () => window.removeEventListener('scroll', updateVisibility)
    }, [])

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }    
    
    
  return (
      isVisible && (
        <TopBtn 
            onClick={handleClick}
            whileHover={{ scale: 1.3,
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                boxShadow: "0px 0px 8px #1aac83"}}
            transition={{type: 'spring', stifness: 300}}
            drag
            dragConstraints={{left: 0, top: 0, right: 0, bottom: 0}}
            dragElastic={0.7}
            role='button'
            aria-label='დაბრუნება გვერდის თავში'>

            <img src={arrow} alt=""/>
        </TopBtn>
        )
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
    z-index: 1500;
    background: #1aac83;
    box-shadow: 0px 20px 50px 0px rgba(55, 69, 87, 0.10);

        img {
            display: block;
            width: 2.4rem;
            height: 2.4rem;
            object-fit: contain;
        }

        @media (max-width: 640px) {
            right: 2rem;
            bottom: 2rem;
            padding: 1rem;
        }
`

export default ScrollToTop