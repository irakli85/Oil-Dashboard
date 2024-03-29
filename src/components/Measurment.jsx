import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'


const Measurment = () => {
  const [docNum, setDocNum] = useState(null)
  const [realNum, setRealNum] = useState(null)

  const inputEl1 = useRef(null)
  const inputEl2 = useRef(null)

  let difference = Math.abs(docNum-realNum).toFixed(0)
  let percentage = Math.abs(((docNum-realNum)/docNum) * 100).toFixed(2)

  const handleFocus = (event) => event.target.select();

  useEffect( () => {
    const callback = (e) => {
      // if(document.activeElement === inputEl1.current) return
      // if(document.activeElement === inputEl2.current) return
      if(e.code ===  'ArrowRight'){
        inputEl2.current.focus()
        setRealNum('')
      }
      if(e.code ===  'ArrowLeft'){
        inputEl1.current.focus()
        setDocNum('')
      }
    }
    document.addEventListener('keydown', callback)
    return () => document.addEventListener('keydown', callback)
  },[])  

   
  return (
    <Container>
        <H2>ნავთობისა და ნავთობპროდუქტების რაოდენობის გაზომვის მეთოდების დასაშვები ცდომილების ნორმები</H2>
        <Hr/>
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
            <TdInp>
              <Input ref={inputEl1} type='number' max="10" onChange={(e) => setDocNum(e.target.value)} value={docNum} onFocus={handleFocus}/>
            </TdInp>
            <TdInp>
              <Input ref={inputEl2} type='number' max="10" onChange={(e) => setRealNum(e.target.value)} value={realNum} onFocus={handleFocus}/>
            </TdInp>
            <TdRes norm={percentage < 0.5 ? true : false }>{difference + ' კგ'} </TdRes>
            <TdRes norm={percentage < 0.5 ? true : false }>{isNaN(percentage) ? (0 + '%') : (percentage + ' %')}</TdRes>
          </Tr>
        </Table>
        <H2>აზომვის მეთოდები</H2>
        <Table>
          <Tr>
            <Th colSpan={2}>პირდაპირი მეთოდი</Th>
          </Tr>          
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების ნეტო მასის, ასევე ბიტუმების ნეტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.5 ? true : false }>&#xb1;0.5%</TdCond>
          </Tr>
          <Tr>
            <Td>პლასტიკური საცხების ნეტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.3 ? true : false }>&#xb1;0.3%</TdCond>
          </Tr>
        </Table>
        <Table>
          <Tr>
            <Th colSpan={3}>არაპირდაპირი მეთოდი</Th>
          </Tr>
          
          <Tr>
            <Td rowSpan={4} style={{fontWeight: 700}}>დინამიური მეთოდი</Td>
            <Td>ნავთობის ბრუტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.25 ? true : false }>&#xb1;0.25%</TdCond>
          </Tr>
          <Tr>
            <Td>ნავთობის ნეტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.35 ? true : false }>&#xb1;0.35%</TdCond>
          </Tr>
          <Tr>
            <Td>ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება 100 ტონიდან ზევით</Td>
            <TdCond norm={percentage < 0.5 ? true : false }>&#xb1;0.5%</TdCond>
          </Tr>  
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების და ნარჩენი ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.8 ? true : false }>&#xb1;0.8%</TdCond>
          </Tr>

          <Tr>
            <Td rowSpan={2} style={{fontWeight: 700}}>სტატიკური მეთოდი</Td>
            <Td>ნავთობის, ნავთობპროდუქტების და ბიტუმების ნეტო მასის გაზომვის ცდომილება 100 ტონიდან ზევით</Td>
            <TdCond norm={percentage < 0.5 ? true : false }>&#xb1;0.5%</TdCond>
          </Tr>
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების და ნარჩენი ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.8 ? true : false }>&#xb1;0.8%</TdCond>
          </Tr>

          <Tr>
            <Td rowSpan={2} style={{fontWeight: 700}}>ჰიდროსტატიკური მეთოდი</Td>
            <Td>ნავთობის და ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება 100 ტონიდან ზევით</Td>
            <TdCond norm={percentage < 0.5 ? true : false }>&#xb1;0.5%</TdCond>
          </Tr>
          <Tr>
            <Td>100 ტონამდე ნავთობპროდუქტების და ნარჩენი ნავთობპროდუქტების ნეტო მასის გაზომვის ცდომილება</Td>
            <TdCond norm={percentage < 0.8 ? true : false }>&#xb1;0.8%</TdCond>
          </Tr>

        </Table>
        
    </Container>
  )
}



export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const H2 = styled.h2`
  margin-top: 7rem;
  font-size: 2.4rem;
  font-weight: 800;
  max-width: 125rem;
  text-align: center;
  /* color: #1aac83; */
`

export const H4 = styled.h4`
  margin-top: 4rem;
  font-size: 2rem;
  font-weight: 600;
  max-width: 125rem;
  text-align: center;
`

export const Table = styled.table`
  width: 100%;
  height: 100%;
  border: solid 2px gray;
  margin-top: 5rem;
`

export const Th = styled.th`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;
  padding: 1rem;
`
export const Td = styled.td`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;
  padding: 1rem;
`

const TdRes = styled.td`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;
  padding: 1rem;
  color: ${props => props.norm === true ? '#1aac83' : '#e7195a'};
  font-weight: 900;
`

export const TdInp = styled.td`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;  
`

const TdCond = styled.td`
  font-size: 2rem;
  border: solid 2px gray;
  text-align: center;
  padding: 1rem;
  background: ${props => props.norm === true ? '#1aac83' : '#e7195a'};
`

export const Tr = styled.tr`
  border: solid 2px gray;
  height:100%;
`

export const Input = styled.input`
  font-size: 2rem;
  font-weight: 900;
  width: 100%;
  height: 100%;
  padding-inline: 5rem;  
  &:focus{
    outline: solid 4px #1aac83;
    background: #FFE2E5;
  }
`

export const Hr = styled.hr`
    margin-top: 3rem;
    width: 100%;    
    border: 0;
    height: 3px;
    background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgb(26, 172, 131), rgba(0, 0, 0, 0));
`
export default Measurment