import React, { useCallback, useEffect, useState } from 'react'
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
import {
  deleteNotifications,
  fetchNotifications,
  getNotificationClientId,
  markNotificationSeen as markNotificationSeenRequest,
} from '../services/notificationsApi'

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

function mergeNotifications(current, incoming) {
  const notificationsById = new globalThis.Map(
    incoming.map((notification) => [notification.id, notification])
  )
  current.forEach((notification) => {
    if (!notificationsById.has(notification.id)) {
      notificationsById.set(notification.id, notification)
    }
  })
  return [...notificationsById.values()].sort(
    (first, second) => Date.parse(second.detectedAt) - Date.parse(first.detectedAt)
  )
}

const Content = () => {
  const { pathname } = useLocation()
  const [notifications, setNotifications] = useState([])
  const [notificationError, setNotificationError] = useState('')
  const [pendingSeenIds, setPendingSeenIds] = useState(() => new Set())
  const [notificationClientId] = useState(getNotificationClientId)
  const [liveVessels, setLiveVessels] = useState([])
  const [connectionState, setConnectionState] = useState('connecting')
  const [lastUpdated, setLastUpdated] = useState('')

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

  useEffect(() => {
    let isActive = true
    fetchNotifications(notificationClientId)
      .then((savedNotifications) => {
        if (isActive) {
          setNotifications((current) =>
            mergeNotifications(current, savedNotifications.map(enrichNotification))
          )
          setNotificationError('')
        }
      })
      .catch((error) => {
        console.error('[notifications load]', error)
        if (isActive) setNotificationError('შეტყობინებების ჩატვირთვა ვერ მოხერხდა')
      })

    return () => {
      isActive = false
    }
  }, [notificationClientId])

  const handleVesselUpdate = useCallback((vessels, notification) => {
    setLiveVessels(vessels)
    setLastUpdated(new Date().toLocaleTimeString())
    setConnectionState(vessels.length > 0 ? 'live' : 'idle')

    if (notification) {
      setNotifications((currentNotifications) =>
        mergeNotifications(currentNotifications, [enrichNotification(notification)])
      )
      setNotificationError('')
    }
  }, [])

  useEffect(() => {
    const source = subscribeToBatumiVessels(20, handleVesselUpdate, () => {
      setConnectionState('offline')
      setLastUpdated('Live connection unavailable')
    })
    return () => source.close()
  }, [handleVesselUpdate])

  const handleClearNotifications = useCallback(async () => {
    try {
      await deleteNotifications(notificationClientId)
      setNotifications([])
      setNotificationError('')
    } catch (error) {
      console.error('[notifications clear]', error)
      setNotificationError('შეტყობინებების გასუფთავება ვერ მოხერხდა')
    }
  }, [notificationClientId])

  const handleMarkNotificationSeen = useCallback(async (notificationId) => {
    setPendingSeenIds((current) => new Set(current).add(notificationId))
    try {
      await markNotificationSeenRequest(notificationClientId, notificationId)
      setNotifications((current) => current.filter(
        (notification) => notification.id !== notificationId
      ))
      setNotificationError('')
    } catch (error) {
      console.error('[notifications mark seen]', error)
      setNotificationError('შეტყობინების ნახულად მონიშვნა ვერ მოხერხდა')
    } finally {
      setPendingSeenIds((current) => {
        const next = new Set(current)
        next.delete(notificationId)
        return next
      })
    }
  }, [notificationClientId])

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
          notificationError={notificationError}
          pendingSeenIds={pendingSeenIds}
          onClearNotifications={handleClearNotifications}
          onMarkNotificationSeen={handleMarkNotificationSeen}
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

function enrichNotification(notification) {
  return {
    ...notification,
    flag: getVesselCountryName(notification.mmsi) || notification.flag,
  }
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