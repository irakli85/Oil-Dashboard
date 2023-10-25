import React from 'react'
import styled from 'styled-components'


const Measurment = () => {
  return (
    <Container>
        <H2>ნავთობისა და ნავთობპროდუქტების რაოდენობის გაზომვის მეთოდების დასაშვები ცდომილების ნორმები</H2>
    </Container>
  )
}



const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const H2 = styled.h2`
  font-size: 2.4rem;
  font-weight: 900;
  width: 125rem;
  text-align: center;
`

export default Measurment