import React, { useState } from 'react'
import { HeadDivSty, HeadPsty } from '../styledComponents/StyledComponents'
import styled from 'styled-components'
import geo from '../assets/geo.svg'
import usa from '../assets/usa.svg'
import bell from '../assets/bell.svg'
import user from '../assets/user.svg'
import search from '../assets/search.svg'
import { useAdminAuth } from './AdminAuthProvider'

const Header = () => {
  const [count, setCount] = useState(0)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { authReady, isAuthenticated, username, login, logout } = useAdminAuth()

  const handleClick = () => {
    setCount(count+1)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    if (isLoggingIn) return
    setIsLoggingIn(true)
    setLoginError('')
    try {
      await login(loginName, password)
      setPassword('')
      setIsLoginOpen(false)
    } catch (error) {
      setLoginError(error.message)
    } finally {
      setIsLoggingIn(false)
    }
  }


  return (
    <HeadDivSty>
        <HeadPsty>Dashboard</HeadPsty>
        <Input type='text' placeholder='ძებნა...'/>
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
          <Div2 onClick={handleClick}>
              <img src={bell} alt="bell" />
              <Strong>{count}</Strong>
          </Div2>
          <Div3>
            <img src={user} alt="user" />
            <div>
              <P>{isAuthenticated ? username : 'სტუმარი'}</P>
              <P1>{isAuthenticated ? 'admin' : 'არაა შესული'}</P1>
            </div>
            {isAuthenticated ? (
              <AuthButton type="button" onClick={logout}>გასვლა</AuthButton>
            ) : (
              <AuthButton type="button" disabled={!authReady} onClick={() => setIsLoginOpen(true)}>შესვლა</AuthButton>
            )}
          </Div3>
        </Div>
        {isLoginOpen && (
          <LoginOverlay role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !isLoggingIn) setIsLoginOpen(false) }}>
            <LoginDialog role="dialog" aria-modal="true" aria-labelledby="admin-login-title">
              <h2 id="admin-login-title">ადმინისტრატორის შესვლა</h2>
              <form onSubmit={handleLogin}>
                <label>
                  მომხმარებელი
                  <LoginInput autoComplete="username" required value={loginName} onChange={(event) => setLoginName(event.target.value)} />
                </label>
                <label>
                  პაროლი
                  <LoginInput type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                {loginError && <LoginError role="alert">{loginError}</LoginError>}
                <LoginActions>
                  <AuthButton type="button" disabled={isLoggingIn} onClick={() => setIsLoginOpen(false)}>გაუქმება</AuthButton>
                  <AuthButton $primary type="submit" disabled={isLoggingIn}>{isLoggingIn ? 'მოწმდება...' : 'შესვლა'}</AuthButton>
                </LoginActions>
              </form>
            </LoginDialog>
          </LoginOverlay>
        )}
    </HeadDivSty>
  )
}

const Input = styled.input`
  width: min(51.3rem, 100%);
  min-height: 6rem;
  padding: 0.2rem 3.2rem 0.2rem 6.4rem;
  border-radius: 1.6rem;
  background-color: #F9FAFB;
  font-size: 1.6rem;
  &:focus{
    outline: solid 3px #5D5FEF; 
  }
  background-image: url(${search});
  background-repeat: no-repeat;
  background-position: top 1.5rem  left 2rem;

  @media (max-width: 760px) {
    width: 100%;
  }
`

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2.4rem;
    margin-left: 4rem;
    flex-wrap: wrap;

    @media (max-width: 760px) {
      width: 100%;
      margin-left: 0;
      justify-content: center;
    }
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
  position: relative;
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

const AuthButton = styled.button`
  border: 1px solid ${({ $primary }) => $primary ? '#087b58' : '#d8e1df'};
  border-radius: .6rem;
  min-height: 3.6rem;
  padding: .6rem 1rem;
  background: ${({ $primary }) => $primary ? '#087b58' : '#fff'};
  color: ${({ $primary }) => $primary ? '#fff' : '#34464d'};
  font: inherit;
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: .5; cursor: not-allowed; }
  &:focus-visible { outline: 3px solid #1aac83; outline-offset: 2px; }
`

const LoginOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: grid;
  place-items: center;
  padding: 1.6rem;
  background: rgba(14, 31, 27, .58);
`

const LoginDialog = styled.div`
  width: min(100%, 42rem);
  padding: 2.4rem;
  border: 1px solid #d8e1df;
  border-radius: .8rem;
  background: #fff;
  box-shadow: 0 24px 64px rgba(0, 0, 0, .22);
  h2 { margin: 0 0 2rem; color: #192b32; font-size: 2rem; }
  form { display: grid; gap: 1.4rem; }
  label { display: grid; gap: .6rem; color: #34464d; font-size: 1.4rem; font-weight: 700; }
`

const LoginInput = styled.input`
  width: 100%;
  min-height: 4.4rem;
  padding: .9rem 1.1rem;
  border: 1px solid #d8e1df;
  border-radius: .6rem;
  background: #f8faf9;
  color: #192b32;
  font: inherit;
  font-size: 1.5rem;
  &:focus { outline: 2px solid #087b5840; border-color: #087b58; }
`

const LoginError = styled.p`
  margin: 0;
  color: #a52e26;
  font-size: 1.4rem;
`

const LoginActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: .8rem;
  padding-top: .8rem;
`

const Strong = styled.strong`
  color: #EB5757;
  font-size: 1.5rem;
  position: absolute;
  top: 1px;
  right: 5px;
`

export default Header