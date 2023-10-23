import React from "react"
import GlobalStyles from "./styledComponents/GlobalStyles"
import Aside from "./components/Aside"
import Content from "./components/Content"
import { MainSty } from "./styledComponents/StyledComponents"

function App() {

  return (
    <MainSty>
      <GlobalStyles/>
         <Aside/>
         <Content/>      
    </MainSty>
  )
}

export default App
