import L from 'leaflet';
import { MapContainer } from 'react-leaflet';

import { PolygonEditorContent } from '../components';

import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

export const PolygonEditor = () => {
  const cityCenter = L.latLng([51.5072, -0.1276]);

  return (
    <div id="mapContainer">
      <MapContainer
        center={cityCenter}
        zoom={8}
        style={{ height: '100vh', width: '100%' }}
        zoomControl={false}
      >
        <PolygonEditorContent />
      </MapContainer>
    </div>
  );
};
