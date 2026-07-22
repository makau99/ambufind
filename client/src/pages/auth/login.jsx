import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/profileService";

import { login } from "../../services/authService";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

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

        if (error) {

            alert(error.message);

            return;

        }

        console.log(data);

        navigate("/patient");

    }

    return (

        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                />

                <button type="submit">

                    Login

                </button>

            </form>

        </div>

    );

}