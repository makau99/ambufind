import { useEffect, useState } from "react";
import { Edit3, Save, X, User, Phone, Heart } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/authContext";

import { updateProfile } from "../../services/profileService";
import { updatePatient } from "../../services/patientService";

export default function Profile() {

    const { profile, patient } = useAuth();

    const [editing, setEditing] = useState(false);

    const [formData, setFormData] = useState({

        full_name: "",

        phone: "",

        gender: "",

        blood_group: "",

        emergency_contact: ""

    });

    useEffect(() => {

        if (!profile || !patient) return;

        setFormData({

            full_name: profile.full_name || "",

            phone: profile.phone || "",

            gender: patient.gender || "",

            blood_group: patient.blood_group || "",

            emergency_contact: patient.emergency_contact || ""

        });

    }, [profile, patient]);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        const { error: profileError } = await updateProfile(profile.id, {

            full_name: formData.full_name,

            phone: formData.phone

        });

        if (profileError) {

            alert(profileError.message);

            return;

        }

        const { error: patientError } = await updatePatient(patient.id, {

            gender: formData.gender,

            blood_group: formData.blood_group,

            emergency_contact: formData.emergency_contact

        });

        if (patientError) {

            alert(patientError.message);

            return;

        }

        alert("Profile updated successfully.");

        setEditing(false);

    }

    function cancelEdit() {

        setFormData({

            full_name: profile.full_name || "",

            phone: profile.phone || "",

            gender: patient.gender || "",

            blood_group: patient.blood_group || "",

            emergency_contact: patient.emergency_contact || ""

        });

        setEditing(false);

    }

    return (

        <DashboardLayout>

            <div className="flex items-center justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        My Profile

                    </h1>

                    <p className="text-gray-500">

                        Personal Information

                    </p>

                </div>

                {!editing && (

                    <button

                        onClick={() => setEditing(true)}

                        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-105"

                    >

                        <Edit3 size={18} />

                        Edit Profile

                    </button>

                )}

            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl border border-white/40 p-10"
            >

                <div className="grid md:grid-cols-2 gap-8">

                    <div>

                        <label className="font-semibold text-gray-600">

                            Full Name

                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-xl border bg-white p-4">

                            <User className="text-red-700" size={18} />

                            <input

                                type="text"

                                name="full_name"

                                value={formData.full_name}

                                onChange={handleChange}

                                disabled={!editing}

                                className="w-full bg-transparent outline-none disabled:text-gray-700"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold text-gray-600">

                            Phone Number

                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-xl border bg-white p-4">

                            <Phone className="text-red-700" size={18} />

                            <input

                                type="text"

                                name="phone"

                                value={formData.phone}

                                onChange={handleChange}

                                disabled={!editing}

                                className="w-full bg-transparent outline-none disabled:text-gray-700"

                            />

                        </div>

                    </div>

                    <div>

                        <label className="font-semibold text-gray-600">

                            Gender

                        </label>

                        <select

                            name="gender"

                            value={formData.gender}

                            onChange={handleChange}

                            disabled={!editing}

                            className="mt-2 w-full rounded-xl border bg-white p-4 disabled:text-gray-700"

                        >

                            <option value="">Select Gender</option>

                            <option value="Male">Male</option>

                            <option value="Female">Female</option>

                        </select>

                    </div>

                    <div>

                        <label className="font-semibold text-gray-600">

                            Blood Group

                        </label>

                        <select

                            name="blood_group"

                            value={formData.blood_group}

                            onChange={handleChange}

                            disabled={!editing}

                            className="mt-2 w-full rounded-xl border bg-white p-4 disabled:text-gray-700"

                        >

                            <option value="">Select Blood Group</option>

                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>

                        </select>

                    </div>

                    <div className="md:col-span-2">

                        <label className="font-semibold text-gray-600">

                            Emergency Contact

                        </label>

                        <div className="mt-2 flex items-center gap-3 rounded-xl border bg-white p-4">

                            <Heart className="text-red-700" size={18} />

                            <input

                                type="text"

                                name="emergency_contact"

                                value={formData.emergency_contact}

                                onChange={handleChange}

                                disabled={!editing}

                                className="w-full bg-transparent outline-none disabled:text-gray-700"

                            />

                        </div>

                    </div>

                </div>

                {editing && (

                    <div className="mt-10 flex gap-4">

                        <button

                            type="submit"

                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 font-semibold text-white transition hover:scale-105"

                        >

                            <Save size={18} />

                            Save Changes

                        </button>

                        <button

                            type="button"

                            onClick={cancelEdit}

                            className="flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold transition hover:bg-gray-100"

                        >

                            <X size={18} />

                            Cancel

                        </button>

                    </div>

                )}

            </form>

        </DashboardLayout>

    );

}