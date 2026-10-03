import React, { useState } from 'react';
import styled from 'styled-components';
import bot from '../assets/bot.png'
import vibro from '../assets/vibro.png'
import ter1 from '../assets/ter1.png'
import BOT from './BOT';
import Vibro from './Vibro';
import Terminal1 from './Terminal1';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <TabsContainer>
      <TabBtnDiv>
        <TabButton index={0} activeTab={activeTab} onClick={handleTabClick}>
            <Img src={bot} alt="bot" />
          Batumi Oil Terminal
        </TabButton>
        <TabButton index={1} activeTab={activeTab} onClick={handleTabClick}>
          <Img src={vibro} alt="vibro" />
          Vibro Diagnostik
        </TabButton>
        <TabButton index={2} activeTab={activeTab} onClick={handleTabClick}>
          <Img src={ter1} alt="terminal1" />
            Terminal 1
        </TabButton>
        <EmptyDiv/> 
      </TabBtnDiv>

      <div>
        {activeTab === 0 && <BOT />}
        {activeTab === 1 && <Vibro />}
        {activeTab === 2 && <Terminal1 />}
      </div>
    </TabsContainer>
  );
}

function TabButton({ index, activeTab, onClick, children }) {
  const isActive = activeTab === index;
  return (
    <TabBtn
      onClick={() => onClick(index)}
      className={isActive ? 'active' : ''}      
    >
      {children}
    </TabBtn>
  );
}

export default Tabs;

const TabsContainer = styled.div`
  width: 100%;
  min-width: 0;
`

const TabBtnDiv = styled.div`
    display: flex;
  width: 100%;
  min-width: 0;
    margin-top: 3rem;
  overflow-x: auto;
  overscroll-behavior-x: contain;

    @media (max-width: 980px) {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
`

const TabBtn = styled.button`
    font-family: 'Poppins';
    width: 30rem;
  min-width: 0;
  flex: 1 1 30rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;    
    padding: 1rem;
    border-bottom: 3px solid #1aac83;
    background-color: transparent;  

    @media (max-width: 980px) {
      width: 30rem;
      flex: 0 0 30rem;
    }

    @media (max-width: 640px) {
      width: 22rem;
      flex-basis: 22rem;
      font-size: 1.5rem;
    }
`

const Img = styled.img`
    width: 4rem;
    height: 4rem;
`

const EmptyDiv = styled.div`
  min-width: 0;
  border-bottom: 3px solid #1aac83;
  flex-grow: 1;

  @media (max-width: 640px) {
    display: none;
  }
`
