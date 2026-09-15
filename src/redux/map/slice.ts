import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapState, ReduxPolygon } from "./types";

const initialState: MapState = {
  selectedPolygon: null,
  map: {
    title: "Untitled Map",
  },
  polygons: [],
};

const mapSlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setMapName(state, action: PayloadAction<string>) {
      if (action.payload.trim() === "") {
        state.map.title = "Untitled Map";
      }
      state.map.title = action.payload;
    },
    setSelectedPolygon(state, action: PayloadAction<ReduxPolygon>) {
      state.selectedPolygon = action.payload;
    },
    setPolygon(state, action: PayloadAction<ReduxPolygon>) {
      state.polygons = [...state.polygons, action.payload];
    },
    updatePolygon(state, action: PayloadAction<ReduxPolygon>) {
      const foundPolygonIndex = state.polygons.findIndex(
        (polygon) => polygon.id === action.payload.id
      );
      if (foundPolygonIndex !== -1) {
        state.polygons = state.polygons.map((polygon) =>
          polygon.id === action.payload.id ? action.payload : polygon
        );
      }
    },
    deletePolygon(state, action: PayloadAction<string>) {
      state.polygons = state.polygons.filter(
        (polygon) => polygon.id !== action.payload
      );
    },
  },
});

export const {
  setMapName,
  setSelectedPolygon,
  setPolygon,
  updatePolygon,
  deletePolygon,
} = mapSlice.actions;

export default mapSlice.reducer;
