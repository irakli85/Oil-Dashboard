import React from 'react'
import styled from 'styled-components'
import {Th, Td, Tr, H4, H2, Hr} from './Measurment'
import DeepDive from '../styledComponents/DeepDive'
import data from '../../data'
import terminal1 from '../../public/docs/terminal1.pdf'

const Terminal1 = () => {
  return (
    <Div>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად  <Str>შპს „ტერმინალ.1.“-ის (ს/ნ 416313885)</Str> საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, გოგებაშვილის ქუჩაზე მდებარე <Str>7 882 მ<sup>2</sup></Str> ფართის ტეროტორია, რომელზეც განთავსებულია <Str>4 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>9 000 მ<sup>3</sup></Str> და 2 ცალი დამხმარე რეზერვუარი <Str>90 მ<sup>3</sup></Str> მოცულობით (GEF53) შესაბამის ინფრასტრუქტურასთან ერთად.</P>        

        <H4>სიტუაციური გეგმა</H4>
        <Hr/>
        <Iframe src={terminal1} />
        <H2>რეზერვუარები</H2>
        <Hr/>

        <DeepDive text='სარეზერვუარო პარკი' id='terminal1'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                        
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                
                {
                    data.terminal1.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>                                
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>                    
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>7 000 მ<sup>3</sup></Td>
                </Tr>                
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

const Iframe = styled.iframe`
    margin-top: 3rem;
    width: 100%;
    height: 93rem;
    object-fit: fill;
`

export default Terminal1