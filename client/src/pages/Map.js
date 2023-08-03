import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



const Map = () => {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Function to fetch user's location using the geolocation API
        const getUserLocation = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation([position.coords.latitude, position.coords.longitude]);
                    },
                    (error) => {
                        console.error('Error getting user location:', error.message);
                    }
                );
            } else {
                console.warn('Geolocation is not available in this browser.');
            }
        };

        // Call the function to get user's location
        getUserLocation();
    }, []);

    return (
        <>
            <h1>Paranormal sightings map</h1>
            <MapContainer center={userLocation || [45.4, -75.7]} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
        </>

    );
};

export default Map;
