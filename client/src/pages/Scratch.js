
//_____________ALMOST_______________________________
// import React, { useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import classIII from '../customIcons/classIII.png';
// import bustin from '../customIcons/bustin.png';

// import { ADD_PIN } from '../utils/mutations';
// import { QUERY_PINS } from '../utils/queries'; 

// const classIIIPin = L.icon({
//     iconUrl: classIII,
//     iconSize: [60, 60],
//     iconAnchor: [20, 42],
// });

// const ghostBustin = L.icon({
//     iconUrl: bustin,
//     iconSize: [60, 50],
//     iconAnchor: [20, 42],
// });

// function MyComponent({ saveMarkers }) {
//     const map = useMapEvents({
//         click: (e) => {
//             const { lat, lng } = e.latlng;
//             const comment = prompt("Enter a comment for this marker:");
//             if (comment) {
//                 const newMarker = { coords: [lat, lng], comment };
//                 saveMarkers(newMarker);
//             }
//         },
//     });

//     return null;
// }

// function Map() {
//     const [pins, setPins] = useState([]);
//     const [userLocation, setUserLocation] = useState(null);
//     const { loading, error, data } = useQuery(QUERY_PINS);
//     const [addPin] = useMutation(ADD_PIN);

//     useEffect(() => {
//         if (!loading && data) {
//             setPins(data.pins);
//         }
//     }, [data, loading]);

//     const fetchPinsFromDatabase = async (pinsData) => {
//         try {
//             if (pinsData) {
//                 setPins(pinsData.pins);
//             }
//         } catch (error) {
//             console.error('Error fetching pins:', error);
//         }
//     };

//     useEffect(() => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setUserLocation([latitude, longitude]);
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                     setUserLocation([40.7196, -74.0066]); // Set default location
//                 }
//             );
//         } else {
//             console.error('Geolocation is not supported.');
//             setUserLocation([40.7196, -74.0066]); // Set default location
//         }

//         fetchPinsFromDatabase(data);
//         console.log("fetch pins:", fetchPinsFromDatabase(data));
//     }, []);

//     const saveMarkers = async (newMarker) => {
//         try {
//             const { data } = await addPin({
//                 variables: {
//                     pinLat: newMarker.coords[0],
//                     pinLon: newMarker.coords[1],
//                     pinTitle: newMarker.comment,
//                 },
//             });
//             console.log('Response Data:', data);
//             setPins((prevPins) => [...prevPins, newMarker]);
//         } catch (error) {
//             console.error('Error saving pin:', error);
//         }
//     };

//     const defaultCenter = [40.7196, -74.0066];

