import React from 'react'
import styled from 'styled-components'
import {Th, Td, Tr, H4, H2, Hr} from './Measurment'
import DeepDive from '../styledComponents/DeepDive'
import data from '../../data'
import bot from '../../public/docs/bot.pdf'

const BOT = () => {
  return (
    <Div>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;საბაჟო კონტროლის ზონად <Str>შპს "ბათუმის ნავთობტერმინალი"-ს (ს/ნ 245432544)</Str> საბაჟო საწყობის საქმიანობისთვის განსაზღვრულია ქ. ბათუმი, მაიაკოვსკის ქ. №4-ში მდებარე <Str>79 3262 ჰა</Str> ფართის ტეროტორია, რომელზეც განთავსებულია საერთო ტექნოლოგიური ხაზით ერთმანეთთან დაკავშირებული <Str>152 ცალი</Str> სტაციონალური ვერტიკალური რეზერვუარი - მთლიანი მოცულობით <Str>646 785 მ<sup>3</sup></Str> (GEO20) შესაბამის ინფრასტრუქტურასთან ერთად.</P>
        <P>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ბათუმის ნავთობტერმინალის ძირითადი ტერიტორია მოიცავს <Str>5</Str> სარეზერვუარო პარკს, სადაც მოქმედებს <Str>6</Str> ჩამოსასხმელი სარკინიგზო ესტაკადა, რომელთა მეშვეობით შესაძლებელია ერთდროულად <Str>180</Str> ვაგონ-ცისტერნის ან დღე-ღამეში <Str>410</Str> ვაგონ-ცისტერნის დატვირთვა/დაცლა.</P>

        <H4>სიტუაციური გეგმა</H4>
        <Hr/>
        <Iframe src={bot} />
        <H2>რეზერვუარები</H2>
        <Hr/>

        <DeepDive text='დიზელის საწვავისა და ნავთის მიღებისა და გადატვირთვის სადგური' id='baseOne'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                
                {
                    data.baseOne.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>50 000 მ<sup>3</sup></Td>
                </Tr>                
            </Table>
        </DeepDive>

        <DeepDive text='ნავთისა და ავტობენზინის მიღებისა და გადატვირთვის სადგური' id='baseTwo'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseTwo.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>37 900 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>       

        <DeepDive text='ნედლი ნავთობის შენახვისა და გადატვირთვის სადგური "ხოლოდნაია სლობოდა"' id='baseFour'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseFour.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>60 000 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>

        <DeepDive text='ნედლი ნავთობის შენახვისა და გადატვირთვის სადგური "კაპრეშუმი"' id='baseFive'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseFive.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>162 000 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>

        <DeepDive text='გათხევადებული ნავთობის აირების მიღებისა და გადატვირთვის სადგური' id='baseEight'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseEight.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>5 000 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>

        <DeepDive text='მუქი ნავთობპროდუცტების მიღებისა და გადატვირთვის საამქრო' id='baseThree'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseThree.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>214 000 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>

        <DeepDive text='ნავთობპროდუქტების საზღვაო ტრანსპორტით მიღებისა და დატვირთვის საამქრო' id='baseSix'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseSix.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>30 000 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>

        <DeepDive text='იმპორტირებადი ნავთობპროდუქტების მიღებისა და განაწილების საამქრო' id='baseSeven'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseSeven.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>46 000 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>       

        <DeepDive text='წყლისა და ქაფის რეზერვუარები' id='baseWater'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseWater.map( (item) => {
                        return(
                            <Tr >
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>32 885 მ<sup>3</sup></Td>
                </Tr>                 
            </Table>    
        </DeepDive>

        <DeepDive text='შლამსაცავი' id='baseOther'>
            <Table>
                <Tr>
                    <Th style={{width: '11rem'}}>რეზ-ბის რაოდ.</Th>
                    <Th style={{width: '10rem'}}>რეზ-რის №</Th>
                    <Th>რეზ-რის აშენების წელი</Th>    
                    <Th>რეზ-რის მოცულობა, მ<sup>3</sup></Th>    
                </Tr>
                {
                    data.baseOther.map( (item) => {
                        return(
                            <Tr>
                                <Td>{item.count}</Td>
                                <Td style={{fontWeight: 900}}>{item.tank}</Td>
                                <Td>{item.year}</Td>
                                <Td style={{fontWeight: 900}}>{item.vol}</Td>
                            </Tr>
                        )
                    })
                }
                
                <Tr>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{border: 'none'}}></Td>
                    <Td style={{color: '#1aac83', fontWeight: 900, border: 'none'}}>9 000 მ<sup>3</sup></Td>
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
    height: 94rem;
    object-fit: fill;
`


export default BOT