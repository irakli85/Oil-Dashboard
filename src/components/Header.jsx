import React from 'react'
import { HeadDivSty, HeadPsty } from '../styledComponents/StyledComponents'
import styled from 'styled-components'
import geo from '../assets/geo.svg'
import usa from '../assets/usa.svg'
import bell from '../assets/bell.svg'
import user from '../assets/user.svg'

const Header = () => {



  return (
    <HeadDivSty>
        <HeadPsty>Dashboard</HeadPsty>
        <Input type='text' placeholder='ძებნა'/>
        <Div>
          <Select>
            <Option value="geo">
              <img src={geo} alt="georgia" />
              <Span>ქარ</Span>
            </Option>
            <Option value="usa">
              <img src={usa} alt="usa" />
              <Span>Eng(US)</Span>
            </Option>
          </Select>
          <Div2>
              <img src={bell} alt="bell" />
          </Div2>
          <Div3>
            <img src={user} alt="user" />
            <div>
              <P>User Name</P>
              <P1>admin</P1>
            </div>
          </Div3>
          

        </Div>
    </HeadDivSty>
  )
}

const Input = styled.input`
  margin-left: 20rem;
  width: 51.3rem;
  height: 6rem;
  padding: 0.2rem 3.2rem 0.2rem 6.4rem;
  border-radius: 1.6rem;
  background: #F9FAFB;
  font-size: 1.6rem;
  &:focus{
    outline: solid 3px #5D5FEF; 
  }
  background-image: url('../src/assets/search.svg');
  background-repeat: no-repeat;
  background-position: top 1.5rem  left 2rem;
`

const Div = styled.div`
    display: flex;
    align-items: center;
    gap: 2.4rem;
    margin-left: 4rem;
`

const Select = styled.select`
  height: 60px;
  padding: 5px 16px;
  font-size: 1.8rem;
  &:focus{
    outline: solid 3px #1aac83;
  }
  
`
const Span = styled.span`
  font-size: 1.8rem;
`

const Option = styled.option`
  font-size: 1.8rem;
  padding: 5px;
`

const Div2 = styled.div`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 8px;
  background: #FFFAF1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Div3 = styled.div`
  display: flex;
  gap: 2rem;
`
const P = styled.p`
  color: #151D48;
  font-family: Poppins;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2.4rem; /* 150% */
`

const P1 = styled.p`
  color: #737791;
  font-family: Poppins;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem; /* 142.857% */
`

export default Header