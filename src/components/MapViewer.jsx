import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const MIN_ZOOM = 1
const MAX_ZOOM = 10
const ZOOM_STEP = 0.5

const MapViewer = ({ src, alt, pdfUrl, searchItems = [] }) => {
  const dragRef = useRef(null)
  const viewportRef = useRef(null)
  const imageRef = useRef(null)
  const markerRef = useRef(null)
  const offsetRef = useRef({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(MIN_ZOOM)
  const [isDragging, setIsDragging] = useState(false)
  const [hasLoadError, setHasLoadError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchMessage, setSearchMessage] = useState('')
  const [activeMarker, setActiveMarker] = useState(null)

  const applyOffset = useCallback((nextOffset) => {
    offsetRef.current = nextOffset
    const transform = `translate3d(${nextOffset.x}px, ${nextOffset.y}px, 0) scale(${zoom})`
    if (imageRef.current) {
      imageRef.current.style.transform = transform
    }
    if (markerRef.current) markerRef.current.style.transform = transform
  }, [zoom])

  const clampOffset = useCallback((nextOffset, nextZoom) => {
    const viewport = viewportRef.current
    const image = imageRef.current
    if (!viewport || !image?.naturalWidth || !image?.naturalHeight) return nextOffset

    const viewportWidth = viewport.clientWidth
    const viewportHeight = viewport.clientHeight
    const imageRatio = image.naturalWidth / image.naturalHeight
    const viewportRatio = viewportWidth / viewportHeight
    const imageWidth = imageRatio > viewportRatio
      ? viewportWidth
      : viewportHeight * imageRatio
    const imageHeight = imageRatio > viewportRatio
      ? viewportWidth / imageRatio
      : viewportHeight
    const maxX = Math.max(0, (imageWidth * nextZoom - viewportWidth) / 2)
    const maxY = Math.max(0, (imageHeight * nextZoom - viewportHeight) / 2)

    return {
      x: Math.min(maxX, Math.max(-maxX, nextOffset.x)),
      y: Math.min(maxY, Math.max(-maxY, nextOffset.y)),
    }
  }, [])

  const moveMap = useCallback((clientX, clientY) => {
    const drag = dragRef.current
    if (!drag) return
    applyOffset(clampOffset({
      x: drag.offsetX + clientX - drag.pointerX,
      y: drag.offsetY + clientY - drag.pointerY,
    }, zoom))
  }, [applyOffset, clampOffset, zoom])

  const stopDragging = useCallback(() => {
    dragRef.current = null
    setIsDragging(false)
  }, [])

  const updateZoom = useCallback((nextZoom) => {
    const clampedZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextZoom))
    const nextOffset = clampOffset(offsetRef.current, clampedZoom)
    offsetRef.current = nextOffset
    const transform = `translate3d(${nextOffset.x}px, ${nextOffset.y}px, 0) scale(${clampedZoom})`
    if (imageRef.current) {
      imageRef.current.style.transform = transform
    }
    if (markerRef.current) markerRef.current.style.transform = transform
    setZoom(clampedZoom)
  }, [clampOffset])

  const focusMapAt = (item) => {
    if (!Number.isFinite(item.x) || !Number.isFinite(item.y)) {
      setSearchResults([])
      setActiveMarker(null)
      setSearchQuery(item.tank)
      setSearchMessage(`№ ${item.tank} სიაშია, თუმცა რუკაზე მდებარეობა მითითებული არ არის.`)
      return
    }

    const viewport = viewportRef.current
    const image = imageRef.current
    if (!viewport || !image?.naturalWidth || !image?.naturalHeight) return

    const nextZoom = 5
    const fitScale = Math.min(
      viewport.clientWidth / image.naturalWidth,
      viewport.clientHeight / image.naturalHeight,
    )
    const displayWidth = image.naturalWidth * fitScale
    const displayHeight = image.naturalHeight * fitScale
    const nextOffset = clampOffset({
      x: (0.5 - item.x) * displayWidth * nextZoom,
      y: (0.5 - item.y) * displayHeight * nextZoom,
    }, nextZoom)

    offsetRef.current = nextOffset
    const transform = `translate3d(${nextOffset.x}px, ${nextOffset.y}px, 0) scale(${nextZoom})`
    image.style.transform = transform
    if (markerRef.current) markerRef.current.style.transform = transform
    setZoom(nextZoom)
    setSearchQuery(item.tank)
    setSearchResults([])
    setActiveMarker(item)
    setSearchMessage(`№ ${item.tank} მოიძებნა: ${item.section}`)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    setActiveMarker(null)
    const query = searchQuery.trim()
    if (!query) {
      setSearchResults([])
      setSearchMessage('შეიყვანეთ რეზერვუარის ნომერი.')
      return
    }

    const matches = searchItems.filter((item) => item.tank === query)
    if (matches.length === 1) {
      focusMapAt(matches[0])
      return
    }
    if (matches.length > 1) {
      setSearchResults(matches)
      setSearchMessage('ეს ნომერი რამდენიმე უბანშია გამოყენებული — აირჩიეთ შესაბამისი უბანი.')
      return
    }

    setSearchResults([])
    setSearchMessage(`რეზერვუარი № ${query} სიაში ვერ მოიძებნა.`)
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const handleWheel = (event) => {
      const nextZoom = zoom + (event.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP)
      if (nextZoom < MIN_ZOOM || nextZoom > MAX_ZOOM) return
      event.preventDefault()
      updateZoom(nextZoom)
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [zoom, updateZoom])

  useEffect(() => {
    if (!isDragging || dragRef.current?.pointerId !== undefined) return undefined

    const handleMouseMove = (event) => moveMap(event.clientX, event.clientY)
    const handleMouseUp = () => stopDragging()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, moveMap, stopDragging])

  const handleMouseDown = (event) => {
    if (zoom === MIN_ZOOM || event.button !== 0) return
    event.preventDefault()
    dragRef.current = {
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
    }
    setIsDragging(true)
  }

  const handlePointerDown = (event) => {
    if (zoom === MIN_ZOOM || event.pointerType === 'mouse' || !event.isPrimary) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = {
      pointerId: event.pointerId,
      pointerX: event.clientX,
      pointerY: event.clientY,
      offsetX: offsetRef.current.x,
      offsetY: offsetRef.current.y,
    }
    setIsDragging(true)
  }

  const handlePointerMove = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    moveMap(event.clientX, event.clientY)
  }

  return (
    <Viewer>
      {searchItems.length > 0 && (
        <SearchSection>
          <SearchForm onSubmit={handleSearch}>
            <SearchInput
              type='search'
              aria-label='რეზერვუარის ნომრით რუკაზე ძებნა'
              placeholder='რეზერვუარის №'
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
                setSearchResults([])
                setSearchMessage('')
              }}
            />
            <SearchButton type='submit'>რუკაზე მოძებნა</SearchButton>
          </SearchForm>
          {searchMessage && <SearchMessage role='status' $error={searchMessage.endsWith('ვერ მოიძებნა.')}>{searchMessage}</SearchMessage>}
          {searchResults.length > 0 && (
            <SearchResults aria-label='აირჩიეთ რეზერვუარის უბანი'>
              {searchResults.map((item) => (
                <SearchResultButton
                  key={item.id}
                  type='button'
                  onClick={() => focusMapAt(item)}
                >
                  № {item.tank} — {item.section}
                </SearchResultButton>
              ))}
            </SearchResults>
          )}
        </SearchSection>
      )}
      <Controls aria-label='მართვის ღილაკები'>
        <ZoomButton
          type='button'
          aria-label='რუკის გადიდება'
          disabled={zoom >= MAX_ZOOM}
          onClick={() => updateZoom(zoom + ZOOM_STEP)}
        >
          +
        </ZoomButton>
        <ZoomLevel aria-live='polite'>{Math.round(zoom * 100)}%</ZoomLevel>
        <ZoomButton
          type='button'
          aria-label='რუკის დაპატარავება'
          disabled={zoom <= MIN_ZOOM}
          onClick={() => updateZoom(zoom - ZOOM_STEP)}
        >
          −
        </ZoomButton>
        <ResetButton type='button' onClick={() => updateZoom(MIN_ZOOM)}>
          საწყისი ზომა
        </ResetButton>
        {pdfUrl && (
          <DownloadLink href={pdfUrl} download>
            ორიგინალი PDF
          </DownloadLink>
        )}
      </Controls>
      <Viewport
        ref={viewportRef}
        role='region'
        aria-label={alt}
        $zoomed={zoom > MIN_ZOOM}
        $dragging={isDragging}
        onMouseDown={handleMouseDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onLostPointerCapture={stopDragging}
      >
        {hasLoadError ? (
          <LoadError role='alert'>რუკის ჩატვირთვა ვერ მოხერხდა.</LoadError>
        ) : (
          <MapImage
            ref={imageRef}
            src={src}
            alt={alt}
            draggable='false'
            onError={() => setHasLoadError(true)}
            style={{
              transform: `translate3d(${offsetRef.current.x}px, ${offsetRef.current.y}px, 0) scale(${zoom})`,
            }}
          />
        )}
        {activeMarker && (
          <MarkerOverlay
            ref={markerRef}
            viewBox='0 0 4768 3368'
            preserveAspectRatio='xMidYMid meet'
            aria-hidden='true'
            style={{
              transform: `translate3d(${offsetRef.current.x}px, ${offsetRef.current.y}px, 0) scale(${zoom})`,
            }}
          >
            <g transform={`translate(${activeMarker.x * 4768} ${activeMarker.y * 3368})`}>
              <g>
                <animateTransform
                  attributeName='transform'
                  type='translate'
                  values='0 0; 0 12; 0 0'
                  dur='2.4s'
                  calcMode='spline'
                  keyTimes='0; 0.5; 1'
                  keySplines='0.4 0 0.6 1; 0.4 0 0.6 1'
                  repeatCount='indefinite'
                />
                <path
                  d='M0 -20 L-24 -52 L-10 -52 L-10 -88 L10 -88 L10 -52 L24 -52 Z'
                  fill='#16a34a'
                  stroke='#fff'
                  strokeLinejoin='round'
                  strokeWidth='2'
                />
              </g>
            </g>
          </MarkerOverlay>
        )}
      </Viewport>
      <HelpText>
        {searchItems.length > 0 && 'რეზერვუარის ნომერი შეიყვანეთ ძებნის ველში. '}
        გაადიდეთ მაუსის ბორბლით ან ღილაკებით; გადიდებული რუკა გადაადგილდება გადაათრევით.
      </HelpText>
    </Viewer>
  )
}

