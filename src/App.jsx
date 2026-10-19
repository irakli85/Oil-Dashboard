import React from "react"
import styled from "styled-components"
import GlobalStyles from "./styledComponents/GlobalStyles"
import Aside from "./components/Aside"
import Content from "./components/Content"
import { CopyRight, MainSty } from "./styledComponents/StyledComponents"
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import { AdminAuthProvider } from "./components/AdminAuthProvider"
import { Analytics } from "@vercel/analytics/react"
import SvgWorld from "./styledComponents/svg/Svgworld"

const MobileFooter = styled.footer`
  display: none;

  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    padding: 1.2rem 1.5rem 1.6rem;
    border-top: 1px solid #e2e8f0;
    background: #fff;

    svg {
      display: block;
      width: min(22rem, 70vw);
      height: auto;
    }
  }
`

const MobileFooterCopyRight = styled(CopyRight)`
  margin: 0;
  color: #64748b;
  font-size: 1.2rem;
  text-align: center;
  cursor: default;
`

function App() {

  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <MainSty>
          <GlobalStyles/>
            <Aside/>
            <Content/>
            <ScrollToTop/>
        </MainSty>
        <MobileFooter>
          <SvgWorld />
          <MobileFooterCopyRight>2023 © All Rights Reserved</MobileFooterCopyRight>
        </MobileFooter>
        <Analytics />
      </AdminAuthProvider>
    </BrowserRouter>
  )
}

export default App
