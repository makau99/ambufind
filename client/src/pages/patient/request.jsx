import { useCallback, useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PatientMap from "../../components/maps/PatientMap";

import { getHospitals } from "../../services/hospitalService";
import { createRequest } from "../../services/requestService";

import { useAuth } from "../../context/authContext";

import {
    Hospital,
    Ambulance,
    MapPin,
    Send,
    LocateFixed
} from "lucide-react";

export default function Request() {

    const { patient } = useAuth();

    const [hospitals, setHospitals] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        hospital_id: "",

        emergency_type: "",

        pickup_address: "",

        pickup_latitude: "",

        pickup_longitude: ""

    });

    useEffect(() => {

        async function loadHospitals() {

            const { data, error } = await getHospitals();

            if (!error) {

                setHospitals(data);

            }

        }

        loadHospitals();

    }, []);

    function handleChange(e) {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    }

    const handleLocation = useCallback((location) => {

        setFormData(prev => ({

            ...prev,

            pickup_latitude: location.latitude,

            pickup_longitude: location.longitude,

            pickup_address: location.address || prev.pickup_address || ""

        }));

    }, []);

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        const { error } = await createRequest({

            patient_id: patient.id,

            hospital_id: formData.hospital_id,

            emergency_type: formData.emergency_type,

            pickup_address: formData.pickup_address,

            pickup_latitude: formData.pickup_latitude || null,

            pickup_longitude: formData.pickup_longitude || null

        });

        setLoading(false);

        if (error) {

            alert(error.message);

            return;

        }

        alert("Ambulance request submitted successfully.");

        setFormData({

            hospital_id: "",

            emergency_type: "",

            pickup_address: "",

            pickup_latitude: "",

            pickup_longitude: ""

        });

    }

    return (

        <DashboardLayout>

            <div className="max-w-7xl mx-auto">

                <div className="mb-10">

                    <h1 className="text-4xl font-bold text-gray-800">

                        Request Ambulance

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Select the destination hospital and confirm your pickup location.

                    </p>

                </div>

                <form

                    onSubmit={handleSubmit}

                    className="rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-2xl p-8"

                >

                    <div className="grid lg:grid-cols-2 gap-10">

                        {/* LEFT */}

                        <div className="space-y-6">

                            <div>

                                <label className="block mb-2 font-semibold text-gray-700">

                                    Destination Hospital

                                </label>

                                <div className="relative">

                                    <Hospital

                                        size={20}

                                        className="absolute left-4 top-4 text-red-700"

                                    />

                                    <select

                                        name="hospital_id"

                                        value={formData.hospital_id}

                                        onChange={handleChange}

                                        className="

                                            w-full

                                            rounded-2xl

                                            border

                                            border-gray-200

                                            bg-white/80

                                            backdrop-blur

                                            py-4

                                            pl-12

                                            pr-5

                                            outline-none

                                            transition-all

                                            duration-300

                                            focus:ring-4

                                            focus:ring-red-100

                                            focus:border-red-600

                                            hover:border-red-400

                                        "

                                    >

                                        <option value="">

                                            Select Hospital

                                        </option>

                                        {hospitals.map((hospital) => (

                                            <option

                                                key={hospital.id}

                                                value={hospital.id}

                                            >

                                                {hospital.name}

                                            </option>

                                        ))}

                                    </select>

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-gray-700">

                                    Emergency Type

                                </label>

                                <div className="relative">

                                    <Ambulance

                                        size={20}

                                        className="absolute left-4 top-4 text-red-700"

                                    />

                                    <select

                                        name="emergency_type"

                                        value={formData.emergency_type}

                                        onChange={handleChange}

                                        className="

                                            w-full

                                            rounded-2xl

                                            border

                                            border-gray-200

                                            bg-white/80

                                            py-4

                                            pl-12

                                            pr-5

                                            outline-none

                                            transition-all

                                            duration-300

                                            focus:ring-4

                                            focus:ring-red-100

                                            focus:border-red-600

                                            hover:border-red-400

                                        "

                                    >

                                        <option value="">

                                            Select Emergency Type

                                        </option>

                                        <option>

                                            Medical Emergency

                                        </option>

                                        <option>

                                            Road Accident

                                        </option>

                                        <option>

                                            Cardiac Arrest

                                        </option>

                                        <option>

                                            Pregnancy

                                        </option>

                                        <option>

                                            Fire Incident

                                        </option>

                                        <option>

                                            Trauma

                                        </option>

                                        <option>

                                            Other

                                        </option>

                                    </select>

                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 font-semibold text-gray-700">

                                    Pickup Address

                                </label>

                                <textarea

                                    rows={4}

                                    name="pickup_address"

                                    value={formData.pickup_address}

                                    onChange={handleChange}

                                    placeholder="Detecting address..."

                                    className="

                                        w-full

                                        rounded-2xl

                                        border

                                        border-gray-200

                                        bg-gray-50

                                        px-5

                                        py-4

                                        resize-none

                                        outline-none

                                        transition

                                        focus:bg-white

                                        focus:ring-4

                                        focus:ring-red-100

                                    "

                                />

                            </div>

                            <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg p-6">

                                <div className="flex items-center gap-3 mb-4">

                                    <LocateFixed className="text-red-700" />

                                    <h3 className="font-bold">

                                        Current Coordinates

                                    </h3>

                                </div>

                                <div className="space-y-2 text-sm">

                                    <p>

                                        <strong>

                                            Latitude:

                                        </strong>

                                        {" "}

                                        {formData.pickup_latitude || "--"}

                                    </p>

                                    <p>

                                        <strong>

                                            Longitude:

                                        </strong>

                                        {" "}

                                        {formData.pickup_longitude || "--"}

                                    </p>

                                </div>

                            </div>

                            <button

                                type="submit"

                                disabled={loading}

                                className="

                                    w-full

                                    flex

                                    justify-center

                                    items-center

                                    gap-3

                                    rounded-2xl

                                    bg-gradient-to-r

                                    from-red-700

                                    to-red-500

                                    py-4

                                    text-lg

                                    font-bold

                                    text-white

                                    shadow-xl

                                    transition-all

                                    duration-300

                                    hover:-translate-y-1

                                    hover:scale-[1.02]

                                    hover:shadow-red-300

                                    active:scale-95

                                "

                            >

                                <Send size={20} />

                                {

                                    loading

                                        ? "Submitting..."

                                        : "Request Ambulance"

                                }

                            </button>

                        </div>

                        {/* RIGHT */}

                        <div>

                            <div className="rounded-3xl overflow-hidden shadow-xl">

                                <PatientMap

                                    onLocationSelect={handleLocation}

                                />

                            </div>

                            <div className="mt-5 rounded-2xl bg-red-50 border border-red-100 p-5">

                                <div className="flex items-center gap-3">

                                    <MapPin className="text-red-700" />

                                    <div>

                                        <h3 className="font-bold">

                                            Pickup Location

                                        </h3>

                                        <p className="text-sm text-gray-600">

                                            Drag the marker or click anywhere on the map to adjust your exact pickup point.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>

        </DashboardLayout>

    );

}