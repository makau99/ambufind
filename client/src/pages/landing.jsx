import { Link } from "react-router-dom";
import {
    Ambulance,
    MapPinned,
    Clock3,
    ShieldCheck,
    ArrowRight,
    Activity
} from "lucide-react";

export default function Landing() {

    return (

        <div className="min-h-screen overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50 relative">

            <div className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-red-600/20 blur-[140px]" />

            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-yellow-400/20 blur-[140px]" />

            <header className="relative z-20">

                <nav className="mx-auto flex max-w-7xl items-center justify-between p-8">

                    <div>

                        <h1 className="text-3xl font-black text-red-700">

                            AmbuFind

                        </h1>

                        <p className="text-sm text-gray-500">

                            GPS Healthcare Logistics

                        </p>

                    </div>

                    <div className="flex gap-4">

                        <Link

                            to="/auth/login"

                            className="rounded-xl border border-red-700 px-6 py-3 font-semibold text-red-700 transition hover:bg-red-700 hover:text-white"

                        >

                            Login

                        </Link>

                        <Link

                            to="/auth/register"

                            className="rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"

                        >

                            Register

                        </Link>

                    </div>

                </nav>

            </header>

            <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-8 py-12 lg:grid-cols-2">

                <div>

                    <div className="inline-flex items-center gap-3 rounded-full bg-red-100 px-5 py-2 font-semibold text-red-700">

                        <Activity size={18} />

                        Emergency Response Platform

                    </div>

                    <h1 className="mt-8 text-6xl font-black leading-tight text-gray-900">

                        Faster Ambulance Dispatch

                        <span className="block text-red-700">

                            Powered by GPS

                        </span>

                    </h1>

                    <p className="mt-8 text-xl leading-9 text-gray-600">

                        AmbuFind connects patients, dispatchers and ambulance
                        drivers using real-time GPS tracking, intelligent
                        dispatching and live status updates to reduce emergency
                        response time.

                    </p>

                    <div className="mt-12 flex gap-5">

                        <Link

                            to="/auth/register"

                            className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-8 py-5 text-lg font-bold text-white shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"

                        >

                            Request Ambulance

                            <ArrowRight size={20} />

                        </Link>

                        <Link

                            to="/auth/login"

                            className="rounded-2xl border bg-white/70 px-8 py-5 text-lg font-semibold backdrop-blur-xl transition hover:shadow-xl"

                        >

                            Login

                        </Link>

                    </div>

                </div>

                <div>

                    <div className="rounded-[40px] border border-white/40 bg-white/55 p-10 backdrop-blur-2xl shadow-2xl">

                        <div className="flex justify-center">

                            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-r from-red-700 to-red-500 text-white shadow-2xl">

                                <Ambulance size={90} />

                            </div>

                        </div>

                        <div className="mt-12 grid gap-5">

                            <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow">

                                <MapPinned className="text-red-700" size={34} />

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Live GPS Tracking

                                    </h3>

                                    <p className="text-gray-600">

                                        Real-time ambulance monitoring.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow">

                                <Clock3 className="text-red-700" size={34} />

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Faster Response

                                    </h3>

                                    <p className="text-gray-600">

                                        Automatically assigns the nearest ambulance.

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow">

                                <ShieldCheck className="text-red-700" size={34} />

                                <div>

                                    <h3 className="font-bold text-lg">

                                        Secure Platform

                                    </h3>

                                    <p className="text-gray-600">

                                        Powered by Supabase Authentication and PostgreSQL.

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            <section className="mx-auto mt-8 max-w-7xl px-8 pb-20">

                <div className="grid gap-8 md:grid-cols-3">

                    <div className="rounded-3xl bg-white/60 p-8 backdrop-blur-xl shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <h2 className="mb-4 text-2xl font-bold text-red-700">

                            Patients

                        </h2>

                        <p className="leading-8 text-gray-600">

                            Request an ambulance in seconds, track its location,
                            monitor arrival time and access previous emergency
                            history.

                        </p>

                    </div>

                    <div className="rounded-3xl bg-white/60 p-8 backdrop-blur-xl shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <h2 className="mb-4 text-2xl font-bold text-red-700">

                            Dispatchers

                        </h2>

                        <p className="leading-8 text-gray-600">

                            Receive emergency requests instantly, assign the
                            nearest ambulance and monitor active trips in
                            real time.

                        </p>

                    </div>

                    <div className="rounded-3xl bg-white/60 p-8 backdrop-blur-xl shadow-xl transition hover:-translate-y-2 hover:shadow-2xl">

                        <h2 className="mb-4 text-2xl font-bold text-red-700">

                            Drivers

                        </h2>

                        <p className="leading-8 text-gray-600">

                            Accept dispatches, navigate using GPS, update trip
                            progress and synchronize with the dispatch centre.

                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}