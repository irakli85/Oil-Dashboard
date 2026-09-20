import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import map from '../assets/batumi.png'
import ship from '../assets/ship.svg'
import { fetchBatumiVessels, subscribeToBatumiVessels } from '../services/ais'

const Map = () => {
  const [vessels, setVessels] = useState([])
  const [lastUpdated, setLastUpdated] = useState('')
  const [connectionState, setConnectionState] = useState('connecting')
  const [selectedRadius, setSelectedRadius] = useState(20)

  useEffect(() => {
    const loadInitialVessels = async () => {
      const nextVessels = await fetchBatumiVessels(selectedRadius)
      setVessels(nextVessels)
      setLastUpdated(new Date().toLocaleTimeString())
      setConnectionState(nextVessels.length > 0 ? 'live' : 'idle')
    }

    loadInitialVessels()

    const source = subscribeToBatumiVessels(selectedRadius, (nextVessels) => {
      setVessels(nextVessels)
      setLastUpdated(new Date().toLocaleTimeString())
      setConnectionState('live')
    }, () => {
      setConnectionState('offline')
      setLastUpdated('Live connection unavailable')
    })

    return () => source.close()
  }, [selectedRadius])

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
            </VesselCard>
          ))
        )}

        {vessels.length === 0 && (
          <VesselCard>
            <img src={ship} alt="ship" />
            <div>
              <strong>TAMARA 1</strong>
              <p>MMSI: 213981000</p>
              <p>Distance: 2.7 km</p>
              <p>SOG: 0.1 kn</p>
            </div>
          </VesselCard>
        )}

        {vessels.length > 0 && (
          <TableWrapper>
            <LiveTable>
              <thead>
                <tr>
                  <th>Vessel</th>
                  <th>Speed</th>
                  <th>Heading</th>
                  <th>Last seen</th>
                </tr>
              </thead>
              <tbody>
                {vessels.slice(0, 8).map((vessel, index) => (
                  <tr key={`${vessel.mmsi || vessel.shipName}-${index}`}>
                    <td>{vessel.shipName}</td>
                    <td>{vessel.sog ?? 'N/A'} kn</td>
                    <td>{vessel.cog ?? 'N/A'}°</td>
                    <td>{vessel.lastSeen ? new Date(vessel.lastSeen).toLocaleTimeString() : 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </LiveTable>
          </TableWrapper>
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
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #555;
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

const TableWrapper = styled.div`
  margin-top: 18px;
  overflow-x: auto;
`

const LiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
  background: #f7f9fb;
  border: 1px solid #eaeef2;

  th, td {
    padding: 8px 6px;
    border-bottom: 1px solid #edf1f4;
    text-align: left;
  }

  th {
    color: #4b5563;
    font-weight: 700;
    background: #eef3f8;
  }

  td {
    color: #1f2937;
  }
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
  font-size: 10px;
  padding: 3px 6px;
  border-radius: 999px;
  white-space: nowrap;
`

export default Map