import React, { useState } from 'react'
import styled from 'styled-components'


const Measurment = () => {

  const [docNum, setDocNum] = useState(1)
  const [realNum, setRealNum] = useState(1)

  let difference = docNum-realNum
  let percentage = ((docNum-realNum)/docNum) * 100

  let norm = false

 
  return (
    <Container>
        <H2>ნავთობისა და ნავთობპროდუქტების რაოდენობის გაზომვის მეთოდების დასაშვები ცდომილების ნორმები</H2>
        <Table>
          <Tr>
            <Th colSpan={2}>ნავთობპროდუქტების რაოდენობა</Th>
            <Th colSpan={2}>ცდომილება</Th>
          </Tr>
          <Tr>
            <Td>დოკუმენტურად</Td>
            <Td>ფაქტიურად</Td>
            <Td>რაოდენობრივად</Td>
            <Td>პროცენტულად</Td>
          </Tr>
          <Tr>
            <Td>
              <Input type='number' onChange={(e) => setDocNum(e.target.value)} value={docNum}/>
            </Td>
            <Td>
              <Input type='number' onChange={(e) => setRealNum(e.target.value)} value={realNum}/>
            </Td>
            <Td>{difference + ' კგ'} </Td>
            <Td>{percentage + '%'}</Td>
          </Tr>
        </Table>
        <H2>აზომვის მეთოდები</H2>
        <Table>
          <Tr>
            <Th colSpan={2}>პირდაპირი მეთოდი</Th>
          </Tr>          
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების ნეტო მასის, ასევე ბიტუმების ნეტო მასის გაზომვის ცდომილება</Td>
            <Td norm={true}>&#xb1;0.5%</Td>
          </Tr>
          <Tr>
            <Td>პლასტიკური საცხების ნეტო მასის გაზომვის ცდომილება</Td>
            <Td>&#xb1;0.3%</Td>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Th colSpan={3}>არაპირდაპირი მეთოდი</Th>
          </Tr>
          
          <Tr>
            <Td rowSpan={4}>დინამიური მეთოდი</Td>
            <Td>ნავთობის ბრუტო მასის გაზომვის ცდომილება</Td>
            <Td>&#xb1;0.25%</Td>
          </Tr>
          <Tr>
            <Td>ნავთობის ნეტო მასის გაზომვის ცდომილება</Td>
            <Td>&#xb1;0.35%</Td>
          </Tr>
          <Tr>
            <Td>ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება 100 ტონიდან ზევით</Td>
            <Td>&#xb1;0.5%</Td>
          </Tr>  
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების და ნარჩენი ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება</Td>
            <Td>&#xb1;0.8%</Td>
          </Tr>

          <Tr>
            <Td rowSpan={2}>სტატიკური მეთოდი</Td>
            <Td>ნავთობის, ნავთობპროდუქტების და ბიტუმების ნეტო მასის გაზომვის ცდომილება 100 ტონიდან ზევით</Td>
            <Td>&#xb1;0.5%</Td>
          </Tr>
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების და ნარჩენი ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება</Td>
            <Td>&#xb1;0.8%</Td>
          </Tr>

          <Tr>
            <Td rowSpan={2}>ჰიდროსტატიკური მეთოდი</Td>
            <Td>ნავთობის და ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება 100 ტონიდან ზევით</Td>
            <Td>&#xb1;0.5%</Td>
          </Tr>
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების და ნარჩენი ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება</Td>
            <Td>&#xb1;0.8%</Td>
          </Tr>

        </Table>
        
    </Container>
  )
}



const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const H2 = styled.h2`
  margin-top: 7rem;
  font-size: 2.4rem;
  font-weight: 800;
  max-width: 125rem;
  text-align: center;
  /* color: #1aac83; */
`

const Table = styled.table`
  width: 100rem;
  border: solid 2px gray;
  margin-top: 5rem;
`

const Th = styled.th`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;
  padding: 1rem;
`

const Td = styled.td`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;
  padding: 1rem;
  background: ${props => props.norm === true ? 'red' : null}
`

const Tr = styled.tr`
  border: solid 2px gray;
`

const Input = styled.input`
  font-size: 2rem;
`

export default Measurment