import { LatLng } from 'leaflet';

const closeRing = (ring: LatLng[]): LatLng[] => {
  if (ring.length === 0) return ring;
  const first = ring[0];
  const last = ring[ring.length - 1];
  return last.equals(first) ? ring : [...ring, first];
};

export const ClosePolygon = (
  input: LatLng[] | LatLng[][] | LatLng[][][],
): LatLng[] | LatLng[][] | LatLng[][][] => {
  if (input.length === 0) return input;

  if (input[0] instanceof LatLng) {
    return closeRing(input as LatLng[]);
  }

  if (Array.isArray(input[0]) && (input[0] as LatLng[])[0] instanceof LatLng) {
    return (input as LatLng[][]).map(closeRing);
  }

  if (
    Array.isArray(input[0]) &&
    Array.isArray((input[0] as any)[0]) &&
    (input[0] as any)[0][0] instanceof LatLng
  ) {
    return (input as LatLng[][][]).map((polygon) => polygon.map(closeRing));
  }

  throw new Error('Unsupported LatLng structure passed to ClosePolygon.');
};
