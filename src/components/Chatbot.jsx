import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getWastageAnswer, WASTAGE_PRODUCTS } from '../data/wastage'

const QUICK_QUESTIONS = [
  'რამდენი რეზერვუარია ტერმინალში?',
  'რა სიჩქარით იტვირთება დიზელი?',
]

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const requestControllerRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isOpen])

  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
  }, [isOpen])

  const closeChat = () => {
    requestControllerRef.current?.abort()
    requestControllerRef.current = null
    setMessages([])
    setInput('')
    setError('')
    setIsLoading(false)
    setIsOpen(false)
  }

  const sendMessage = async (event, suggestedMessage) => {
    event?.preventDefault()
    const content = (suggestedMessage ?? input).trim()
    if (!content || isLoading) return

    const userMessage = { role: 'user', content }
    const assistantId = `${Date.now()}-assistant`
    const wastageAnswer = getWastageAnswer(content)
    if (wastageAnswer) {
      setMessages((currentMessages) => [
        ...currentMessages,
        userMessage,
        { id: assistantId, role: 'assistant', content: wastageAnswer },
      ])
      setInput('')
      setError('')
      return
    }

    const conversation = [...messages, userMessage].slice(-12)
    if (conversation[0]?.role !== 'user') conversation.shift()

    setMessages([...messages, userMessage, { id: assistantId, role: 'assistant', content: '' }])
    setInput('')
    setError('')
    setIsLoading(true)
    const requestController = new AbortController()
    requestControllerRef.current = requestController

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: requestController.signal,
        body: JSON.stringify({
          messages: conversation.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'ჩატბოტთან დაკავშირება ვერ მოხერხდა')
      }

      if (!response.body) {
        throw new Error('ჩატბოტის პასუხის მიღება ვერ მოხერხდა')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      let result = await reader.read()
      while (!result.done) {
        const text = decoder.decode(result.value, { stream: true })
        setMessages((currentMessages) => currentMessages.map((message) => (
          message.id === assistantId
            ? { ...message, content: message.content + text }
            : message
        )))
        result = await reader.read()
      }

      const finalText = decoder.decode()
      if (finalText) {
        setMessages((currentMessages) => currentMessages.map((message) => (
          message.id === assistantId
            ? { ...message, content: message.content + finalText }
            : message
        )))
      }
    } catch (requestError) {
      if (requestError.name === 'AbortError') return
      console.error('[chat request]', requestError)
      setMessages((currentMessages) => currentMessages.filter((message) => message.id !== assistantId))
      setError(requestError.message || 'მოთხოვნა ვერ შესრულდა. სცადეთ თავიდან.')
    } finally {
      if (requestControllerRef.current === requestController) {
        requestControllerRef.current = null
        setIsLoading(false)
      }
    }
  }

  return (
    <Widget>
      {isOpen && (
        <Panel role='dialog' aria-labelledby='chatbot-title' aria-modal='false'>
          <PanelHeader>
            <Avatar aria-hidden='true'>ნ</Avatar>
            <HeaderText>
              <Title id='chatbot-title'>ასისტენტი</Title>
              <Subtitle><OnlineIndicator /> მზად ვარ დაგეხმარო</Subtitle>
            </HeaderText>
            <CloseButton type='button' aria-label='ჩატის დახურვა' onClick={closeChat}>
              ×
            </CloseButton>
          </PanelHeader>

          <Messages aria-live='polite' aria-relevant='additions text'>
            {messages.length === 0 && (
              <Welcome>
                <WelcomeTitle>გამარჯობა! 👋</WelcomeTitle>
                <WelcomeText>
                  მკითხე ბათუმის ნავთობტერმინალის, რეზერვუარების ან ოპერაციების შესახებ.
                </WelcomeText>
                <Suggestions>
                  {QUICK_QUESTIONS.map((question) => (
                    <Suggestion
                      key={question}
                      type='button'
                      disabled={isLoading}
                      onClick={(event) => sendMessage(event, question)}
                    >
                      {question}
                    </Suggestion>
                  ))}
                  <SuggestionHeading>ბუნებრივი დანაკარგები — აირჩიე პროდუქტი:</SuggestionHeading>
                  <WastageSuggestions>
                    {WASTAGE_PRODUCTS.map(({ name: product }) => (
                      <Suggestion
                        key={product}
                        type='button'
                        disabled={isLoading}
                        onClick={(event) => sendMessage(event, `${product} ბუნებრივი დანაკარგები`)}
                      >
                        {product}
                      </Suggestion>
                    ))}
                  </WastageSuggestions>
                </Suggestions>
              </Welcome>
            )}

            {messages.map((message) => (
              <Message key={message.id || `${message.role}-${message.content}`} $role={message.role}>
                {message.content
                  ? renderMessage(message.content)
                  : (isLoading ? <Typing aria-label='პასუხს ამზადებს'><i /><i /><i /></Typing> : '')}
              </Message>
            ))}
            <div ref={messagesEndRef} />
          </Messages>

          {error && <ErrorMessage role='alert'>{error}</ErrorMessage>}

          <Composer onSubmit={(event) => sendMessage(event)}>
            <MessageInput
              ref={inputRef}
              aria-label='შეტყობინება'
              placeholder='დაწერე შეტყობინება...'
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              disabled={isLoading}
              onChange={(event) => setInput(event.target.value)}
            />
            <SendButton type='submit' aria-label='გაგზავნა' disabled={!input.trim() || isLoading}>
              <SendIcon viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M22 2 11 13' />
                <path d='m22 2-7 20-4-9-9-4Z' />
              </SendIcon>
            </SendButton>
          </Composer>
          <Disclaimer>AI პასუხები შეიძლება შეცდომას შეიცავდეს; მიმდინარე მონაცემები გადაამოწმე Dashboard-ში.</Disclaimer>
        </Panel>
      )}

      <ToggleButton
        type='button'
        aria-label={isOpen ? 'ჩატის დახურვა' : 'ჩატის გახსნა'}
        aria-expanded={isOpen}
        onClick={() => (isOpen ? closeChat() : setIsOpen(true))}
      >
        {isOpen ? (
          <CloseIcon viewBox='0 0 24 24' aria-hidden='true'>
            <path d='m18 6-12 12M6 6l12 12' />
          </CloseIcon>
        ) : (
          <ChatIcon viewBox='0 0 24 24' aria-hidden='true'>
            <path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z' />
          </ChatIcon>
        )}
      </ToggleButton>
    </Widget>
  )
}

