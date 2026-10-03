import React from "react"
import GlobalStyles from "./styledComponents/GlobalStyles"
import Aside from "./components/Aside"
import Content from "./components/Content"
import { MainSty } from "./styledComponents/StyledComponents"
import { BrowserRouter } from "react-router-dom"
import ScrollToTop from "./components/ScrollToTop"
import { AdminAuthProvider } from "./components/AdminAuthProvider"
import { Analytics } from "@vercel/analytics/react"

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
        <Analytics />
      </AdminAuthProvider>
    </BrowserRouter>
  )
}

export default App
