import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Sidebar() {

    const { profile } = useAuth();

    return (

        <aside className="w-64 bg-red-900 text-white min-h-screen p-6">

            <h1 className="text-2xl font-bold mb-10">

                Dispatch System

            </h1>

            <nav className="flex flex-col gap-3">

                {/* PATIENT */}

                {profile?.role === "patient" && (
                    <>
                        <Link to="/patient">Dashboard</Link>

                        <Link to="/patient/request">
                            Request Ambulance
                        </Link>

                        <Link to="/patient/history">
                            Request History
                        </Link>

                        <Link to="/patient/profile">
                            My Profile
                        </Link>
                    </>
                )}

                {/* DISPATCHER */}

                {profile?.role === "dispatcher" && (
                    <>
                        <Link to="/dispatcher">
                            Dashboard
                        </Link>

                        <Link to="/dispatcher/requests">
                            Pending Requests
                        </Link>

                        <Link to="/dispatcher/assigned">
                            Assigned Requests
                        </Link>
                    </>
                )}

                {/* DRIVER */}

                {profile?.role === "driver" && (
                    <>
                        <Link to="/driver">
                            Dashboard
                        </Link>

                        <Link to="/driver/current">
                            Current Trip
                        </Link>

                        <Link to="/driver/history">
                            Trip History
                        </Link>
                    </>
                )}

                {/* ADMIN */}

                {profile?.role === "admin" && (
                    <>
                        <Link to="/admin">
                            Dashboard
                        </Link>

                        <Link to="/admin/users">
                            Users
                        </Link>

                        <Link to="/admin/reports">
                            Reports
                        </Link>
                    </>
                )}

            </nav>

        </aside>

    );

}