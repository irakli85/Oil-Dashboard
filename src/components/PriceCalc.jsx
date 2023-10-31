import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Table, Tr, Th, Td, Input, TdInp, H2, H4, Hr } from './Measurment'
import Pitfall from './Pitfall'

const PriceCalc = () => {
    const [density1, setDensity1]=useState(0.85)
    const [density2, setDensity2]=useState(0.85)
    const [density3, setDensity3]=useState(0.85)


    let barrel = 159
    let tonnes = 1000
    let calculation1 = ((tonnes/density1) / barrel)*45
    let calculation2 = ((tonnes/density2) / barrel)*60
    let calculation3 = ((tonnes/density3) / barrel)*100

    const handleFocus = (event) => event.target.select();
    
  return (
    <Container>
        <H2>ნავთობპროდუქტების ფასის ზედა ზღვარის კალკულატორი</H2>
        <Hr/>
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
            <Td style={{color: '#1aac83', fontWeight: 900}}>{calculation1.toFixed(2) + ' $'}</Td>
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
            <Td style={{color: '#1aac83', fontWeight: 900}}>{calculation2.toFixed(2) + ' $'}</Td>
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
            <Td style={{color: '#1aac83', fontWeight: 900}}>{calculation3.toFixed(2) + ' $'}</Td>
          </Tr> 
        </Table>
        <Pitfall text='დათვლის მეთოდი'>
            <PriceDiv>
                <H4 style={{fontWeight: 800}}>ბარელზე 45$ ზღვრული ფასის შემთხვევაში:</H4>
                <PriceP>ნავთობპროდუქტების საშუალო სიმკვრივე - 0.85</PriceP>
                <PriceP>1 ბარელი (US oil) = 159 ლ</PriceP>
                <PriceP>1 ტონა ნავთობის კონვერტაცია ლიტრში 0.85 სიმკვრივის შემთხვევაში - 1000 / 0.85 = 1176 ლ</PriceP> 
                <PriceP>ბარელის გამოთვლა 1176 ლიტრიდან - 1176 / 159 = 7.399 ბარელი</PriceP> 
                <PriceP>ფასის მაქსიმუმი ტონაზე  - 7.399 * 45$ = 332.96$</PriceP>
            </PriceDiv>           
        </Pitfall>       
    </Container>
  )
}

const PriceDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;    
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
    font-weight: 700;
`

export default PriceCalc