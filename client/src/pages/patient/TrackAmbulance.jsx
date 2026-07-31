import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/authContext";
import { useMap } from "react-leaflet";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

import {
    getPatient,
    getCurrentTrip
} from "../../services/patientService";

import { getRoute } from "../../services/routeService";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function FollowAmbulance({ position }) {

    const map = useMap();

    useEffect(() => {

        if (position) {

            map.setView(position);

        }

    }, [position, map]);

    return null;

}

export default function TrackAmbulance() {

    const { profile } = useAuth();

    const [patient, setPatient] = useState(null);

    const [trip, setTrip] = useState(null);

    const [ambulancePosition, setAmbulancePosition] = useState(null);

    const [route, setRoute] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadTrip();

        const interval = setInterval(() => {

            loadTrip();

        }, 5000);

        return () => clearInterval(interval);

    }, []);



    async function loadTrip() {

        if (!profile)
            return;

        const { data: patientData } =
            await getPatient(profile.id);

        if (!patientData) {

            setLoading(false);

            return;

        }

        setPatient(patientData);

        const { data } =
            await getCurrentTrip(patientData.id);

        if (data) {

            setTrip(data);

            if (
                data.ambulances?.latitude &&
                data.ambulances?.longitude
            ) {

                setAmbulancePosition([
                    Number(data.ambulances.latitude),
                    Number(data.ambulances.longitude)
                ]);

            }

        }

        else {

            setTrip(null);

            setRoute(null);

        }

        setLoading(false);

    }



    useEffect(() => {

        async function buildRoute() {

            if (
                !trip ||
                !ambulancePosition
            ) {

                setRoute(null);

                return;

            }

            let destination;

            if (
                trip.status === "Assigned" ||
                trip.status === "En Route"
            ) {

                destination = {

                    lat: Number(
                        trip.pickup_latitude
                    ),

                    lng: Number(
                        trip.pickup_longitude
                    )

                };

            }

            else if (
                trip.status === "Arrived"
            ) {

                destination = {

                    lat: Number(
                        trip.hospitals.latitude
                    ),

                    lng: Number(
                        trip.hospitals.longitude
                    )

                };

            }

            if (!destination)
                return;

            const result = await getRoute(

                {

                    lat: ambulancePosition[0],

                    lng: ambulancePosition[1]

                },

                destination

            );

            setRoute(result);

        }

        buildRoute();

    }, [

        ambulancePosition,

        trip?.status

    ]);
    if (loading) {

    return (

        <DashboardLayout>

            <div className="text-center text-xl">

                Loading...

            </div>

        </DashboardLayout>

    );

}

