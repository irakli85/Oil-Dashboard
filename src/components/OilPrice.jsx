import React from 'react'
import { Container, H2, H4, Table, Tr, Th, Td, Hr } from './Measurment'


const OilPrice = () => {
  return (
    <Container>
        <div>
            <p><br /></p>

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
                    <p>
                    PeTroleum oils and oils obtained from bituminous minerals, crude
                    </p>
                </Td>
                <Td valign="top">
                    <p>60 </p>
                </Td>
                <Td valign="top">
                    <p>5&nbsp;December 2022</p>
                </Td>
                </Tr>
            </tbody>
            </Table>
        </div>

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
                    <p >CN Code</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >Description</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p className="hd-column">Premium to crude oil/</p>
                    <p className="hd-column">Discount to crude oil</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >Price per barrel (USD)</p>
                </Td>
                <Td style={{ fontWeight: "bold" }} valign="top">
                    <p >Date of application</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >
                    PeTroleum oils and oils obtained from bituminous minerals (other
                    than crude) and preparations not elsewhere specified or included,
                    containing by weight 70 &nbsp;% or more of peTroleum oils or of
                    oils obtained from bituminous minerals, these oils being the basic
                    constituents of the preparations, other than those containing
                    biodiesel and other than waste oils
                    </p>
                </Td>
                <Td colSpan={3} rowSpan={2} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12 </p>
                </Td>
                <Td valign="top">
                    <p >Light oils and preparations</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;11 </p>
                </Td>
                <Td valign="top">
                    <p >For undergoing a specific process</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;15 </p>
                </Td>
                <Td valign="top">
                    <p >
                    For undergoing chemical Transformation by a process other than
                    those specified in respect of subheading&nbsp;2710&nbsp;12&nbsp;11{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >For other purposes</p>
                    <p >Special spirits</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;21 </p>
                </Td>
                <Td valign="top">
                    <p >White spirit</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;25 </p>
                </Td>
                <Td valign="top">
                    <p >Other</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Other</p>
                    <p >Motor spirit</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;31 </p>
                </Td>
                <Td valign="top">
                    <p >Aviation spirit</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Other, with a lead content</p>
                    <p >Not exceeding 0,013 &nbsp;g per liTre</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;41 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With an octane number (RON) of less than 95{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;45 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With an octane number (RON) of 95 &nbsp;or more but less than 98{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;49 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With an octane number (RON) of 98 &nbsp;or more
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;50 </p>
                </Td>
                <Td valign="top">
                    <p >Exceeding 0,013 &nbsp;g per liTre</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;70 </p>
                </Td>
                <Td valign="top">
                    <p >Spirit type jet fuel</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;12&nbsp;90 </p>
                </Td>
                <Td valign="top">
                    <p >Other light oils</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19 </p>
                </Td>
                <Td valign="top">
                    <p >Other</p>
                </Td>
                <Td colSpan={3} rowSpan={2} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Medium oils</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;11 </p>
                </Td>
                <Td valign="top">
                    <p >For undergoing a specific process</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;15 </p>
                </Td>
                <Td valign="top">
                    <p >
                    For undergoing chemical Transformation by a process other than
                    those specified in respect of subheading&nbsp;2710&nbsp;19&nbsp;11{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >For other purposes</p>
                    <p >Kerosene</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;21 </p>
                </Td>
                <Td valign="top">
                    <p >Jet fuel</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;25 </p>
                </Td>
                <Td valign="top">
                    <p >Other</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;29 </p>
                </Td>
                <Td valign="top">
                    <p >Other</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Heavy oils</p>
                    <p >Gas oils</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;31 </p>
                </Td>
                <Td valign="top">
                    <p >For undergoing a specific process</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;35 </p>
                </Td>
                <Td valign="top">
                    <p >
                    For undergoing chemical Transformation by a process other than
                    those specified in respect of subheading&nbsp;2710&nbsp;19&nbsp;31{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >For other purposes</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;43 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content not exceeding 0,001 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;46 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,001 &nbsp;% by weight but not
                    exceeding 0,002 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;47 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,002 &nbsp;% by weight but not
                    exceeding 0,1 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;48 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,1 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Fuel oils</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;51 </p>
                </Td>
                <Td valign="top">
                    <p >For undergoing a specific process</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;55 </p>
                </Td>
                <Td valign="top">
                    <p >
                    For undergoing chemical Transformation by a process other than
                    those specified in respect of subheading&nbsp;2710&nbsp;19&nbsp;51{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >For other purposes</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;62 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content not exceeding 0,1 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;66 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,1 &nbsp;% by weight but not
                    exceeding 0,5 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;67 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,5 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Lubricating oils; other oils</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;71 </p>
                </Td>
                <Td valign="top">
                    <p >For undergoing a specific process</p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;75 </p>
                </Td>
                <Td valign="top">
                    <p >
                    For undergoing chemical Transformation by a process other than
                    those specified in respect of subheading&nbsp;2710&nbsp;19&nbsp;71{" "}
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >For other purposes</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;81 </p>
                </Td>
                <Td valign="top">
                    <p >
                    Motor oils, compressor lube oils, turbine lube oils
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;83 </p>
                </Td>
                <Td valign="top">
                    <p >Hydraulic oils</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;85 </p>
                </Td>
                <Td valign="top">
                    <p >White oils, liquid paraffin</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;87 </p>
                </Td>
                <Td valign="top">
                    <p >Gear oils and reductor oils</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;91 </p>
                </Td>
                <Td valign="top">
                    <p >
                    Metal-working compounds, mould-release oils, anti-corrosion oils
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;93 </p>
                </Td>
                <Td valign="top">
                    <p >ElecTrical insulating oils</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;19&nbsp;99 </p>
                </Td>
                <Td valign="top">
                    <p >Other lubricating oils and other oils</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20 </p>
                </Td>
                <Td valign="top">
                    <p >
                    PeTroleum oils and oils obtained from bituminous minerals (other
                    than crude) and preparations not elsewhere specified or included,
                    containing by weight 70 &nbsp;% or more of peTroleum oils or of
                    oils obtained from bituminous minerals, these oils being the basic
                    constituents of the preparations, containing biodiesel, other than
                    waste oils
                    </p>
                </Td>
                <Td colSpan={3} rowSpan={2} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Gas oils</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;11 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content not exceeding 0,001 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;16 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,001 &nbsp;% by weight but not
                    exceeding 0,1 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;19 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,1 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Premium to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >100 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Fuel oils</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;32 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content not exceeding 0,5 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;38 </p>
                </Td>
                <Td valign="top">
                    <p >
                    With a sulphur content exceeding 0,5 &nbsp;% by weight
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;20&nbsp;90 </p>
                </Td>
                <Td valign="top">
                    <p >Other oils</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                <Td valign="top">
                    <p >Waste oils</p>
                </Td>
                <Td colSpan={3} valign="top">
                    <p className="normal">&nbsp;</p>
                    <div></div>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;91 </p>
                </Td>
                <Td valign="top">
                    <p >
                    Containing polychlorinated biphenyls (PCBs), polychlorinated
                    terphenyls (PCTs) or polybrominated biphenyls (PBBs)
                    </p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
                <Tr>
                <Td valign="top">
                    <p >2710&nbsp;99 </p>
                </Td>
                <Td valign="top">
                    <p >Other</p>
                </Td>
                <Td valign="top">
                    <p >Discount to crude oil</p>
                </Td>
                <Td valign="top">
                    <p >45 </p>
                </Td>
                <Td valign="top">
                    <p className="tbl-left">5&nbsp;February 2023</p>
                </Td>
                </Tr>
            </tbody>
            </Table>
        </div>
</Container>

  )
}

export default OilPrice