const Viewer = styled.section`
  width: 100%;
  min-width: 0;
  margin: 1.5rem 0 4rem;
`

const SearchSection = styled.div`
  margin-bottom: 1.5rem;
`

const SearchForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 54rem;
  gap: 0.8rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  min-height: 4.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.8rem;
  color: #1e293b;
  font-size: 1.5rem;

  &:focus {
    border-color: #1aac83;
    outline: 2px solid rgba(26, 172, 131, 0.2);
  }
`

const SearchButton = styled.button`
  min-height: 4.4rem;
  padding: 0.8rem 1.5rem;
  border: 1px solid #168054;
  border-radius: 0.8rem;
  background: #168054;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: #0c5d47;
    outline: 2px solid rgba(22, 128, 84, 0.2);
  }
`

const SearchMessage = styled.p`
  margin: 0.8rem 0 0;
  color: ${({ $error }) => ($error ? '#dc2626' : '#475569')};
  font-size: 1.3rem;
  line-height: 1.5;
`

const SearchResults = styled.div`
  display: flex;
  max-width: 70rem;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.8rem;
`

const SearchResultButton = styled.button`
  min-height: 3.8rem;
  padding: 0.7rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.8rem;
  background: #fff;
  color: #0c5d47;
  font-size: 1.25rem;
  text-align: left;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: #1aac83;
    background: #f0fdf4;
    outline: none;
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1rem;
`

const ZoomButton = styled.button`
  display: grid;
  width: 4rem;
  height: 4rem;
  place-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 0.8rem;
  background: #fff;
  color: #0c5d47;
  font-size: 2.2rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    color: #94a3b8;
    cursor: not-allowed;
  }

  &:focus-visible,
  &:not(:disabled):hover {
    outline: 2px solid #1aac83;
    outline-offset: 2px;
  }
