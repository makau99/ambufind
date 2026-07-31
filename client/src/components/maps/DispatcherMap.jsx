import { useEffect, useState } from "react";

import L from "leaflet";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    CircleMarker
} from "react-leaflet";

import {
    getAmbulances,
    getPendingRequests,
    getHospitals
} from "../../services/dispatcherService";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});

function ambulanceIcon(status) {

    let color = "#16a34a";

    switch (status) {

        case "Assigned":

            color = "#f59e0b";

            break;

        case "On Trip":

            color = "#2563eb";

            break;

        case "Offline":

            color = "#6b7280";

            break;

        default:

            color = "#16a34a";

    }

    return L.divIcon({

        html: `

            <div
                style="
                    width:20px;
                    height:20px;
                    border-radius:50%;
                    background:${color};
                    border:3px solid white;
                    box-shadow:0 0 12px rgba(0,0,0,.45);
                ">
            </div>

        `,

        className: "",

        iconSize: [20, 20]

    });

}

const hospitalIcon = L.divIcon({

    html: `

        <div
            style="
                width:24px;
                height:24px;
                border-radius:50%;
                background:#dc2626;
                color:white;
                display:flex;
                justify-content:center;
                align-items:center;
                font-size:14px;
                font-weight:bold;
                border:2px solid white;
                box-shadow:0 0 10px rgba(0,0,0,.4);
            "
        >

            🏥

        </div>

    `,

    className: "",

    iconSize: [24, 24]

});

export default function DispatcherMap() {

    const [ambulances, setAmbulances] = useState([]);

    const [requests, setRequests] = useState([]);

    const [hospitals, setHospitals] = useState([]);

    async function loadMap() {

        const { data: ambulanceData } = await getAmbulances();

        const { data: requestData } = await getPendingRequests();

        const { data: hospitalData } = await getHospitals();

        setAmbulances(ambulanceData || []);

        setRequests(requestData || []);

        setHospitals(hospitalData || []);

    }

    useEffect(() => {

        loadMap();

        const interval = setInterval(loadMap, 10000);

        return () => clearInterval(interval);

    }, []);

    return (

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

                attribution="© OpenStreetMap"

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

                                hospital.latitude,

                                hospital.longitude

                            ]}

                        >

                            <Popup>

                                <div className="space-y-2">

                                    <h2 className="font-bold">

                                        {hospital.name}

                                    </h2>

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

                    ambulance.drivers?.latitude &&

                    ambulance.drivers?.longitude && (

                        <Marker

                            key={ambulance.id}

                            icon={ambulanceIcon(ambulance.status)}

                            position={[

                                ambulance.drivers.latitude,

                                ambulance.drivers.longitude

                            ]}

                        >

                            <Popup>

                                <div className="space-y-2">

                                    <h2 className="font-bold">

                                        {ambulance.registration_number}

                                    </h2>

                                    <p>

                                        Status:

                                        {" "}

                                        {ambulance.status}

                                    </p>

                                    <p>

                                        Driver:

                                        {" "}

                                        {

                                            ambulance.drivers.profiles.full_name

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

                                request.pickup_latitude,

                                request.pickup_longitude

                            ]}

                            radius={12}

                            pathOptions={{

                                color: "#dc2626",

                                fillColor: "#ef4444",

                                fillOpacity: 1

                            }}

                        >

                            <Popup>

                                <div className="space-y-2">

                                    <h2 className="font-bold">

                                        Emergency Request

                                    </h2>

                                    <p>

                                        <strong>Patient:</strong>

                                        {" "}

                                        {

                                            request.patients.profiles.full_name

                                        }

                                    </p>

                                    <p>

                                        <strong>Emergency:</strong>

                                        {" "}

                                        {request.emergency_type}

                                    </p>

                                    <p>

                                        <strong>Address:</strong>

                                        {" "}

                                        {request.pickup_address}

                                    </p>

                                </div>

                            </Popup>

                        </CircleMarker>

                    )

                ))

            }

        </MapContainer>

    );

}