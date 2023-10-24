import React from 'react'
import { DashDivSty, DashPsty, LinkSty, NavDivSty } from '../styledComponents/StyledComponents'
import {Link} from 'react-router-dom'

import graph from '../assets/graph.svg'
import stats from '../assets/stats.svg'
import cart from '../assets/cart.svg'
import shop from '../assets/shop.svg'
import chart from '../assets/chart.svg'
import sms from '../assets/message.svg'
import settings from '../assets/settings.svg'

const Navigation = () => {
  return (
    <div>
        <DashDivSty>
            <img src={graph} alt="graph" />
            <DashPsty to='https://oil-mern.vercel.app/login'>განაცხადები</DashPsty>
        </DashDivSty>
        <NavDivSty>
            <LinkSty to='/'>
                <img src={stats} alt="stats" />
                <p>Liderboard</p>
            </LinkSty>

            <LinkSty to='/order'>
                <img src={cart} alt="cart" />
                <p>Order</p>
            </LinkSty>

            <LinkSty to='/products'>
                <img src={shop} alt="shop" />
                <p>Products</p>
            </LinkSty>

            <LinkSty to='/sales'>
                <img src={chart} alt="chart" />
                <p>Sales Report</p>
            </LinkSty>

            <LinkSty to='/message'>
                <img src={sms} alt="sms" />
                <p>Messages</p>
            </LinkSty>

            <LinkSty to='/settings'>
                <img src={settings} alt="settings" />
                <p>Settings</p>
            </LinkSty>
            
        </NavDivSty>
    </div>
  )
}

export default Navigation