import React from 'react'
import { ContentDivSty, ContentSty } from '../styledComponents/StyledComponents'
import Header from './Header'
import {Routes, Route} from 'react-router-dom'
import Measurment from './Measurment'
import Wastage from './Wastage'
import OilPrice from './OilPrice'
import Docs from './Docs'


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
            <Route path='/sales' element={<div>sales</div>}/>
            <Route path='/terminals' element={<div>message</div>}/>
            <Route path='/settings' element={<div>settings</div>}/>
          </Routes>
        </ContentDivSty>
    </ContentSty>
  )
}

export default Content