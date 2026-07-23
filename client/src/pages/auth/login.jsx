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
        const { data, error } = await login(email, password);

            if (error) {

                alert(error.message);
                return;

            }
        const { data: profile } = await getProfile(data.user.id);
        console.log(profile);
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