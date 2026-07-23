import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";

import { useAuth } from "../../context/authContext";

import { getDashboardStats } from "../../services/requestService";

export default function PatientDashboard() {

    const { profile, patient } = useAuth();

    const [stats, setStats] = useState({

        total: 0,

        pending: 0,

        assigned: 0,

        completed: 0

    });

    useEffect(() => {

        async function loadDashboard() {

            if (!patient) return;

            const { data } = await getDashboardStats(patient.id);

            if (data) {

                setStats(data);

            }

        }

        loadDashboard();

    }, [patient]);

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold">

                Welcome,

                {" "}

                {profile?.full_name}

            </h1>

            <p className="text-gray-600 mb-8">

                GPS-Based Healthcare Logistics & Dispatch System

            </p>

            <div className="grid md:grid-cols-4 gap-6">

                <DashboardCard

                    title="Total Requests"

                    value={stats.total}

                    color="bg-red-700"

                />

                <DashboardCard

                    title="Pending"

                    value={stats.pending}

                    color="bg-yellow-500"

                />

                <DashboardCard

                    title="Assigned"

                    value={stats.assigned}

                    color="bg-blue-600"

                />

                <DashboardCard

                    title="Completed"

                    value={stats.completed}

                    color="bg-green-700"

                />

            </div>

            <div className="mt-10 bg-white rounded-xl shadow p-6">

                <h2 className="text-2xl font-semibold mb-4">

                    Quick Actions

                </h2>

                <div className="flex gap-4">

                    <a
                        href="/patient/request"
                        className="bg-red-700 text-white px-5 py-3 rounded-lg"
                    >

                        Request Ambulance

                    </a>

                    <a
                        href="/patient/history"
                        className="bg-gray-800 text-white px-5 py-3 rounded-lg"
                    >

                        View History

                    </a>

                    <a
                        href="/patient/profile"
                        className="bg-blue-700 text-white px-5 py-3 rounded-lg"
                    >

                        My Profile

                    </a>

                </div>

            </div>

        </DashboardLayout>

    );

}