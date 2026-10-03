import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { DashDivSty, DashPsty, LinkSty, NavDivSty, NavP, NavCont, CopyRight } from '../styledComponents/StyledComponents'
import { motion } from 'framer-motion';


import graph from '../assets/graph.svg'
import invoiceIcon from '../assets/invoice.svg'
import cruiseIcon from '../assets/cruise.svg'
import sanctionIcon from '../assets/sanction.svg'
import exportIcon from '../assets/export.svg'
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

 

const ExportNavItem = styled.div`
  width: 100%;
`

const InvoiceNavIconWrap = styled.span`
  display: grid;
  place-items: center;
  width: 3.2rem;
  height: 3.2rem;
  flex-shrink: 0;
  border-radius: 0.8rem;
  background: ${({ $isClicked }) => $isClicked ? '#e3f4ed' : '#f1f5f3'};
  transition: background 0.2s ease;
`

const InvoiceNavIcon = styled(motion.img)`
  width: 2.6rem;
  height: 2.6rem;
  flex-shrink: 0;
  display: block;
  object-fit: contain;
  filter: ${({ $isClicked }) => $isClicked
    ? 'brightness(0) saturate(100%) invert(34%) sepia(47%) saturate(960%) hue-rotate(107deg) brightness(89%) contrast(94%) drop-shadow(0 2px 6px rgba(26,172,131,0.18))'
    : 'brightness(0) saturate(100%) invert(50%) sepia(10%) saturate(650%) hue-rotate(195deg) brightness(91%) contrast(88%)'};
`

const NavAssetIcon = styled(motion.img)`
  width: 2.6rem;
  height: 2.6rem;
  flex-shrink: 0;
  display: block;
  object-fit: contain;
  filter: ${({ $isClicked }) => $isClicked
    ? 'brightness(0) saturate(100%) invert(34%) sepia(47%) saturate(960%) hue-rotate(107deg) brightness(89%) contrast(94%)'
    : 'brightness(0) saturate(100%) invert(50%) sepia(10%) saturate(650%) hue-rotate(195deg) brightness(91%) contrast(88%)'};
`

const SanctionNavIcon = styled(motion.span)`
  width: 4.2rem;
  height: 4.2rem;
  flex-shrink: 0;
  display: block;
  background-color: ${({ $isClicked }) => $isClicked ? '#1aac83' : '#737791'};
  mask: url(${sanctionIcon}) center / contain no-repeat;
  -webkit-mask: url(${sanctionIcon}) center / contain no-repeat;
`

const ExportNavIcon = styled(motion.span)`
  width: 2.6rem;
  height: 2.6rem;
  flex-shrink: 0;
  display: block;
  background-color: ${({ $isActive }) => $isActive ? '#1aac83' : '#737791'};
  mask: url(${exportIcon}) center / contain no-repeat;
  -webkit-mask: url(${exportIcon}) center / contain no-repeat;
`

const ExportNavHeader = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  width: 100%;
  cursor: pointer;

  @media (max-width: 560px) {
    gap: 1.2rem;
  }
`

const ExportChevron = styled.span`
  color: #737791;
  font-size: 1.6rem;
  margin-left: auto;
  transition: transform 0.2s ease;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
`

const ExportSubMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin-top: 1.6rem;
  padding-left: 5rem;
`

