import type { Geometry } from 'geojson';
import L from 'leaflet';

export const GeoJSONtoLatLng = (geometry: Geometry) => {
  const layer = L.geoJSON(geometry).getLayers()[0];
  const latLngs = (layer as L.Polygon).getLatLngs();
  return latLngs;
};
