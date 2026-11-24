import type { Place } from '@/types/plan';

// Photon is a free, keyless search over OpenStreetMap. It is a stand-in for the preview:
// before launch, swap this one function for Google Places or Mapbox called from the backend.
type PhotonFeature = {
  geometry: { coordinates: [number, number] };
  properties: { osm_id: number; osm_type: string; name?: string; housenumber?: string; street?: string; city?: string; state?: string };
};

export async function searchPlaces(query: string, signal: AbortSignal): Promise<Place[]> {
  const response = await fetch(`https://photon.komoot.io/api/?limit=5&lang=en&q=${encodeURIComponent(query)}`, { signal });
  if (!response.ok) throw new Error(`Place search failed (${response.status})`);
  const data = (await response.json()) as { features: PhotonFeature[] };

  const places = data.features.map(({ geometry, properties: p }) => {
    const street = [p.housenumber, p.street].filter(Boolean).join(' ');
    return {
      id: `${p.osm_type}${p.osm_id}`,
      name: p.name ?? street ?? query,
      address: [street, p.city, p.state].filter(Boolean).join(', '),
      latitude: geometry.coordinates[1],
      longitude: geometry.coordinates[0],
    };
  });
  // The search can return the same place twice; keep the first so every result has a unique id.
  return places.filter((place, index) => places.findIndex(other => other.id === place.id) === index);
}