const Navigation = ({ isMenuOpen = true, onLinkClick }) => {
  const { pathname } = useLocation()

  const isClicked1 = pathname === '/'
  const isClicked2 = pathname === '/wastage'
  const isClicked3 = pathname === '/oilprice'
  const isClicked4 = pathname === '/docs'
  const isClicked5 = pathname === '/terminals'
  const isClicked6 = pathname === '/sanctioned-vessels'
  const isClicked7 = pathname === '/livemap'
  const isClicked8 = pathname === '/export'
  const isClicked9 = pathname === '/export/archived'
  const isClicked10 = pathname === '/export/settings'
  const isClicked11 = pathname === '/invoices'
  const [isExportOpen, setIsExportOpen] = useState(pathname.startsWith('/export'))

    const closeMenu = () => {
        if (onLinkClick) onLinkClick()
    }

    const toggleExport = () => {
        setIsExportOpen((prev) => !prev)
    }

    React.useEffect(() => {
    if (pathname.startsWith('/export')) setIsExportOpen(true)
    }, [pathname])
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
              <LinkSty to='/' onClick={closeMenu}>
                    <SvgMeasure isClicked={isClicked1}/>
                <NavP text='აზომვის ცდომილება' isClicked={isClicked1}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
              <LinkSty to='/wastage' onClick={closeMenu}>
                    <SvgColba isClicked={isClicked2}/>
                <NavP text='ბუნებრივი დანაკარგები' isClicked={isClicked2}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
              <LinkSty to='/oilprice' onClick={closeMenu}>
                    <SvgPrice isClicked={isClicked3}/>
                <NavP text='ფასების კონტროლი' isClicked={isClicked3}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
              <LinkSty to='/docs' onClick={closeMenu}>
                    <SvgDocs isClicked={isClicked4}/>
                <NavP text='დოკუმენტები' isClicked={isClicked4}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
              <LinkSty to='/terminals' onClick={closeMenu}>
                    <SvgTank isClicked={isClicked5}/>
                <NavP text='საბაჟო საწყობები' isClicked={isClicked5}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
              <LinkSty to='/sanctioned-vessels' onClick={closeMenu}>
                    <SanctionNavIcon
                      aria-hidden='true'
                      $isClicked={isClicked6 || pathname === '/sanctioned-vessels'}
                      variants={childrenVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                    <NavP text='სანქცირებული გემები' isClicked={isClicked6}/>
                </LinkSty>
            </motion.div>

            <motion.div variants={childrenVariants}>
                <ExportNavItem $isOpen={isExportOpen}>
                    <ExportNavHeader onClick={toggleExport}>
                        <ExportNavIcon
                          aria-hidden='true'
                          $isActive={isClicked8 || isClicked9 || isClicked10 || pathname.startsWith('/export')}
                          variants={childrenVariants}
                          whileHover={{ scale: 1.1, y: -2 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                        />
                        <NavP text='ექსპორტი' isClicked={isClicked8 || isClicked9 || isClicked10 || pathname.startsWith('/export')}/>
                        <ExportChevron $isOpen={isExportOpen}>▾</ExportChevron>
                    </ExportNavHeader>
                    {isExportOpen && (
                        <ExportSubMenu>
                            <LinkSty to='/export' onClick={closeMenu}>
                              <NavP text='მიმდინარე' isClicked={isClicked8} noScale/>
                            </LinkSty>
                            <LinkSty to='/export/archived' onClick={closeMenu}>
                              <NavP text='გასული' isClicked={isClicked9} noScale/>
                            </LinkSty>
                            <LinkSty to='/export/settings' onClick={closeMenu}>
                              <NavP text='ინფორმაციის დამატება' isClicked={isClicked10} noScale/>
                            </LinkSty>
                        </ExportSubMenu>
                    )}
                </ExportNavItem>
            </motion.div>

                    <motion.div variants={childrenVariants}>
                      <LinkSty to='/invoices' onClick={closeMenu}>
                        <InvoiceNavIconWrap $isClicked={isClicked11}>
                          <InvoiceNavIcon
                            src={invoiceIcon}
                            alt=''
                            aria-hidden='true'
                            $isClicked={isClicked11}
                            variants={childrenVariants}
                            whileHover={{ scale: 1.1, rotate: -3 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                          />
                        </InvoiceNavIconWrap>
                        <NavP text='ინვოისების მართვა' isClicked={isClicked11}/>
                      </LinkSty>
                    </motion.div>

            <motion.div variants={childrenVariants}>
                <LinkSty to='/livemap' onClick={closeMenu}>
                    <NavAssetIcon
                      src={cruiseIcon}
                      alt=''
                      aria-hidden='true'
                      $isClicked={isClicked7 || pathname === '/livemap'}
                      variants={childrenVariants}
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                    <NavP text='გემები' isClicked={isClicked7}/>
                </LinkSty>
            </motion.div>
        </NavDivSty>
        <SvgWorld/>
        <CopyRight>2023 © All Rights Reserved </CopyRight>
    </NavCont>
  )
}

export default Navigation