import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Auth from '../utils/auth';
import OffCanvas from '../components/OffCanvas';
import FormModal from '../components/NewPinModal';
import RemovePin from '../components/RemovePins';
import AuthModals from '../components/AuthModals';

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
    const [openForm, setOpenForm] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
    });
    const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
    const [clickCoordinates, setClickCoordinates] = useState({ lat: 0, lng: 0 });
    const [showModal, setShowModal] = useState(false);

    useMapEvents({
        click: (e) => {
            const { lat, lng } = e.latlng;

            if (!Auth.loggedIn()) {
                setShowModal(true);
            } else if (!openForm) {
                setFormValues({
                    title: '',
                    description: '',
                    lat: lat,
                    lng: lng,
                });
                setClickPosition({ x: e.originalEvent.clientX, y: e.originalEvent.clientY });
                setClickCoordinates({ lat, lng });
                setOpenForm(true);
                console.log("click coords:", clickCoordinates);
            }
        },
    });

    const handleFormSubmit = (values) => {
        saveMarkers(values);
        setOpenForm(false);
    };

    return (
        <>
            {openForm && (
                <FormModal
                    openForm={openForm}
                    onClose={() => setOpenForm(false)}
                    onSubmit={handleFormSubmit}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    position={clickPosition}
                    coordinates={clickCoordinates}
                />
            )}
            <AuthModals showModal={showModal} setShowModal={setShowModal} />
        </>
    );
}


function Map() {
    const [pins, setPins] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    const { loading, data, refetch } = useQuery(QUERY_PINS);
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
                    setUserLocation([40.7196, -74.0066]);
                }
            );
        } else {
            console.error('Geolocation is not supported.');
            setUserLocation([40.7196, -74.0066]);
        }
    }, []);

    const saveMarkers = async (formValues) => {
        try {
            const { data } = await addPin({
                variables: {
                    pinLat: formValues.lat,
                    pinLon: formValues.lng,
                    pinTitle: formValues.title,
                    pinText: formValues.description,
                },
            });
            console.log('Response Data:', data);
            refetch();
        } catch (error) {
            console.error('Error saving pin:', error);
        }
    };
    

    const defaultCenter = [40.7196, -74.0066];

    return (
        <div>
            <OffCanvas />
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
                            pin.pinLat ? (
                                <Marker
                                    key={index}
                                    position={[pin.pinLat, pin.pinLon]}
                                    icon={classIIIPin}
                                >
                                    <Popup>
                                        Marker at {pin.pinLon}, {pin.pinLat}
                                        <br />
                                        Pin Title {pin.pinTitle}
                                        <br />
                                        <form class="popup-form">
                                            <div class="form-group">
                                                <label class="mb-0" for="comment">Pin Description</label>
                                                <textarea class="form-control comment" rows="4"></textarea>
                                            </div>
                                            <div class="d-flex">
                                                <button type="submit" class="btn">Save</button>
                                            </div>
                                        </form>

                                        <RemovePin pinId={pin._id} onDelete={refetch}/>
                                    </Popup>
                                </Marker>
                            ) : null
                        )}
                    <MapMarkers saveMarkers={saveMarkers} />
                    <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
                </MapContainer>
            ) : (
                <p>Loading Map</p>
            )}
        </div>
    );
}

export default Map;
