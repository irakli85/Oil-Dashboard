import React from "react"
import GlobalStyles from "./styledComponents/GlobalStyles"
import Aside from "./components/Aside"
import Content from "./components/Content"
import { MainSty } from "./styledComponents/StyledComponents"
import { BrowserRouter } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
      <MainSty>
        <GlobalStyles/>
          <Aside/>
          <Content/>      
      </MainSty>
    </BrowserRouter>
  )
}

export default App
