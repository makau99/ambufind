import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/authContext";

import { getDriver } from "../../services/driverService";

import { getDriverHistory } from "../../services/driverHistoryService";

export default function DriverHistory() {

    const { profile } = useAuth();

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadHistory();

    }, []);

    async function loadHistory() {

        const { data: driver } = await getDriver(profile.id);

        if (!driver) {

            setLoading(false);

            return;

        }

        const { data } = await getDriverHistory(driver.id);

        if (data) {

            setHistory(data);

        }

        setLoading(false);

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Trip History

            </h1>

            {loading && (

                <p>

                    Loading...

                </p>

            )}

            {!loading && history.length===0 && (

                <div className="bg-white rounded-xl shadow p-8">

                    No completed trips.

                </div>

            )}

            {history.length>0 && (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="min-w-full">

                        <thead className="bg-red-700 text-white">

                            <tr>

                                <th className="px-4 py-3">

                                    Date

                                </th>

                                <th className="px-4 py-3">

                                    Patient

                                </th>

                                <th className="px-4 py-3">

                                    Hospital

                                </th>

                                <th className="px-4 py-3">

                                    Emergency

                                </th>

                                <th className="px-4 py-3">

                                    Pickup

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {history.map((trip)=>(

                                <tr
                                    key={trip.id}
                                    className="border-b hover:bg-gray-100"
                                >

                                    <td className="px-4 py-3">

                                        {

                                            new Date(

                                                trip.completed_at

                                            ).toLocaleString()

                                        }

                                    </td>

                                    <td className="px-4 py-3">

                                        {

                                            trip.patients.profiles.full_name

                                        }

                                    </td>

                                    <td className="px-4 py-3">

                                        {

                                            trip.hospitals.name

                                        }

                                    </td>

                                    <td className="px-4 py-3">

                                        {

                                            trip.emergency_type

                                        }

                                    </td>

                                    <td className="px-4 py-3">

                                        {

                                            trip.pickup_address

                                        }

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </DashboardLayout>

    );

}