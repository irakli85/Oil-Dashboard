import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import map from '../assets/batumi.png'
import ship from '../assets/ship.svg'
import { fetchBatumiVessels, subscribeToBatumiVessels } from '../services/ais'

const DISMISSED_VESSELS_KEY = 'oil-dashboard-dismissed-vessels'

function getVesselKey(vessel) {
  return String(vessel.mmsi || vessel.shipName || '').trim()
}

function readDismissedVessels() {
  try {
    const stored = JSON.parse(localStorage.getItem(DISMISSED_VESSELS_KEY) || '[]')
    return new Set(Array.isArray(stored) ? stored : [])
  } catch {
    return new Set()
  }
}

const Map = () => {
  const [vessels, setVessels] = useState([])
  const [dismissedVessels, setDismissedVessels] = useState(readDismissedVessels)
  const [lastUpdated, setLastUpdated] = useState('')
  const [connectionState, setConnectionState] = useState('connecting')
  const [selectedRadius, setSelectedRadius] = useState(20)
  const [vesselToRemove, setVesselToRemove] = useState(null)

  const updateVessels = (nextVessels) => {
    setVessels(nextVessels.filter((vessel) => !dismissedVessels.has(getVesselKey(vessel))))
  }

  const dismissVessel = (vessel) => {
    const vesselKey = getVesselKey(vessel)
    const nextDismissedVessels = new Set(dismissedVessels)
    nextDismissedVessels.add(vesselKey)
    setDismissedVessels(nextDismissedVessels)
    localStorage.setItem(DISMISSED_VESSELS_KEY, JSON.stringify([...nextDismissedVessels]))
    setVessels((currentVessels) => currentVessels.filter((item) => getVesselKey(item) !== vesselKey))
  }

  const confirmVesselRemoval = () => {
    if (!vesselToRemove) return
    dismissVessel(vesselToRemove)
    setVesselToRemove(null)
  }

  useEffect(() => {
    const loadInitialVessels = async () => {
      const nextVessels = await fetchBatumiVessels(selectedRadius)
      updateVessels(nextVessels)
      setLastUpdated(new Date().toLocaleTimeString())
      setConnectionState(nextVessels.length > 0 ? 'live' : 'idle')
    }

    loadInitialVessels()

    const source = subscribeToBatumiVessels(selectedRadius, (nextVessels) => {
      updateVessels(nextVessels)
      setLastUpdated(new Date().toLocaleTimeString())
      setConnectionState('live')
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
        <img src={map} alt="Batumi map" />

        {vessels.map((vessel, index) => {
          const lonMin = 41.2
          const lonMax = 42.0
          const latMin = 41.45
          const latMax = 41.85

          const left = ((vessel.longitude - lonMin) / (lonMax - lonMin)) * 100
          const top = ((latMax - vessel.latitude) / (latMax - latMin)) * 100

          const safeLeft = Math.min(Math.max(left, 4), 96)
          const safeTop = Math.min(Math.max(top, 4), 96)

          return (
            <MarkerWrap key={vessel.mmsi || `${vessel.shipName}-${index}`} style={{ left: `${safeLeft}%`, top: `${safeTop}%` }}>
              <Marker title={`${vessel.shipName} • ${vessel.distanceKm} km`} />
              <MarkerLabel>{vessel.shipName}</MarkerLabel>
            </MarkerWrap>
          )
        })}
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const MarkerWrap = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Marker = styled.div`
  width: 12px;
  height: 12px;
  background: #ff4d4d;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 0 0 4px rgba(255, 77, 77, 0.2);
`

const MarkerLabel = styled.span`
  margin-top: 6px;
  background: rgba(17, 24, 39, 0.72);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 3px 6px;
  border-radius: 999px;
  white-space: nowrap;
`

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
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