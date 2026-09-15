import { RootState } from '../store';

export const selectSelectedPolygon = (state: RootState) =>
  state.mapReducer.selectedPolygon;

export const selectMapTitle = (state: RootState) => state.mapReducer.map.title;

export const selectPolygons = (state: RootState) => state.mapReducer.polygons;

export const selectMapData = (state: RootState) => state.mapReducer;
