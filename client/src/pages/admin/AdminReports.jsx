import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";
import { getAdminReportData } from "../../services/adminService";

export default function AdminReports() {

    const [data, setData] = useState({
        users: [],
        ambulances: [],
        requests: []
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadReportData();

    }, []);


    async function loadReportData() {

        setLoading(true);

        setError("");

        const { data: reportData, error } =
            await getAdminReportData();

        if (error) {

            console.error(
                "Failed to load report data:",
                error
            );

            setError(
                error.message ||
                "Unable to load report data."
            );

            setLoading(false);

            return;
        }

        setData({
            users: reportData?.users || [],
            ambulances: reportData?.ambulances || [],
            requests: reportData?.requests || []
        });

        setLoading(false);
    }


    const statistics = useMemo(() => {

        const requests = data.requests;

        return {
            totalRequests: requests.length,

            pending: requests.filter(
                (request) =>
                    request.status === "Pending"
            ).length,

            assigned: requests.filter(
                (request) =>
                    request.status === "Assigned"
            ).length,

            enRoute: requests.filter(
                (request) =>
                    request.status === "En Route"
            ).length,

            arrived: requests.filter(
                (request) =>
                    request.status === "Arrived"
            ).length,

            completed: requests.filter(
                (request) =>
                    request.status === "Completed"
            ).length,

            totalUsers: data.users.length,

            totalAmbulances:
                data.ambulances.length,

            availableAmbulances:
                data.ambulances.filter(
                    (ambulance) =>
                        ambulance.status === "Available"
                ).length,

            assignedAmbulances:
                data.ambulances.filter(
                    (ambulance) =>
                        ambulance.status === "Assigned"
                ).length,

            onTripAmbulances:
                data.ambulances.filter(
                    (ambulance) =>
                        ambulance.status === "On Trip"
                ).length,

            offlineAmbulances:
                data.ambulances.filter(
                    (ambulance) =>
                        ambulance.status === "Offline"
                ).length
        };

    }, [data]);


    const userStatistics = useMemo(() => {

        return {
            patients: data.users.filter(
                (user) =>
                    user.role === "patient"
            ).length,

            drivers: data.users.filter(
                (user) =>
                    user.role === "driver"
            ).length,

            dispatchers: data.users.filter(
                (user) =>
                    user.role === "dispatcher"
            ).length,

            admins: data.users.filter(
                (user) =>
                    user.role === "admin"
            ).length
        };

    }, [data]);


    function calculateCompletionRate() {

        if (statistics.totalRequests === 0) {
            return 0;
        }

        return Math.round(
            (
                statistics.completed /
                statistics.totalRequests
            ) * 100
        );
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


    return (

        <DashboardLayout>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    System Reports

                </h1>

                <p className="text-gray-600 mt-1">

                    Overview of users, ambulance operations,
                    and emergency request activity.

                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-6 bg-red-100 border border-red-200 text-red-700 rounded-lg p-4">

                    {error}

                </div>

            )}


            {/* Request Statistics */}

            <div className="mb-8">

                <h2 className="text-xl font-semibold mb-4">

                    Request Statistics

                </h2>

                <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">

                    <DashboardCard
                        title="Total"
                        value={
                            loading
                                ? "..."
                                : statistics.totalRequests
                        }
                        color="bg-gray-800"
                    />

                    <DashboardCard
                        title="Pending"
                        value={
                            loading
                                ? "..."
                                : statistics.pending
                        }
                        color="bg-yellow-500"
                    />

                    <DashboardCard
                        title="Assigned"
                        value={
                            loading
                                ? "..."
                                : statistics.assigned
                        }
                        color="bg-blue-600"
                    />

                    <DashboardCard
                        title="En Route"
                        value={
                            loading
                                ? "..."
                                : statistics.enRoute
                        }
                        color="bg-purple-600"
                    />

                    <DashboardCard
                        title="Arrived"
                        value={
                            loading
                                ? "..."
                                : statistics.arrived
                        }
                        color="bg-orange-500"
                    />

                    <DashboardCard
                        title="Completed"
                        value={
                            loading
                                ? "..."
                                : statistics.completed
                        }
                        color="bg-green-700"
                    />

                </div>

            </div>


            {/* User Statistics */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

                <h2 className="text-xl font-semibold mb-5">

                    User Statistics

                </h2>

                <div className="grid md:grid-cols-4 gap-5">

                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Patients

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : userStatistics.patients}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Drivers

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : userStatistics.drivers}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Dispatchers

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : userStatistics.dispatchers}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Administrators

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : userStatistics.admins}

                        </p>

                    </div>

                </div>

            </div>


            {/* Ambulance Statistics */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

                <h2 className="text-xl font-semibold mb-5">

                    Ambulance Fleet Statistics

                </h2>

                <div className="grid md:grid-cols-4 gap-5">

                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Available

                        </p>

                        <p className="text-3xl font-bold text-green-700 mt-2">

                            {loading
                                ? "..."
                                : statistics.availableAmbulances}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Assigned

                        </p>

                        <p className="text-3xl font-bold text-yellow-600 mt-2">

                            {loading
                                ? "..."
                                : statistics.assignedAmbulances}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            On Trip

                        </p>

                        <p className="text-3xl font-bold text-blue-600 mt-2">

                            {loading
                                ? "..."
                                : statistics.onTripAmbulances}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Offline

                        </p>

                        <p className="text-3xl font-bold text-gray-600 mt-2">

                            {loading
                                ? "..."
                                : statistics.offlineAmbulances}

                        </p>

                    </div>

                </div>

            </div>


            {/* Performance Summary */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

                <h2 className="text-xl font-semibold mb-5">

                    Operational Performance

                </h2>

                <div className="grid md:grid-cols-3 gap-5">

                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Request Completion Rate

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : `${calculateCompletionRate()}%`}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Total Users

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : statistics.totalUsers}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <p className="text-gray-500 text-sm">

                            Total Ambulances

                        </p>

                        <p className="text-3xl font-bold mt-2">

                            {loading
                                ? "..."
                                : statistics.totalAmbulances}

                        </p>

                    </div>

                </div>

            </div>


            {/* Recent Requests */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="p-6 border-b">

                    <h2 className="text-xl font-semibold">

                        Recent Requests

                    </h2>

                </div>


                {loading ? (

                    <div className="p-10 text-center text-gray-500">

                        Loading report data...

                    </div>

                ) : data.requests.length === 0 ? (

                    <div className="p-10 text-center text-gray-500">

                        No request records available.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4">

                                        Request

                                    </th>

                                    <th className="text-left px-6 py-4">

                                        Emergency Type

                                    </th>

                                    <th className="text-left px-6 py-4">

                                        Status

                                    </th>

                                    <th className="text-left px-6 py-4">

                                        Date

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {data.requests
                                    .slice(0, 10)
                                    .map((request) => (

                                        <tr
                                            key={request.id}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="px-6 py-4">

                                                {request.id
                                                    ? `${request.id.substring(
                                                        0,
                                                        8
                                                    )}...`
                                                    : "—"}

                                            </td>

                                            <td className="px-6 py-4">

                                                {request.emergency_type ||
                                                    "—"}

                                            </td>

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

                                            <td className="px-6 py-4 text-gray-600">

                                                {request.created_at
                                                    ? new Date(
                                                        request.created_at
                                                    ).toLocaleString(
                                                        "en-KE"
                                                    )
                                                    : "—"}

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