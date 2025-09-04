import type { Polygon, MultiPolygon } from 'geojson';

export type ReduxPolygon = {
  id: string;
  keyId: string;
  title: string;
  color: string;
  geometry: Polygon | MultiPolygon;
};

export interface MapState {
  selectedPolygon: ReduxPolygon | null;
  map: {
    title: string;
  };
  polygons: ReduxPolygon[];
}
