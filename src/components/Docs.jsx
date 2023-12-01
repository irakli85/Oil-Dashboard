import React from 'react'
import { Container } from './Measurment'
import customs from '../assets/Customs.svg'
import styled from 'styled-components'
import pdf from '../assets/pdf.svg'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '-100vw'
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      when: 'beforeChildren',
      staggerChildren: 0.8
    }
  }
}

const childrenVariants = {
  hidden: {
    opacity: 0,
    x:'-100vw'
  },
  visible: {
    opacity: 1,
    x: 0
  }
}



const Docs = () => {  
    
  return (
    <Container>
      <DivHead>
        <Img src={customs} alt="customs" />
        <P>კანონმდებლობა და სხვა სასარგებლო რესურსები</P>
      </DivHead>
      <DivBody 
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№3376 - ნავთობისა და ნავთობპროდუქტების რაოდენობის გაზომვის მეთოდების დასაშვები ცდომილების ნორმების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/3376.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№20839 - ნედლი ნავთობისა და ნავთობპროდუქტების ბუნებრივი დანაკარგის ნორმების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/20839.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№22970 - ცალკეულ საქონელზე ბუნებრივი დანაკარგის ნორმების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/22970.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>საქართველოს საბაჟო კოდექსი
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/kodex.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№257 - საქართველოს საბაჟო ტერიტორიაზე საქონლის გადაადგილებისა და გაფორმების შესახებ ინსტრუქციების დამტკიცების თაობაზე
              <Span>*განახლებულია - 29.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/257.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№455 - საბაჟო საწყობისა და თავისუფალი ვაჭრობის პუნქტის საქმიანობის ნებართვების გაცემის წესებისა და პირობების შესახებ ინსტრუქციის დამტკიცების თაობაზე
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/455.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№275 - საგარეო-ეკონომიკური საქმიანობის ეროვნული სასაქონლო ნომენკლატურის (სეს ესნ) დამტკიცების თაობაზე
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/275.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№24 - ნავსადგურის წესების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/24.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№124 - საავტომობილო ბენზინის ხარისხობრივი ნორმების შესახებ
              <Span>*განახლებულია - 29.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/124.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№238 - დიზელის საწვავის შემადგენლობის ნორმების, ანალიზის მეთოდებისა და მათი დანერგვის ღონისძიებათა შესახებ
              <Span>*განახლებულია - 29.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/238.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem variants={childrenVariants}>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>React
              <Span>*განახლებულია - 29.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn to="/docs/react.pdf" target="_blank" download>გადმოწერა</ItemBtn>
        </DivItem>                 

      </DivBody>        
    </Container>
  )
}

const Img = styled.img`
    width: 100%;
    border-radius: 1.5rem;
`

const DivHead = styled.div`
  position: relative;
`

const DivBody = styled(motion.div)`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  width: 100%;
  margin-bottom: 10rem;
`

const P = styled.p`
  width: 100rem;
  font-size: 3.8rem;
  color: #fff;
  font-weight: 900;
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
const DivItem = styled(motion.div)`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
`
const DivItem1 = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`
const Pitem = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  max-width: 90rem;
`
const ItemBtn = styled(Link)`
  background: #fff;
  width: 20rem;
  height: 5rem;
  color: #507C5C;
  font-size: 1.6rem;
  font-weight: 700;
  cursor: pointer;
  border: solid 4px #507C5C;
  &:hover{
    background: #507C5C;
    color: #fff;
  }
  transition: all 0.5s ease-in-out;
  padding: 1rem;
  justify-self: end;
  text-decoration: none;
  text-align: center;
`

const Span = styled.span`
    color: #FF947A;
    font-size: 1.4rem;
    font-weight: 700;
    margin-left: 1rem;
`


export default Docs