`

const ZoomLevel = styled.span`
  min-width: 4.8rem;
  color: #334155;
  font-size: 1.4rem;
  text-align: center;
`

const ResetButton = styled.button`
  min-height: 4rem;
  padding: 0.7rem 1.2rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.8rem;
  background: #fff;
  color: #334155;
  font-size: 1.35rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    border-color: #1aac83;
    outline: none;
  }
`

const DownloadLink = styled.a`
  display: inline-flex;
  min-height: 4rem;
  align-items: center;
  padding: 0.7rem 1.2rem;
  border: 1px solid #168054;
  border-radius: 0.8rem;
  color: #168054;
  font-size: 1.35rem;
  font-weight: 600;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background: #f0fdf4;
    outline: 2px solid rgba(22, 128, 84, 0.2);
  }
`

const Viewport = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: clamp(30rem, 65vh, 70rem);
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid #dbe3ea;
  border-radius: 1rem;
  background: #fff;
  touch-action: none;
  user-select: none;
  cursor: ${({ $zoomed, $dragging }) => (
    $dragging ? 'grabbing' : $zoomed ? 'grab' : 'default'
  )};

  @media (max-width: 640px) {
    height: 55vh;
    min-height: 26rem;
  }
`

const MapImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  transform-origin: center;
`

const MarkerOverlay = styled.svg`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
  transform-origin: center;
`

const LoadError = styled.p`
  padding: 2rem;
  color: #b91c1c;
  font-size: 1.6rem;
  text-align: center;
`

const HelpText = styled.p`
  margin: 0.8rem 0 0;
  color: #64748b;
  font-size: 1.25rem;
  line-height: 1.5;
`

export default MapViewer
