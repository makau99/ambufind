import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/authContext";

import {
    getDriver,
    getCurrentTrip,
    updateTripStatus,
    updateAmbulanceStatus,
    updateDriverStatus
} from "../../services/driverService";

export default function DriverDashboard() {

    const { profile } = useAuth();

    const [driver, setDriver] = useState(null);

    const [trip, setTrip] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadTrip();

    }, []);

    async function loadTrip() {

        if (!profile) return;

        const { data: driverData } = await getDriver(profile.id);

        if (!driverData) {

            setLoading(false);

            return;

        }

        setDriver(driverData);

        const { data } = await getCurrentTrip(driverData.id);

        setTrip(data);

        setLoading(false);

    }

    async function changeStatus(status) {

        await updateTripStatus(trip.id, status);

        if (status === "En Route") {

            await updateAmbulanceStatus(

                trip.ambulance_id,

                "On Trip"

            );

        }

        if (status === "Completed") {

            await updateAmbulanceStatus(

                trip.ambulance_id,

                "Available"

            );

            await updateDriverStatus(

                driver.id,

                "Available"

            );

        }

        loadTrip();

    }

    if (loading) {

        return (

            <DashboardLayout>

                <h2>Loading...</h2>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Driver Dashboard

            </h1>

            {!trip && (

                <div className="bg-white rounded-xl shadow p-8">

                    <h2 className="text-2xl font-bold text-green-700">

                        No Active Trip

                    </h2>

                    <p className="mt-3">

                        Waiting for dispatcher assignment.

                    </p>

                </div>

            )}

            {trip && (

                <>

                    <div className="bg-white rounded-xl shadow p-8">

                        <h2 className="text-2xl font-bold mb-6">

                            Current Trip

                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">

                            <div>

                                <p>

                                    <strong>Patient</strong>

                                </p>

                                <p>

                                    {trip.patients.profiles.full_name}

                                </p>

                            </div>

                            <div>

                                <p>

                                    <strong>Phone</strong>

                                </p>

                                <p>

                                    {trip.patients.profiles.phone}

                                </p>

                            </div>

                            <div>

                                <p>

                                    <strong>Hospital</strong>

                                </p>

                                <p>

                                    {trip.hospitals.name}

                                </p>

                            </div>

                            <div>

                                <p>

                                    <strong>Emergency</strong>

                                </p>

                                <p>

                                    {trip.emergency_type}

                                </p>

                            </div>

                            <div className="md:col-span-2">

                                <p>

                                    <strong>Pickup Address</strong>

                                </p>

                                <p>

                                    {trip.pickup_address}

                                </p>

                            </div>

                            <div>

                                <p>

                                    <strong>Status</strong>

                                </p>

                                <p className="font-bold text-red-700">

                                    {trip.status}

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="mt-8 flex gap-4">

                        {trip.status === "Assigned" && (

                            <button

                                onClick={() => changeStatus("En Route")}

                                className="bg-blue-700 text-white px-6 py-3 rounded-lg"

                            >

                                Start Trip

                            </button>

                        )}

                        {trip.status === "En Route" && (

                            <button

                                onClick={() => changeStatus("Arrived")}

                                className="bg-yellow-600 text-white px-6 py-3 rounded-lg"

                            >

                                Arrived

                            </button>

                        )}

                        {trip.status === "Arrived" && (

                            <button

                                onClick={() => changeStatus("Completed")}

                                className="bg-green-700 text-white px-6 py-3 rounded-lg"

                            >

                                Complete Trip

                            </button>

                        )}

                        {trip.status === "Completed" && (

                            <div className="bg-green-100 text-green-800 rounded-lg px-6 py-4">

                                ✔ Trip Completed Successfully

                            </div>

                        )}

                    </div>

                </>

            )}

        </DashboardLayout>

    );

}