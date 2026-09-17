import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import sanctioned from '../../sanctioned'
import { Container, Hr, H2, Table, Th, Td, Tr } from './Measurment'

const SanctionedVessels = () => {
  const [nameQuery, setNameQuery] = useState('')
  const [imoQuery, setImoQuery] = useState('')

  const filteredShips = useMemo(() => {
    const normalizedName = nameQuery.trim().toLowerCase()
    const normalizedImo = imoQuery.trim().toLowerCase()

    return sanctioned.filter((ship) => {
      const matchesName = !normalizedName || ship.name.toLowerCase().includes(normalizedName)
      const matchesImo = !normalizedImo || String(ship.imo).toLowerCase().includes(normalizedImo)
      return matchesName && matchesImo
    })
  }, [nameQuery, imoQuery])

  const hasResults = filteredShips.length > 0

  return (
    <Container>
      <Header>
        <HeaderContent>
          <ShipLogo aria-label='Ship logo' />
          <H2st>სანქცირებული გემები</H2st>
          <HeaderBadge>{sanctioned.length} ჩანაწერი</HeaderBadge>
        </HeaderContent>
      </Header>
      <Hr />

      <SearchPanel>
        <SearchField>
          <Label>გემის სახელი</Label>
          <Input
            type='text'
            value={nameQuery}
            onChange={(event) => setNameQuery(event.target.value)}
            placeholder='მაგ: Angara'
          />
        </SearchField>

        <SearchField>
          <Label>IMO</Label>
          <Input
            type='text'
            value={imoQuery}
            onChange={(event) => setImoQuery(event.target.value)}
            placeholder='მაგ: 9179842'
          />
        </SearchField>
      </SearchPanel>

      <ResultMeta>
        <span>{filteredShips.length} შედეგი</span>
        <ClearButton type='button' onClick={() => { setNameQuery(''); setImoQuery('') }}>
          გასუფთავება
        </ClearButton>
      </ResultMeta>

      <TableWrapper>
        <ResultsTable>
          <thead>
            <Tr>
              <Th>გემის სახელი</Th>
              <Th>IMO</Th>
              <Th>განაცხადის თარიღი</Th>
            </Tr>
          </thead>
          <tbody>
            {hasResults ? (
              filteredShips.map((ship, index) => (
                <Tr key={`${ship.imo}-${index}`}>
                  <Td>{ship.name}</Td>
                  <Td>{ship.imo}</Td>
                  <Td>{ship.date}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={3}>ძებნის შედეგები არ მოიძებნა</Td>
              </Tr>
            )}
          </tbody>
        </ResultsTable>
      </TableWrapper>
    </Container>
  )
}

const ShipLogo = () => (
  <ShipSvg viewBox='0 0 120 120' role='img' aria-hidden='true'>
    <defs>
      <linearGradient id='shipHull' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#ffffff' stopOpacity='1' />
        <stop offset='100%' stopColor='#dffaf2' stopOpacity='1' />
      </linearGradient>
    </defs>

    <circle cx='60' cy='60' r='52' fill='rgba(255,255,255,0.12)' />
    <path d='M24 67L52 33H96L102 51L92 67H24Z' fill='url(#shipHull)' opacity='0.98' />
    <path d='M48 33V18H69V33' fill='none' stroke='#ffffff' strokeWidth='5' strokeLinecap='round' strokeLinejoin='round' />
    <path d='M60 18V53' fill='none' stroke='#ffffff' strokeWidth='5' strokeLinecap='round' />
    <path d='M49 53H90' fill='none' stroke='#ffffff' strokeWidth='5' strokeLinecap='round' />
    <path d='M34 71H96' fill='none' stroke='#ffffff' strokeWidth='4' strokeLinecap='round' opacity='0.8' />
    <path d='M30 79C42 76 49 75 60 75C73 75 82 77 90 79' fill='none' stroke='#ffffff' strokeWidth='4' strokeLinecap='round' opacity='0.8' />
    <path d='M16 87C28 82 39 80 52 80C60 80 67 81 75 83C82 85 89 87 96 87C101 87 105 88 108 90V92H16V87Z' fill='rgba(255,255,255,0.18)' />
    <path d='M20 94H100' fill='none' stroke='rgba(255,255,255,0.42)' strokeWidth='3' strokeLinecap='round' />
  </ShipSvg>
)

const Header = styled.div`
  width: 100%;
  border-radius: 1.5rem;
  min-height: 20rem;
  background: linear-gradient(135deg, #1aac83 0%, #0c5d47 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const ShipSvg = styled.svg`
  width: 7.5rem;
  height: 7.5rem;
  display: block;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.12));
`

const H2st = styled(H2)`
  color: #fff;
  font-size: 3.2rem;
  margin-top: 0;
`

const HeaderBadge = styled.span`
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 0.8rem 1.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`

const SearchPanel = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(20rem, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(26, 172, 131, 0.04);
  border: 1px solid rgba(26, 172, 131, 0.12);
  border-radius: 1.4rem;
`

const SearchField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.8rem;
  font-weight: 600;
`

const Label = styled.span`
  color: #151d48;
  font-size: 1.6rem;
  font-weight: 700;
`

const Input = styled.input`
  width: 100%;
  min-height: 5rem;
  border: 1px solid rgba(26, 172, 131, 0.24);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  font-size: 1.7rem;
  background: white;
  color: #151d48;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1aac83;
    box-shadow: 0 0 0 4px rgba(26, 172, 131, 0.12);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: rgba(21, 29, 72, 0.45);
  }
`

const ResultMeta = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.2rem 1.4rem;
  border-radius: 1rem;
  background: rgba(26, 172, 131, 0.05);
  border: 1px solid rgba(26, 172, 131, 0.12);
  font-size: 1.6rem;
  font-weight: 700;
  color: #1aac83;
`

const ClearButton = styled.button`
  background: transparent;
  border: 1px solid rgba(26, 172, 131, 0.32);
  color: #1aac83;
  border-radius: 999px;
  padding: 0.8rem 1.4rem;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(26, 172, 131, 0.08);
    transform: translateY(-1px);
  }
`

const TableWrapper = styled.div`
  width: 100%;
  max-height: 46rem;
  overflow: auto;
  margin-top: 1rem;
  border: 1px solid rgba(21, 29, 72, 0.15);
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 12px 28px rgba(17, 24, 39, 0.04);

  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #1aac83;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #138a67;
  }
`

const ResultsTable = styled(Table)`
  margin-top: 0;
  width: 100%;
  background: #fff;
  border-collapse: collapse;

  thead th {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #fff;
    box-shadow: inset 0 -2px 0 rgba(21, 29, 72, 0.12);
    padding: 1.4rem 1rem;
  }

  tbody td {
    background: #fff;
    padding: 1.2rem 1rem;
    transition: background 0.2s ease;
  }

  tbody tr:hover td {
    background: rgba(26, 172, 131, 0.04);
  }
`

export default SanctionedVessels
