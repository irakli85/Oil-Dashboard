import React, { useState } from 'react';
import styled from 'styled-components';
import bot from '../assets/bot.png'
import vibro from '../assets/vibro.png'
import ter1 from '../assets/ter1.png'

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
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
      </TabBtnDiv>

      <div>
        {activeTab === 0 && <BOT />}
        {activeTab === 1 && <Vibro />}
        {activeTab === 2 && <Terminal1 />}
      </div>
    </div>
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

function BOT() {
  return <div>Lorem</div>;
}

function Vibro() {
  return <div>Tab 2 Content</div>;
}

function Terminal1() {
    return <div>Tab 3 Content</div>;
  }

export default Tabs;

const TabBtnDiv = styled.div`
    display: flex;
    margin-top: 3rem;
`

const TabBtn = styled.button`
    font-family: 'Poppins';
    width: 30rem;
    font-size: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;    
    padding: 1rem;
    border-bottom: 3px solid #1aac83;
    background-color: transparent;  
`

const Img = styled.img`
    width: 4rem;
    height: 4rem;
`