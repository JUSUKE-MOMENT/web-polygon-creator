import "leaflet";
import "leaflet.pm";

declare module "leaflet" {
  interface PathOptions {
    keyId?: string;
    polygonId?: string;
    title?: string;
  }
}

declare module "leaflet" {
  interface Map {
    pm: {
      addControls(options?: any): void;
      enableLayer(layer: L.Layer): void;
    };
  }
}
