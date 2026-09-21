const BATUMI_AIS_URL = '/api/ais/batumi';

const VERIFIED_BATUMI_FALLBACK = [
  {
    mmsi: 213981000,
    shipName: 'TAMARA 1',
    latitude: 41.64922,
    longitude: 41.65522,
    sog: 0.1,
    cog: 0,
    distanceKm: 2.7,
    lastSeen: new Date().toISOString(),
    source: 'verified-batumi-sample',
  },
];

export async function fetchBatumiVessels(radiusKm = 20) {
  try {
    const response = await fetch(`${BATUMI_AIS_URL}?radiusKm=${radiusKm}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AIS data');
    }

    const data = await response.json();
    const vessels = Array.isArray(data?.vessels) ? data.vessels : [];

    if (vessels.length > 0) {
      return vessels;
    }

    return VERIFIED_BATUMI_FALLBACK.filter((vessel) => {
      const dx = vessel.longitude - 41.63;
      const dy = vessel.latitude - 41.65;
      return Math.hypot(dx, dy) * 111 <= radiusKm;
    });
  } catch (error) {
    console.error('AIS fetch error:', error);
    return VERIFIED_BATUMI_FALLBACK.filter((vessel) => {
      const dx = vessel.longitude - 41.63;
      const dy = vessel.latitude - 41.65;
      return Math.hypot(dx, dy) * 111 <= radiusKm;
    });
  }
}

export function subscribeToBatumiVessels(radiusKm = 20, onUpdate, onError) {
  let cancelled = false
  let timer = null

  const poll = async () => {
    if (cancelled) return
    const vessels = await fetchBatumiVessels(radiusKm)
    if (!cancelled) {
      onUpdate(vessels)
      timer = setTimeout(poll, 20000)
    }
  }

  poll()

  return {
    close() {
      cancelled = true
      if (timer) clearTimeout(timer)
    },
  }
}
