import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import L from 'leaflet'
import { MapContainer, Marker as LeafletMarker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ship from '../assets/ship.svg'
import { subscribeToBatumiVessels } from '../services/ais'

const DISMISSED_VESSELS_KEY = 'oil-dashboard-dismissed-vessels'
const VESSEL_CACHE_KEY = 'oil-dashboard-vessel-cache'

function normalizeVesselName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ').toUpperCase()
}

function getVesselKeys(vessel) {
  return [String(vessel.mmsi || '').trim(), normalizeVesselName(vessel.shipName)].filter(Boolean)
}

function isDismissedVessel(vessel, dismissedVessels) {
  return getVesselKeys(vessel).some((key) => dismissedVessels.has(key))
}

function readDismissedVessels() {
  try {
    const stored = JSON.parse(localStorage.getItem(DISMISSED_VESSELS_KEY) || '[]')
    return new Set(Array.isArray(stored) ? stored : [])
  } catch {
    return new Set()
  }
}

function readCachedVessels(radiusKm) {
  try {
    const stored = JSON.parse(localStorage.getItem(`${VESSEL_CACHE_KEY}-${radiusKm}`) || '[]')
    return Array.isArray(stored) ? stored : []
  } catch {
    return []
  }
}

function writeCachedVessels(radiusKm, vessels) {
  localStorage.setItem(`${VESSEL_CACHE_KEY}-${radiusKm}`, JSON.stringify(vessels))
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;',
  })[character])
}

function createVesselIcon(shipName) {
  return L.divIcon({
    className: 'vessel-map-icon',
    html: `<span style="display:flex;align-items:center;gap:6px;white-space:nowrap"><i style="display:block;flex:0 0 16px;width:16px;height:16px;background:#d92d20;border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 4px rgba(217,45,32,.25)"></i><b style="background:rgba(17,24,39,.82);color:#fff;padding:4px 7px;border-radius:5px;font-size:13px;font-weight:700;line-height:1.1">${escapeHtml(shipName)}</b></span>`,
    iconSize: [180, 32],
    iconAnchor: [8, 16],
  })
}