//     return (
//         <div>
//             {userLocation ? (
//                 <MapContainer
//                     className="Map"
//                     center={userLocation || defaultCenter}
//                     zoom={15}
//                     scrollWheelZoom={false}
//                     style={{ height: "100vh" }}
//                 >
//                     <TileLayer
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     {pins &&
//                         pins.map((pin, index) =>
//                             pin.coords ? ( // Check if the coords property exists
//                                 <Marker key={index} position={pin.coords} icon={classIIIPin}>
//                                     <Popup>
//                                         Marker at {pin.coords[0]}, {pin.coords[1]}
//                                         <br />
//                                         Comment: {pin.comment}
//                                         {/* more stuff! */}
//                                     </Popup>
//                                 </Marker>
//                             ) : null // If coords property doesn't exist, skip rendering the Marker
//                         )}
//                     <MyComponent saveMarkers={saveMarkers} />
//                     {/* Ghostbusters HQ marker, Do not change */}
//                     <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
//                 </MapContainer>
//             ) : (
//                 <p>Loading Map</p>
//             )}
//         </div>
//     );
// }

// export default Map;


// _________________ERROR W/ INDICES_____________________________
// import React, { useState, useEffect } from 'react';
// import { useMutation, useQuery } from '@apollo/client';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import { ADD_PIN } from '../utils/mutations';
// import { QUERY_PINS } from '../utils/queries';

// // Import custom icons
// // import classI from '../customIcons/classI.png';
// // import classII from '../customIcons/classII.png';
// import classIII from '../customIcons/classIII.png';
// import bustin from '../customIcons/bustin.png';


// // Icon definitions 1-3
// //resource: https://leafletjs.com/examples/custom-icons/
// // const classIPin = new L.Icon({
// //     iconUrl: classI,
// //     iconSize: [41, 41],
// //     iconAnchor: [0, 41],
// // });

// // const classIIPin = new L.Icon({
// //     iconUrl: classII,
// //     iconSize: [41, 41],
// //     iconAnchor: [20, 41],
// // });

// const classIIIPin = new L.Icon({
//     iconUrl: classIII,
//     iconSize: [60, 60],
//     iconAnchor: [20, 42],
// });


// const ghostBustin = new L.Icon({
//     iconUrl: bustin,
//     iconSize: [60, 50],
//     iconAnchor: [20, 42],
// });

// function MyComponent({ saveMarkers }) {
//     const [markers, setMarkers] = useState([]);

//     const map = useMapEvents({
//         click: (e) => {
//             const { lat, lng } = e.latlng;
//             const comment = prompt("Enter a comment for this marker:");
//             const newMarker = { coords: [lat, lng], comment };
//             setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
//             saveMarkers(newMarker);
//         },
//     });

//     return null;
// }

// function Map() {
//     const [data, setData] = useState([]);
//     const [userLocation, setUserLocation] = useState(null);
//     const [userData, setUserData] = useState(null);

//     const [addPin] = useMutation(ADD_PIN);

//     const { loading, error, data: pinsData } = useQuery(QUERY_PINS); 

//     // const { loading, error, data: pinsData } = useQuery(QUERY_PINS, {
//     //     variables: {username: userData ? userData.username : null},
//     // });

//     console.log("DATA:", data);
//     console.log("Is this an array?", Array.isArray(data));

//     const getUserLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setUserLocation([latitude, longitude]);
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                     setUserLocation(defaultCenter);
//                 }
//             );
//         } else {
//             console.error('Geolocation is not supported.');
//             setUserLocation(defaultCenter);
//         }
//     };

//     useEffect(() => {
//         getUserLocation();
//     }, []);

//     useEffect(() => {
//         if (pinsData) {
//             console.log("Pins data:", pinsData);
//             setData(pinsData.pins);
//             setUserData(pinsData.me);
//         }
//     }, [pinsData]);

//     const saveMarkers = async (newMarker) => {
//         console.log("newMarker Data:", newMarker);

//         try {
//             const { data } = await addPin({
//                 variables: { 
//                     pinLat: newMarker.coords[0],
//                     pinLon: newMarker.coords[1],
//                     pinTitle: newMarker.comment,
//                  },
//             });

//             console.log("Response Data:", data);

//         } catch (error) {
//             console.error('Error saving pin:', error);
//         }

//         setData((prevData) => [...prevData, newMarker]);
//     };

//     const defaultCenter = [40.7196, -74.0066];

//     console.log("DATAA:", data);
//     console.log("Is this an array?A", Array.isArray(data));

//     return (
//         <div>
//             {userLocation ? (
//                 <MapContainer
//                     className="Map"
//                     center={userLocation || defaultCenter}
//                     zoom={15}
//                     scrollWheelZoom={false}
//                     style={{ height: "100vh" }}
//                 >
//                     <TileLayer
                        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     {data && data.map((markerData, index) => (
                        
//                         <Marker key={index} position={markerData.coords} icon={classIIIPin}>
//                             <Popup>
//                                 Marker at {markerData.coords[0]}, {markerData.coords[1]}
//                                 <br />
//                                 Comment: {markerData.comment}
//                                 {/* more stuff! */}
//                             </Popup>
//                         </Marker>
                       
//                     ))}

//                     <MyComponent saveMarkers={saveMarkers} />
//                     {/* Ghostbusters HQ marker, Do not change */}
//                     <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
//                 </MapContainer>
//             ) : (
//                 <p>Loading Map</p>
//             )}

//         </div>
//     );
// }

// export default Map;



// _____________with userLocation_______________
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';


// // Import custom icons
// import classI from '../customIcons/classI.png';
// import classII from '../customIcons/classII.png';
// import classIII from '../customIcons/classIII.png';
// import bustin from '../customIcons/bustin.png';


// // Icon definitions 1-3
// //resource: https://leafletjs.com/examples/custom-icons/
// const classIPin = new L.Icon({
//     iconUrl: classI,
//     iconSize: [41, 41],
//     iconAnchor: [0, 41],
// });

// const classIIPin = new L.Icon({
//     iconUrl: classII,
//     iconSize: [41, 41],
//     iconAnchor: [20, 41],
// });

// const classIIIPin = new L.Icon({
//     iconUrl: classIII,
//     iconSize: [60, 60],
//     iconAnchor: [20, 42],
// });


// const ghostBustin = new L.Icon({
//     iconUrl: bustin,
//     iconSize: [60, 50],
//     iconAnchor: [20, 42],
// });

// function MyComponent({ saveMarkers }) {
//     const [markers, setMarkers] = useState([]);

//     const map = useMapEvents({
//         click: (e) => {
//             const { lat, lng } = e.latlng;
//             const comment = prompt("Enter a comment for this marker:");
//             const newMarker = { coords: [lat, lng], comment };
//             setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
//             saveMarkers(newMarker);
//         },
//     });

//     return null;
// }

// function Map() {

//     const [data, setData] = useState([]);
//     const [userLocation, setUserLocation] = useState(null);

//     const getUserLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setUserLocation([latitude, longitude]);
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                 }
//             );
//         } else {
//             console.error('Geolocation is not supported.');
//         }
//     };

//     useEffect(() => {
//         getUserLocation();
//     }, []);

//     const saveMarkers = (newMarkerCoords) => {
//         setData((prevData) => [...prevData, newMarkerCoords]);
//     };

//     const defaultCenter = [40.7196, -74.0066];

//     return (
//         <div>
//             {userLocation ? (
//                 <MapContainer
//                     className="Map"
//                     center={userLocation || defaultCenter}
//                     zoom={15}
//                     scrollWheelZoom={false}
//                     style={{ height: "100vh" }}
//                 >
//                     <TileLayer
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     {data.map((markerData, index) => (
//                         <Marker key={index} position={markerData.coords} icon={classIIIPin}>
//                             <Popup>
//                                 Marker at {markerData.coords[0]}, {markerData.coords[1]}
//                                 <br />
//                                 Comment: {markerData.comment}
//                                 {/* more stuff! */}
//                             </Popup>
//                         </Marker>
//                     ))}

//                     <MyComponent saveMarkers={saveMarkers} />
//                     {/* Ghostbusters HQ marker, Do not change */}
//                     <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
//                 </MapContainer>
//             ) : (
//                 <p>Loading Map</p>
//             )}

//         </div>
//     );
// }

// export default Map;

// ___________Ash Attempt________________
// import React, { useState, useEffect } from 'react';
// import { useMutation } from '@apollo/client';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// import { ADD_PIN } from '../utils/mutations';


// // Import custom icons
// // import classI from '../customIcons/classI.png';
// // import classII from '../customIcons/classII.png';
// import classIII from '../customIcons/classIII.png';
// import bustin from '../customIcons/bustin.png';


// // Icon definitions 1-3
// //resource: https://leafletjs.com/examples/custom-icons/
// // const classIPin = new L.Icon({
// //     iconUrl: classI,
// //     iconSize: [41, 41],
// //     iconAnchor: [0, 41],
// // });

// // const classIIPin = new L.Icon({
// //     iconUrl: classII,
// //     iconSize: [41, 41],
// //     iconAnchor: [20, 41],
// // });

// const classIIIPin = new L.Icon({
//     iconUrl: classIII,
//     iconSize: [60, 60],
//     iconAnchor: [20, 42],
// });


// const ghostBustin = new L.Icon({
//     iconUrl: bustin,
//     iconSize: [60, 50],
//     iconAnchor: [20, 42],
// });

// function MyComponent({ saveMarkers }) {
//     const [markers, setMarkers] = useState([]);

//     const map = useMapEvents({
//         click: (e) => {
//             const { lat, lng } = e.latlng;
//             const comment = prompt("Enter a comment for this marker:");
//             const newMarker = { coords: [lat, lng], comment };
//             setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
//             saveMarkers(newMarker);
//         },
//     });

//     return null;
// }

// function Map() {
//     const [data, setData] = useState([]);
//     const [userLocation, setUserLocation] = useState(null);
//     const [addPin, { error, pinData }] = useMutation(ADD_PIN);

//     const getUserLocation = () => {
//         if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(
//                 (position) => {
//                     const { latitude, longitude } = position.coords;
//                     setUserLocation([latitude, longitude]);
//                 },
//                 (error) => {
//                     console.error('Error getting user location:', error);
//                     setUserLocation(defaultCenter);
//                 }
//             );
//         } else {
//             console.error('Geolocation is not supported.');
//             setUserLocation(defaultCenter);
//         }
//     };

//     useEffect(() => {
//         getUserLocation();
//     }, []);

//     const saveMarkers = (newMarkerCoords) => {
//         setData((prevData) => [...prevData, newMarkerCoords]);
//     };

//     const defaultCenter = [40.7196, -74.0066];



//     const handlePinPlacement = async (event) => {
//         event.preventDefault();
//         console.log(data);

//         try {
//             for (const markerData of data) {
//                 const { coords, comment } = markerData;
//                 await addPin({
//                     variables: { latitude: coords[0], longitude: coords[1], comment },
//                 });
//             }

//             setData([]);
//         } catch (event) {
//             console.error(event);
//         }
//     };


//     return (
//         <div>
//             {userLocation ? (
//                 <MapContainer
//                     className="Map"
//                     center={userLocation || defaultCenter}
//                     zoom={15}
//                     scrollWheelZoom={false}
//                     style={{ height: "100vh" }}
//                 >
//                     <TileLayer
//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     />
//                     {pinData ? (
//                         <div>
//                             <p>success?</p>
//                         </div>
//                     ) : (
//                         <div onClick={handlePinPlacement}>
//                             {
//                                 data.map((markerData, index) => (
//                                     <Marker key={index} position={markerData.coords} icon={classIIIPin}>
//                                         <Popup>
//                                             Marker at {markerData.coords[0]}, {markerData.coords[1]}
//                                             <br />
//                                             Comment: {markerData.comment}
//                                             {/* more stuff! */}
//                                         </Popup>
//                                     </Marker>
//                                 ))
//                             }
//                         </div>
//                     )}
//                     <MyComponent saveMarkers={saveMarkers} />
//                     <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>

//                 </MapContainer>
//             ) : (
//                 <p>Loading Map</p>
//             )}

//         </div>
//     );
// }

// export default Map;

// _____________Rayne's OG__________________________________________
// import React, { useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';


// // Import custom icons
// import classI from '../customIcons/classI.png';
// import classII from '../customIcons/classII.png';
// import classIII from '../customIcons/classIII.png';
// import bustin from '../customIcons/bustin.png';


// // Icon definitions 1-3
// //resource: https://leafletjs.com/examples/custom-icons/
// const classIPin = new L.Icon({
//     iconUrl: classI,
//     iconSize: [41, 41],
//     iconAnchor: [0, 41],
// });

// const classIIPin = new L.Icon({
//     iconUrl: classII,
//     iconSize: [41, 41],
//     iconAnchor: [20, 41],
// });

// const classIIIPin = new L.Icon({
//     iconUrl: classIII,
//     iconSize: [60, 60],
//     iconAnchor: [20, 42],
// });


// const ghostBustin = new L.Icon({
//     iconUrl: bustin,
//     iconSize: [60, 50],
//     iconAnchor: [20, 42],
// });

// function MyComponent({ saveMarkers }) {
//     const [markers, setMarkers] = useState([]);
  
//     const map = useMapEvents({
//       click: (e) => {
//         const { lat, lng } = e.latlng;
//         const comment = prompt("Enter a comment for this marker:");
//         const newMarker = { coords: [lat, lng], comment };
//         setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
//         saveMarkers(newMarker);
//       },
//     });
  
//     return null;
// }

// function Map() {

//   const [data, setData] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setUserLocation([latitude, longitude]);
//         },
//         (error) => {
//           console.error('Error getting user location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported.');
//     }
//   };

//   useEffect(() => {
//     getUserLocation();
//   }, []);
  
//   const saveMarkers = (newMarkerCoords) => {
//     setData((prevData) => [...prevData, newMarkerCoords]);
//   };

//   const defaultCenter = [40.7196, -74.0066];

//   return (
//     <div>
//       <MapContainer
//         className="Map"
//         center={userLocation || defaultCenter}
//         zoom={15}
//         scrollWheelZoom={false}
//         style={{ height: "100vh" }}
//       >
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {data.map((markerData, index) => (
//           <Marker key={index} position={markerData.coords} icon={classIIIPin}>
//             <Popup>
//               Marker at {markerData.coords[0]}, {markerData.coords[1]}
//               <br />
//               Comment: {markerData.comment}
//               {/* more stuff! */}
//             </Popup>
//           </Marker>
//         ))}

//         <MyComponent saveMarkers={saveMarkers} />
//         {/* Ghostbusters HQ marker, Do not change */}
//         <Marker position={[40.7196, -74.0066]} icon={ghostBustin}></Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;

