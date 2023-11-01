import React from 'react'
import { Container } from './Measurment'
import customs from '../assets/Customs.svg'
import styled from 'styled-components'

const Docs = () => {
  return (
    <Container>
        <Img src={customs} alt="customs" />
    </Container>
  )
}

const Img = styled.img`
    width: 100%;
    border-radius: 1.5rem;
`

export default Docs