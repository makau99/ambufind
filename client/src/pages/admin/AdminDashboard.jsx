import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";
import { useAuth } from "../../context/authContext";
import { getAdminDashboardStats } from "../../services/adminService";
import { Link } from "react-router-dom";

export default function AdminDashboard() {

    const { profile } = useAuth();

    const [stats, setStats] = useState({
        users: 0,
        ambulances: 0,
        availableAmbulances: 0,
        pendingRequests: 0,
        activeRequests: 0,
        completedRequests: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadDashboard() {

            const { data, error } =
                await getAdminDashboardStats();

            if (error) {

                console.error(
                    "Failed to load admin dashboard:",
                    error
                );

                setLoading(false);

                return;
            }

            if (data) {
                setStats(data);
            }

            setLoading(false);
        }

        loadDashboard();

    }, []);

    return (

        <DashboardLayout>

            {/* Dashboard Header */}

            <h1 className="text-3xl font-bold">

                Welcome,

                {" "}

                {profile?.full_name || "Administrator"}

            </h1>

            <p className="text-gray-600 mb-8">

                GPS-Based Healthcare Logistics & Dispatch System

            </p>


            {/* Dashboard Statistics */}

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

                <DashboardCard
                    title="Total Users"
                    value={
                        loading
                            ? "..."
                            : stats.users
                    }
                    color="bg-red-700"
                />

                <DashboardCard
                    title="Total Ambulances"
                    value={
                        loading
                            ? "..."
                            : stats.ambulances
                    }
                    color="bg-blue-600"
                />

                <DashboardCard
                    title="Available Ambulances"
                    value={
                        loading
                            ? "..."
                            : stats.availableAmbulances
                    }
                    color="bg-green-700"
                />

                <DashboardCard
                    title="Pending Requests"
                    value={
                        loading
                            ? "..."
                            : stats.pendingRequests
                    }
                    color="bg-yellow-500"
                />

                <DashboardCard
                    title="Active Requests"
                    value={
                        loading
                            ? "..."
                            : stats.activeRequests
                    }
                    color="bg-purple-600"
                />

                <DashboardCard
                    title="Completed Requests"
                    value={
                        loading
                            ? "..."
                            : stats.completedRequests
                    }
                    color="bg-gray-800"
                />

            </div>


            {/* Administration Navigation */}

            <div className="mt-10 bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-semibold mb-2">

                    Administration

                </h2>

                <p className="text-gray-600 mb-6">

                    Select an administrative function to continue.

                </p>


                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                    <Link
                        to="/admin/users"
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <h3 className="text-lg font-semibold">

                            Manage Users

                        </h3>

                        <p className="text-gray-600 mt-2">

                            View users and manage their assigned roles.

                        </p>

                    </Link>


                    <Link
                        to="/admin/ambulances"
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <h3 className="text-lg font-semibold">

                            Manage Ambulances

                        </h3>

                        <p className="text-gray-600 mt-2">

                            View ambulance information and operational status.

                        </p>

                    </Link>


                    <Link
                        to="/admin/requests"
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <h3 className="text-lg font-semibold">

                            View Requests

                        </h3>

                        <p className="text-gray-600 mt-2">

                            Monitor ambulance requests and their current status.

                        </p>

                    </Link>


                    <Link
                        to="/admin/reports"
                        className="border rounded-xl p-5 hover:shadow-md transition"
                    >

                        <h3 className="text-lg font-semibold">

                            Reports

                        </h3>

                        <p className="text-gray-600 mt-2">

                            View system activity and operational reports.

                        </p>

                    </Link>

                </div>

            </div>


            {/* Current System Summary */}

            <div className="mt-8 bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-semibold mb-5">

                    Current System Summary

                </h2>


                <div className="grid md:grid-cols-2 gap-6">

                    <div className="border rounded-lg p-5">

                        <h3 className="font-semibold">

                            Ambulance Availability

                        </h3>

                        <p className="text-gray-600 mt-2">

                            {loading
                                ? "Loading..."
                                : `${stats.availableAmbulances} of ${stats.ambulances} ambulances are currently available.`}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <h3 className="font-semibold">

                            Active Emergency Requests

                        </h3>

                        <p className="text-gray-600 mt-2">

                            {loading
                                ? "Loading..."
                                : `${stats.activeRequests} emergency requests are currently active.`}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <h3 className="font-semibold">

                            Pending Dispatches

                        </h3>

                        <p className="text-gray-600 mt-2">

                            {loading
                                ? "Loading..."
                                : `${stats.pendingRequests} requests are waiting for dispatch.`}

                        </p>

                    </div>


                    <div className="border rounded-lg p-5">

                        <h3 className="font-semibold">

                            Completed Trips

                        </h3>

                        <p className="text-gray-600 mt-2">

                            {loading
                                ? "Loading..."
                                : `${stats.completedRequests} requests have been completed.`}

                        </p>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );
}