import React from 'react'
import { ContentDivSty, ContentSty } from '../styledComponents/StyledComponents'
import Header from './Header'
import {Routes, Route} from 'react-router-dom'
import Measurment from './Measurment'
import Wastage from './Wastage'


const Content = () => {
  return (
    <ContentSty>
        <Header/>
        <ContentDivSty>
          <Routes>
            <Route path='/' element={<Measurment/>}/>
            <Route path='/wastage' element={<Wastage/>}/>
            <Route path='/order' element={<div>order</div>}/>
            <Route path='/products' element={<div>products</div>}/>
            <Route path='/sales' element={<div>sales</div>}/>
            <Route path='/terminals' element={<div>message</div>}/>
            <Route path='/settings' element={<div>settings</div>}/>
            <Route path='/signout' element={<div>signout</div>}/>
          </Routes>
        </ContentDivSty>
    </ContentSty>
  )
}

export default Content