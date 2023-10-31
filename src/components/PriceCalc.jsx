import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Table, Tr, Th, Td, Input, TdInp } from './Measurment'

const PriceCalc = () => {
    const [density1, setDensity1]=useState(0.85)
    const [density2, setDensity2]=useState(0.85)
    const [density3, setDensity3]=useState(0.85)

    let calculation1 = ((density1*1000) / 159)*45
    let calculation2 = ((density2*1000) / 159)*60
    let calculation3 = ((density3*1000) / 159)*100

    const handleFocus = (event) => event.target.select();
    
  return (
    <Container>
        <Table>
          <Tr>
            <Th>სიმკვრივე</Th>
            <Th>ერთი ბარელის ფასი, $</Th>
            <Th>ზღვრული ფასი ტონაზე, $</Th>
          </Tr>
          <Tr>
            <TdInp>
                <Input 
                    type="number" 
                    onChange={(e) => setDensity1(e.target.value) } 
                    value={density1} 
                    onFocus={handleFocus}
                />
            </TdInp>
            <Td>45 $</Td>
            <Td>{calculation1.toFixed(2) + ' $'}</Td>
          </Tr>

          <Tr>
            <TdInp>
                <Input 
                    type="number" 
                    onChange={(e) => setDensity2(e.target.value) } 
                    value={density2}
                    onFocus={handleFocus}
                />                
            </TdInp>
            <Td>60 $</Td>
            <Td>{calculation2.toFixed(2) + ' $'}</Td>
          </Tr>

          <Tr>
            <TdInp>
                <Input 
                    type="number" 
                    onChange={(e) => setDensity3(e.target.value) } 
                    value={density3}
                    onFocus={handleFocus}
                />
            </TdInp>
            <Td>100 $</Td>
            <Td>{calculation3.toFixed(2) + ' $'}</Td>
          </Tr> 
        </Table>       
    </Container>
  )
}

const PriceDiv = styled.div`
    display: flex
`

const PriceInp = styled.input`
    font-size: 1.6rem;
    padding: 5px;
`

const PriceStrong = styled.strong`
    font-size: 1.6rem;
    padding: 5px;
`

const PriceP = styled.p`
    font-size: 1.6rem;
    padding: 5px;
`

export default PriceCalc