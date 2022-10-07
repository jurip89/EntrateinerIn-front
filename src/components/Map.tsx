import React, { useRef, useEffect, useState, FC } from "react";
import { MAP_BOX_KEY } from "../utils";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = MAP_BOX_KEY;
interface MapProps{
    lat:   number |undefined
    lng: number |undefined
}
const MyMap:FC<MapProps>= (props):JSX.Element =>{
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  const [zoom, setZoom] = useState<number>(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [props.lng ||0, props.lat || 0],
      zoom: zoom,
    });
  });
  return (
    <div className="w-full rounded-lg">
      <div ref={mapContainer} className="w-full h-96 " />
    </div>
  );
}
export default MyMap;
