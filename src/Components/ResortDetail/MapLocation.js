import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useEffect, useRef } from 'react';
import { Icon } from 'leaflet';
import image from "../../Images/gps.png";

export default function MapLocation({ resort }) {

    const { property } = resort;
    const { geoLocation } = property;
    const location = [Number(geoLocation.lat), Number(geoLocation.lng)]

    const mapRef = useRef(null);
    const position = Array.isArray(location) && location.length === 2 ? location : [12.9716, 77.5946];

    const customIcon = new Icon({
        iconUrl: image,
        iconSize: [38, 38]
    });

    useEffect(() => {
        const map = mapRef.current;
        if (map && location && Array.isArray(location) && location.length === 2) {
            map.setView(position);
        }
    }, [location]);

    return (
        <>
            <h4>Where you will be</h4>
            <MapContainer style={{ height: "400px", width: "90%", margin:"auto"}}
                ref={mapRef}
                center={position}
                zoom={15}
                scrollWheelZoom={false}
            >
                <TileLayer
                    url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                    attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a> contributors'
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        {resort.property.propertyName}
                    </Popup>
                </Marker>
            </MapContainer>
        </>
    )
}
