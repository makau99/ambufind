import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/authContext";
import { FaBell } from "react-icons/fa";

export default function DashboardLayout({ children }) {

    const { profile } = useAuth();

    const greeting = () => {

        const hour = new Date().getHours();

        if (hour < 12) return "Good Morning";

        if (hour < 17) return "Good Afternoon";

        return "Good Evening";

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-red-50 flex">

            <Sidebar />

            <div className="flex-1 flex flex-col">

                <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/60 border-b border-white/40 shadow-sm">

                    <div className="flex justify-between items-center px-8 py-5">

                        <div>

                            <h1 className="text-2xl font-bold text-gray-800">

                                {greeting()},{" "}
                                {profile?.full_name}

                            </h1>

                            <p className="text-gray-500">

                                {new Date().toLocaleDateString(undefined,{

                                    weekday:"long",

                                    year:"numeric",

                                    month:"long",

                                    day:"numeric"

                                })}

                            </p>

                        </div>

                        <div className="flex items-center gap-6">

                            <button

                                className="relative p-3 rounded-full bg-white shadow hover:shadow-xl hover:scale-110 transition-all"

                            >

                                <FaBell />

                                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-600"></span>

                            </button>

                            <div className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-lg shadow">

                                {

                                    profile?.full_name

                                    ?.charAt(0)

                                    ?.toUpperCase()

                                }

                            </div>

                        </div>

                    </div>

                </header>

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}