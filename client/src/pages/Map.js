import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


// Import custom icons
import classI from '../customIcons/classI.png';
import classII from '../customIcons/classII.png';
import classIII from '../customIcons/classIII.png';
import bustin from '../customIcons/bustin.png';


// Icon definitions 1-3
//resource: https://leafletjs.com/examples/custom-icons/
const classIPin = new L.Icon({
    iconUrl: classI,
    iconSize: [41, 41],
    iconAnchor: [0, 41],
});

const classIIPin = new L.Icon({
    iconUrl: classII,
    iconSize: [41, 41],
    iconAnchor: [20, 41],
});

const classIIIPin = new L.Icon({
    iconUrl: classIII,
    iconSize: [60, 60],
    iconAnchor: [20, 42],
});


const ghostBustin = new L.Icon({
    iconUrl: bustin,
    iconSize: [60, 50],
    iconAnchor: [20, 42],
});

function MyComponent({ saveMarkers }) {
    const [markers, setMarkers] = useState([]);
  
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const comment = prompt("Enter a comment for this marker:");
        const newMarker = { coords: [lat, lng], comment };
        setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
        saveMarkers(newMarker);
      },
    });
  
    return null;
}

function Map() {

  const [data, setData] = useState([]);

  const saveMarkers = (newMarkerCoords) => {
    setData((prevData) => [...prevData, newMarkerCoords]);
  };

  return (
    <div>
      <MapContainer
        className="Map"
        center={[40.7196, -74.0066]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((markerData, index) => (
          <Marker key={index} position={markerData.coords} icon={classIIIPin}>
            <Popup>
              Marker at {markerData.coords[0]}, {markerData.coords[1]}
              <br />
              Comment: {markerData.comment}
            </Popup>
          </Marker>
        ))}

        <MyComponent saveMarkers={saveMarkers} />
        {/* Ghostbusters HQ marker, Do not change */}
        <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
      </MapContainer>
    </div>
  );
}

export default Map;

// const Map = () => {
//     const [userLocation, setUserLocation] = useState(null);
//     // useState([]) to initialize a state variable with an empty array as its initial value
//     const [pins, setPins] = useState([])

//     // function for map click to add pins
//     const handleMapClick = (event) => {
//         // Extract the latitude and longitude from the 'event' object's 'latlng' property.
//         const { lat, lng } = event.latlng;
//         console.log(lat, lng);
//         // add a new object representing the clicked location to the existing 'pins' array.
//         setPins([...pins, { lat, lng }]);
//     };    

//     console.log("Map component mounted.");

//     useEffect(() => {
//         // Function to fetch user's location using the geolocation API
//         const getUserLocation = () => {
//             if ('geolocation' in navigator) {
//                 navigator.geolocation.getCurrentPosition(
//                     (position) => {
//                         setUserLocation([position.coords.latitude, position.coords.longitude]);
//                     },
//                     (error) => {
//                         console.error('Error getting user location:', error.message);
//                     }
//                 );
//             } else {
//                 console.warn('Geolocation is not available in this browser.');
//             }
//         };

//         // Call the function to get user's location
//         getUserLocation();
//     }, []);

//     return (
//         <>
//             <h1>Paranormal sightings map</h1>
//             {/*Edited to use Ghostbusters HQ coordinates if no user location data available*/}
//             <MapContainer center={userLocation || [40.7196, -74.0066]} zoom={12} scrollWheelZoom={false} onClick={handleMapClick}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'     /> 
//                     <Marker position={[40.7196, -74.0066]} 
//             icon={ghostBustin}>
//             </Marker>
//             </MapContainer>
//         </>

//     );
// };

// export default Map;
