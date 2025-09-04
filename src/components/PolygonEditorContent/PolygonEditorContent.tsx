import { FeatureGroup, TileLayer, useMap, ZoomControl } from "react-leaflet";
import { GeomanControls } from "react-leaflet-geoman-v2";
import { LeafletEvent } from "leaflet";
import { useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ReduxPolygon } from "../../redux/map/types";
import {
  setPolygon,
  deletePolygon,
  updatePolygon,
} from "../../redux/map/slice";
import { selectMapData } from "../../redux/map/selectors";

import { MyPolygon } from "../MyPolygon/MyPolygon";
import { SideBar } from "../SideBar/SideBar";

import { LatLngtoGeoJSON, ClosePolygon } from "../../utils";
import L from "leaflet";

export const PolygonEditorContent = () => {
  const dispatch = useDispatch();
  const mapData = useSelector(selectMapData);

  const map = useMap();
  const drawnItems = useRef<L.FeatureGroup | null>(null);

  const handlePolygonCreate = useCallback(
    (event: LeafletEvent) => {
      const newLayer = event.layer;

      const newPolygon: ReduxPolygon = {
        id: crypto.randomUUID(),
        keyId: crypto.randomUUID(),
        title: "Untitled Polygon",
        color: "#FFFFFF",
        geometry: LatLngtoGeoJSON(ClosePolygon(newLayer.getLatLngs())),
      };

      dispatch(setPolygon(newPolygon));

      map.removeLayer(newLayer);
    },
    [dispatch]
  );

  const handlePolygonEdit = useCallback(
    (event: LeafletEvent) => {
      const { layer } = event;

      if (layer.getLatLngs()[0].length < 3) {
        dispatch(deletePolygon(layer.options.polygonId));
      }
    },
    [dispatch]
  );

  const handlePolygonUpdate = useCallback(
    (event: LeafletEvent) => {
      const { layer } = event;

      if (layer) {
        dispatch(
          updatePolygon({
            id: layer.options.polygonId,
            keyId: layer.options.keyId,
            title: layer.options.title,
            color: layer.options.color,
            geometry: LatLngtoGeoJSON(ClosePolygon(layer.getLatLngs())),
          })
        );
      }
    },
    [dispatch]
  );

  const handlePolygonCut = useCallback(
    (event: LeafletEvent) => {
      const { layer } = event;

      dispatch(
        updatePolygon({
          id: layer.options.polygonId,
          keyId: layer.options.keyId,
          title: layer.options.title,
          color: layer.options.color,
          geometry: LatLngtoGeoJSON(ClosePolygon(layer.getLatLngs())),
        })
      );
    },
    [dispatch]
  );

  const handlePolygonRemove = useCallback(
    (event: LeafletEvent) => {
      const { layer } = event;

      dispatch(deletePolygon(layer.options.polygonId));
    },
    [dispatch]
  );

  const flyToPolygon = (polygon: ReduxPolygon) => {
    let polygonBounds;
    map.eachLayer((layer) => {
      if (layer instanceof L.Polygon) {
        if (layer.options.polygonId === polygon.id) {
          polygonBounds = layer.getBounds();
        }
      }
    });
    if (polygonBounds) {
      map.flyToBounds(polygonBounds, { padding: [50, 50] });
    }
  };

  useEffect(() => {
    console.log("polygons: ", mapData.polygons);
  }, [mapData.polygons]);

  useEffect(() => {
    if (mapData.selectedPolygon) {
      flyToPolygon(mapData.selectedPolygon);
    }
  }, [mapData.selectedPolygon]);

  useEffect(() => {
    map?.on("pm:create", handlePolygonCreate);
    map?.on("pm:cut", handlePolygonCut);

    return () => {
      map?.off("pm:create", handlePolygonCreate);
      map?.off("pm:cut", handlePolygonCut);
    };
  }, [map, handlePolygonCreate, handlePolygonCut]);

  return (
    <>
      <ZoomControl position="bottomright" />

      <FeatureGroup ref={drawnItems}>
        {mapData.polygons.map((polygon: ReduxPolygon) => (
          <MyPolygon
            key={polygon.keyId}
            polygon={polygon}
            editEvent={handlePolygonEdit}
            updateEvent={handlePolygonUpdate}
            removeEvent={handlePolygonRemove}
          />
        ))}
      </FeatureGroup>

      <GeomanControls
        options={{
          drawCircle: false,
          drawMarker: false,
          drawPolygon: true,
          drawPolyline: false,
          drawRectangle: false,
          drawText: false,
          drawCircleMarker: false,
          cutPolygon: true,
          editMode: true,
          position: "topright",
          rotateMode: false,
          dragMode: false,
          deleteLayer: true,
        }}
        globalOptions={{
          limitMarkersToViewport: true,
          limitMarkersToCount: 1,
          limitMarkersToZoom: 10,
          allowSelfIntersection: true,
          continueDrawing: false,
          snappable: true,
          layerGroup: drawnItems.current ?? undefined,
        }}
      />

      <SideBar mapName={mapData.map.title} polygons={mapData.polygons} />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </>
  );
};
