import React from 'react';
import { Map as LeafletMap, TileLayer } from  'react-leaflet';
import './Map.css';
import { showDataOnMap } from '../util/util';
import Aos from "aos";
import "aos/dist/aos.css";

function Map({ countries, casesType, center, zoom }) {
    Aos.init({duration:2000});
    return (
        <div className="map" data-aos="flip-down" data-aos-once="true">
            <LeafletMap
             center ={center}
             zoom={zoom}
             >
                <TileLayer
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution='&copy; 
                    <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                 {showDataOnMap(countries, casesType)}
            </LeafletMap>
        </div>
    );
}

export default Map;