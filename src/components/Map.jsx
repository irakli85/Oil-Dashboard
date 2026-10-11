import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import L from 'leaflet'
import { MapContainer, Marker as LeafletMarker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import boatIcon from '../assets/boaticon.svg'
import ship from '../assets/ship.svg'
import { dismissBatumiVessel } from '../services/ais'
import { useAdminAuth } from './AdminAuthProvider'

const DISMISSED_VESSELS_KEY = 'oil-dashboard-dismissed-vessels'
const vesselIconCache = new globalThis.Map()
const MID_COUNTRY_CODES = Object.fromEntries(
  Object.entries({
    '🇦🇱': '201',
    '🇦🇩': '202',
    '🇦🇹': '203',
    '🇵🇹': '204 255 263',
    '🇧🇪': '205',
    '🇧🇾': '206',
    '🇧🇬': '207',
    '🇻🇦': '208',
    '🇩🇪': '211 218',
    '🇨🇾': '212',
    '🇬🇪': '213',
    '🇲🇩': '214',
    '🇲🇹': '215 229 256',
    '🇦🇲': '216',
    '🇫🇮': '230',
    '🇫🇴': '231',
    '🇬🇮': '236',
    '🇬🇷': '237',
    '🇭🇷': '238',
    '🇲🇦': '242',
    '🇭🇺': '243',
    '🇮🇹': '247',
    '🇮🇪': '250',
    '🇮🇸': '251',
    '🇱🇮': '252',
    '🇱🇺': '253',
    '🇲🇨': '254',
    '🇵🇱': '261',
    '🇲🇪': '262',
    '🇷🇴': '264',
    '🇸🇰': '267',
    '🇸🇲': '268',
    '🇨🇭': '269',
    '🇨🇿': '270',
    '🇹🇷': '271',
    '🇺🇦': '272',
    '🇷🇺': '273',
    '🇲🇰': '274',
    '🇱🇻': '275',
    '🇪🇪': '276',
    '🇱🇹': '277',
    '🇸🇮': '278',
    '🇷🇸': '279',
    '🇦🇮': '301',
    '🇺🇸': '303 338 536 559',
    '🇳🇱': '306',
    '🇦🇼': '307',
    '🇧🇲': '310',
    '🇧🇸': '311',
    '🇧🇿': '312',
    '🇧🇧': '314',
    '🇨🇦': '316',
    '🇰🇾': '319',
    '🇨🇷': '321',
    '🇨🇺': '323',
    '🇩🇲': '325',
    '🇩🇴': '327',
    '🇬🇩': '330',
    '🇬🇱': '331',
    '🇬🇹': '332',
    '🇭🇳': '334',
    '🇭🇹': '336',
    '🇯🇲': '339',
    '🇰🇳': '341',
    '🇱🇨': '343',
    '🇲🇽': '345',

    '🇲🇸': '348',
    '🇳🇮': '350',
    '🇵🇦': '351 352 353 354 355 356 357 374',
    '🇵🇷': '358',
    '🇸🇻': '359',
    '🇵🇲': '361',
    '🇹🇹': '362',
    '🇹🇨': '364',
    '🇻🇬': '378',
    '🇻🇮': '379',
    '🇦🇫': '401',
    '🇸🇦': '403',
    '🇧🇩': '405',
    '🇧🇭': '408',
    '🇧🇹': '410',
    '🇹🇼': '416',
    '🇱🇰': '417',
    '🇮🇳': '419',
    '🇮🇷': '422',
    '🇦🇿': '423',
    '🇮🇶': '425',
    '🇮🇱': '428',
    '🇹🇲': '434',
    '🇰🇿': '436',
    '🇺🇿': '437',
    '🇯🇴': '438',
    '🇵🇸': '443',
    '🇰🇵': '445',
    '🇰🇼': '447',
    '🇱🇧': '450',
    '🇰🇬': '451',
    '🇲🇴': '453',
    '🇲🇻': '455',
    '🇲🇳': '457',
    '🇳🇵': '459',
    '🇴🇲': '461',
    '🇵🇰': '463',
    '🇶🇦': '466',
    '🇸🇾': '468',
    '🇹🇯': '472',
    '🇭🇰': '477',
    '🇧🇦': '478',
    '🇻🇨': '377',
    '🇫🇷': '501 329 347 540 546 578 607 618 635 660 745',
    '🇦🇺': '503 516 523',
    '🇲🇲': '506',
    '🇧🇳': '508',
    '🇫🇲': '510',
    '🇵🇼': '511',
    '🇳🇿': '512 542',
    '🇨🇰': '518',
    '🇫🇯': '520',
    '🇸🇬': '563 564 565 566',
    '🇮🇩': '525',
    '🇰🇮': '529',
    '🇱🇦': '531',
    '🇲🇾': '533',
    '🇲🇭': '538',
    '🇳🇷': '544',
    '🇵🇭': '548',
    '🇹🇱': '550',
    '🇵🇬': '553',
    '🇵🇳': '555',
    '🇸🇧': '557',
    '🇼🇸': '561',
    '🇹🇭': '567',
    '🇹🇴': '570',
    '🇹🇻': '572',
    '🇻🇳': '574',
    '🇿🇦': '601',
    '🇦🇴': '603',
    '🇩🇿': '605',
    '🇧🇮': '609',
    '🇧🇯': '610',
    '🇧🇼': '611',
    '🇨🇫': '612',
    '🇨🇲': '613',
    '🇨🇬': '615',
    '🇰🇲': '616 620',
    '🇨🇻': '617',
    '🇨🇮': '619',
    '🇩🇯': '621',
    '🇪🇬': '622',
    '🇪🇹': '624',
    '🇪🇷': '625',
    '🇬🇦': '626',
    '🇬🇭': '627',
    '🇬🇲': '629',
    '🇬🇼': '630',
    '🇬🇶': '631',
    '🇬🇳': '632',
    '🇧🇫': '633',
    '🇰🇪': '634',
    '🇸🇸': '638',
    '🇱🇾': '642',
    '🇱🇸': '644',
    '🇲🇺': '645',
    '🇲🇬': '647',
    '🇲🇱': '649',
    '🇲🇿': '650',
    '🇲🇷': '654',
    '🇲🇼': '655',
    '🇳🇪': '656',
    '🇳🇬': '657',
    '🇳🇦': '659',
    '🇷🇼': '661',
    '🇸🇩': '662',
    '🇸🇳': '663',
    '🇸🇨': '664',
    '🇸🇭': '608 665',
    '🇸🇴': '666',
    '🇸🇱': '667',
    '🇸🇹': '668',
    '🇸🇿': '669',
    '🇹🇩': '670',
    '🇹🇬': '671',
    '🇹🇳': '672',
    '🇹🇿': '674 677',
    '🇺🇬': '675',
    '🇨🇩': '676',
    '🇿🇲': '678',
    '🇿🇼': '679',
    '🇱🇷': '636',
    '🇦🇷': '701',
    '🇧🇷': '710',
    '🇧🇴': '720',
    '🇨🇱': '725',
    '🇨🇴': '730',
    '🇪🇨': '735',
    '🇫🇰': '740',
    '🇬🇾': '750',
    '🇵🇾': '755',
    '🇵🇪': '760',
    '🇸🇷': '765',
    '🇺🇾': '770',
    '🇻🇪': '775',
  }).flatMap(([flag, mids]) => {
    const countryCode = Array.from(flag, (character) =>
      String.fromCharCode(character.codePointAt(0) - 0x1f1e6 + 65)
    ).join('').toLowerCase()
    return mids.split(' ').map((mid) => [mid, countryCode])
  })
)
const COUNTRY_NAMES = {
  al: 'Albania',
  ad: 'Andorra',
  at: 'Austria',
  pt: 'Portugal',
  be: 'Belgium',
  by: 'Belarus',
  bg: 'Bulgaria',
  va: 'Vatican City',
  de: 'Germany',
  cy: 'Cyprus',
  ge: 'Georgia',
  md: 'Moldova',
  mt: 'Malta',
  am: 'Armenia',
  fi: 'Finland',
  fo: 'Faroe Islands',
  gi: 'Gibraltar',
  gr: 'Greece',
  hr: 'Croatia',
  ma: 'Morocco',
  hu: 'Hungary',
  it: 'Italy',
  ie: 'Ireland',
  is: 'Iceland',
  li: 'Liechtenstein',
  lu: 'Luxembourg',
  mc: 'Monaco',
  pl: 'Poland',
  me: 'Montenegro',
  ro: 'Romania',
  sk: 'Slovakia',
  sm: 'San Marino',
  ch: 'Switzerland',
  cz: 'Czech Republic',
  tr: 'Türkiye',
  ua: 'Ukraine',
  ru: 'Russia',
  mk: 'North Macedonia',
  lv: 'Latvia',
  ee: 'Estonia',
  lt: 'Lithuania',
  si: 'Slovenia',
  rs: 'Serbia',
  ai: 'Anguilla',
  us: 'United States',
  nl: 'Netherlands',
  aw: 'Aruba',
  bm: 'Bermuda',
  bs: 'Bahamas',
  bz: 'Belize',
  bb: 'Barbados',
  ca: 'Canada',
  ky: 'Cayman Islands',
  cr: 'Costa Rica',
  cu: 'Cuba',
  dm: 'Dominica',
  do: 'Dominican Republic',
  gd: 'Grenada',
  gl: 'Greenland',
  gt: 'Guatemala',
  hn: 'Honduras',
  ht: 'Haiti',
  jm: 'Jamaica',
  kn: 'Saint Kitts and Nevis',
  lc: 'Saint Lucia',
  mx: 'Mexico',
  ms: 'Montserrat',
  ni: 'Nicaragua',
  pa: 'Panama',
  pr: 'Puerto Rico',
  sv: 'El Salvador',
  pm: 'Saint Pierre and Miquelon',
  tt: 'Trinidad and Tobago',
  tc: 'Turks and Caicos Islands',
  vg: 'British Virgin Islands',
  vi: 'United States Virgin Islands',
  af: 'Afghanistan',
  sa: 'Saudi Arabia',
  bd: 'Bangladesh',
  bh: 'Bahrain',
  bt: 'Bhutan',
  tw: 'Taiwan',
  lk: 'Sri Lanka',
  in: 'India',
  ir: 'Iran',
  az: 'Azerbaijan',
  iq: 'Iraq',
  il: 'Israel',
  tm: 'Turkmenistan',
  kz: 'Kazakhstan',
  uz: 'Uzbekistan',
  jo: 'Jordan',
  ps: 'Palestine',
  kp: 'North Korea',
  kw: 'Kuwait',
  lb: 'Lebanon',
  kg: 'Kyrgyzstan',
  mo: 'Macao',
  mv: 'Maldives',
  mn: 'Mongolia',
  np: 'Nepal',
  om: 'Oman',
  pk: 'Pakistan',
  qa: 'Qatar',
  sy: 'Syria',
  tj: 'Tajikistan',
  hk: 'Hong Kong',
  ba: 'Bosnia and Herzegovina',
  vc: 'Saint Vincent and the Grenadines',
  fr: 'France',
  au: 'Australia',
  mm: 'Myanmar',
  bn: 'Brunei',
  fm: 'Micronesia',
  pw: 'Palau',
  nz: 'New Zealand',
  ck: 'Cook Islands',
  fj: 'Fiji',
  sg: 'Singapore',
  id: 'Indonesia',
  ki: 'Kiribati',
  la: 'Laos',
  my: 'Malaysia',
  mh: 'Marshall Islands',
  nr: 'Nauru',
  ph: 'Philippines',
  tl: 'Timor-Leste',
  pg: 'Papua New Guinea',
  pn: 'Pitcairn Islands',
  sb: 'Solomon Islands',
  ws: 'Samoa',
  th: 'Thailand',
  to: 'Tonga',
  tv: 'Tuvalu',
  vn: 'Vietnam',
  za: 'South Africa',
  ao: 'Angola',
  dz: 'Algeria',
  bi: 'Burundi',
  bj: 'Benin',
  bw: 'Botswana',
  cf: 'Central African Republic',
  cm: 'Cameroon',
  cg: 'Republic of the Congo',
  km: 'Comoros',
  cv: 'Cabo Verde',
  ci: "Côte d'Ivoire",
  dj: 'Djibouti',
  eg: 'Egypt',
  et: 'Ethiopia',
  er: 'Eritrea',
  ga: 'Gabon',
  gh: 'Ghana',
  gm: 'Gambia',
  gw: 'Guinea-Bissau',
  gq: 'Equatorial Guinea',
  gn: 'Guinea',
  bf: 'Burkina Faso',
  ke: 'Kenya',
  ss: 'South Sudan',
  ly: 'Libya',
  ls: 'Lesotho',
  mu: 'Mauritius',
  mg: 'Madagascar',
  ml: 'Mali',
  mz: 'Mozambique',
  mr: 'Mauritania',
  mw: 'Malawi',
  ne: 'Niger',
  ng: 'Nigeria',
  na: 'Namibia',
  rw: 'Rwanda',
  sd: 'Sudan',
  sn: 'Senegal',
  sc: 'Seychelles',
  sh: 'Saint Helena',
  so: 'Somalia',
  sl: 'Sierra Leone',
  st: 'São Tomé and Príncipe',
  sz: 'Eswatini',
  lr: 'Liberia',
  td: 'Chad',
  tg: 'Togo',
  tn: 'Tunisia',
  tz: 'Tanzania',
  ug: 'Uganda',
  cd: 'Democratic Republic of the Congo',
  zm: 'Zambia',
  zw: 'Zimbabwe',
  ar: 'Argentina',
  br: 'Brazil',
  bo: 'Bolivia',
  cl: 'Chile',
  co: 'Colombia',
  ec: 'Ecuador',
  fk: 'Falkland Islands',
  gy: 'Guyana',
  py: 'Paraguay',
  pe: 'Peru',
  sr: 'Suriname',
  uy: 'Uruguay',
  ve: 'Venezuela',
}
const BERTHS = [
  { number: 1, latitude: 41.65018029609214, longitude: 41.64925556545735 },
  { number: 2, latitude: 41.65053303263249, longitude: 41.65195923214436 },
  { number: 3, latitude: 41.650885767241405, longitude: 41.65431835138273 },
  { number: 4, latitude: 41.64982755762035, longitude: 41.65646542833763 },
  { number: 5, latitude: 41.648576923838924, longitude: 41.657366514489446 },
  { number: 6, latitude: 41.646684893253514, longitude: 41.65710829100909 },
  { number: 7, latitude: 41.64636420459651, longitude: 41.65419077901581 },
  { number: 8, latitude: 41.646684893253514, longitude: 41.65174349876704 },
  { number: 9, latitude: 41.646428342455614, longitude: 41.64908244125058 },
  { number: 10, latitude: 41.64821615958242, longitude: 41.64485732950579 },
  { number: 11, latitude: 41.65043683194939, longitude: 41.64439607885591 },
]

function createBerthIcon(number) {
  return L.divIcon({
    className: 'berth-map-icon',
    html: `<span style="display:block;color:#5d5fef;font:800 15px/1 Arial,sans-serif">${number}</span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

function createCbmIcon() {
  return L.divIcon({
    className: 'berth-map-icon',
    html: `<span style="display:block;color:#5d5fef;font:800 13px/1 Arial,sans-serif">CBM</span>`,
    iconSize: [34, 18],
    iconAnchor: [17, 9],
  })
}

function normalizeVesselName(name) {
  return String(name || '').trim().replace(/\s+/g, ' ').toUpperCase()
}

function getVesselKey(vessel) {
  const imo = String(vessel.imo ?? '').trim()
  if (imo) return `imo:${imo}`

  const mmsi = String(vessel.mmsi ?? '').trim()
  if (mmsi) return `mmsi:${mmsi}`

  return `name:${normalizeVesselName(vessel.shipName)}`
}

function getVesselCountryCode(mmsi) {
  const mid = String(mmsi ?? '').trim().slice(0, 3)
  return /^\d{3}$/.test(mid) ? MID_COUNTRY_CODES[mid] || '' : ''
}

export function getVesselCountryName(mmsi) {
  const countryCode = getVesselCountryCode(mmsi)
  return COUNTRY_NAMES[countryCode] || ''
}

function getVesselImo(vessel) {
  const imo = String(vessel.imo ?? '').trim()
  if (normalizeVesselName(vessel.shipName) === 'UNIMAR LIVESTOCK' && imo === '702182100') {
    return imo.slice(0, -2)
  }
  return imo
}

function hasCoordinates(vessel) {
  return vessel.latitude != null && vessel.longitude != null &&
    Number.isFinite(Number(vessel.latitude)) && Number.isFinite(Number(vessel.longitude))
}

function hasDistanceData(vessel) {
  return vessel.distanceKm != null && vessel.distanceKm !== '' &&
    Number.isFinite(Number(vessel.distanceKm))
}

function hasVesselType(type) {
  return type !== null && type !== undefined && type !== ''
}

function formatVesselType(type) {
  const stringType = String(type || '').trim()
  if (stringType.toLowerCase() === 'cargo - hazardous category 1') return 'Container Carrier'

  const code = Number(stringType)
  if (!Number.isFinite(code)) return stringType
  if (code === 0) return 'Other'
  if (code === 1) return 'Livestock Carrier'
  if (code === 60 || code === 69) return 'Ro-Ro'
  if (code === 70 || code === 79) return 'Bulker'
  if (code === 80 || code === 89) return 'Tanker'
  if (code === 71) return 'Container Carrier'
  if (code >= 72 && code <= 74) return `Cargo - hazardous category ${code - 70}`
  if (code >= 81 && code <= 84) return `Tanker - hazardous category ${code - 80}`
  return stringType
}

function getVesselMarkerColor(type) {
  const code = Number(type)
  if (Number.isFinite(code)) {
    if (code >= 80 && code <= 89) return '#d92d20'
    if (code === 60) return '#2563eb'
    return '#16a34a'
  }

  const normalizedType = String(type || '').toLowerCase()
  if (normalizedType.includes('tanker')) return '#d92d20'
  if (normalizedType.includes('ro-ro') || normalizedType.includes('roro')) return '#2563eb'
  return '#16a34a'
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

function createVesselIcon(shipName, shipType) {
  const iconName = String(shipName || 'Unknown vessel')
  const markerColor = getVesselMarkerColor(shipType)
  const cacheKey = `${iconName}:${markerColor}`
  const cachedIcon = vesselIconCache.get(cacheKey)
  if (cachedIcon) {
    vesselIconCache.delete(cacheKey)
    vesselIconCache.set(cacheKey, cachedIcon)
    return cachedIcon
  }

  const icon = L.divIcon({
    className: 'vessel-map-icon',
    html: `<span style="position:absolute;top:0;left:0;display:flex;align-items:center;gap:6px;white-space:nowrap;pointer-events:none"><i style="--marker-color:${markerColor};position:relative;display:block;flex:0 0 22px;width:22px;height:22px;border:2px solid #fff;border-radius:50%;background:${markerColor};box-shadow:0 1px 4px rgba(15,23,42,.45);pointer-events:auto"><span style="position:absolute;inset:1px;background:#fff;-webkit-mask:url('${boatIcon}') center/contain no-repeat;mask:url('${boatIcon}') center/contain no-repeat;z-index:1"></span></i><b class="vessel-map-label" style="pointer-events:none;background:rgba(17,24,39,.82);color:#fff;padding:4px 7px;border-radius:5px;font-size:13px;font-weight:700;line-height:1.1">${escapeHtml(iconName)}</b></span>`,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })

  vesselIconCache.set(cacheKey, icon)
  if (vesselIconCache.size > 100) {
    vesselIconCache.delete(vesselIconCache.keys().next().value)
  }
  return icon
}

const Map = ({ vessels, connectionState, lastUpdated, onVesselDismissed }) => {
  const { authReady, isAuthenticated } = useAdminAuth()
  const [selectedRadius, setSelectedRadius] = useState(2)
  const [dismissalsReady, setDismissalsReady] = useState(false)
  const [vesselToRemove, setVesselToRemove] = useState(null)
  const [removalError, setRemovalError] = useState('')
  const [isRemoving, setIsRemoving] = useState(false)
  const vesselsInRadius = vessels.filter((vessel) =>
    hasDistanceData(vessel) && Number(vessel.distanceKm) <= selectedRadius
  )
  const vesselsWithDistance = vesselsInRadius

  const confirmVesselRemoval = async () => {
    if (!vesselToRemove || isRemoving) return
    setIsRemoving(true)
    setRemovalError('')

    try {
      await dismissBatumiVessel(vesselToRemove)
      onVesselDismissed(vesselToRemove)
      setVesselToRemove(null)
    } catch {
      setRemovalError('გემის წაშლა ვერ მოხერხდა. სცადეთ ხელახლა.')
    } finally {
      setIsRemoving(false)
    }
  }

  useEffect(() => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith('oil-dashboard-vessel-cache-'))
      .forEach((key) => localStorage.removeItem(key))
  }, [])

  useEffect(() => {
    let active = true

    if (!authReady) return () => { active = false }

    if (!isAuthenticated) {
      setRemovalError('')
      setDismissalsReady(true)
      return () => { active = false }
    }

    setDismissalsReady(false)

    const migrateLegacyDismissals = async () => {
      let legacyIdentifiers = []
      try {
        const stored = JSON.parse(localStorage.getItem(DISMISSED_VESSELS_KEY) || '[]')
        if (Array.isArray(stored)) legacyIdentifiers = [...new Set(stored.map((value) => String(value).trim()).filter(Boolean))]
      } catch {
        localStorage.removeItem(DISMISSED_VESSELS_KEY)
      }

      try {
        for (const identifier of legacyIdentifiers) {
          const vessel = /^\d{9}$/.test(identifier) ? { mmsi: identifier } : { shipName: identifier }
          await dismissBatumiVessel(vessel)
        }
        localStorage.removeItem(DISMISSED_VESSELS_KEY)
        if (active) setRemovalError('')
      } catch {
        if (active) setRemovalError('წაშლილი გემების სიის სინქრონიზაცია ვერ მოხერხდა. განაახლეთ გვერდი.')
      } finally {
        if (active) setDismissalsReady(true)
      }
    }

    migrateLegacyDismissals()
    return () => { active = false }
  }, [authReady, isAuthenticated])

  return (
    <Container>
      <Aside>
        <RadiusControls>
          <RadiusButton
            active={selectedRadius === 2}
            onClick={() => setSelectedRadius(2)}
            type="button"
          >
            2 km
          </RadiusButton>
          <RadiusButton
            active={selectedRadius === 20}
            onClick={() => setSelectedRadius(20)}
            type="button"
          >
            20 km
          </RadiusButton>
        </RadiusControls>

        <StatusRow>
          <StatusDot state={connectionState} />
          <StatusLabel>
            {connectionState === 'live' ? 'Live' : connectionState === 'offline' ? 'Offline' : 'Connecting...'}
          </StatusLabel>
        </StatusRow>
        <StatusText>{lastUpdated ? `ბოლო განახლება: ${lastUpdated}` : 'Waiting for data...'}</StatusText>
        <StatusText>{`გემების რაოდენობა: ${vesselsWithDistance.length}`}</StatusText>

        {!dismissalsReady ? (
          <EmptyState>{removalError || 'Checking previously removed vessels...'}</EmptyState>
        ) : vesselsWithDistance.length === 0 ? (
          <EmptyState>
            {vessels.length === 0 ? 'No live AIS data received for this radius.' : 'No vessels within this radius.'}
          </EmptyState>
        ) : (
          vesselsWithDistance.map((vessel) => (
            <VesselCard key={getVesselKey(vessel)}>
              <img src={ship} alt="ship" />
              <div>
                <strong>
                  {getVesselCountryCode(vessel.mmsi) && (
                    <CountryFlag
                      src={`https://flagcdn.com/w40/${getVesselCountryCode(vessel.mmsi)}.png`}
                      alt=""
                      title={COUNTRY_NAMES[getVesselCountryCode(vessel.mmsi)] || 'Unknown country'}
                    />
                  )}
                  {vessel.shipName}
                </strong>
                {getVesselImo(vessel) && <p>IMO: {getVesselImo(vessel)}</p>}
                <p>Distance: {vessel.distanceKm ?? 'N/A'} km</p>
                {hasVesselType(vessel.shipType) && <p>Type: {formatVesselType(vessel.shipType)}</p>}
              </div>
              {isAuthenticated && (
                <RemoveButton
                  type="button"
                  disabled={isRemoving}
                  onClick={() => setVesselToRemove(vessel)}
                  aria-label={`წაშლა: ${vessel.shipName}`}
                  title={`წაშლა: ${vessel.shipName}`}
                >
                  🗑
                </RemoveButton>
              )}
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

          {BERTHS.map((berth) => (
            <LeafletMarker
              key={`berth-${berth.number}`}
              position={[berth.latitude, berth.longitude]}
              icon={createBerthIcon(berth.number)}
              interactive={false}
              zIndexOffset={1000}
            />
          ))}

          <LeafletMarker
            position={[41.651591230664856, 41.64852365727373]}
            icon={createCbmIcon()}
            interactive={false}
            zIndexOffset={1001}
          />

          {vesselsInRadius.filter(hasCoordinates).map((vessel) => (
            <LeafletMarker
              key={getVesselKey(vessel)}
              position={[vessel.latitude, vessel.longitude]}
              icon={createVesselIcon(vessel.shipName, vessel.shipType)}
            >
              <Popup>
                <strong>{vessel.shipName}</strong>
                <br />
                {getVesselImo(vessel) && <>IMO: {getVesselImo(vessel)}<br /></>}
                Distance: {vessel.distanceKm ?? 'N/A'} km
                {hasVesselType(vessel.shipType) && <><br />Type: {formatVesselType(vessel.shipType)}</>}
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
            {removalError && <ModalText role="alert">{removalError}</ModalText>}
            <ModalActions>
              <CancelButton type="button" disabled={isRemoving} onClick={() => setVesselToRemove(null)}>
                გაუქმება
              </CancelButton>
              {isAuthenticated && (
                <ConfirmButton type="button" disabled={isRemoving} onClick={confirmVesselRemoval}>
                  {isRemoving ? 'ინახება...' : 'წაშლა'}
                </ConfirmButton>
              )}
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;

  @media (max-width: 640px) {
    height: 65vh;
    gap: 0.8rem;
    align-items: stretch;
  }
`

const Aside = styled.div`
  width: 25%;
  min-width: 0;
  background-color: white;
  padding: 1rem;

  @media (max-width: 640px) {
    width: auto;
    flex: 0 0 40%;
    height: 100%;
    padding: 0.8rem;
    overflow-y: auto;
  }
`

const VesselCard = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;

  > img {
    width: 24px;
    height: 24px;
    flex: 0 0 24px;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  strong {
    font-size: 15px;
    line-height: 1.2;
    overflow-wrap: anywhere;
  }

  p {
    margin: 0;
    font-size: 12px;
    color: #555;
    overflow-wrap: anywhere;
  }

  @media (max-width: 640px) {
    align-items: flex-start;
    gap: 4px;
    padding: 8px 0;

    img {
      width: 18px;
      height: 18px;
      flex-basis: 18px;
    }

    strong {
      font-size: 12px;
    }

    p {
      font-size: 10px;
    }
  }
`

const CountryFlag = styled.img`
  width: 16px;
  height: 11px;
  flex: 0 0 16px;
  margin-right: 5px;
  object-fit: cover;
  vertical-align: middle;
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

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media (max-width: 640px) {
    flex: 0 0 auto;
    padding: 4px;
    font-size: 14px;
  }
`

const RadiusControls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 12px;

  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: 4px;
  }
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

  @media (max-width: 640px) {
    padding: 6px 8px;
  }

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
  position: relative;
  isolation: isolate;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ state }) => state === 'live' ? '#1db954' : state === 'offline' ? '#d93025' : '#f59e0b'};
  box-shadow: 0 0 0 4px rgba(0,0,0,0.05);

  ${({ state }) => state === 'live' && `
    &::before,
    &::after {
      position: absolute;
      inset: 0;
      z-index: -1;
      border: 1px solid #1db954;
      border-radius: 50%;
      content: '';
      animation: live-status-pulse 2s ease-out infinite;
    }

    &::after {
      animation-delay: 1s;
    }

    @keyframes live-status-pulse {
      from {
        transform: scale(1);
        opacity: 0.7;
      }
      to {
        transform: scale(3);
        opacity: 0;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      &::before,
      &::after {
        animation: none;
      }
    }
  `}
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
  min-width: 0;
  height: 100vh;
  background-color: gainsboro;

  @media (max-width: 640px) {
    width: auto;
    flex: 1 1 0;
    height: 100%;
  }
`

const LiveMap = styled(MapContainer)`
  width: 100%;
  height: 100%;

  && .leaflet-popup-content {
    min-width: 180px;
    margin: 12px 16px;
    font-size: 14px;
    line-height: 1.5;
  }

  && .leaflet-popup-content * {
    font-size: 14px;
  }

  && .leaflet-popup-close-button {
    width: 28px;
    height: 28px;
    font-size: 22px;
    line-height: 26px;
  }

  && .leaflet-popup-close-button:hover {
    color: #d92d20;
  }
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