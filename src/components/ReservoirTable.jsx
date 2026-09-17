import React from 'react'
import DeepDive from '../styledComponents/DeepDive'
import { Table, Th, Td, Tr } from './Measurment'

const ReservoirTable = ({
  id,
  title,
  items,
  total,
  showYear = true,
}) => {
  const emptyCellCount = showYear ? 3 : 2

  return (
    <DeepDive text={title} id={id}>
      <Table
        style={{
          width: '70%',
          marginTop: '3rem',
          border: 'solid 1px gray',
          alignSelf: 'center',
        }}
      >
        <Tr>
          <Th style={{ width: '11rem' }}>რეზ-ბის რაოდ.</Th>
          <Th style={{ width: '10rem' }}>რეზ-რის №</Th>
          {showYear && <Th>რეზ-რის აშენების წელი</Th>}
          <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>
        </Tr>

        {items.map((item) => (
          <Tr key={`${id}-${item.count}`}>
            <Td>{item.count}</Td>
            <Td style={{ fontWeight: 900 }}>{item.tank}</Td>
            {showYear && <Td>{item.year}</Td>}
            <Td style={{ fontWeight: 900 }}>{item.vol}</Td>
          </Tr>
        ))}

        <Tr>
          {Array.from({ length: emptyCellCount }).map((_, index) => (
            <Td key={`${id}-empty-${index}`} style={{ border: 'none' }} />
          ))}
          <Td style={{ color: '#1aac83', fontWeight: 900, border: 'none' }}>{total}</Td>
        </Tr>
      </Table>
    </DeepDive>
  )
}

export default ReservoirTable
