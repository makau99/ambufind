import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const navigate = useNavigate();

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

    const { error } = await register(formData);

    if (error) {
        alert(error.message);
        return;
    }

    alert("Account created successfully.");

    navigate("/auth/login");
    }

    return (
        <div>
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit">
                    Create Account
                </button>

            </form>
        </div>
    );
}