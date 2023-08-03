import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    // const [userLocation, setUserLocation] = useState(null);

    // useEffect(() => {
    //     // Function to fetch user's location using the geolocation API
    //     const getUserLocation = () => {
    //         if ('geolocation' in navigator) {
    //             navigator.geolocation.getCurrentPosition(
    //                 (position) => {
    //                     setUserLocation([position.coords.latitude, position.coords.longitude]);
    //                 },
    //                 (error) => {
    //                     console.error('Error getting user location:', error.message);
    //                 }
    //             );
    //         } else {
    //             console.warn('Geolocation is not available in this browser.');
    //         }
    //     };

    //     // Call the function to get user's location
    //     getUserLocation();
    // }, []);
    const handleMapClick = (event) => {
        const { lat, lng } = event.latlng;
        const pinLocation = { lat, lng };
        // Save 'pinLocation' or send it to the back end.
      };

    return (
        <>
            <h1>Paranormal sightings map</h1>
            {/* <MapContainer center={userLocation || [45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
            <MapContainer center={latlng} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer> */}
            <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </>

    );
};

export default Map;
