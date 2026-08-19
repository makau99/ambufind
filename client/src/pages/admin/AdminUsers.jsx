import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
    getAllUsers,
    updateUserRole
} from "../../services/adminService";

export default function AdminUsers() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [updatingId, setUpdatingId] = useState(null);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const roles = [
        "Patient",
        "Driver",
        "Dispatcher",
        "Admin"
    ];


    useEffect(() => {

        loadUsers();

    }, []);


    async function loadUsers() {

        setLoading(true);

        setError("");

        const { data, error } =
            await getAllUsers();

        if (error) {

            console.error(
                "Failed to load users:",
                error
            );

            setError(
                error.message ||
                "Unable to load users."
            );

            setUsers([]);

        } else {

            setUsers(data || []);

        }

        setLoading(false);
    }


    async function handleRoleChange(
        userId,
        newRole
    ) {

        if (!userId || !newRole) {
            return;
        }

        setUpdatingId(userId);

        setError("");

        setSuccess("");


        const { error } =
            await updateUserRole(
                userId,
                newRole
            );


        if (error) {

            console.error(
                "Failed to update user role:",
                error
            );

            setError(
                error.message ||
                "Unable to update user role."
            );

            setUpdatingId(null);

            return;
        }


        setUsers((currentUsers) =>
            currentUsers.map((user) =>
                user.id === userId
                    ? {
                        ...user,
                        role: newRole
                    }
                    : user
            )
        );


        setSuccess(
            "User role updated successfully."
        );

        setUpdatingId(null);


        setTimeout(() => {
            setSuccess("");
        }, 3000);
    }


    function formatDate(date) {

        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-KE",
            {
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );
    }


    function getRoleClass(role) {

        switch (role) {

            case "Admin":
                return "bg-red-100 text-red-700";

            case "Dispatcher":
                return "bg-blue-100 text-blue-700";

            case "Driver":
                return "bg-green-100 text-green-700";

            case "Patient":
                return "bg-gray-100 text-gray-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    }


    return (

        <DashboardLayout>

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Manage Users

                </h1>

                <p className="text-gray-600 mt-1">

                    View registered users and manage
                    their system roles.

                </p>

            </div>


            {/* Error */}

            {error && (

                <div className="mb-6 bg-red-100 border border-red-200 text-red-700 rounded-lg p-4">

                    {error}

                </div>

            )}


            {/* Success */}

            {success && (

                <div className="mb-6 bg-green-100 border border-green-200 text-green-700 rounded-lg p-4">

                    {success}

                </div>

            )}


            {/* Users */}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="p-6 border-b">

                    <h2 className="text-xl font-semibold">

                        System Users

                    </h2>

                    <p className="text-gray-600 text-sm mt-1">

                        {loading
                            ? "Loading users..."
                            : `${users.length} user${users.length === 1 ? "" : "s"} found.`}

                    </p>

                </div>


                {loading ? (

                    <div className="p-10 text-center text-gray-500">

                        Loading users...

                    </div>

                ) : users.length === 0 ? (

                    <div className="p-10 text-center text-gray-500">

                        No users found.

                    </div>

                ) : (

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-gray-50">

                                <tr>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        User

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Role

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Created

                                    </th>

                                    <th className="text-left px-6 py-4 font-semibold text-gray-700">

                                        Change Role

                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        {/* User */}

                                        <td className="px-6 py-4">

                                            <div>

                                                <p className="font-medium">

                                                    {user.full_name ||
                                                        "Unnamed User"}

                                                </p>

                                                <p className="text-sm text-gray-500">

                                                    {user.email ||
                                                        "Email unavailable"}

                                                </p>

                                            </div>

                                        </td>


                                        {/* Current Role */}

                                        <td className="px-6 py-4">

                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRoleClass(
                                                    user.role
                                                )}`}
                                            >

                                                {user.role ||
                                                    "Unassigned"}

                                            </span>

                                        </td>


                                        {/* Created */}

                                        <td className="px-6 py-4 text-gray-600">

                                            {formatDate(
                                                user.created_at
                                            )}

                                        </td>


                                        {/* Change Role */}

                                        <td className="px-6 py-4">

                                            <select
                                                value={
                                                    user.role || ""
                                                }
                                                disabled={
                                                    updatingId ===
                                                    user.id
                                                }
                                                onChange={(event) =>
                                                    handleRoleChange(
                                                        user.id,
                                                        event.target.value
                                                    )
                                                }
                                                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                            >

                                                <option value="" disabled>

                                                    Select role

                                                </option>

                                                {roles.map((role) => (

                                                    <option
                                                        key={role}
                                                        value={role}
                                                    >

                                                        {role}

                                                    </option>

                                                ))}

                                            </select>

                                            {updatingId ===
                                                user.id && (

                                                <span className="ml-2 text-sm text-gray-500">

                                                    Updating...

                                                </span>

                                            )}

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </DashboardLayout>

    );
}