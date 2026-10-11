import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ContentDivSty, ContentSty } from '../styledComponents/StyledComponents'
import Header from './Header'
import { Route, Routes, useLocation } from 'react-router-dom'
import Measurment from './Measurment'
import Wastage from './Wastage'
import OilPrice from './OilPrice'
import Docs from './Docs'
import Terminals from './Terminals'
import SanctionedVessels from './SanctionedVessels'
import Map, { getVesselCountryName } from './Map'
import ExportModule from './ExportModule'
import InvoiceManagement from './InvoiceManagement'
import { subscribeToBatumiVessels } from '../services/ais'

const SITE_URL = 'https://oil-dashboard.vercel.app'
const ROUTE_METADATA = {
  '/': {
    title: 'ბათუმის ნავთობტერმინალის მართვის პლატფორმა | Oil Dashboard',
    description: 'ბათუმის ნავთობტერმინალის ოპერაციული dashboard: ნავთობპროდუქტების ფასები, ტერმინალები, დოკუმენტები და გემების ცოცხალი რუკა.',
  },
  '/wastage': {
    title: 'ბუნებრივი დანაკარგები | Oil Dashboard',
    description: 'ნავთობპროდუქტების ბუნებრივი დანაკარგების ნორმები და გამოთვლები ბათუმის ნავთობტერმინალისთვის.',
  },
  '/oilprice': {
    title: 'ნავთობპროდუქტების ფასები | Oil Dashboard',
    description: 'ნავთობპროდუქტების ფასების კონტროლი და მაქსიმალური ფასები კოდების მიხედვით.',
  },
  '/docs': {
    title: 'დოკუმენტები | Oil Dashboard',
    description: 'ბათუმის ნავთობტერმინალის ოპერაციებთან დაკავშირებული დოკუმენტები და ცნობარები.',
  },
  '/terminals': {
    title: 'საბაჟო საწყობები და ტერმინალები | Oil Dashboard',
    description: 'ინფორმაცია ბათუმის ნავთობტერმინალის საბაჟო საწყობებისა და ტერმინალების შესახებ.',
  },
  '/sanctioned-vessels': {
    title: 'სანქცირებული გემები | Oil Dashboard',
    description: 'სანქცირებული გემების სია და გემების შესახებ ხელმისაწვდომი ინფორმაცია.',
  },
  '/export': {
    title: 'ექსპორტი | Oil Dashboard',
    description: 'ექსპორტის აქტიური ოპერაციების მართვა ბათუმის ნავთობტერმინალში.',
  },
  '/export/archived': {
    title: 'არქივირებული ექსპორტი | Oil Dashboard',
    description: 'არქივირებული საექსპორტო ოპერაციების ნახვა და მართვა.',
  },
  '/export/settings': {
    title: 'ექსპორტის პარამეტრები | Oil Dashboard',
    description: 'ექსპორტის ოპერაციების და გემების პარამეტრების მართვა.',
  },
  '/invoices': {
    title: 'ინვოისების მართვა | Oil Dashboard',
    description: 'ინვოისებისა და გემების ოპერაციული მონაცემების მართვა.',
  },
  '/livemap': {
    title: 'გემების ცოცხალი რუკა | Oil Dashboard',
    description: 'ბათუმის პორტთან ახლოს მყოფი გემების ცოცხალი რუკა, პოზიციები და პორტამდე მანძილი.',
  },
}


