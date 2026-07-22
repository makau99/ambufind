import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {getHospitals} from "../../services/hospitalService";
import {useAuth} from "../../context/authContext";
import { createRequest } from "../../services/requestService";

export default function Request() {
    const { patient } = useAuth();
    const [formData, setFormData] = useState({
        hospital_id: "",
        emergency_type: "",
        pickup_address: "",
        pickup_latitude: "",
        pickup_longitude: ""
    });

    const [hospitals, setHospitals] = useState([]);

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

    async function handleSubmit(e) {

        e.preventDefault();

        const request = {

            patient_id: patient.id,

            hospital_id: formData.hospital_id,

            emergency_type: formData.emergency_type,

            pickup_address: formData.pickup_address,

            pickup_latitude: formData.pickup_latitude || null,

            pickup_longitude: formData.pickup_longitude || null

        };

        const { error } = await createRequest(request);

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

            <h1 className="text-3xl font-bold mb-8">

                Request Ambulance

            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div>

                    <label>

                        Destination Hospital

                    </label>

                    <select
                        name="hospital_id"
                        value={formData.hospital_id}
                        onChange={handleChange}
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
                <div>

                    <label>

                        Emergency Type

                    </label>

                    <select

                        name="emergency_type"

                        value={formData.emergency_type}

                        onChange={handleChange}

                    >

                        <option value="">Select</option>

                        <option>Medical Emergency</option>

                        <option>Road Accident</option>

                        <option>Cardiac Arrest</option>

                        <option>Pregnancy</option>

                        <option>Fire Incident</option>

                        <option>Trauma</option>

                        <option>Other</option>

                    </select>

                </div>

                <div>

                    <label>

                        Pickup Address

                    </label>

                    <textarea

                        name="pickup_address"

                        value={formData.pickup_address}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>

                        Latitude

                    </label>

                    <input

                        name="pickup_latitude"

                        value={formData.pickup_latitude}

                        onChange={handleChange}

                    />

                </div>

                <div>

                    <label>

                        Longitude

                    </label>

                    <input

                        name="pickup_longitude"

                        value={formData.pickup_longitude}

                        onChange={handleChange}

                    />

                </div>

                <button type="submit">

                    Request Ambulance

                </button>

            </form>

        </DashboardLayout>

    );

}