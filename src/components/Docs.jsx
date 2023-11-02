import React from 'react'
import { Container } from './Measurment'
import customs from '../assets/Customs.svg'
import styled from 'styled-components'
import pdf from '../assets/pdf.svg'
import { Link } from 'react-router-dom'

const Docs = () => {
  const data = {
    item1: {
      url: '../src/assets/docs/3376.pdf',
      name: '3376 - ნავთობისა და ნავთობპროდუქტების რაოდენობის გაზომვის მეთოდების დასაშვები ცდომილების ნორმების დამტკიცების შესახებ.pdf'
    },
    item2: {
      url: '../src/assets/docs/20839.pdf',
      name: '20839 - ნედლი ნავთობისა და ნავთობპროდუქტების ბუნებრივი დანაკარგის ნორმების დამტკიცების შესახებ.pdf'
    },
    item3: {
      url: '../src/assets/docs/22970.pdf',
      name: '22970 - ცალკეულ საქონელზე ბუნებრივი დანაკარგის ნორმების დამტკიცების შესახებ.pdf'
    },
    item4: {
      url: '../src/assets/docs/kodex.pdf',
      name: 'საბაჟო კოდექსი.pdf'
    },
    item5: {
      url: '../src/assets/docs/257.pdf',
      name: '257 - საქართველოს საბაჟო ტერიტორიაზე საქონლის გადაადგილებისა და გაფორმების შესახებ ინსტრუქციების დამტკიცების თაობაზე.pdf'
    },
    item6: {
      url: '../src/assets/docs/455.pdf',
      name: '455 - საბაჟო საწყობისა და თავისუფალი ვაჭრობის პუნქტის საქმიანობის ნებართვების გაცემის წესებისა და პირობების შესახებ ინსტრუქციის დამტკიცების თაობაზე.pdf'
    },
    item7: {
      url: '../src/assets/docs/275.pdf',
      name: '275 - საგარეო-ეკონომიკური საქმიანობის ეროვნული სასაქონლო ნომენკლატურის (სეს ესნ) დამტკიცების თაობაზე.pdf'
    },
    item8: {
      url: '../src/assets/docs/24.pdf',
      name: '24 - ნავსადგურის წესების დამტკიცების შესახებ.pdf'
    }

  }

   const onButtonClick1 = () => {
        const pdfUrl = data.item1.url;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = data.item1.name; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const onButtonClick2 = () => {
      const pdfUrl = data.item2.url;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = data.item2.name; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  const onButtonClick3 = () => {
    const pdfUrl = data.item3.url;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = data.item3.name; // specify the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const onButtonClick4 = () => {
  const pdfUrl = data.item4.url;
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = data.item4.name; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const onButtonClick5 = () => {
  const pdfUrl = data.item5.url;
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = data.item5.name; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const onButtonClick6 = () => {
  const pdfUrl = data.item6.url;
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = data.item6.name; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const onButtonClick7 = () => {
  const pdfUrl = data.item7.url;
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = data.item7.name; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const onButtonClick8 = () => {
  const pdfUrl = data.item8.url;
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.download = data.item8.name; // specify the filename
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
    
  return (
    <Container>
      <DivHead>
        <Img src={customs} alt="customs" />
        <P>კანონმდებლობა და სხვა სასარგებლო რესურსები</P>
      </DivHead>
      <DivBody>
        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№3376 - ნავთობისა და ნავთობპროდუქტების რაოდენობის გაზომვის მეთოდების დასაშვები ცდომილების ნორმების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick1}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№20839 - ნედლი ნავთობისა და ნავთობპროდუქტების ბუნებრივი დანაკარგის ნორმების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick2}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№22970 - ცალკეულ საქონელზე ბუნებრივი დანაკარგის ნორმების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick3}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>საქართველოს საბაჟო კოდექსი
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick4}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№257 - საქართველოს საბაჟო ტერიტორიაზე საქონლის გადაადგილებისა და გაფორმების შესახებ ინსტრუქციების დამტკიცების თაობაზე
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick5}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№455 - საბაჟო საწყობისა და თავისუფალი ვაჭრობის პუნქტის საქმიანობის ნებართვების გაცემის წესებისა და პირობების შესახებ ინსტრუქციის დამტკიცების თაობაზე
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick6}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№275 - საგარეო-ეკონომიკური საქმიანობის ეროვნული სასაქონლო ნომენკლატურის (სეს ესნ) დამტკიცების თაობაზე
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick7}>გადმოწერა</ItemBtn>
        </DivItem>

        <DivItem>
          <DivItem1>
            <img src={pdf} alt="pdf" />
            <Pitem>№24 - ნავსადგურის წესების დამტკიცების შესახებ
              <Span>*განახლებულია - 02.11.2023</Span>
            </Pitem>
          </DivItem1>          
          <ItemBtn onClick={onButtonClick8}>გადმოწერა</ItemBtn>
        </DivItem>
        <Link to="/24.pdf" target="_blank" download>Download</Link>
        

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

const DivBody = styled.div`
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
const DivItem = styled.div`
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
const ItemBtn = styled.button`
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
`

const Span = styled.span`
    color: #FF947A;
    font-size: 1.4rem;
    font-weight: 700;
    margin-left: 1rem;
`


export default Docs