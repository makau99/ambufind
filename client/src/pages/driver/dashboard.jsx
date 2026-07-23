import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {

    getCurrentTrip,

    updateTripStatus,

    updateAmbulanceStatus

}

from "../../services/driverService";

import { useAuth } from "../../context/authContext";

export default function DriverDashboard(){

    const { profile } = useAuth();

    const [trip,setTrip]=useState(null);

    const [loading,setLoading]=useState(true);

    useEffect(()=>{

        loadTrip();

    },[]);

    async function loadTrip(){

        const {data}=await getCurrentTrip(profile.id);

        setTrip(data);

        setLoading(false);

    }

    async function changeStatus(status){

        await updateTripStatus(

            trip.id,

            status

        );

        if(status==="Completed"){

            await updateAmbulanceStatus(

                trip.ambulance_id,

                "Available"

            );

        }

        loadTrip();

    }

    if(loading){

        return(

            <DashboardLayout>

                Loading...

            </DashboardLayout>

        );

    }

    return(

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Driver Dashboard

            </h1>

            {!trip ? (

                <div className="bg-white rounded-xl shadow p-6">

                    No current assignment.

                </div>

            ) : (

                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-2xl font-semibold">

                        Current Trip

                    </h2>

                    <p>

                        <strong>Patient:</strong>

                        {" "}

                        {trip.patients?.profiles?.full_name}

                    </p>

                    <p>

                        <strong>Hospital:</strong>

                        {" "}

                        {trip.hospitals?.name}

                    </p>

                    <p>

                        <strong>Emergency:</strong>

                        {" "}

                        {trip.emergency_type}

                    </p>

                    <p>

                        <strong>Pickup:</strong>

                        {" "}

                        {trip.pickup_address}

                    </p>

                    <p>

                        <strong>Status:</strong>

                        {" "}

                        {trip.status}

                    </p>

                    <div className="flex gap-4 mt-8">

                        <button

                            onClick={()=>changeStatus("En Route")}

                            className="bg-blue-700 text-white px-4 py-2 rounded"

                        >

                            Start Trip

                        </button>

                        <button

                            onClick={()=>changeStatus("Arrived")}

                            className="bg-yellow-600 text-white px-4 py-2 rounded"

                        >

                            Arrived

                        </button>

                        <button

                            onClick={()=>changeStatus("Completed")}

                            className="bg-green-700 text-white px-4 py-2 rounded"

                        >

                            Complete

                        </button>

                    </div>

                </div>

            )}

        </DashboardLayout>

    );

}