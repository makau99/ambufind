import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    Menu,
    House,
    Ambulance,
    History,
    User,
    ClipboardList,
    Users,
    LogOut
} from "lucide-react";

import { supabase } from "../services/supabase";
import { useAuth } from "../context/authContext";

export default function Sidebar() {

    const navigate = useNavigate();
    const { profile } = useAuth();

    const [collapsed, setCollapsed] = useState(false);

    async function logout() {

        await supabase.auth.signOut();
        navigate("/auth/login");

    }

    const linksByRole = {

        patient: [
            {
                icon: House,
                text: "Dashboard",
                path: "/patient"
            },
            {
                icon: Ambulance,
                text: "Request",
                path: "/patient/request"
            },
            {
                icon: History,
                text: "History",
                path: "/patient/history"
            },
            {
                icon: User,
                text: "Profile",
                path: "/patient/profile"
            }
        ],

        dispatcher: [
            {
                icon: House,
                text: "Dashboard",
                path: "/dispatcher"
            },
            {
                icon: ClipboardList,
                text: "Assigned",
                path: "/dispatcher/assigned"
            },
            {
                icon: History,
                text: "Requests",
                path: "/dispatcher/requests"
            }
        ],

        driver: [
            {
                icon: House,
                text: "Dashboard",
                path: "/driver"
            },
            {
                icon: History,
                text: "Trip History",
                path: "/driver/history"
            }
        ],

        admin: [
            {
                icon: House,
                text: "Dashboard",
                path: "/admin"
            },
            {
                icon: Users,
                text: "Users",
                path: "/admin/users"
            }
        ]

    };

    const links = linksByRole[profile?.role] || [];

    return (

        <aside

            className={`

                sticky
                top-0
                min-h-screen

                ${collapsed ? "w-20" : "w-72"}

                bg-white/55
                backdrop-blur-2xl
                border-r
                border-white/30

                shadow-2xl

                transition-all
                duration-300

                flex
                flex-col

            `}

        >

            <div className="flex items-center justify-between p-6">

                {!collapsed && (

                    <div>

                        <h1 className="text-3xl font-extrabold tracking-wide text-red-700">

                            AmbuFind

                        </h1>

                        <p className="text-sm font-medium text-gray-500">

                            GPS Dispatch

                        </p>

                    </div>

                )}

                <button

                    onClick={() => setCollapsed(!collapsed)}

                    className="

                        p-3

                        rounded-xl

                        transition-all

                        duration-300

                        hover:bg-gradient-to-r

                        hover:from-red-700

                        hover:to-red-600

                        hover:text-white

                        hover:shadow-lg

                        hover:rotate-180

                    "

                >

                    <Menu size={22} />

                </button>

            </div>

            <nav className="flex-1 px-4 mt-6 space-y-3">

                {links.map((link) => {

                    const Icon = link.icon;

                    return (

                        <NavLink

                            key={link.path}

                            to={link.path}

                            end

                            className={({ isActive }) => `

                                flex
                                items-center
                                gap-4

                                px-4
                                py-4

                                rounded-2xl

                                transition-all
                                duration-300

                                group

                                ${

                                    isActive

                                        ? "bg-gradient-to-r from-red-700 to-red-600 text-white shadow-xl"

                                        : "text-gray-700 hover:bg-white/70 hover:text-red-700 hover:shadow-lg hover:translate-x-2"

                                }

                            `}

                        >

                            <Icon

                                size={22}

                                className="

                                    transition-all

                                    duration-300

                                    group-hover:scale-125

                                    group-hover:rotate-6

                                "

                            />

                            {!collapsed && (

                                <span className="font-semibold">

                                    {link.text}

                                </span>

                            )}

                        </NavLink>

                    );

                })}

            </nav>

            <div className="p-4 border-t border-white/40">

                <button

                    onClick={logout}

                    className="

                        w-full

                        flex

                        items-center

                        gap-4

                        px-4

                        py-4

                        rounded-2xl

                        text-red-700

                        transition-all

                        duration-300

                        hover:bg-gradient-to-r

                        hover:from-red-700

                        hover:to-red-600

                        hover:text-white

                        hover:shadow-xl

                        hover:scale-105

                    "

                >

                    <LogOut size={22} />

                    {!collapsed && (

                        <span className="font-semibold">

                            Logout

                        </span>

                    )}

                </button>

            </div>

        </aside>

    );

}