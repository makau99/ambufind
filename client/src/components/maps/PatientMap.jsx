import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents
} from "react-leaflet";

function RecenterMap({ position }) {

    const map = useMap();

    useEffect(() => {

        if (position) {

            map.setView(position, 17);

        }

    }, [position, map]);

    return null;

}

function LocationMarker({ position, setPosition }) {

    useMapEvents({

        click(e) {

            setPosition([

                e.latlng.lat,

                e.latlng.lng

            ]);

        }

    });

    if (!position) return null;

    return (

        <Marker

            position={position}

            draggable

            eventHandlers={{

                dragend(e) {

                    const marker = e.target.getLatLng();

                    setPosition([

                        marker.lat,

                        marker.lng

                    ]);

                }

            }}

        />

    );

}

export default function PatientMap({ onLocationSelect }) {

    const [position, setPosition] = useState(null);

    useEffect(() => {

        if (!navigator.geolocation) {

            alert("Geolocation is not supported.");

            return;

        }

        navigator.geolocation.getCurrentPosition(

            (location) => {

                const coords = [

                    location.coords.latitude,

                    location.coords.longitude

                ];

                setPosition(coords);

            },

            (error) => {

                console.log(error);

                alert("Unable to retrieve your current location.");

            },

            {

                enableHighAccuracy: true,

                timeout: 10000,

                maximumAge: 0

            }

        );

    }, []);

    useEffect(() => {

        if (!position) return;

        if (onLocationSelect) {

            onLocationSelect({

                latitude: position[0],

                longitude: position[1]

            });

        }

    }, [position, onLocationSelect]);

    if (!position) {

        return (

            <div className="h-[450px] rounded-2xl bg-gray-100 flex items-center justify-center">

                Getting your current location...

            </div>

        );

    }

    return (

        <MapContainer

            center={position}

            zoom={17}

            scrollWheelZoom

            style={{

                height: "450px",

                width: "100%",

                borderRadius: "20px"

            }}

        >

            <TileLayer

                attribution="&copy; OpenStreetMap contributors"

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            <RecenterMap position={position} />

            <LocationMarker

                position={position}

                setPosition={setPosition}

            />

        </MapContainer>

    );

}