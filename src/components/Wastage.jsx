import React from 'react'
import { Container, H2, H4, Table, Tr, Th, Td, Hr } from './Measurment'
import DeepDive from '../styledComponents/DeepDive'
import { WastBtn1, WastBtn2, WastBtn3, WastBtn4, WastBtnCont } from '../styledComponents/StyledComponents';

const buttonVariants = { 
    hover1: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        boxShadow: "0px 0px 8px #FA5A7D"
    },
    hover2: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        boxShadow: "0px 0px 8px #FF947A"
      },
    hover3: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        boxShadow: "0px 0px 8px #3CD856"
    },
    hover4: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255, 255, 255)",
        boxShadow: "0px 0px 8px #BF83FF"
    }
  }


const Wastage = () => {
    
    const handleClickScroll1 = () => {
        const crudle = document.getElementById('crudle');        
        crudle.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll2 = () => {
        const dizel = document.getElementById('dizel');        
        dizel.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll3 = () => {
        const kerosine = document.getElementById('kerosine');        
        kerosine.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll4 = () => {
        const fuel = document.getElementById('fuel');        
        fuel.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll5 = () => {
        const oil = document.getElementById('oil');        
        oil.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll6 = () => {
        const benzol = document.getElementById('benzol');        
        benzol.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll7 = () => {
        const vgo = document.getElementById('vgo');        
        vgo.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll8 = () => {
        const air = document.getElementById('air');        
        air.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll9 = () => {
        const oilair = document.getElementById('oilair');        
        oilair.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll10 = () => {
        const aceclic = document.getElementById('aceclic');        
        aceclic.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll11 = () => {
        const propil = document.getElementById('propil');        
        propil.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll12 = () => {
        const metil = document.getElementById('metil');        
        metil.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll13 = () => {
        const paraqsilol = document.getElementById('paraqsilol');        
        paraqsilol.scrollIntoView({ behavior: 'smooth' });        
      };

      const handleClickScroll14 = () => {
        const piroliz = document.getElementById('piroliz');        
        piroliz.scrollIntoView({ behavior: 'smooth' });        
      };

  return (
    <Container>       
        <H2>ნედლი ნავთობისა და ნავთობპროდუქტების ბუნებრივი დანაკარგის მაქსიმალური ზღვრული ნორმები</H2>
        <Hr/>
        <WastBtnCont>
            <WastBtn1 onClick={handleClickScroll1}
                variants={buttonVariants}        
                whileHover="hover1"  
                >ნედლი ნავთობი</WastBtn1>

            <WastBtn2 onClick={handleClickScroll2}
                variants={buttonVariants}        
                whileHover="hover2"  
                >დიზელი</WastBtn2>

            <WastBtn3 onClick={handleClickScroll3}
                variants={buttonVariants}        
                whileHover="hover3"  
                >ნავთი</WastBtn3>

            <WastBtn4 onClick={handleClickScroll4}
                variants={buttonVariants}        
                whileHover="hover4"  
                >მაზუთი</WastBtn4>

            <WastBtn1 onClick={handleClickScroll5}
                variants={buttonVariants}        
                whileHover="hover1"  
                >საპოხი ზეთი</WastBtn1>

            <WastBtn2 onClick={handleClickScroll6}
                variants={buttonVariants}        
                whileHover="hover2"  
                >ბენზოლი</WastBtn2>

            <WastBtn3 onClick={handleClickScroll7}
                variants={buttonVariants}        
                whileHover="hover3"  
                >ვაკუუმური გაზოილი</WastBtn3>
                
            <WastBtn4 onClick={handleClickScroll8}
                variants={buttonVariants}        
                whileHover="hover4"  
                >აირის კონდენსატი ბუნებრივი</WastBtn4>

            <WastBtn1 onClick={handleClickScroll9}
                variants={buttonVariants}        
                whileHover="hover1"  
                >ნავთობის აირები გათხევადებული</WastBtn1>
                
            <WastBtn2 onClick={handleClickScroll10}
                variants={buttonVariants}        
                whileHover="hover2"  
                >ნახშირწყალბადები აცეკლური</WastBtn2>

            <WastBtn3 onClick={handleClickScroll11}
                variants={buttonVariants}        
                whileHover="hover3"  
                >პროპილისა სპირტი</WastBtn3>

            <WastBtn4 onClick={handleClickScroll12}
                variants={buttonVariants}        
                whileHover="hover4"  
                >მეთილის სპირტი</WastBtn4>

            <WastBtn1 onClick={handleClickScroll13}
                variants={buttonVariants}        
                whileHover="hover1"  
                >პარაქსილოლი</WastBtn1>

            <WastBtn2 onClick={handleClickScroll14}
                variants={buttonVariants}        
                whileHover="hover2"  
                >პიროლიზური ფისი</WastBtn2>                   

        </WastBtnCont>

        <DeepDive text='ბენზინი' id='gasoline'>
            <Hr/>
            <H4>სეს ესნ კოდები: 2710 12 110, 2710 12 410, 2710 12 450, 2710 12 490</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>საზღვაო გადაზიდვები</Td>
                    <Td>0.35%</Td>                
                </Tr>

                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.24%</Td>                
                </Tr>

                <Tr>
                    <Td>საავტომობილო გადაზიდვები</Td>
                    <Td>0.12%</Td>                
                </Tr>

                <Tr>
                    <Td>რეზერვუარში შენახვა</Td>
                    <Td>0.25%</Td>                
                </Tr>

                <Tr>
                    <Td>მიწისზედა რეზერვუარში შენახვა 1 თვეზე მეტი ვადით</Td>
                    <Td>0.35%</Td>                
                </Tr>
            </Table>
        </DeepDive>

        <DeepDive text='ნედლი ნავთობი' id='crudle'>
            <Hr/>
            <H4>სეს ესნ კოდი: 2709 00 900</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.04%</Td>                
                </Tr>

                <Tr>
                    <Td>შენახვა</Td>
                    <Td>0.077%</Td>                
                </Tr>                
            </Table>
        </DeepDive>

        <DeepDive text='დიზელი' id='dizel'>
            <Hr/>   
            <H4>სეს ესნ კოდები: 2710 19 430, 2710 19 460, 2710 19 470, 2710 19 480</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>საზღვაო გადაზიდვები</Td>
                    <Td>0.35 %</Td>                
                </Tr>

                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.1 %</Td>                
                </Tr>

                <Tr>
                    <Td>საავტომობილო გადაზიდვები</Td>
                    <Td>0.05 %</Td>                
                </Tr>   

                <Tr>
                    <Td>რეზერვუარში შენახვა</Td>
                    <Td>0.07 %</Td>                
                </Tr>                   
            </Table>
        </DeepDive>

        <DeepDive text='ნავთი' id='kerosine'>
            <Hr/> 
            <H4>სეს ესნ კოდები: 2710 19 210, 2710 19 250</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>საზღვაო გადაზიდვები</Td>
                    <Td>0.35 %</Td>                
                </Tr>

                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.11 %</Td>                
                </Tr>

                <Tr>
                    <Td>საავტომობილო გადაზიდვები</Td>
                    <Td>0.06 %</Td>                
                </Tr>   

                <Tr>
                    <Td>რეზერვუარში შენახვა</Td>
                    <Td>0.1 %</Td>                
                </Tr>                   
            </Table>
        </DeepDive>

        <DeepDive text='მაზუთი' id='fuel'>
            <Hr/> 
            <H4>სეს ესნ კოდები: 2710 19 620, 2710 19 640, 2710 19 680</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>1.05 %</Td>                
                </Tr>
                          
            </Table>
        </DeepDive>

        <DeepDive text='საპოხი ზეთი' id='oil'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2710 19 990</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.1 %</Td>                
                </Tr>
                          
            </Table>
        </DeepDive>

        <DeepDive text='ბენზოლი' id='benzol'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2902 20 000</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.24 %</Td>                
                </Tr>
                          
            </Table>
        </DeepDive>

        <DeepDive text='ვაკუუმური გაზოილი' id='vgo'>
            <Hr/> 
            <H4>სეს ესნ კოდები: 2710 19 310, 2710 19 350</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.6 %</Td>                
                </Tr>
                          
            </Table>
        </DeepDive>

        <DeepDive text='აირის კონდენსატი ბუნებრივი' id='air'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2709 00 100</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.75 %</Td>                
                </Tr>                          
            </Table>
        </DeepDive>

        <DeepDive text='ნავთობის აირები გათხევადებული' id='oilair'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2711</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.90 %</Td>                
                </Tr>
                <Tr>
                    <Td>შენახვა</Td>
                    <Td>1.10 %</Td>                
                </Tr>                          
            </Table>
        </DeepDive>

        <DeepDive text='ნახშირწყალბადები აცეკლური' id='aceclic'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2901</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.90 %</Td>                
                </Tr>
                <Tr>
                    <Td>შენახვა</Td>
                    <Td>1.10 %</Td>                
                </Tr>                          
            </Table>
        </DeepDive>

        <DeepDive text='პროპილისა და იზოპროპილის სპირტი' id='propil'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2905 12</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.80 %</Td>                
                </Tr>                                         
            </Table>
        </DeepDive>

        <DeepDive text='მეთილის სპირტი' id='metil'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2905 11</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.15 %</Td>                
                </Tr>                                         
            </Table>
        </DeepDive>

        <DeepDive text='პარაქსილოლი' id='paraqsilol'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 2902 43</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>0.30 %</Td>                
                </Tr>                                         
            </Table>
        </DeepDive>

        <DeepDive text='პიროლიზური ფისი' id='piroliz'>
            <Hr/> 
            <H4>სეს ესნ კოდი: 3911 90 990</H4>
            <Table>
                <Tr>
                    <Th>ოპერაციების დასახელება</Th>
                    <Th>დანაკარგები წონიდან %-ში</Th>
                </Tr>
                <Tr>
                    <Td>სარკინიგზო გადაზიდვები</Td>
                    <Td>1.00 %</Td>                
                </Tr>                                         
            </Table>
        </DeepDive>


    </Container>
  )
}

export default Wastage