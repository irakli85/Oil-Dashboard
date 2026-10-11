import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ContentDivSty, ContentSty } from '../styledComponents/StyledComponents'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
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


const Content = () => {
  const [notifications, setNotifications] = useState([])
  const [liveVessels, setLiveVessels] = useState([])
  const [connectionState, setConnectionState] = useState('connecting')
  const [lastUpdated, setLastUpdated] = useState('')
  const notifiedVesselKeys = useRef(new Set())
  const hasReceivedInitialSnapshot = useRef(false)

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

export default Content