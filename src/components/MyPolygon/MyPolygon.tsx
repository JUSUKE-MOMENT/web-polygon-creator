import { Polygon } from 'react-leaflet';
import L, { LeafletEvent } from 'leaflet';

import { useEffect, useRef } from 'react';

import { GeoJSONtoLatLng } from '../../utils';
import { ReduxPolygon } from '../../redux/map/types';

type Props = {
  polygon: ReduxPolygon;
  editEvent: (event: LeafletEvent) => void;
  updateEvent: (event: LeafletEvent) => void;
  removeEvent: (event: LeafletEvent) => void;
};

export const MyPolygon = ({
  polygon,
  editEvent,
  updateEvent,
  removeEvent,
}: Props) => {
  const ref = useRef<L.Polygon>(null);

  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;

    const hasEdit = typeof editEvent === 'function';
    const hasUpdate = typeof updateEvent === 'function';
    const hasRemove = typeof removeEvent === 'function';

    if (hasEdit) layer.on('pm:edit', editEvent);
    if (hasUpdate) layer.on('pm:update', updateEvent);
    if (hasRemove) layer.on('pm:remove', removeEvent);

    return () => {
      if (hasEdit) layer.off('pm:edit', editEvent);
      if (hasUpdate) layer.off('pm:update', updateEvent);
    };
  }, [polygon.id, editEvent, updateEvent]);

  useEffect(() => {
    const layer = ref.current;
    if (!layer) return;

    layer.setLatLngs(GeoJSONtoLatLng(polygon.geometry));
    layer.setStyle({ color: polygon.color });
  }, [polygon.geometry, polygon.color]);

  return (
    <Polygon
      ref={ref}
      positions={GeoJSONtoLatLng(polygon.geometry)}
      pathOptions={{
        polygonId: polygon.id,
        keyId: polygon.keyId,
        title: polygon.title,
        color: polygon.color,
      }}
    />
  );
};
