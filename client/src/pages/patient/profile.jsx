import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/authContext";

import { updateProfile } from "../../services/profileService";
import { updatePatient } from "../../services/patientService";

export default function Profile() {

    const { profile, patient } = useAuth();

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

    }

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                My Profile

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white shadow rounded-xl p-8"
            >

                <div>

                    <label className="block mb-2">

                        Full Name

                    </label>

                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2">

                        Phone Number

                    </label>

                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <div>

                    <label className="block mb-2">

                        Gender

                    </label>

                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    >

                        <option value="">Select Gender</option>

                        <option value="Male">Male</option>

                        <option value="Female">Female</option>

                    </select>

                </div>

                <div>

                    <label className="block mb-2">

                        Blood Group

                    </label>

                    <select
                        name="blood_group"
                        value={formData.blood_group}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
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

                <div>

                    <label className="block mb-2">

                        Emergency Contact

                    </label>

                    <input
                        type="text"
                        name="emergency_contact"
                        value={formData.emergency_contact}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                <button
                    type="submit"
                    className="bg-red-700 text-white px-6 py-3 rounded-lg hover:bg-red-800"
                >

                    Save Changes

                </button>

            </form>

        </DashboardLayout>

    );

}