import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './Map.css'
import { showDataonMap } from './utils'
function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {showDataonMap(countries, casesType)}
            </LeafletMap>
        </div>
    )
}

export default Map