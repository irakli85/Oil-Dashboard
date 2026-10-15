import React, { useEffect, useRef, useState } from 'react'
import { HeadDivSty, HeadPsty } from '../styledComponents/StyledComponents'
import styled from 'styled-components'
import geo from '../assets/geo.svg'
import usa from '../assets/usa.svg'
import bell from '../assets/bell.svg'
import user from '../assets/user.svg'
import search from '../assets/search.svg'
import { useAdminAuth } from './AdminAuthProvider'

function formatNotificationDate(value) {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return 'უცნობია'

  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tbilisi',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
      hourCycle: 'h23',
    }).formatToParts(date)
      .map(({ type, value: partValue }) => [type, partValue])
  )
  return `${parts.day}/${parts.month}/${parts.year} - ${parts.hour}:${parts.minute}:${parts.second}.${parts.fractionalSecond}`
}

const Header = ({
  notifications,
  notificationError,
  pendingSeenIds,
  onClearNotifications,
  onMarkNotificationSeen,
}) => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const notificationWrapperRef = useRef(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginName, setLoginName] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const { authReady, isAuthenticated, username, login, logout } = useAdminAuth()
  const unreadCount = notifications.filter((notification) => !notification.isRead).length

  useEffect(() => {
    if (!isNotificationsOpen) return undefined

    const handleOutsideClick = (event) => {
      if (!notificationWrapperRef.current?.contains(event.target)) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    return () => document.removeEventListener('pointerdown', handleOutsideClick)
  }, [isNotificationsOpen])

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
          <NotificationWrapper ref={notificationWrapperRef}>
            <BellButton
              type="button"
              onClick={() => setIsNotificationsOpen((isOpen) => !isOpen)}
              aria-label={`შეტყობინებები: ${unreadCount} წაუკითხავი`}
              aria-expanded={isNotificationsOpen}
              aria-controls="notifications-panel"
            >
              <img src={bell} alt="" />
              <Strong>{unreadCount > 99 ? '99+' : unreadCount}</Strong>
            </BellButton>
            {isNotificationsOpen && (
              <NotificationsPanel id="notifications-panel" role="region" aria-label="შეტყობინებები">
                <NotificationsHeader>
                  <strong>შეტყობინებები</strong>
                  <ClearButton type="button" onClick={onClearNotifications}>
                    გასუფთავება
                  </ClearButton>
                </NotificationsHeader>
                {notificationError && (
                  <NotificationError role="alert">{notificationError}</NotificationError>
                )}
                {notifications.length === 0 ? (
                  <EmptyNotifications>შეტყობინებები არ არის</EmptyNotifications>
                ) : (
                  <NotificationList>
                    {notifications.map((notification) => (
                      <NotificationItem key={notification.id} $isRead={notification.isRead}>
                        {notification.eventType === 'departure'
                          ? 'გემის გასვლა: '
                          : 'ახალი გემი: '}
                        <NotificationShipName>{notification.shipName}</NotificationShipName>, IMO: {notification.imo}, დროშა: {notification.flag}, თარიღი: {formatNotificationDate(notification.detectedAt)}
                        <SeenButton
                          type="button"
                          disabled={notification.isRead || pendingSeenIds?.has(notification.id)}
                          onClick={() => onMarkNotificationSeen(notification.id)}
                        >
                          ნანახია
                        </SeenButton>
                      </NotificationItem>
                    ))}
                  </NotificationList>
                )}
              </NotificationsPanel>
            )}
          </NotificationWrapper>
          <Div3>
            <img src={user} alt="user" />
            <div>
              <P>{isAuthenticated ? username : 'სტუმარი'}</P>
              <P1>{isAuthenticated ? 'admin' : 'არ ხართ შესული'}</P1>
            </div>
            {isAuthenticated ? (
              <AuthButton $logout type="button" onClick={logout}>გასვლა</AuthButton>
            ) : (
              <AuthButton $login type="button" disabled={!authReady} onClick={() => setIsLoginOpen(true)}>შესვლა</AuthButton>
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
                  <AuthButton $primary $login type="submit" disabled={isLoggingIn}>{isLoggingIn ? 'მოწმდება...' : 'შესვლა'}</AuthButton>
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

const NotificationWrapper = styled.div`
  position: relative;
`

const BellButton = styled.button`
  width: 4.8rem;
  height: 4.8rem;
  padding: 0;
  border: 0;
  border-radius: 8px;
  background: #FFFAF1;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  &:focus-visible { outline: 3px solid #1aac83; outline-offset: 2px; }
`

const NotificationsPanel = styled.div`
  position: absolute;
  top: calc(100% + 1rem);
  right: 0;
  z-index: 1200;
  width: min(36rem, calc(100vw - 3rem));
  max-height: min(42rem, 70vh);
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: .8rem;
  background: #fff;
  box-shadow: 0 12px 32px rgba(15, 23, 42, .18);
  color: #192b32;
`

const NotificationsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.4rem 1.6rem;
  border-bottom: 1px solid #e2e8f0;
  font-size: 1.4rem;
  strong { font-size: 1.6rem; }
`

const ClearButton = styled.button`
  border: 0;
  border-radius: 6px;
  padding: .6rem .8rem;
  background: transparent;
  color: #FFA412;
  font: inherit;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  &:hover { background: #FFFAF1; }
  &:focus-visible { outline: 2px solid #1aac83; outline-offset: 2px; }
`

const NotificationList = styled.ul`
  max-height: calc(min(42rem, 70vh) - 5.2rem);
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;
`

const NotificationItem = styled.li`
  padding: 1.2rem 1.6rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 1.3rem;
  line-height: 1.6;
  overflow-wrap: anywhere;
  background: ${({ $isRead }) => ($isRead ? '#fff' : '#f8fbff')};
  &:last-child { border-bottom: 0; }
`

const SeenButton = styled.button`
  display: block;
  margin-top: .6rem;
  padding: .4rem .6rem;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #16765d;
  font: inherit;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  &:disabled { color: #737791; cursor: default; }
  &:not(:disabled):hover { background: #e7f5ef; }
  &:focus-visible { outline: 2px solid #1aac83; outline-offset: 2px; }
`

const NotificationShipName = styled.strong`
  color: #192b32;
  font-size: 1.5rem;
  font-weight: 700;
`

const EmptyNotifications = styled.p`
  margin: 0;
  padding: 2rem 1.6rem;
  color: #737791;
  font-size: 1.3rem;
  text-align: center;
`

const NotificationError = styled.p`
  margin: 0;
  padding: .8rem 1.6rem;
  color: #b42318;
  font-size: 1.2rem;
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
  &:hover:not(:disabled) {
    border-color: ${({ $login, $logout, $primary }) => $logout ? '#b42318' : ($login || $primary) ? '#087b58' : '#d8e1df'};
    background: ${({ $primary, $login, $logout }) => $logout ? '#c63c3c' : $primary ? '#075f46' : $login ? '#e8f5ef' : '#fff'};
    color: ${({ $primary, $login, $logout }) => ($primary || $logout) ? '#fff' : $login ? '#087b58' : '#34464d'};
  }
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