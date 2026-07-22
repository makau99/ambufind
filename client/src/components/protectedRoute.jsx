import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children, role }) {

    const { user, profile, loading } = useAuth();

    if (loading) {

        return <h2>Loading...</h2>;

    }

    if (!user) {

        return <Navigate to="/auth/login" replace />;

    }

    if (role && profile?.role !== role) {

        return <Navigate to="/" replace />;

    }

    return children;

}