import React from 'react'
import styled from 'styled-components'
import { H4, H2, Hr } from './Measurment'
import ReservoirTable from './ReservoirTable'
import data from '../../data'
import terminal1 from '../../public/docs/terminal1.pdf'

const Terminal1 = () => {
  return (
    <Div>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად <Str>შპს „ტერმინალ.1.“-ის (ს/ნ 416313885)</Str> საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, გოგებაშვილის ქუჩაზე მდებარე <Str>7 882 მ<sup>2</sup></Str> ფართის ტეროტორია, რომელზეც განთავსებულია <Str>4 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>9 000 მ<sup>3</sup></Str> და 2 ცალი დამხმარე რეზერვუარი <Str>90 მ<sup>3</sup></Str> მოცულობით (GEF53) შესაბამის ინფრასტრუქტურასთან ერთად.</P>

      <H4>სიტუაციური გეგმა</H4>
      <Hr/>
      <Iframe src={terminal1} />
      <H2>რეზერვუარები</H2>
      <Hr/>

      <ReservoirTable
        id='terminal1'
        title='სარეზერვუარო პარკი'
        items={data.terminal1}
        total='7 000 მ³'
        showYear={false}
      />
    </Div>
  )
}

const Div = styled.div`
  width: 100%;
  height: auto;
  border: 3px solid #1aac83;
  border-top: none;
  background-color: #fff;
  border-radius: 0 0 1.5rem 1.5rem;
  padding: 6rem;
  display: flex;
  flex-direction: column;
`
const P = styled.p`
  margin-top: 3rem;
  font-size: 1.8rem;
`
const Str = styled.strong`
  font-size: 1.8rem;
`
const Iframe = styled.iframe`
  margin-top: 3rem;
  width: 100%;
  height: 93rem;
  object-fit: fill;
`

export default Terminal1