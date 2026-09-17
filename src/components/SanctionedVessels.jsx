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
`

const Input = styled.input`
  width: 100%;
  min-height: 5rem;
  border: 2px solid rgba(26, 172, 131, 0.3);
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  font-size: 1.8rem;
  background: white;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1aac83;
    box-shadow: 0 0 0 4px rgba(26, 172, 131, 0.14);
  }
`

const ResultMeta = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
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
  }

  tbody td {
    background: #fff;
  }
`

export default SanctionedVessels
