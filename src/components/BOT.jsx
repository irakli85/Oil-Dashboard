import React from 'react'
import styled from 'styled-components'
import {Th, Td, Tr} from './Measurment'
import DeepDive from '../styledComponents/DeepDive'
import data from '../../data'

const BOT = () => {
  return (
    <Div>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად <Str>შპს "ბათუმის ნავთობტერმინალი"-ს (ს/ნ 245432544)</Str> საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, მაიაკოვსკის ქ. №4-ში მდებარე <Str>79 3262 ჰა</Str> ფართის ტეროტორია, რომელზეც განთავსებულია საერთო ტექნოლოგიური ხაზით ერთმანეთთან დაკავშირებული <Str>152 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>646 785 მ<sup>3</sup></Str> შესაბამის ინფრასტრუქტურასთან ერთად.</P>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ბათუმის ნავთობტერმინალის ძირითადი ტერიტორია მოიცავს <Str>5</Str> სარეზერვუარო პარკს, სადაც მოქმედებს <Str>6</Str> ჩამოსასხმელი სარკინიგზო ესტაკადა, რომელთა მეშვეობით შესაძლებელია ერთდროულად <Str>180</Str> ვაგონ-ცისტერნის ან დღე-ღამეში <Str>410</Str> ვაგონ-ცისტერნის დატვირთვა/დაცლა.</P>

        <DeepDive text='დიზელის საწვავისა და ნავთის მიღებისა და გადატვირთვის სადგური'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                
                    {data.baseOne.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td>{item.vol}</Td>
                            </Tr>
                        )
                    })}
                
            </Table>
        </DeepDive>
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
const Table = styled.table`
    width: 70%;
    margin-top: 3rem;
    border: solid 1px gray;
    align-self: center;
`


export default BOT