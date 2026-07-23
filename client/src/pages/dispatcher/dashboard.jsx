import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import DashboardLayout from "../../layouts/DashboardLayout";
import DashboardCard from "../../components/DashboardCard";

export default function DispatcherDashboard() {

    const [stats, setStats] = useState({
        pending: 0,
        ambulances: 0,
        active: 0,
        completed: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        const { count: pending } = await supabase
            .from("ambulance_requests")
            .select("*", { count: "exact", head: true })
            .eq("status", "Pending");

        const { count: active } = await supabase
            .from("ambulance_requests")
            .select("*", { count: "exact", head: true })
            .in("status", [
                "Assigned",
                "En Route",
                "Arrived"
            ]);

        const { count: ambulances } = await supabase
            .from("ambulances")
            .select("*", { count: "exact", head: true })
            .eq("status", "Available");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const { count: completed } = await supabase
            .from("ambulance_requests")
            .select("*", { count: "exact", head: true })
            .eq("status", "Completed")
            .gte("completed_at", today.toISOString());

        setStats({
            pending,
            ambulances,
            active,
            completed
        });
    }

    return (
        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">
                Dispatcher Dashboard
            </h1>

            <div className="grid md:grid-cols-4 gap-6">

                <DashboardCard
                    title="Pending Requests"
                    value={stats.pending}
                    color="bg-red-700"
                />

                <DashboardCard
                    title="Available Ambulances"
                    value={stats.ambulances}
                    color="bg-green-700"
                />

                <DashboardCard
                    title="Active Trips"
                    value={stats.active}
                    color="bg-blue-700"
                />

                <DashboardCard
                    title="Completed Today"
                    value={stats.completed}
                    color="bg-gray-800"
                />

            </div>

        </DashboardLayout>
    );

}