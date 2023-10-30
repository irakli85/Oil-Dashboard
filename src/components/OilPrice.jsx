import React from 'react'
import { Container, H2, H4, Table, Tr, Th, Td, Hr } from './Measurment'


const OilPrice = () => {
  return (
    <Container>
        <div>
         <H2>ნედლი ნავთობის ფასი</H2>
            <Table
                width={240}
                border={1}
                cellPadding={2}
                cellSpacing={0}
                className="borderOj"
                >
            <colgroup>
                <col width="7%" />
                <col width="57%" />
                <col width="19%" />
                <col width="17%" />
            </colgroup>
            <tbody>
                <Tr>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>კოდი</p>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>საქონლის აღწერა</p>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>ერთი ბარელის ფასი (USD)</p>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>დაწესების თარიღი</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p>2709&nbsp;00 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ნედლი ნავთობი და ნედლი ნავთობპროდუქტები, მიღებული ბიტუმოვანი მინერალებისაგან
                    </p>
                </Td>
                <Td valign="top">
                    <p>60 </p>
                </Td>
                <Td valign="top">
                    <p>5&nbsp;დეკემბერი 2022</p>
                </Td>
                </Tr>
            </tbody>
            </Table>
        </div>

        <H2>ნავთობპროდუქტების ფასები</H2>

        <div >
            <p>
            <br />
            </p>
            <Table
            width={320}
            border={1}
            cellPadding={2}
            cellSpacing={0}
            className="borderOj"
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
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >კოდი</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >საქონლის აღწერა</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >ერთი ბარელის ფასი (USD)</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >დაწესების თარიღი</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>
                    ნავთობი და ნავთობპროდუქტები, მიღებული ბიტუმოვანი ქანებისაგან, ნედლის გარდა; პროდუქტები, სხვა ადგილას დაუსახელებელი ან ჩაურთველი, ბიტუმოვანი ქანებისაგან მიღებული ნავთობის ან ნავთობპროდუქტების 70 მას.% ან მეტი შემცველობით, ამასთან ეს ნავთობპროდუქტები წარმოადგენენ პროდუქტების ძირითად შემადგენლებს; ნამუშევარი ნავთობპროდუქტები:
                    </p>
                </Td>
                <Td colSpan={3} rowSpan={2} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p ></p>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>მსუბუქი დისტილატები და პროდუქტები</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;11 </p>
                </Td>
                <Td valign="top">
                    <p >გადამუშავების სპეციფიური პროცესებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;15 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ქიმიური გარდაქმნებისათვის პროცესებში, 2710 12 110 00 ქვესუბპოზიციაში მითითებულის გარდა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</p>
                    <p style={{ fontWeight: "bold" }}>სპეციალური ბენზინები</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;21 </p>
                </Td>
                <Td valign="top">
                    <p >უაიტ-სპირიტი</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;25 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>დანარჩენი</p>
                    <p style={{ fontWeight: "bold" }}>ბენზინები ძრავებისათვის</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;31 </p>
                </Td>
                <Td valign="top">
                    <p >საავიაციო ბენზინები</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>დანარჩენი, ტყვიის შემცველობით </p>
                    <p style={{ fontWeight: "bold" }}>არა უმეტეს 0,013&nbsp;გ/ლ-ისა</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;41 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ოქტანური რიცხვით (RON) 95-ზე ნაკლები
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;45 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ოქტანური რიცხვით (RON)  95 ან მეტი, მაგრამ 98-ზე ნაკლები
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;49 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ოქტანური რიცხვით 98 ან მეტი 
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;50 </p>
                </Td>
                <Td valign="top">
                    <p >0,013 გ/ლ-ზე მეტი</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;70 </p>
                </Td>
                <Td valign="top">
                    <p >ბენზინის საწვავი რეაქტიული</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;90 </p>
                </Td>
                <Td valign="top">
                    <p >მსუბუქი დისტილატები, დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი</p>
                </Td>
                <Td colSpan={3} rowSpan={2} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>საშუალო დისტილატები</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;11 </p>
                </Td>
                <Td valign="top">
                    <p >გადამუშავების სპეციფიური პროცესებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;15 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 110 00 ქვესუბპოზიციაში მითითებულის გარდა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</p>
                    <p style={{ fontWeight: "bold" }}>ნავთი</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;21 </p>
                </Td>
                <Td valign="top">
                    <p >რეაქტიული საწვავი</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;25 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;29 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>მძიმე დისტილატები</p>
                    <p style={{ fontWeight: "bold" }}>გაზოილი</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;31 </p>
                </Td>
                <Td valign="top">
                    <p >გადამუშავების სპეციფიკური პროცესებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;35 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 310 00 ქვესუბპოზიციაში მითითებულის გარდა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;43 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით არა უმეტეს 0,001 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;46 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,001 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0.002 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;47 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,002 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0.1 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;48 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,1 მას.%-ზე მეტი
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>თხევადი საწვავი</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;51 </p>
                </Td>
                <Td valign="top">
                    <p >გადამუშავების სპეციფიური პროცესებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;55 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 510 00 ქვესუბპოზიციაში მითითებულის გარდა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;62 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით არა უმეტეს 0,1 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;66 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით  0,1 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0,5% მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;67 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,5 მას.%-ზე მეტი
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>საპოხი ზეთები; დანარჩენი ზეთები</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;71 </p>
                </Td>
                <Td valign="top">
                    <p >გადამუშავების სპეციფიური პროცესებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;75 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ქიმიური გარდაქმნებისათვის პროცესებში, 2710 19 710 00 ქვესუბპოზიციაში მითითებულის გარდა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>სხვა მიზნებისათვის</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;81 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ძრავის ზეთები, კომპრესორის საპოხი ზეთი, ტურბინის საპოხი ზეთი
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;83 </p>
                </Td>
                <Td valign="top">
                    <p >სითხეები ჰიდრავლიური მიზნებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;85 </p>
                </Td>
                <Td valign="top">
                    <p >ღია ფერის ზეთები, ვაზელინის ზეთი</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;87 </p>
                </Td>
                <Td valign="top">
                    <p >ზეთი კბილანებისათვის და ზეთი რედუქტორებისათვის</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;91 </p>
                </Td>
                <Td valign="top">
                    <p >
                    ლითონების დასამუშავებელი შედგენილობები, ფორმების გასაპოხი ზეთები, ანტიკოროზიული ზეთები
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;93 </p>
                </Td>
                <Td valign="top">
                    <p >ელექტრული საიზოლაციო ზეთები</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;99 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი საპოხი ზეთები და ზეთები დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p > </p>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>
                    ნავთობი და ნავთობპროდუქტები, მიღებული ბიტუმოვანი ქანებისაგან, (ნედლის გარდა) და პროდუქტები, სხვა ადგილას დაუსახელებელი, ან ჩაურთველი ბიტუმოვანი ქანებისაგან მიღებული ნავთობისა ან ნავთობპროდუქტების 70 მას.% ან მეტი შემცველობით, ამასთან ეს ნავთობპროდუქტები წარმოადგენენ პროდუქტების ძირითად შემადგენლებს, ბიოდიზელის შემცველობით, ნამუშევარი ნავთობპროდუქტების გამოკლებით:
                    </p>
                </Td>
                <Td colSpan={3} rowSpan={2} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>გაზოილი</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;11 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით არა უმეტეს 0,001 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;16 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,001 მას.%-ზე მეტი, მაგრამ არა უმეტეს 0.1 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;19 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,1 მას.%-ზე მეტი
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>თხევადი საწვავი:</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;32 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით არა უმეტეს 0,5 მას.%-ისა
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;38 </p>
                </Td>
                <Td valign="top">
                    <p >
                    გოგირდის შემცველობით 0,5 მას.%-ზე მეტი
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;90 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p style={{ fontWeight: "bold" }}>ნამუშევარი ნავთობპროდუქტები</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p >&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;91 </p>
                </Td>
                <Td valign="top">
                    <p >
                    პოლიქლორბიფენილების (PCBs), პოლიქლორტრიფენილებისა (PCTs), ან პოლიბრომბიფენილების (PBBs) შემცველობით
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;99 </p>
                </Td>
                <Td valign="top">
                    <p >დანარჩენი</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p >5&nbsp;დეკემბერი 2023</p>
                </Td>
                </Tr>
            </tbody>
            </Table>
        </div>
</Container>

  )
}

export default OilPrice