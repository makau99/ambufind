import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
    getPendingRequests,
    getAmbulances,
    assignAmbulance
} from "../../services/dispatcherService";

export default function DispatcherRequests() {

    const [requests, setRequests] = useState([]);
    const [ambulances, setAmbulances] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        setLoading(true);

        const { data: requestData, error: requestError } =
            await getPendingRequests();

        const { data: ambulanceData, error: ambulanceError } =
            await getAmbulances();

        if (requestError) {

            console.error(requestError);

        }

        if (ambulanceError) {

            console.error(ambulanceError);

        }

        setRequests(requestData || []);
        setAmbulances(ambulanceData || []);

        setLoading(false);

    }

    async function handleAssign(requestId, ambulanceId) {

        if (!ambulanceId) return;

        const { error } = await assignAmbulance(
            requestId,
            ambulanceId
        );

        if (error) {

            alert(error.message);

            return;

        }

        alert("Ambulance assigned successfully.");

        loadData();

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Pending Ambulance Requests

            </h1>

            {loading ? (

                <p>Loading requests...</p>

            ) : requests.length === 0 ? (

                <div className="bg-white rounded-lg shadow p-6">

                    No pending ambulance requests.

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="min-w-full">

                        <thead className="bg-red-700 text-white">

                            <tr>

                                <th className="px-4 py-3 text-left">

                                    Patient

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Hospital

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Emergency

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Pickup Address

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Requested At

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Assign Ambulance

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {requests.map((request) => (

                                <tr
                                    key={request.id}
                                    className="border-b hover:bg-gray-50"
                                >

                                    <td className="px-4 py-3">

                                        {request.patients?.profiles?.full_name || "Unknown"}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.hospitals?.name}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.emergency_type}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.pickup_address}

                                    </td>

                                    <td className="px-4 py-3">

                                        {new Date(
                                            request.requested_at
                                        ).toLocaleString()}

                                    </td>

                                    <td className="px-4 py-3">

                                        <select
                                            defaultValue=""
                                            className="border rounded-lg p-2"
                                            onChange={(e) =>
                                                handleAssign(
                                                    request.id,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="">

                                                Select Ambulance

                                            </option>

                                            {ambulances.map((ambulance) => (

                                                <option
                                                    key={ambulance.id}
                                                    value={ambulance.id}
                                                >

                                                    {ambulance.registration_number}

                                                </option>

                                            ))}

                                        </select>

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