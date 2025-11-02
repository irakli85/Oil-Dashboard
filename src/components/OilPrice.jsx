import React from 'react'
import { Container, H2,  Table, Tr,  Td } from './Measurment'
import PriceCalc from './PriceCalc'
import DeepDive from '../styledComponents/DeepDive'


const OilPrice = () => {
  return (
    
<Container>        
    <PriceCalc/>
    <DeepDive text='ნავთობპროდუქტების მაქსიმალური ფასები კოდების მიხედვით'>
        <H2>ნედლი ნავთობის ფასი</H2>
        <Table
                width={240}
                border={1}
                cellPadding={2}
                cellSpacing={0}
                >
            <colgroup>
                <col width="7%" />
                <col width="57%" />
                <col width="19%" />
                <col width="17%" />
            </colgroup>
            <tbody>
                <Tr>
                    <Td style={{ fontWeight: "bold" }}>კოდი</Td>                    
                    <Td style={{ fontWeight: "bold" }}>საქონლის აღწერა</Td>
                    <Td style={{ fontWeight: "bold" }}>ერთი ბარელის ფასი (USD)</Td>
                    <Td style={{ fontWeight: "bold" }}>დაწესების თარიღი</Td>
                </Tr>

                <Tr>
                    <Td>2709&nbsp;00</Td>
                    <Td>ნედლი ნავთობი და ნედლი ნავთობპროდუქტები, მიღებული ბიტუმოვანი მინერალებისაგან</Td>
                    <Td style={{ fontWeight: "bold" }}>47.6</Td>
                    <Td>5&nbsp;დეკემბერი 2022</Td>
                </Tr>
            </tbody>
        </Table>
       

        <H2>ნავთობპროდუქტების ფასები</H2>
               
        <Table
            width={320}
            border={1}
            cellPadding={2}
            cellSpacing={0}
            >
            <colgroup>
                <col width="6%" />
                <col width="55%" />
                <col width="28%" />
                <col width="1%" />
                <col width="9%" />
            </colgroup>
            <tbody>
                <Tr>
                    <Td style={{ fontWeight: "bold" }}>კოდი</Td>
                    <Td style={{ fontWeight: "bold" }}>საქონლის აღწერა</Td>
                    <Td> </Td>
                    <Td style={{ fontWeight: "bold" }}>ერთი ბარელის ფასი (USD)</Td>
                    <Td style={{ fontWeight: "bold" }}>დაწესების თარიღი</Td>
                </Tr>
                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>                        
                        ნავთობი და ნავთობპროდუქტები, მიღებული ბიტუმოვანი ქანებისაგან, ნედლის გარდა; პროდუქტები, სხვა ადგილას დაუსახელებელი ან ჩაურთველი, ბიტუმოვანი ქანებისაგან მიღებული ნავთობის ან ნავთობპროდუქტების 70 მას.% ან მეტი შემცველობით, ამასთან ეს ნავთობპროდუქტები წარმოადგენენ პროდუქტების ძირითად შემადგენლებს; ნამუშევარი ნავთობპროდუქტები
                        
                    </Td>
                    <Td colSpan={3} rowSpan={2}></Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>მსუბუქი დისტილატები და პროდუქტები</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;11</Td>
                    <Td>გადამუშავების სპეციფიური პროცესებისათვის</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;15</Td>
                    <Td>ქიმიური გარდაქმნებისათვის პროცესებში, 2710 12 110 00 ქვესუბპოზიციაში მითითებულის გარდა</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის, სპეციალური ბენზინები</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;21</Td>
                    <Td>უაიტ-სპირიტი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;25</Td>
                    <Td>დანარჩენი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>დანარჩენი, ბენზინები ძრავებისათვის</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;31</Td>
                    <Td>საავიაციო ბენზინები</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>დანარჩენი, ტყვიის შემცველობით არა უმეტეს 0,013&nbsp;გ/ლ-ისა</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;41</Td>
                    <Td>ოქტანური რიცხვით (RON) 95-ზე ნაკლები</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>
                <Tr>
                    <Td>2710&nbsp;12&nbsp;45</Td>
                    <Td>ოქტანური რიცხვით (RON)  95 ან მეტი, მაგრამ 98-ზე ნაკლები</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>
                
                <Tr>
                    <Td>2710&nbsp;12&nbsp;49</Td>
                    <Td>ოქტანური რიცხვით 98 ან მეტი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;50</Td>
                    <Td>0,013 გ/ლ-ზე მეტი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;70</Td>
                    <Td>ბენზინის საწვავი რეაქტიული</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;12&nbsp;90</Td>
                    <Td>მსუბუქი დისტილატები, დანარჩენი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>დანარჩენი</Td>
                    <Td colSpan={3} rowSpan={2}></Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>საშუალო დისტილატები</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;11</Td>
                    <Td>გადამუშავების სპეციფიური პროცესებისათვის</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;15</Td>
                    <Td>ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 110 00 ქვესუბპოზიციაში მითითებულის გარდა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის<br/>ნავთი</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;21</Td>
                    <Td>რეაქტიული საწვავი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;25</Td>
                    <Td>დანარჩენი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;29</Td>
                    <Td>დანარჩენი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>მძიმე დისტილატები<br/>გაზოილი</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;31</Td>
                    <Td>გადამუშავების სპეციფიკური პროცესებისათვის</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;35</Td>
                    <Td>ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 310 00 ქვესუბპოზიციაში მითითებულის გარდა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;43</Td>
                    <Td>გოგირდის შემცველობით არა უმეტეს 0,001 მას.%-ისა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;46</Td>
                    <Td>გოგირდის შემცველობით 0,001 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0.002 მას.%-ისა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;47</Td>
                    <Td>გოგირდის შემცველობით 0,002 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0.1 მას.%-ისა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;48</Td>
                    <Td>გოგირდის შემცველობით 0,1 მას.%-ზე მეტი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>თხევადი საწვავი</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;51</Td>
                    <Td>გადამუშავების სპეციფიური პროცესებისათვის</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;55</Td>
                    <Td>ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 510 00 ქვესუბპოზიციაში მითითებულის გარდა</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;62</Td>
                    <Td>გოგირდის შემცველობით არა უმეტეს 0,1 მას.%-ისა</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;66</Td>
                    <Td>გოგირდის შემცველობით  0,1 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0,5% მას.%-ისა</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;67</Td>
                    <Td>გოგირდის შემცველობით 0,5 მას.%-ზე მეტი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>საპოხი ზეთები; დანარჩენი ზეთები</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;71</Td>
                    <Td>გადამუშავების სპეციფიური პროცესებისათვის</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;75</Td>
                    <Td>ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 710 00 ქვესუბპოზიციაში მითითებულის გარდა</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;81</Td>
                    <Td>ძრავის ზეთები, კომპრესორის საპოხი ზეთი, ტურბინის საპოხი ზეთი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;83</Td>
                    <Td>სითხეები ჰიდრავლიური მიზნებისათვის</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;85</Td>
                    <Td>ღია ფერის ზეთები, ვაზელინის ზეთი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;87</Td>
                    <Td>ზეთი კბილანებისათვის და ზეთი რედუქტორებისათვის</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;91</Td>
                    <Td>ლითონების დასამუშავებელი შედგენილობები, ფორმების გასაპოხი ზეთები, ანტიკოროზიული ზეთები</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;93</Td>
                    <Td>ელექტრული საიზოლაციო ზეთები</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;19&nbsp;99</Td>
                    <Td>დანარჩენი საპოხი ზეთები და ზეთები დანარჩენი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>
                        ნავთობი და ნავთობპროდუქტები, მიღებული ბიტუმოვანი ქანებისაგან, (ნედლის გარდა) და პროდუქტები, სხვა ადგილას დაუსახელებელი, ან ჩაურთველი ბიტუმოვანი ქანებისაგან მიღებული ნავთობისა ან ნავთობპროდუქტების 70 მას.% ან მეტი შემცველობით, ამასთან ეს ნავთობპროდუქტები წარმოადგენენ პროდუქტების ძირითად შემადგენლებს, ბიოდიზელის შემცველობით, ნამუშევარი ნავთობპროდუქტების გამოკლებით                       
                    </Td>
                    <Td colSpan={3} rowSpan={2}></Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>გაზოილი</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;20&nbsp;11</Td>
                    <Td>გოგირდის შემცველობით არა უმეტეს 0,001 მას.%-ისა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;20&nbsp;16</Td>
                    <Td>გოგირდის შემცველობით 0,001 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0.1 მას.%-ისა</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;20&nbsp;19</Td>
                    <Td>გოგირდის შემცველობით 0,1 მას.%-ზე მეტი</Td>
                    <Td>Premium to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>100</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>თხევადი საწვავი</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;20&nbsp;32</Td>
                    <Td>გოგირდის შემცველობით არა უმეტეს 0,5 მას.%-ისა</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>
                <Tr>
                    <Td>2710&nbsp;20&nbsp;38</Td>
                    <Td>გოგირდის შემცველობით 0,5 მას.%-ზე მეტი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;20&nbsp;90</Td>
                    <Td>დანარჩენი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td></Td>
                    <Td style={{ fontWeight: "bold" }}>ნამუშევარი ნავთობპროდუქტები</Td>
                    <Td colSpan={3}></Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;91</Td>
                    <Td>პოლიქლორბიფენილების (PCBs), პოლიქლორტრიფენილებისა (PCTs), ან პოლიბრომბიფენილების (PBBs) შემცველობით  </Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>

                <Tr>
                    <Td>2710&nbsp;99</Td>
                    <Td>დანარჩენი</Td>
                    <Td>Discount to crude oil</Td>
                    <Td style={{ fontWeight: "bold" }}>45</Td>
                    <Td>5&nbsp;თებერვალი 2023</Td>
                </Tr>
                
            </tbody>
        </Table>
    </DeepDive>        
</Container>

  )
}

export default OilPrice
