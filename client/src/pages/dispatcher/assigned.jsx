import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { getAssignedRequests } from "../../services/dispatcherService";

export default function AssignedRequests() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadRequests();

    }, []);

    async function loadRequests() {

        const { data, error } = await getAssignedRequests();

        if (error) {

            console.error(error);

        } else {

            setRequests(data);

        }

        setLoading(false);

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Assigned Requests

            </h1>

            {loading ? (

                <p>Loading...</p>

            ) : requests.length === 0 ? (

                <div className="bg-white p-6 rounded-xl shadow">

                    No assigned requests.

                </div>

            ) : (

                <div className="overflow-x-auto bg-white rounded-xl shadow">

                    <table className="min-w-full">

                        <thead className="bg-blue-700 text-white">

                            <tr>

                                <th className="px-4 py-3 text-left">

                                    Patient

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Hospital

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Ambulance

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Emergency

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Pickup Address

                                </th>

                                <th className="px-4 py-3 text-left">

                                    Status

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

                                        {request.patients?.profiles?.full_name}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.hospitals?.name}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.ambulances?.registration_number}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.emergency_type}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.pickup_address}

                                    </td>

                                    <td className="px-4 py-3">

                                        {request.status}

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