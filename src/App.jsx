import React from "react"
import GlobalStyles from "./styledComponents/GlobalStyles"
import Aside from "./components/Aside"
import Content from "./components/Content"
import { MainSty } from "./styledComponents/StyledComponents"
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <BrowserRouter>
      <MainSty>
        <GlobalStyles/>
          <Aside/>
          <Content/>
          <ScrollToTop/>      
      </MainSty>
      <Analytics />
    </BrowserRouter>
  )
}

export default App
