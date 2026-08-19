import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getAllAmbulances,
    updateAmbulanceStatus
} from "../../services/adminService";

export default function AdminAmbulances() {

    const [ambulances, setAmbulances] = useState([]);

    const [loading, setLoading] = useState(true);

    const [updatingId, setUpdatingId] = useState(null);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const statuses = [
        "Available",
        "Assigned",
        "On Trip",
        "Offline"
    ];


    useEffect(() => {

        loadAmbulances();

    }, []);


    async function loadAmbulances() {

        setLoading(true);

        setError("");

        const { data, error } =
            await getAllAmbulances();

        if (error) {

            console.error(
                "Failed to load ambulances:",
                error
            );

            setError(
                error.message ||
                "Unable to load ambulances."
            );

            setAmbulances([]);

        } else {

            setAmbulances(data || []);

        }

        setLoading(false);
    }


    async function handleStatusChange(
        ambulanceId,
        newStatus
    ) {

        if (!ambulanceId || !newStatus) {
            return;
        }

        setUpdatingId(ambulanceId);

        setError("");

        setSuccess("");


        const { error } =
            await updateAmbulanceStatus(
                ambulanceId,
                newStatus
            );


        if (error) {

            console.error(
                "Failed to update ambulance status:",
                error
            );

            setError(
                error.message ||
                "Unable to update ambulance status."
            );

            setUpdatingId(null);

            return;
        }


        setAmbulances((currentAmbulances) =>
            currentAmbulances.map(
                (ambulance) =>
                    ambulance.id === ambulanceId
                        ? {
                            ...ambulance,
                            status: newStatus
                        }
                        : ambulance
            )
        );


        setSuccess(
            "Ambulance status updated successfully."
        );

        setUpdatingId(null);


        setTimeout(() => {
            setSuccess("");
        }, 3000);
    }


    function getStatusClass(status) {

        switch (status) {

            case "Available":
                return "bg-green-100 text-green-700";

            case "Assigned":
                return "bg-yellow-100 text-yellow-700";

            case "On Trip":
                return "bg-blue-100 text-blue-700";

            case "Offline":
                return "bg-gray-100 text-gray-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    }


    return (

        <DashboardLayout>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Manage Ambulances

                </h1>

                <p className="text-gray-600 mt-1">

                    View ambulance information and manage
                    operational status.

                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-6 bg-red-100 border border-red-200 text-red-700 rounded-lg p-4">

                    {error}

                </div>

            )}


            {/* Success */}

            {success && (

                <div className="mb-6 bg-green-100 border border-green-200 text-green-700 rounded-lg p-4">

                    {success}

                </div>

            )}


            {/* Ambulance Table */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="p-6 border-b">

                    <h2 className="text-xl font-semibold">

                        Ambulance Fleet

                    </h2>

                    <p className="text-gray-600 text-sm mt-1">

                        {loading
                            ? "Loading ambulances..."
                            : `${ambulances.length} ambulance${ambulances.length === 1 ? "" : "s"} found.`}

                    </p>

                </div>


                {loading ? (

                    <div className="p-10 text-center text-gray-500">

                        Loading ambulances...

                    </div>

                ) : ambulances.length === 0 ? (

                    <div className="p-10 text-center text-gray-500">

                        No ambulances found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Registration Number

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Vehicle Type

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Driver ID

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Current Status

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Change Status

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {ambulances.map((ambulance) => (

                                    <tr
                                        key={ambulance.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        {/* Registration */}

                                        <td className="px-6 py-4">

                                            <p className="font-medium">

                                                {ambulance.registration_number ||
                                                    "—"}

                                            </p>

                                        </td>


                                        {/* Vehicle Type */}

                                        <td className="px-6 py-4 text-gray-600">

                                            {ambulance.vehicle_type ||
                                                "—"}

                                        </td>


                                        {/* Driver */}

                                        <td className="px-6 py-4 text-gray-600">

                                            {ambulance.driver_id ||
                                                "Unassigned"}

                                        </td>


                                        {/* Status */}

                                        <td className="px-6 py-4">

                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(
                                                    ambulance.status
                                                )}`}
                                            >

                                                {ambulance.status ||
                                                    "Unknown"}

                                            </span>

                                        </td>


                                        {/* Status Change */}

                                        <td className="px-6 py-4">

                                            <select
                                                value={
                                                    ambulance.status || ""
                                                }
                                                disabled={
                                                    updatingId ===
                                                    ambulance.id
                                                }
                                                onChange={(event) =>
                                                    handleStatusChange(
                                                        ambulance.id,
                                                        event.target.value
                                                    )
                                                }
                                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >

                                                <option
                                                    value=""
                                                    disabled
                                                >

                                                    Select status

                                                </option>

                                                {statuses.map(
                                                    (status) => (

                                                        <option
                                                            key={status}
                                                            value={status}
                                                        >

                                                            {status}

                                                        </option>

                                                    )
                                                )}

                                            </select>

                                            {updatingId ===
                                                ambulance.id && (

                                                <span className="ml-2 text-sm text-gray-500">

                                                    Updating...

                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );
}