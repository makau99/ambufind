import { useEffect, useState } from "react";
import { reverseGeocode } from "../../services/geocodeService";
import { Polyline } from "react-leaflet";
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

        async function sendLocation() {

            const address = await reverseGeocode(

                position[0],

                position[1]

            );

            onLocationSelect({

                latitude: position[0],

                longitude: position[1],

                address:

                    address?.display_name ||

                    ""

            });

        }

sendLocation();

    }, [position, onLocationSelect]);

    if (!position) {

        return (

            <div className="h-[450px] rounded-3xl bg-white shadow flex flex-col items-center justify-center">

                <div className="w-16 h-16 border-4 border-red-200 border-t-red-700 rounded-full animate-spin"/>

                <p className="mt-6 text-gray-600">

                    Detecting your current location...

                </p>

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

            <FollowAmbulance

                position={ambulancePosition}
                
            />

            <RecenterMap position={position} />

            <LocationMarker

                position={position}

                setPosition={setPosition}

            />

        </MapContainer>

    );

}