import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

import icon from "./constants";

// Cordinates of Marcillac
const center = [-6.2297401, 106.7469455];
const purpleOptions = { color: "white" };

function LeafletgeoSearch() {
  const map = useMap();
  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      showMarker: true,
      showPopup: false,
      marker: {
        icon,
      },
    });

    map.addControl(searchControl);
    map.on("geosearch/showlocation", (event) => {
      console.log(event);
    });

    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

const MapWrapper = () => {
  return (
    <div id="mapid">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "30vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletgeoSearch />
      </MapContainer>
    </div>
  );
};

export default MapWrapper;
