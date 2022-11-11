import React, { FC } from "react";
import { MAP_BOX_KEY } from "../utils";
import Map, {Marker} from 'react-map-gl';

interface MapProps{
    lat:   number |undefined
    lng: number |undefined
}
const MyMap:FC<MapProps>= (props):JSX.Element =>{
  
  

  
  return (

    <Map initialViewState={{
      longitude:  props.lng || 4.9041 ,
      latitude:   props.lat || 52.3676,
      zoom: 7
    }}
      style={{ width: '95%', margin: '0 auto', height: '45vh' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAP_BOX_KEY}
    >
      <Marker longitude={props?.lng} latitude={props?.lat} anchor='center'/>
        
      
    </Map>
  );
}
export default MyMap;
