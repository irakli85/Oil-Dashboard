import React from 'react'
import Draggable from 'react-draggable';
import styled from 'styled-components'
import map from '../assets/batumi.png'
import ship from '../assets/ship.svg'

const Map = () => {
  return (
    <Container>
        <Aside>
            <Draggable>
                <div className='gemi'>
                    <img src={ship} alt="ship" />
                </div>
            </Draggable>
            <Draggable>
                <div className='gemi'>
                    <img src={ship} alt="ship" />
                </div>
            </Draggable>
            <Draggable>
                <div className='gemi'>
                    <img src={ship} alt="ship" />
                </div>
            </Draggable>
        </Aside>
       <Content>
            <img src={map} alt="map" />
       </Content>
    </Container>
  )
}

const Container = styled.div`
    width: 100%;
    display: flex;
`

const Aside = styled.div`
    width: 20%;
    background-color: white;
    padding: 2rem;

    .gemi{
        cursor: pointer;
    }
`
const Content = styled.div`
    width: 80%;
    height: 100vh;
    background-color: gainsboro;
    img{
        height: 100%;
    }
`

export default Map