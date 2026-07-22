import { NavLink } from "react-router-dom";

export default function Sidebar() {

    return (

        <aside className="w-64 bg-red-900 text-white min-h-screen">

            <div className="text-center py-6">

                <h2 className="text-xl font-bold">

                    Dispatch System

                </h2>

            </div>

            <nav className="flex flex-col">

                <NavLink
                    className="px-6 py-3 hover:bg-red-800"
                    to="/patient"
                >
                    Dashboard
                </NavLink>

                <NavLink
                    className="px-6 py-3 hover:bg-red-800"
                    to="/patient/request"
                >
                    Request Ambulance
                </NavLink>

                <NavLink
                    className="px-6 py-3 hover:bg-red-800"
                    to="/patient/history"
                >
                    Request History
                </NavLink>

                <NavLink
                    className="px-6 py-3 hover:bg-red-800"
                    to="/patient/profile"
                >
                    Profile
                </NavLink>

            </nav>

        </aside>

    );

}