return (

    <DashboardLayout>

        <div className="space-y-8">

            <h1 className="text-4xl font-bold">

                Track Ambulance

            </h1>



            {

                !trip && (

                    <div className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl p-10">

                        <h2 className="text-2xl font-bold text-red-700">

                            No Active Ambulance Request

                        </h2>

                        <p className="mt-3 text-gray-600">

                            You currently have no ambulance assigned.

                        </p>

                    </div>

                )

            }



            {

                trip && (

                    <>

                        <div className="grid lg:grid-cols-2 gap-8">



                            {/* LEFT CARD */}

                            <div className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl p-8">

                                <h2 className="text-2xl font-bold mb-6">

                                    Ambulance Details

                                </h2>



                                <div className="space-y-5">



                                    <div>

                                        <p className="text-gray-500">

                                            Status

                                        </p>



                                        <span
                                            className={`

                                                inline-block

                                                px-4

                                                py-2

                                                rounded-full

                                                font-semibold

                                                ${

                                                    trip.status === "Assigned"

                                                        ? "bg-gray-200 text-gray-800"

                                                    : trip.status === "En Route"

                                                        ? "bg-blue-100 text-blue-700"

                                                    : trip.status === "Arrived"

                                                        ? "bg-orange-100 text-orange-700"

                                                    : "bg-green-100 text-green-700"

                                                }

                                            `}
                                        >

                                            {trip.status}

                                        </span>

                                    </div>



                                    <div>

                                        <p className="text-gray-500">

                                            Ambulance

                                        </p>



                                        <h3 className="font-semibold">

                                            {

                                                trip.ambulances?.registration_number

                                            }

                                        </h3>

                                    </div>



                                    <div>

                                        <p className="text-gray-500">

                                            Driver

                                        </p>



                                        <h3>

                                            {

                                                trip.ambulances?.drivers?.profiles?.full_name ||

                                                "Not Available"

                                            }

                                        </h3>

                                    </div>



                                    <div>

                                        <p className="text-gray-500">

                                            Driver Phone

                                        </p>



                                        <h3>

                                            {

                                                trip.ambulances?.drivers?.profiles?.phone ||

                                                "-"

                                            }

                                        </h3>

                                    </div>



                                    <div>

                                        <p className="text-gray-500">

                                            Hospital

                                        </p>



                                        <h3>

                                            {

                                                trip.hospitals?.name

                                            }

                                        </h3>

                                    </div>



                                    <div>

                                        <p className="text-gray-500">

                                            Emergency

                                        </p>



                                        <h3>

                                            {

                                                trip.emergency_type

                                            }

                                        </h3>

                                    </div>



                                    <div>

                                        <p className="text-gray-500">

                                            Pickup Address

                                        </p>



                                        <h3>

                                            {

                                                trip.pickup_address

                                            }

                                        </h3>

                                    </div>

                                </div>

                            </div>



                            {/* RIGHT */}

                            <div className="space-y-6">



                                <div className="grid grid-cols-2 gap-5">



                                    <div className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl p-6">

                                        <p className="text-gray-500">

                                            Distance

                                        </p>



                                        <h2 className="text-4xl font-bold text-blue-700 mt-2">

                                            {

                                                route

                                                ?

                                                `${route.distance} km`

                                                :

                                                "--"

                                            }

                                        </h2>

                                    </div>



                                    <div className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-xl p-6">

                                        <p className="text-gray-500">

                                            ETA

                                        </p>



                                        <h2 className="text-4xl font-bold text-green-700 mt-2">

                                            {

                                                route

                                                ?

                                                `${route.duration} mins`

                                                :

                                                "--"

                                            }

                                        </h2>

                                    </div>

                                </div>



                                <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/30">

                                    <MapContainer

                                        center={

                                            ambulancePosition ||

                                            [

                                                Number(

                                                    trip.pickup_latitude

                                                ),

                                                Number(

                                                    trip.pickup_longitude

                                                )

                                            ]

                                        }

                                        zoom={15}

                                        style={{

                                            height:"500px",

                                            width:"100%"

                                        }}

                                    >

                                        <TileLayer

                                            attribution="© OpenStreetMap contributors"

                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                                        />

                                        {

                                            ambulancePosition && (

                                                <Marker

                                                    position={ambulancePosition}

                                                >

                                                    <Popup>

                                                        🚑 Ambulance

                                                    </Popup>

                                                </Marker>

                                            )

                                        }

                                        {trip.status !== "Arrived" && (

                                            <Marker
                                                position={[
                                                    Number(trip.pickup_latitude),
                                                    Number(trip.pickup_longitude)
                                                ]}
                                            >
                                                <Popup>

                                                    📍 Pickup

                                                </Popup>

                                            </Marker>

                                        )}

                                        {trip.status !== "Completed" && (

                                            <Marker
                                                position={[
                                                    Number(trip.hospitals.latitude),
                                                    Number(trip.hospitals.longitude)
                                                ]}
                                            >
                                                <Popup>

                                                    🏥 {trip.hospitals.name}

                                                </Popup>

                                            </Marker>

                                        )}

                                        {

                                            route && (

                                                <Polyline

                                                    positions={

                                                        route.coordinates

                                                    }

                                                    pathOptions={{

                                                        color:

                                                            trip.status==="Arrived"

                                                            ?

                                                            "#f97316"

                                                            :

                                                            "#2563eb",

                                                        weight:6

                                                    }}

                                                />

                                            )

                                        }

                                    </MapContainer>

                                </div>

                            </div>

                        </div>

                    </>

                )

            }

        </div>

    </DashboardLayout>

);

}