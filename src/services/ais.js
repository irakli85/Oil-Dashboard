const BATUMI_AIS_URL = '/api/ais/batumi';

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
    return Array.isArray(data?.vessels) ? data.vessels : [];
  } catch (error) {
    console.error('AIS fetch error:', error);
    return [];
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
