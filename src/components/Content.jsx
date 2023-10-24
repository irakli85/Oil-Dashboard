import React from 'react'
import { ContentDivSty, ContentSty } from '../styledComponents/StyledComponents'
import Header from './Header'
import {Routes, Route} from 'react-router-dom'


const Content = () => {
  return (
    <ContentSty>
        <Header/>
        <ContentDivSty>
          <Routes>
            <Route path='/' element={<div>mTavari</div>}/>
            <Route path='/leaderboard' element={<div>leaderboard</div>}/>
            <Route path='/order' element={<div>order</div>}/>
            <Route path='/products' element={<div>products</div>}/>
            <Route path='/sales' element={<div>sales</div>}/>
            <Route path='/message' element={<div>message</div>}/>
            <Route path='/settings' element={<div>settings</div>}/>
            <Route path='/signout' element={<div>signout</div>}/>
          </Routes>
        </ContentDivSty>
    </ContentSty>
  )
}

export default Content