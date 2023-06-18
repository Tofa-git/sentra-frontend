"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const DynamicMap = ({ height }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (!mapRef.current) {
        // Initialize map
        const map = L.map("map").setView([-6.1375739, 106.8120477], 13);

        // Add tile layer
        L.tileLayer(
          "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
          {
            attribution: "Map data © OpenStreetMap contributors",
          }
        ).addTo(map);

        // Initialize geosearch provider
        const provider = new OpenStreetMapProvider();

        // Add geosearch control to the map
        const searchControl = new GeoSearchControl({
          provider: provider,
          showMarker: true,
          showPopup: false,
          marker: {
            icon: new L.Icon.Default(),
          },
          onEachFeature: (feature) => {
            // Log the lat lng when marker icon is clicked
            feature.marker.on("click", () => {
              console.log(feature.properties.latlng);
            });
          },
        });

        map.addControl(searchControl);

        mapRef.current = map;
      }
    }, 3000);
  }, []);

  return <div id="map" style={{ height: height || "400px" }} />;
};

export default DynamicMap;
