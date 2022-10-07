import React, { useRef, useEffect, useState, FC } from "react";
import { MAP_BOX_KEY } from "../utils";
import Map, {Marker} from 'react-map-gl';


interface MapProps{
    lat:   number |undefined
    lng: number |undefined
}
const MyMap:FC<MapProps>= (props):JSX.Element =>{
  
  
  const [zoom, setZoom] = useState<number>(9);
  
  return (

    <Map initialViewState={{
      longitude: props?.lng,
      latitude: props?.lat,
      zoom: zoom
    }}
      style={{ width: '95%', margin: '0 auto', height: '28vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAP_BOX_KEY}
    >
      <Marker longitude={props?.lng} latitude={props?.lat} anchor='center'/>
        
      
    </Map>
  );
}
export default MyMap;
