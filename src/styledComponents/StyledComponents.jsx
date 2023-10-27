import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import { useState } from 'react'


export const AsideSty = styled.div`
    width: 22%;
    height: 100%;
    background:  #fff;
    border-radius: 1.5rem  0 0 1.5rem;
    padding: 2rem;
`

export const ContentSty = styled.div`
    width: 78%;
    background:  #fff;
    border-radius: 0 1.5rem  1.5rem 0;
    padding: 1rem;
    height: fit-content;
`

export const MainSty = styled.main`
    display: flex;
    width: 100%;
    height: calc(100vh - 4rem);
`

export const LogoDivSty = styled.div`
    display: flex;
    align-items: center;
`

export const Psty = styled.p`
    color: #1aac83;
    font-size: 3rem;
    font-style: normal;
    font-weight: 600;
    line-height: 150%; 
    padding: 2rem;
`

export const DashDivSty = styled(motion.div)`
    margin-top: 5rem;
    display: flex;
    width: 25.2rem;
    height: 6.4rem;
    padding: 1.6rem 2.4rem;
    align-items: center;
    gap: 2.4rem;
    border-radius: 16px;
    background: #5D5FEF;
    box-shadow: 0px 20px 50px 0px rgba(55, 69, 87, 0.10);
    cursor: pointer;
`

export const DashPsty = styled(Link)`
    color: #FFF;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-decoration: none;   
`

export const NavDivSty = styled.nav`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 5rem;
`

export const HeadDivSty = styled.header`
    width: 100%;
    height: 12rem;
    background: #fff;
    padding: 3.5rem 4rem;
`

export const HeadPsty = styled.p`
    color: var(--greys-blue-grey-900, #151D48);
    font-family: Poppins;
    font-size: 3.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; 
`

export const ContentDivSty = styled.div`
    width: 100%;
    /* height: 100%; */
    background: #F3E8FF;
    border-radius: 1.5rem;
    padding: 3.2rem;
`

export const LinkSty = styled(Link)`
    display: flex;
    gap: 2.4rem;
    align-items: center;

    color: #737791;
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration: none;
`

export const NavP = ({text, onClick, isClicked}) => {   
    
    return(
        <motion.p  onClick={onClick}
            style={{
                color: isClicked ? '#1aac83' : '#737791',
                fontSize: isClicked ? '20px' : '16px',
                fontWeight: isClicked ? 900 : 400
            }}         
            whileHover={{scale: 1.3, originX: 0, color: '#1aac83', fontWeight: 900}}
            transition={{type: 'spring', stifness: 300}}
            >{text}
        </motion.p>
    )
}







