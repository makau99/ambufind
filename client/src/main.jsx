import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/authContext";
import "leaflet/dist/leaflet.css";
import "./components/maps/LeafletIcons";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <AuthProvider>

            <App />

        </AuthProvider>

    </React.StrictMode>

);