import React from 'react'
import styled from 'styled-components'

const BOT = () => {
  return (
    <Div>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად შპს "ბათუმის ნავთობტერმინალი"-ს (ს/ნ 245432544) საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, მაიაკოვსკის ქ. №4-ში მდებარე <Str>79 3262 ჰა</Str> ფართის ტეროტორია, რომელზეც განთავსებულია საერთო ტექნოლოგიუტი ხაზით ერთმანეთთან დაკავშირებული <Str>152 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>646 785 მ<sup>3</sup></Str> შესაბამის ინფრასტრუქტურასთან ერთად.</P>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ბათუმის ნავთობტერმინალის ძირითადი ტერიტორია მოიცავს ხუთ სარეზერვუარო პარკს სადაც მოქმედებს <Str>6</Str> ჩამოსასხმელი სარკინიგზო ესტაკადა, რომელთა მეშვეობით შესაძლებელია ერთდროულად <Str>180</Str> ვაგონ-ცისტერნის ან დღე-ღამეში <Str>410</Str>ვაგონ-ცისტერნის დატვირთვა/დაცლა.</P>
    </Div>
  )
}

const Div = styled.div`
    width: 100%;
    height: 100rem;
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


export default BOT