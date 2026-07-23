import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Ambulance, User, Phone, Mail, Lock } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";

import { register } from "../../services/authService";

export default function Register() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        full_name: "",

        phone: "",

        email: "",

        password: "",

        confirmPassword: ""

    });

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        setLoading(true);

        const { error } = await register({

            full_name: formData.full_name,

            phone: formData.phone,

            email: formData.email,

            password: formData.password

        });

        setLoading(false);

        if (error) {

            alert(error.message);

            return;

        }

        alert("Registration successful. Please verify your email before logging in.");

        navigate("/auth/login");

    }

    return (

        <AuthLayout>

            <div className="w-full max-w-lg rounded-3xl border border-white/30 bg-white/60 backdrop-blur-2xl shadow-2xl p-10">

                <div className="flex flex-col items-center">

                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-700 text-white shadow-xl">

                        <Ambulance size={38} />

                    </div>

                    <h1 className="mt-6 text-4xl font-bold text-red-700">

                        Create Account

                    </h1>

                    <p className="mt-2 text-center text-gray-600">

                        Join AmbuFind and request emergency ambulance services quickly.

                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-5"
                >

                    <div>

                        <label className="font-semibold">

                            Full Name

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <User
                                size={18}
                                className="text-gray-400"
                            />

                            <input

                                type="text"

                                name="full_name"

                                value={formData.full_name}

                                onChange={handleChange}

                                placeholder="John Doe"

                                className="w-full bg-transparent p-4 outline-none"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Phone Number

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <Phone
                                size={18}
                                className="text-gray-400"
                            />

                            <input

                                type="text"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                placeholder="07XXXXXXXX"

                                className="w-full bg-transparent p-4 outline-none"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Email

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <Mail
                                size={18}
                                className="text-gray-400"
                            />

                            <input

                                type="email"

                                name="email"

                                value={formData.email}

                                onChange={handleChange}

                                placeholder="example@email.com"

                                className="w-full bg-transparent p-4 outline-none"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Password

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <Lock
                                size={18}
                                className="text-gray-400"
                            />

                            <input

                                type="password"

                                name="password"

                                value={formData.password}

                                onChange={handleChange}

                                className="w-full bg-transparent p-4 outline-none"

                                required

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold">

                            Confirm Password

                        </label>

                        <div className="mt-2 flex items-center rounded-xl border bg-white px-4">

                            <Lock
                                size={18}
                                className="text-gray-400"
                            />

                            <input

                                type="password"

                                name="confirmPassword"

                                value={formData.confirmPassword}

                                onChange={handleChange}

                                className="w-full bg-transparent p-4 outline-none"

                                required

                            />

                        </div>

                    </div>

                    <button

                        type="submit"

                        disabled={loading}

                        className="mt-4 w-full rounded-xl bg-gradient-to-r from-red-700 to-red-600 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"

                    >

                        {loading ? "Creating Account..." : "Create Account"}

                    </button>

                </form>

                <p className="mt-8 text-center text-gray-600">

                    Already have an account?

                    <Link

                        to="/auth/login"

                        className="ml-2 font-semibold text-red-700 hover:text-red-500"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </AuthLayout>

    );

}