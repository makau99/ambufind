import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { createStaffAccount } from "../../services/adminService";

export default function AdminAddStaff() {

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        email: "",
        password: "",
        role: "driver"
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleChange(event) {

        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

    }

    async function handleSubmit(event) {

        event.preventDefault();

        setLoading(true);
        setMessage("");
        setError("");

        if (
            !form.fullName ||
            !form.phone ||
            !form.email ||
            !form.password ||
            !form.role
        ) {

            setError("Please complete all required fields.");
            setLoading(false);
            return;

        }

        const { data, error } =
            await createStaffAccount(form);

        if (error) {

            console.error(
                "Failed to create staff account:",
                error
            );

            setError(
                error.message ||
                "Unable to create staff account."
            );

            setLoading(false);
            return;

        }

        setMessage(
            `${form.role} account created successfully.`
        );

        setForm({
            fullName: "",
            phone: "",
            email: "",
            password: "",
            role: "driver"
        });

        setLoading(false);

    }

    return (

        <DashboardLayout>

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-3xl font-bold">

                        Add Staff

                    </h1>

                    <p className="text-gray-600 mt-2">

                        Create a Driver or Dispatcher account
                        for the healthcare logistics system.

                    </p>

                </div>


                {/* Success */}

                {message && (

                    <div className="mb-6 bg-green-100 border border-green-200 text-green-700 rounded-lg p-4">

                        {message}

                    </div>

                )}


                {/* Error */}

                {error && (

                    <div className="mb-6 bg-red-100 border border-red-200 text-red-700 rounded-lg p-4">

                        {error}

                    </div>

                )}


                {/* Form */}

                <div className="bg-white rounded-xl shadow p-6">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Full Name */}

                        <div>

                            <label className="block font-medium mb-2">

                                Full Name

                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />

                        </div>


                        {/* Phone */}

                        <div>

                            <label className="block font-medium mb-2">

                                Phone Number

                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />

                        </div>


                        {/* Email */}

                        <div>

                            <label className="block font-medium mb-2">

                                Email Address

                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label className="block font-medium mb-2">

                                Temporary Password

                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter temporary password"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                            />

                        </div>


                        {/* Role */}

                        <div>

                            <label className="block font-medium mb-2">

                                Staff Role

                            </label>

                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            >

                                <option value="driver">
                                    Driver
                                </option>

                                <option value="dispatcher">
                                    Dispatcher
                                </option>

                                {/* Dormant system administrator role */}

                                <option
                                    value="admin"
                                    disabled
                                >
                                    System Administrator (Unavailable)
                                </option>

                            </select>

                            <p className="text-sm text-gray-500 mt-2">

                                System Administrator accounts cannot
                                be created from this interface.

                            </p>

                        </div>


                        {/* Submit */}

                        <div className="pt-2">

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white font-medium px-5 py-3 rounded-lg transition"
                            >

                                {loading
                                    ? "Creating Account..."
                                    : "Create Staff Account"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </DashboardLayout>

    );

}