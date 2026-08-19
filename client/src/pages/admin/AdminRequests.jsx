import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getAllRequests
} from "../../services/adminService";

export default function AdminRequests() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [filter, setFilter] = useState("All");


    useEffect(() => {

        loadRequests();

    }, []);


    async function loadRequests() {

        setLoading(true);

        setError("");

        const { data, error } =
            await getAllRequests();

        if (error) {

            console.error(
                "Failed to load requests:",
                error
            );

            setError(
                error.message ||
                "Unable to load ambulance requests."
            );

            setRequests([]);

        } else {

            setRequests(data || []);

        }

        setLoading(false);
    }


    function getStatusClass(status) {

        switch (status) {

            case "Pending":
                return "bg-yellow-100 text-yellow-700";

            case "Assigned":
                return "bg-blue-100 text-blue-700";

            case "En Route":
                return "bg-purple-100 text-purple-700";

            case "Arrived":
                return "bg-orange-100 text-orange-700";

            case "Completed":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    }


    function formatDate(date) {

        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleString(
            "en-KE",
            {
                dateStyle: "medium",
                timeStyle: "short"
            }
        );
    }


    const filteredRequests =
        filter === "All"
            ? requests
            : requests.filter(
                (request) =>
                    request.status === filter
            );


    return (

        <DashboardLayout>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Ambulance Requests

                </h1>

                <p className="text-gray-600 mt-1">

                    Monitor ambulance requests and their
                    current operational status.

                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-6 bg-red-100 border border-red-200 text-red-700 rounded-lg p-4">

                    {error}

                </div>

            )}


            {/* Filters */}

            <div className="bg-white rounded-xl shadow p-6 mb-6">

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                        <h2 className="text-xl font-semibold">

                            Request Records

                        </h2>

                        <p className="text-sm text-gray-500 mt-1">

                            {loading
                                ? "Loading..."
                                : `${filteredRequests.length} request${filteredRequests.length === 1 ? "" : "s"} displayed.`}

                        </p>

                    </div>


                    <select
                        value={filter}
                        onChange={(event) =>
                            setFilter(event.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >

                        <option value="All">

                            All Requests

                        </option>

                        <option value="Pending">

                            Pending

                        </option>

                        <option value="Assigned">

                            Assigned

                        </option>

                        <option value="En Route">

                            En Route

                        </option>

                        <option value="Arrived">

                            Arrived

                        </option>

                        <option value="Completed">

                            Completed

                        </option>

                    </select>

                </div>

            </div>


            {/* Requests Table */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                {loading ? (

                    <div className="p-10 text-center text-gray-500">

                        Loading ambulance requests...

                    </div>

                ) : filteredRequests.length === 0 ? (

                    <div className="p-10 text-center text-gray-500">

                        No ambulance requests found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Request

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Patient

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Emergency

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Hospital

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Ambulance

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Status

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Date

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredRequests.map(
                                    (request) => (

                                        <tr
                                            key={request.id}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            {/* Request ID */}

                                            <td className="px-6 py-4">

                                                <p className="font-medium">

                                                    {request.id
                                                        ? request.id.substring(
                                                            0,
                                                            8
                                                        ) + "..."
                                                        : "—"}

                                                </p>

                                            </td>


                                            {/* Patient */}

                                            <td className="px-6 py-4">

                                                <p className="font-medium">

                                                    {request.patient?.full_name ||
                                                        request.patient_name ||
                                                        "—"}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {request.patient?.phone ||
                                                        request.patient_phone ||
                                                        "—"}

                                                </p>

                                            </td>


                                            {/* Emergency */}

                                            <td className="px-6 py-4 text-gray-700">

                                                {request.emergency_type ||
                                                    "—"}

                                            </td>


                                            {/* Hospital */}

                                            <td className="px-6 py-4 text-gray-700">

                                                {request.hospital?.name ||
                                                    request.hospital_name ||
                                                    "—"}

                                            </td>


                                            {/* Ambulance */}

                                            <td className="px-6 py-4">

                                                {request.ambulance
                                                    ?.registration_number ||
                                                    request.ambulance_registration ||
                                                    "Unassigned"}

                                            </td>


                                            {/* Status */}

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                                        request.status
                                                    )}`}
                                                >

                                                    {request.status ||
                                                        "Unknown"}

                                                </span>

                                            </td>


                                            {/* Date */}

                                            <td className="px-6 py-4 text-gray-600 whitespace-nowrap">

                                                {formatDate(
                                                    request.created_at
                                                )}

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );
}