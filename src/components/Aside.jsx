import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AsideSty, LogoDivSty, Psty } from '../styledComponents/StyledComponents'
import Logo from '../styledComponents/Logo'
import Navigation from './Navigation'

const Aside = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  useEffect(() => {
    const syncMenuState = () => {
      if (window.innerWidth > 980) {
        setIsMenuOpen(true)
      }
    }

    syncMenuState()
    window.addEventListener('resize', syncMenuState)

    return () => window.removeEventListener('resize', syncMenuState)
  }, [])

  return (
    <AsideSty>
      <TopRow>
        <LogoDivSty>
          <Logo/>
          <Psty>ნავთობი</Psty>
        </LogoDivSty>

        <MenuButton
          type='button'
          aria-label='Toggle navigation menu'
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          ☰
        </MenuButton>
      </TopRow>

      <Navigation isMenuOpen={isMenuOpen} onLinkClick={() => setIsMenuOpen(false)} />
    </AsideSty>
  )
}

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const MenuButton = styled.button`
  display: none;
  width: 4rem;
  height: 4rem;
  border-radius: 1rem;
  background: #f3f4f6;
  color: #151d48;
  font-size: 2.4rem;
  cursor: pointer;

  @media (max-width: 980px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
`

export default Aside