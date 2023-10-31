import React from 'react'
import { styled } from 'styled-components'
import pitfall from '../assets/pitfall.svg'

function Pitfall({text, children}) {
  return (
    <PitDiv>
        <PitDiv2>
            <img src={pitfall} alt="pitfall" />
            <PitP>{text}</PitP>
        </PitDiv2>
        {children}
    </PitDiv>
  )
}

const PitDiv = styled.div`
    margin-top: 3rem;
    padding: 3.2rem;
    background-color: #fef5e7;
    border-radius: 1rem;
    border: 1px solid #e5e7eb;
`

const PitDiv2 = styled.div`
    display: flex;
`

const PitP = styled.p`
    font-size: 2.4rem;
    color: #c76a15;
    font-weight: 800;
    margin-left: 1.5rem;
`

export default Pitfall