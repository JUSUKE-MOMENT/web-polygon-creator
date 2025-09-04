import L, { LatLngExpression } from 'leaflet';

export const LatLngtoGeoJSON = (
  latLngs: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][],
) => {
  const tempLayer = L.polygon(latLngs);
  const geojson = tempLayer.toGeoJSON();
  return geojson.geometry;
};
