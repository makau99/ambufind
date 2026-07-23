import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import StatusBadge from "../../components/StatusBadge";

import { useAuth } from "../../context/authContext";
import { getPatientRequests } from "../../services/requestService";

export default function History() {

    const { patient } = useAuth();

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadRequests() {

            if (!patient) {
                setLoading(false);
                return;
            }

            const { data, error } = await getPatientRequests(patient.id);

            if (error) {

                console.error(error);

            } else {

                setRequests(data);

            }

            setLoading(false);

        }

        loadRequests();

    }, [patient]);

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Request History

            </h1>

            {loading ? (

                <p>Loading request history...</p>

            ) : requests.length === 0 ? (

                <div className="bg-white rounded-lg shadow p-6">

                    <p className="text-gray-500">

                        You have not made any ambulance requests yet.

                    </p>

                </div>

            ) : (

                <div className="bg-white rounded-lg shadow overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-red-700 text-white">

                            <tr>

                                <th className="px-4 py-3 text-left">

                                    Date

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

                                        {new Date(
                                            request.requested_at
                                        ).toLocaleString()}

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

                                        <StatusBadge
                                            status={request.status}
                                        />

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