const MAX_INPUT_LENGTH = 2000
const INTERNAL_ROUTES = new Set(['/oilprice', '/livemap', '/docs', '/sanctioned-vessels', '/wastage'])

function renderMessage(content) {
  return content.split(/(\/oilprice|\/livemap|\/docs|\/sanctioned-vessels|\/wastage)/g).map((part, index) => (
    INTERNAL_ROUTES.has(part)
      ? <ChatLink key={`${part}-${index}`} to={part}>{part}</ChatLink>
      : part
  ))
}

const Widget = styled.div`
  position: fixed;
  right: 2.4rem;
  bottom: 14rem;
  z-index: 10000;

  @media (max-width: 640px) {
    right: 1.2rem;
    bottom: 9rem;
  }
`

const Panel = styled.section`
  position: absolute;
  right: 0;
  bottom: 7.4rem;
  display: flex;
  flex-direction: column;
  width: min(38rem, calc(100vw - 3.2rem));
  height: min(58rem, calc(100dvh - 11rem));
  min-height: 34rem;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  border-radius: 1.8rem;
  background: #fff;
  box-shadow: 0 1.8rem 5rem rgba(15, 23, 42, 0.2);

  @media (max-width: 640px) {
    position: fixed;
    right: 1rem;
    bottom: 8rem;
    width: calc(100vw - 2rem);
    height: min(62rem, calc(100dvh - 10rem));
    min-height: 30rem;
  }
`

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.6rem;
  background: #151d48;
  color: #fff;
`

const Avatar = styled.div`
  display: grid;
  width: 4.2rem;
  height: 4.2rem;
  flex: 0 0 4.2rem;
  place-items: center;
  border-radius: 50%;
  background: #1aac83;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
`

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
`

const Title = styled.h2`
  font-size: 1.55rem;
  font-weight: 700;
`

const Subtitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.3rem;
  color: #cbd5e1;
  font-size: 1.2rem;
`

const OnlineIndicator = styled.span`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: #5ee2b1;
`

const CloseButton = styled.button`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 50%;
  background: transparent;
  color: #e2e8f0;
  font-size: 2.8rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`

const Messages = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 1.2rem;
  overflow-y: auto;
  padding: 1.6rem;
  background: #f8fafc;
`

const Welcome = styled.div`
  margin: auto 0;
  padding: 1.6rem 0;
`

const WelcomeTitle = styled.h3`
  margin-bottom: 0.8rem;
  color: #151d48;
  font-size: 1.8rem;
`

