import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


import classIII from '../customIcons/classIII.png';
import bustin from '../customIcons/bustin.png';

import { ADD_PIN } from '../utils/mutations';
import { QUERY_PINS } from '../utils/queries';

const classIIIPin = L.icon({
    iconUrl: classIII,
    iconSize: [60, 60],
    iconAnchor: [20, 42],
});

const ghostBustin = L.icon({
    iconUrl: bustin,
    iconSize: [60, 50],
    iconAnchor: [20, 42],
});

function MapMarkers({ saveMarkers }) {
    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;
            const title = prompt("Enter a title for this marker:");
            if (title) {
                const newMarker = { coords: [lat, lng], title };
                saveMarkers(newMarker);
            }
        },
    });

    return null;
}

function Map() {
    const [pins, setPins] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const { loading, data } = useQuery(QUERY_PINS);
    const [addPin] = useMutation(ADD_PIN);

    useEffect(() => {
        if (!loading && data) {
            setPins(data.pins);
            console.log("DATA.PINS:", data.pins);
        }
    }, [data, loading]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setUserLocation([40.7196, -74.0066]); // Set default location
                }
            );
        } else {
            console.error('Geolocation is not supported.');
            setUserLocation([40.7196, -74.0066]); // Set default location
        }


    }, []);

    const saveMarkers = async (newMarker) => {
        try {
            const { data } = await addPin({
                variables: {
                    pinLat: newMarker.coords[0],
                    pinLon: newMarker.coords[1],
                    pinTitle: newMarker.title,
                },
            });
            console.log('Response Data:', data);
            setPins((prevPins) => [...prevPins, newMarker]);
        } catch (error) {
            console.error('Error saving pin:', error);
        }
    };

    const defaultCenter = [40.7196, -74.0066];

    return (
        <div>
            {userLocation ? (
                <MapContainer
                    className="Map"
                    center={userLocation || defaultCenter}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: "100vh" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {pins &&
                        pins.map((pin, index) =>
                            pin.pinLat ? ( // Check if the coords property exists
                                <Marker key={index} position={[pin.pinLat, pin.pinLon]} icon={classIIIPin}>
                                    <Popup>
                                        Marker at {pin.pinLon}, {pin.pinLat}
                                        <br />
                                        Comment: {pin.pinTitle}
                                        {/* more stuff! */}
                                    </Popup>
                                </Marker>
                            ) : null // If coords property doesn't exist, skip rendering the Marker
                        )}
                    <MapMarkers saveMarkers={saveMarkers} />
                    {/* Ghostbusters HQ marker, Do not change */}
                    <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
                </MapContainer>
            ) : (
                <p>Loading Map</p>
            )}
        </div>
    );
}

export default Map;