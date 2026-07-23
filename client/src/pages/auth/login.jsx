import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Ambulance } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";

import { login } from "../../services/authService";
import { getProfile } from "../../services/profileService";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const { data, error } = await login(email, password);

        if (error) {

            alert(error.message);

            setLoading(false);

            return;

        }

        const { data: profile } = await getProfile(data.user.id);

        switch (profile.role) {

            case "patient":

                navigate("/patient");

                break;

            case "driver":

                navigate("/driver");

                break;

            case "dispatcher":

                navigate("/dispatcher");

                break;

            case "admin":

                navigate("/admin");

                break;

            default:

                navigate("/");

        }

    }

    return (

        <AuthLayout>

            <div className="w-full max-w-md rounded-3xl border border-white/30 bg-white/60 backdrop-blur-2xl shadow-2xl p-10">

                <div className="flex flex-col items-center">

                    <div className="h-20 w-20 rounded-full bg-red-700 text-white flex items-center justify-center shadow-xl">

                        <Ambulance size={38} />

                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-red-700">

                        AmbuFind

                    </h1>

                    <p className="mt-2 text-gray-600">

                        GPS Healthcare Logistics & Dispatch

                    </p>

                </div>

                <form onSubmit={handleSubmit} className="mt-10 space-y-6">

                    <div>

                        <label className="font-semibold">

                            Email

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <Mail size={18} className="text-gray-400" />

                            <input

                                type="email"

                                value={email}

                                onChange={(e) => setEmail(e.target.value)}

                                className="w-full bg-transparent p-4 outline-none"

                                placeholder="Enter email"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Password

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <Lock size={18} className="text-gray-400" />

                            <input

                                type="password"

                                value={password}

                                onChange={(e) => setPassword(e.target.value)}

                                className="w-full bg-transparent p-4 outline-none"

                                placeholder="Enter password"

                            />

                        </div>

                    </div>

                    <button

                        disabled={loading}

                        className="w-full rounded-xl bg-gradient-to-r from-red-700 to-red-600 py-4 font-semibold text-white transition hover:scale-[1.02] hover:shadow-xl"

                    >

                        {loading ? "Signing In..." : "Login"}

                    </button>

                </form>

                <p className="mt-8 text-center text-gray-600">

                    Don't have an account?

                    <Link

                        to="/auth/register"

                        className="ml-2 font-bold text-red-700 hover:text-red-500"

                    >

                        Register

                    </Link>

                </p>

            </div>

        </AuthLayout>

    );

}