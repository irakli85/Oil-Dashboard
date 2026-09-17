import React from 'react'
import styled from 'styled-components'
import { H4, H2, Hr } from './Measurment'
import ReservoirTable from './ReservoirTable'
import data from '../../data'
import bot from '../../public/docs/bot.pdf'

const tankSections = [
  { id: 'baseOne', title: 'დიზელის საწვავისა და ნავთის მიღებისა და გადატვირთვის სადგური', items: data.baseOne, total: '50 000 მ³' },
  { id: 'baseTwo', title: 'ნავთისა და ავტობენზინის მიღებისა და გადატვირთვის სადგური', items: data.baseTwo, total: '37 900 მ³' },
  { id: 'baseFour', title: 'ნედლი ნავთობის შენახვისა და გადატვირთვის სადგური "ხოლოდნაია სლობოდა"', items: data.baseFour, total: '60 000 მ³' },
  { id: 'baseFive', title: 'ნედლი ნავთობის შენახვისა და გადატვირთვის სადგური "კაპრეშუმი"', items: data.baseFive, total: '162 000 მ³' },
  { id: 'baseEight', title: 'გათხევადებული ნავთობის აირების მიღებისა და გადატვირთვის სადგური', items: data.baseEight, total: '5 000 მ³' },
  { id: 'baseThree', title: 'მუქი ნავთობპროდუცტების მიღებისა და გადატვირთვის საამქრო', items: data.baseThree, total: '214 000 მ³' },
  { id: 'baseSix', title: 'ნავთობპროდუქტების საზღვაო ტრანსპორტით მიღებისა და დატვირთვის საამქრო', items: data.baseSix, total: '30 000 მ³' },
  { id: 'baseSeven', title: 'იმპორტირებადი ნავთობპროდუქტების მიღებისა და განაწილების საამქრო', items: data.baseSeven, total: '46 000 მ³' },
  { id: 'baseWater', title: 'წყლისა და ქაფის რეზერვუარები', items: data.baseWater, total: '32 885 მ³' },
  { id: 'baseOther', title: 'შლამსაცავი', items: data.baseOther, total: '9 000 მ³' },
]

const BOT = () => {
  return (
    <Div>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად <Str>შპს "ბათუმის ნავთობტერმინალი"-ს (ს/ნ 245432544)</Str> საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, მაიაკოვსკის ქ. №4-ში მდებარე <Str>79 3262 ჰა</Str> ფართის ტეროტორია, რომელზეც განთავსებულია საერთო ტექნოლოგიური ხაზით ერთმანეთთან დაკავშირებული <Str>152 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>646 785 მ<sup>3</sup></Str> (GEO20) შესაბამის ინფრასტრუქტურასთან ერთად.</P>
      <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ბათუმის ნავთობტერმინალის ძირითადი ტერიტორია მოიცავს <Str>5</Str> სარეზერვუარო პარკს, სადაც მოქმედებს <Str>6</Str> ჩამოსასხმელი სარკინიგზო ესტაკადა, რომელთა მეშვეობით შესაძლებელია ერთდროულად <Str>180</Str> ვაგონ-ცისტერნის ან დღე-ღამეში <Str>410</Str> ვაგონ-ცისტერნის დატვირთვა/დაცლა.</P>

      <div>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ბათუმის ნავთობტერმინალში სხვადასხვა ნავთობპროდუქტების ტანკერში დატვირთვის და დაცლის მიახლოებითი სიჩქარეები:</P>
        <P style={{ fontWeight: 700 }}>→ ტანკერების დატვირთვის სიჩქარე პროდუქტების მიხედვით:</P>
        <Ul>
          <Li>ნაფტა 350 ტ/ს</Li>
          <Li>ბენზინი 350 ტ/ს</Li>
          <Li>ნავთი 600 ტ/ს</Li>
          <Li>დიზელი 700 ტ/ს</Li>
          <Li>მაზუთი 1000-2000 ტ/ს</Li>
          <Li>ნედლი ნავთობი 1000-2500 ტ/ს</Li>
        </Ul>
        <P style={{ fontWeight: 700 }}>→ ტანკერების დაცლის სიჩქარე ნავთობპროდუქტების მიხედვით:</P>
        <Ul>
          <Li>ბენზინი 150-300 ტ/ს</Li>
          <Li>დიზელი 150-400 ტ/ს</Li>
        </Ul>
      </div>

      <H4>სიტუაციური გეგმა</H4>
      <Hr/>
      <Iframe src={bot} />
      <H2>რეზერვუარები</H2>
      <Hr/>

      {tankSections.map((section) => (
        <ReservoirTable key={section.id} {...section} />
      ))}
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
  height: 94rem;
  object-fit: fill;
`
const Ul = styled.ul`
  margin-top: 2rem;
`
const Li = styled.li`
  font-size: 1.6rem;
  margin-left: 6rem;
`

export default BOT