import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; 

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    mapRef.current = L.map("map", {
      center: [41.317136, 69.302056],
      zoom: 15,
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(mapRef.current);

    L.marker([41.317136, 69.302056])
      .addTo(mapRef.current)
      .bindPopup("Sergeli 5-bekat");

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div id="map" className="footer__main-map__frame" />;
};

export default MapComponent;