const Map = () => {
  const [selectedRadius, setSelectedRadius] = useState(20)
  const [vessels, setVessels] = useState(() => readCachedVessels(20))
  const [dismissedVessels, setDismissedVessels] = useState(readDismissedVessels)
  const [lastUpdated, setLastUpdated] = useState('')
  const [connectionState, setConnectionState] = useState('connecting')
  const [vesselToRemove, setVesselToRemove] = useState(null)

  const updateVessels = (nextVessels) => {
    setVessels((currentVessels) => {
      const filteredVessels = nextVessels.filter((vessel) => !isDismissedVessel(vessel, dismissedVessels))
      if (filteredVessels.length > 0) writeCachedVessels(selectedRadius, filteredVessels)
      return filteredVessels.length > 0 || currentVessels.length === 0 ? filteredVessels : currentVessels
    })
  }

  const dismissVessel = (vessel) => {
    const nextDismissedVessels = new Set(dismissedVessels)
    getVesselKeys(vessel).forEach((key) => nextDismissedVessels.add(key))
    setDismissedVessels(nextDismissedVessels)
    localStorage.setItem(DISMISSED_VESSELS_KEY, JSON.stringify([...nextDismissedVessels]))
    setVessels((currentVessels) => {
      const remainingVessels = currentVessels.filter((item) => !isDismissedVessel(item, nextDismissedVessels))
      writeCachedVessels(selectedRadius, remainingVessels)
      return remainingVessels
    })
  }

  const confirmVesselRemoval = () => {
    if (!vesselToRemove) return
    dismissVessel(vesselToRemove)
    setVesselToRemove(null)
  }

  useEffect(() => {
    setVessels(readCachedVessels(selectedRadius))

    const source = subscribeToBatumiVessels(selectedRadius, (nextVessels) => {
      updateVessels(nextVessels)
      setLastUpdated(new Date().toLocaleTimeString())
      setConnectionState(nextVessels.length > 0 ? 'live' : 'idle')
    }, () => {
      setConnectionState('offline')
      setLastUpdated('Live connection unavailable')
    })

    return () => source.close()
  }, [selectedRadius, dismissedVessels])

  return (
    <Container>
      <Aside>
        <RadiusControls>
          <RadiusButton
            active={selectedRadius === 5}
            onClick={() => setSelectedRadius(5)}
            type="button"
          >
            5 km
          </RadiusButton>
          <RadiusButton
            active={selectedRadius === 20}
            onClick={() => setSelectedRadius(20)}
            type="button"
          >
            20 km
          </RadiusButton>
          <RadiusButton
            active={selectedRadius === 50}
            onClick={() => setSelectedRadius(50)}
            type="button"
          >
            50 km
          </RadiusButton>
        </RadiusControls>

        <StatusRow>
          <StatusDot state={connectionState} />
          <StatusLabel>
            {connectionState === 'live' ? 'Live AIS feed' : connectionState === 'offline' ? 'Offline' : 'Connecting...'}
          </StatusLabel>
        </StatusRow>
        <StatusText>{lastUpdated ? `Updated: ${lastUpdated}` : 'Waiting for data...'}</StatusText>

        {vessels.length === 0 ? (
          <EmptyState>
            No live AIS data received for this radius.
          </EmptyState>
        ) : (
          vessels.map((vessel, index) => (
            <VesselCard key={vessel.mmsi || `${vessel.shipName}-${index}`}>
              <img src={ship} alt="ship" />
              <div>
                <strong>{vessel.shipName}</strong>
                <p>MMSI: {vessel.mmsi || 'N/A'}</p>
                <p>Distance: {vessel.distanceKm ?? 'N/A'} km</p>
                <p>SOG: {vessel.sog ?? 'N/A'} kn</p>
              </div>
              <RemoveButton
                type="button"
                onClick={() => setVesselToRemove(vessel)}
                aria-label={`წაშლა: ${vessel.shipName}`}
                title={`წაშლა: ${vessel.shipName}`}
              >
                🗑
              </RemoveButton>
            </VesselCard>
          ))
        )}
      </Aside>

      <Content>
        <LiveMap center={[41.6494, 41.6594]} zoom={15} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {vessels.map((vessel, index) => (
            <LeafletMarker
              key={vessel.mmsi || `${vessel.shipName}-${index}`}
              position={[vessel.latitude, vessel.longitude]}
              icon={createVesselIcon(vessel.shipName)}
            >
              <Popup>
                <strong>{vessel.shipName}</strong>
                <br />
                MMSI: {vessel.mmsi || 'N/A'}
                <br />
                Distance: {vessel.distanceKm ?? 'N/A'} km
                <br />
                SOG: {vessel.sog ?? 'N/A'} kn
              </Popup>
            </LeafletMarker>
          ))}
        </LiveMap>
      </Content>

      {vesselToRemove && (
        <ModalOverlay role="presentation" onClick={() => setVesselToRemove(null)}>
          <Modal role="dialog" aria-modal="true" aria-labelledby="remove-vessel-title" onClick={(event) => event.stopPropagation()}>
            <ModalTitle id="remove-vessel-title">გემის წაშლა</ModalTitle>
            <ModalText>ნამდვილად გსურთ „{vesselToRemove.shipName}“-ის წაშლა?</ModalText>
            <ModalActions>
              <CancelButton type="button" onClick={() => setVesselToRemove(null)}>
                გაუქმება
              </CancelButton>
              <ConfirmButton type="button" onClick={confirmVesselRemoval}>
                წაშლა
              </ConfirmButton>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  display: flex;
`

const Aside = styled.div`
  width: 25%;
  background-color: white;
  padding: 1rem;
`

const VesselCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  img {
    width: 24px;
    height: 24px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }

  strong {
    font-size: 15px;
    line-height: 1.2;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #555;
  }
`

const RemoveButton = styled.button`
  border: 0;
  background: transparent;
  color: #b42318;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  line-height: 1;
  border-radius: 6px;
  padding: 8px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: #d92d20;
    color: #fff;
  }
`

const RadiusControls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
`

const RadiusButton = styled.button`
  border: 1px solid #d5dbe3;
  background: ${({ active }) => active ? '#0b6efd' : '#fff'};
  color: ${({ active }) => active ? '#fff' : '#1f2937'};
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.95;
  }
`

const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
`

const StatusDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ state }) => state === 'live' ? '#1db954' : state === 'offline' ? '#d93025' : '#f59e0b'};
  box-shadow: 0 0 0 4px rgba(0,0,0,0.05);
`

const StatusLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #0c7c59;
`

const StatusText = styled.div`
  font-size: 12px;
  color: #555;
  margin-bottom: 12px;
`

const EmptyState = styled.div`
  color: #666;
  font-size: 14px;
`

const Content = styled.div`
  position: relative;
  width: 75%;
  height: 100vh;
  background-color: gainsboro;
`

const LiveMap = styled(MapContainer)`
  width: 100%;
  height: 100%;
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.48);
`

const Modal = styled.div`
  width: min(100%, 420px);
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.24);
`

const ModalTitle = styled.h2`
  margin: 0;
  color: #111827;
  font-size: 20px;
`

const ModalText = styled.p`
  margin: 12px 0 24px;
  color: #4b5563;
  font-size: 15px;
`

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const ModalButton = styled.button`
  border: 0;
  border-radius: 6px;
  padding: 9px 16px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`

const CancelButton = styled(ModalButton)`
  background: #eef2f6;
  color: #374151;
`

const ConfirmButton = styled(ModalButton)`
  background: #d92d20;
  color: #fff;

  &:hover {
    background: #b42318;
  }
`

export default Map