const Content = () => {
  const { pathname } = useLocation()
  const [notifications, setNotifications] = useState([])
  const [liveVessels, setLiveVessels] = useState([])
  const [connectionState, setConnectionState] = useState('connecting')
  const [lastUpdated, setLastUpdated] = useState('')
  const notifiedVesselKeys = useRef(new Set())
  const hasReceivedInitialSnapshot = useRef(false)

  useEffect(() => {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const metadata = ROUTE_METADATA[normalizedPath]
    const pageTitle = metadata?.title || 'გვერდი ვერ მოიძებნა | Oil Dashboard'
    const description = metadata?.description || 'მოთხოვნილი გვერდი ვერ მოიძებნა.'
    const canonicalUrl = new URL(normalizedPath, SITE_URL).href

    document.documentElement.lang = 'ka'
    document.title = pageTitle
    setMetaContent('description', description)
    setMetaContent('robots', metadata ? 'index,follow' : 'noindex,follow')
    setMetaContent('og:title', pageTitle, 'property')
    setMetaContent('og:description', description, 'property')
    setMetaContent('og:url', canonicalUrl, 'property')
    setCanonicalUrl(canonicalUrl)
  }, [pathname])

  const handleNewVessel = useCallback((vessel) => {
    const shipName = vessel.shipName || 'უცნობი გემი'
    const imo = vessel.imo || 'უცნობია'
    const flag = vessel.countryName || 'უცნობია'

    setNotifications((currentNotifications) => [
      {
        id: `${Date.now()}-${vessel.imo || vessel.mmsi || shipName}`,
        message: `ახალი გემი: ${shipName}, IMO: ${imo}, დროშა: ${flag}`,
      },
      ...currentNotifications,
    ])
  }, [])

  const handleVesselUpdate = useCallback((vessels) => {
    setLiveVessels(vessels)
    setLastUpdated(new Date().toLocaleTimeString())
    setConnectionState(vessels.length > 0 ? 'live' : 'idle')

    const vesselsInNotificationRadius = vessels.filter((vessel) =>
      vessel.distanceKm != null && vessel.distanceKm !== '' &&
      Number.isFinite(Number(vessel.distanceKm)) && Number(vessel.distanceKm) <= 2
    )

    if (!hasReceivedInitialSnapshot.current) {
      vesselsInNotificationRadius.forEach((vessel) => {
        notifiedVesselKeys.current.add(getVesselIdentity(vessel))
      })
      hasReceivedInitialSnapshot.current = true
      return
    }

    vesselsInNotificationRadius.forEach((vessel) => {
      const identity = getVesselIdentity(vessel)
      if (notifiedVesselKeys.current.has(identity)) return

      notifiedVesselKeys.current.add(identity)
      handleNewVessel({
        shipName: String(vessel.shipName ?? '').trim(),
        imo: String(vessel.imo ?? '').trim(),
        mmsi: vessel.mmsi,
        countryName: getVesselCountryName(vessel.mmsi) || vessel.countryName || vessel.flag,
      })
    })
  }, [handleNewVessel])

  useEffect(() => {
    const source = subscribeToBatumiVessels(20, handleVesselUpdate, () => {
      setConnectionState('offline')
      setLastUpdated('Live connection unavailable')
    })
    return () => source.close()
  }, [handleVesselUpdate])

  const handleVesselDismissed = useCallback((vessel) => {
    setLiveVessels((currentVessels) => currentVessels.filter((item) => {
      if (vessel.mmsi) return String(item.mmsi) !== String(vessel.mmsi)
      return String(item.shipName ?? '').trim().toUpperCase() !==
        String(vessel.shipName ?? '').trim().toUpperCase()
    }))
  }, [])

  return (
    <ContentSty>
        <Header
          notifications={notifications}
          onClearNotifications={() => setNotifications([])}
        />
        <ContentDivSty>
          <Routes>
            <Route path='/' element={<Measurment/>}/>
            <Route path='/wastage' element={<Wastage/>}/>
            <Route path='/oilprice' element={<OilPrice/>}/>
            <Route path='/docs' element={<Docs/>}/>
            <Route path='/terminals' element={<Terminals/>}/>
            <Route path='/sanctioned-vessels' element={<SanctionedVessels/>}/>
            <Route path='/export' element={<ExportModule tab='active'/>}/>
            <Route path='/export/archived' element={<ExportModule tab='archived'/>}/>
            <Route path='/export/settings' element={<ExportModule tab='settings'/>}/>
            <Route path='/invoices' element={<InvoiceManagement/>}/>
            <Route
              path='/livemap'
              element={(
                <Map
                  vessels={liveVessels}
                  connectionState={connectionState}
                  lastUpdated={lastUpdated}
                  onVesselDismissed={handleVesselDismissed}
                />
              )}
            />
          </Routes>
        </ContentDivSty>
    </ContentSty>
  )
}

function getVesselIdentity(vessel) {
  const imo = String(vessel.imo ?? '').trim()
  if (imo) return `imo:${imo}`

  const mmsi = String(vessel.mmsi ?? '').trim()
  if (mmsi) return `mmsi:${mmsi}`

  const shipName = String(vessel.shipName ?? '').trim().replace(/\s+/g, ' ').toUpperCase()
  return `name:${shipName}`
}

function setMetaContent(name, content, attribute = 'name') {
  let meta = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, name)
    document.head.append(meta)
  }
  meta.setAttribute('content', content)
}

function setCanonicalUrl(url) {
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.append(canonical)
  }
  canonical.href = url
}

export default Content