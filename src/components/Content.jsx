import React from 'react'
import { ContentDivSty, ContentSty } from '../styledComponents/StyledComponents'
import Header from './Header'
import {Routes, Route} from 'react-router-dom'
import Measurment from './Measurment'
import Wastage from './Wastage'
import OilPrice from './OilPrice'
import Docs from './Docs'
import Terminals from './Terminals'
import Map from './Map'


const Content = () => {
  return (
    <ContentSty>
        <Header/>
        <ContentDivSty>
          <Routes>
            <Route path='/' element={<Measurment/>}/>
            <Route path='/wastage' element={<Wastage/>}/>
            <Route path='/oilprice' element={<OilPrice/>}/>
            <Route path='/docs' element={<Docs/>}/>
            <Route path='/terminals' element={<Terminals/>}/>
            <Route path='/settings' element={<Map/>}/>
          </Routes>
        </ContentDivSty>
    </ContentSty>
  )
}

export default Content