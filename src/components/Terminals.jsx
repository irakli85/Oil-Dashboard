import { Container, Hr, H2 } from './Measurment'
import styled from 'styled-components'
import Tabs from './Tabs'
import bg from '../assets/bot1.jpg'

const Terminals = () => {

  

    return (
    <Container>
        <Header>
          <H2st>ნავთობ-ტერმინალები</H2st>
        </Header>
        <Hr/>        
        <Tabs />        
    </Container>
  )
}

const Header = styled.div`
  width: 100%;
  border-radius: 1.5rem;
  height: 30rem;
  background-image: url(${bg});  
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 3rem;
  position: relative;
  &::after{
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0, 0.2);
    border-radius: 1.5rem;
  }
`

const H2st = styled(H2)`
  color: #fff;
  font-size: 3.4rem;
  position: relative;
  z-index: 2;
  font-weight: 900;
`



export default Terminals