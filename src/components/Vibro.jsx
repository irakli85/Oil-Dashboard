import React from 'react'
import styled from 'styled-components'
import { H4, H2, Hr } from './Measurment'
import ReservoirTable from './ReservoirTable'
import data from '../../data'
import vibro from '../../public/docs/vibro.pdf'

const Vibro = () => {
  return (
    <Div>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად უცხოური საწარმოს ფილიალი <Str>„ვიბრო დიაგნოსტიკ - VIBRO DIAGNOSTIK“-ის (ს/ნ 445435930)</Str> საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, მაიაკოვსკის ქ. №4-ში მდებარე <Str>8 884 მ<sup>2</sup></Str> ფართის ტეროტორია, რომელზეც განთავსებულია <Str>3 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>36 000 მ<sup>3</sup></Str> (GEO74) და ქ. ბათუმი, ვოლსკის ქ. №2-ში მდებარე <Str>4 686 მ<sup>2</sup></Str> ფართის ტეროტორია, რომელზეც განთავსებულია <Str>8 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>10 400 მ<sup>3</sup></Str> (GEO58) შესაბამის ინფრასტრუქტურასთან ერთად.</P>

      <H4>სიტუაციური გეგმა</H4>
      <Hr/>
      <Iframe src={vibro} />
      <H2>რეზერვუარები</H2>
      <Hr/>

      <ReservoirTable
        id='vibroLight'
        title='ნათელი ნავთობპროდუქტების უბანი'
        items={data.vibroLight}
        total='10 400 მ³'
        showYear={false}
      />

      <ReservoirTable
        id='vibroDark'
        title='მუქი ნავთობპროდუქტების უბანი'
        items={data.vibroDark}
        total='36 000 მ³'
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

export default Vibro