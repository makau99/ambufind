import { useEffect, useState } from "react";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker,
    Polyline
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import {

    getAmbulances,
    getPendingRequests,
    getHospitals

} from "../../services/dispatcherService";

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

function ambulanceIcon(status){

    let color="#16a34a";

    switch(status){

        case "Assigned":

            color="#f59e0b";

            break;

        case "On Trip":

            color="#2563eb";

            break;

        case "Offline":

            color="#6b7280";

            break;

        default:

            color="#16a34a";

    }

    return L.divIcon({

        className:"",

        html:`

        <div
            style="
                width:20px;
                height:20px;
                border-radius:50%;
                background:${color};
                border:3px solid white;
                box-shadow:0 0 10px rgba(0,0,0,.45);
            ">
        </div>

        `,

        iconSize:[20,20]

    });

}

const hospitalIcon=L.divIcon({

    className:"",

    html:`

    <div
        style="
            width:24px;
            height:24px;
            border-radius:50%;
            background:#dc2626;
            display:flex;
            justify-content:center;
            align-items:center;
            color:white;
            font-size:14px;
            border:2px solid white;
        "
    >

        🏥

    </div>

    `,

    iconSize:[24,24]

});

export default function DispatcherMap(){

    const [ambulances,setAmbulances]=useState([]);

    const [requests,setRequests]=useState([]);

    const [hospitals,setHospitals]=useState([]);

    const [selectedAmbulance,setSelectedAmbulance]=useState(null);

    const [route,setRoute]=useState(null);

    async function loadMap(){

        const {data:a}=await getAmbulances();

        const {data:r}=await getPendingRequests();

        const {data:h}=await getHospitals();

        setAmbulances(a||[]);

        setRequests(r||[]);

        setHospitals(h||[]);

    }

    useEffect(()=>{

        loadMap();

        const interval=setInterval(loadMap,10000);

        return ()=>clearInterval(interval);

    },[]);
        useEffect(() => {

        async function buildRoute() {

            if (!selectedAmbulance) {

                setRoute(null);

                return;

            }

            const request = requests.find(

                r =>

                    r.ambulance_id === selectedAmbulance.id &&

                    ["Assigned", "En Route", "Arrived"].includes(r.status)

            );

            if (!request) {

                setRoute(null);

                return;

            }

            if (

                !selectedAmbulance.latitude ||

                !selectedAmbulance.longitude ||

                !request.pickup_latitude ||

                !request.pickup_longitude

            ) {

                setRoute(null);

                return;

            }

            const result = await getRoute(

                {

                    lat: Number(selectedAmbulance.latitude),

                    lng: Number(selectedAmbulance.longitude)

                },

                {

                    lat: Number(request.pickup_latitude),

                    lng: Number(request.pickup_longitude)

                }

            );

            setRoute(result);

        }

        buildRoute();

    }, [selectedAmbulance, requests]);

    return (

        <div className="relative">

            <MapContainer

                center={[-1.286389, 36.817223]}

                zoom={12}

                scrollWheelZoom={true}

                style={{

                    height: "700px",

                    width: "100%",

                    borderRadius: "24px"

                }}

            >

                <TileLayer

                    attribution="© OpenStreetMap contributors"

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

                {/* Hospitals */}

                {

                    hospitals.map(hospital => (

                        hospital.latitude &&

                        hospital.longitude && (

                            <Marker

                                key={hospital.id}

                                icon={hospitalIcon}

                                position={[

                                    Number(hospital.latitude),

                                    Number(hospital.longitude)

                                ]}

                            >

                                <Popup>

                                    <div>

                                        <h3 className="font-bold">

                                            {hospital.name}

                                        </h3>

                                        <p>

                                            Hospital

                                        </p>

                                    </div>

                                </Popup>

                            </Marker>

                        )

                    ))

                }

                {/* Ambulances */}

                {

                    ambulances.map(ambulance => (

                        ambulance.latitude &&

                        ambulance.longitude && (

                            <Marker

                                key={ambulance.id}

                                position={[

                                    Number(ambulance.latitude),

                                    Number(ambulance.longitude)

                                ]}

                                icon={ambulanceIcon(ambulance.status)}

                                eventHandlers={{

                                    click: () =>

                                        setSelectedAmbulance(

                                            ambulance

                                        )

                                }}

                            >

                                <Popup>

                                    <div className="space-y-2">

                                        <h3 className="font-bold">

                                            {ambulance.registration_number}

                                        </h3>

                                        <p>

                                            Status:

                                            {" "}

                                            {ambulance.status}

                                        </p>

                                        <p>

                                            Driver:

                                            {" "}

                                            {

                                                ambulance.drivers?.profiles

                                                    ?.full_name ||

                                                "Unassigned"

                                            }

                                        </p>

                                    </div>

                                </Popup>

                            </Marker>

                        )

                    ))

                }

                {/* Emergency Requests */}

                {

                    requests.map(request => (

                        request.pickup_latitude &&

                        request.pickup_longitude && (

                            <CircleMarker

                                key={request.id}

                                center={[

                                    Number(request.pickup_latitude),

                                    Number(request.pickup_longitude)

                                ]}

                                radius={10}

                                pathOptions={{

                                    color: "#dc2626",

                                    fillColor: "#ef4444",

                                    fillOpacity: 1

                                }}

                            >

                                <Popup>

                                    <div className="space-y-2">

                                        <h3 className="font-bold">

                                            Emergency Request

                                        </h3>

                                        <p>

                                            <strong>Patient:</strong>{" "}

                                            {

                                                request.patients?.profiles

                                                    ?.full_name

                                            }

                                        </p>

                                        <p>

                                            <strong>Emergency:</strong>{" "}

                                            {request.emergency_type}

                                        </p>

                                        <p>

                                            <strong>Status:</strong>{" "}

                                            {request.status}

                                        </p>

                                    </div>

                                </Popup>

                            </CircleMarker>

                        )

                    ))

                }

                {/* Route */}

                {

                    route && (

                        <Polyline

                            positions={route.coordinates}

                            pathOptions={{

                                color: "#2563eb",

                                weight: 6

                            }}

                        />

                    )

                }

            </MapContainer>

            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-5 w-64 z-[1000]">

                <h2 className="font-bold text-lg mb-3">

                    Map Legend

                </h2>

                <div className="space-y-2 text-sm">

                    <div>

                        🏥 Hospital

                    </div>

                    <div>

                        🟢 Available Ambulance

                    </div>

                    <div>

                        🟠 Assigned Ambulance

                    </div>

                    <div>

                        🔵 On Trip

                    </div>

                    <div>

                        🔴 Emergency Request

                    </div>

                </div>

                {

                    route && (

                        <div className="mt-5 border-t pt-4">

                            <p>

                                <strong>Distance</strong>

                            </p>

                            <p>

                                {route.distance} km

                            </p>

                            <p className="mt-2">

                                <strong>ETA</strong>

                            </p>

                            <p>

                                {route.duration} mins

                            </p>

                        </div>

                    )

                }

            </div>

        </div>

    );

}