const WelcomeText = styled.p`
  color: #64748b;
  font-size: 1.35rem;
  line-height: 1.6;
`

const Suggestions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  margin-top: 1.8rem;
`

const SuggestionHeading = styled.p`
  margin-top: 0.8rem;
  color: #475569;
  font-size: 1.2rem;
  font-weight: 700;
`

const WastageSuggestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  max-height: 16rem;
  overflow-y: auto;
  padding: 0.2rem 0.2rem 0.4rem 0;
`

const Suggestion = styled.button`
  max-width: 100%;
  padding: 0.9rem 1.2rem;
  border: 1px solid #dbe5ec;
  border-radius: 1.2rem;
  background: #fff;
  color: #334155;
  font-size: 1.2rem;
  text-align: left;
  cursor: pointer;

  &:hover:not(:disabled) {
    border-color: #1aac83;
    color: #087f5b;
  }
`

const Message = styled.div`
  align-self: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 88%;
  padding: 1.1rem 1.3rem;
  border-radius: ${({ $role }) => ($role === 'user' ? '1.4rem 1.4rem 0.4rem 1.4rem' : '1.4rem 1.4rem 1.4rem 0.4rem')};
  background: ${({ $role }) => ($role === 'user' ? '#1aac83' : '#fff')};
  box-shadow: ${({ $role }) => ($role === 'user' ? 'none' : '0 0.2rem 0.8rem rgba(15, 23, 42, 0.06)')};
  color: ${({ $role }) => ($role === 'user' ? '#fff' : '#334155')};
  font-size: 1.3rem;
  line-height: 1.55;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
`

const Typing = styled.span`
  display: flex;
  gap: 0.4rem;
  padding: 0.35rem 0;

  i {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background: #94a3b8;
    animation: typing 1.1s infinite ease-in-out;
  }

  i:nth-child(2) { animation-delay: 0.15s; }
  i:nth-child(3) { animation-delay: 0.3s; }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
    30% { transform: translateY(-0.35rem); opacity: 1; }
  }
`

const ErrorMessage = styled.p`
  padding: 0.8rem 1.4rem;
  background: #fff1f2;
  color: #be123c;
  font-size: 1.2rem;
  line-height: 1.5;
`

const Composer = styled.form`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin: 1.2rem 1.4rem 0;
  padding: 0.6rem 0.6rem 0.6rem 1.2rem;
  border: 1px solid #dbe5ec;
  border-radius: 1.4rem;
  background: #fff;

  &:focus-within {
    border-color: #1aac83;
    box-shadow: 0 0 0 0.2rem rgba(26, 172, 131, 0.12);
  }
`

const MessageInput = styled.input`
  width: 100%;
  min-width: 0;
  padding: 0.8rem 0;
  background: transparent;
  color: #1e293b;
  font-size: 1.3rem;
  outline: none;

  &::placeholder { color: #94a3b8; }
  &:disabled { cursor: wait; }
`

const SendButton = styled.button`
  display: grid;
  width: 3.8rem;
  height: 3.8rem;
  flex: 0 0 3.8rem;
  place-items: center;
  border-radius: 1.1rem;
  background: #1aac83;
  color: #fff;
  cursor: pointer;

  &:disabled {
    background: #cbd5e1;
    cursor: not-allowed;
  }
`

const SendIcon = styled.svg`
  width: 1.8rem;
  height: 1.8rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2;
`

const Disclaimer = styled.p`
  padding: 0.8rem 1.4rem 1.2rem;
  color: #94a3b8;
  font-size: 1rem;
  text-align: center;
`

const ChatLink = styled(Link)`
  color: #087f5b;
  font-size: inherit;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
`

const ToggleButton = styled.button`
  display: grid;
  width: 6rem;
  height: 6rem;
  place-items: center;
  border: 0.3rem solid #fff;
  border-radius: 50%;
  background: linear-gradient(135deg, #5da000 0%, #7bc00b 100%);
  box-shadow: 0 0.8rem 2.4rem rgba(21, 29, 72, 0.24);
  color: #fff;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease;

  &:hover {
    transform: translateY(-0.2rem);
    background: linear-gradient(135deg, #4f8900 0%, #68a609 100%);
  }

  &:focus-visible {
    outline: 0.3rem solid #151d48;
    outline-offset: 0.3rem;
  }
`

const ChatIcon = styled.svg`
  width: 2.6rem;
  height: 2.6rem;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
`

const CloseIcon = styled(ChatIcon)`
  width: 2.4rem;
  height: 2.4rem;
`

export default Chatbot
