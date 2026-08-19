import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import PatientDashboard from "./pages/patient/dashboard";
import Request from "./pages/patient/request";
import History from "./pages/patient/history";
import Profile from "./pages/patient/profile";
import DispatcherDashboard from "./pages/dispatcher/dashboard";
import DriverDashboard from "./pages/driver/dashboard";
import DispatcherRequests from "./pages/dispatcher/requests";
import ProtectedRoute from "./components/protectedRoute";
import AssignedRequests from "./pages/dispatcher/assigned";
import DriverHistory from "./pages/driver/history";
import TrackAmbulance from "./pages/patient/TrackAmbulance";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAmbulances from "./pages/admin/AdminAmbulances";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminReports from "./pages/admin/AdminReports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/auth/login" element={<Login />} />

        <Route path="/auth/register" element={<Register />} />

        <Route
          path="/patient"
          element={
            <ProtectedRoute>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dispatcher"
          element={
            <ProtectedRoute>
              <DispatcherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/patient/request"
          element={
              <ProtectedRoute role="patient">
                  <Request />
              </ProtectedRoute>
          }
      />

      <Route
          path="/patient/history"
          element={
              <ProtectedRoute role="patient">
                  <History />
              </ProtectedRoute>
          }
      />

      <Route
          path="/patient/profile"
          element={
              <ProtectedRoute role="patient">
                  <Profile />
              </ProtectedRoute>
          }
/>

        <Route
          path="/driver"
          element={
            <ProtectedRoute>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route
            path="/admin/users"
            element={<AdminUsers />}
        />

        <Route
            path="/admin/ambulances"
            element={<AdminAmbulances />}
        />

        <Route
            path="/admin/requests"
            element={<AdminRequests />}
        />

        <Route
            path="/admin/reports"
            element={<AdminReports />}
        />
        <Route
          path="/dispatcher/requests"
          element={
              <ProtectedRoute role="dispatcher">
                  <DispatcherRequests />
              </ProtectedRoute>
          }
      />
      <Route
          path="/dispatcher/assigned"
          element={
              <ProtectedRoute role="dispatcher">
                  <AssignedRequests />
              </ProtectedRoute>
          }
      />

      <Route

        path="/driver/history"

        element={

            <ProtectedRoute role="driver">

                <DriverHistory/>

            </ProtectedRoute>

        }

    />
    <Route
        path="/patient/TrackAmbulance"

        element={

            <ProtectedRoute role="patient">

                <TrackAmbulance/>

            </ProtectedRoute>

        }

    />
      </Routes>
    </BrowserRouter>
  );
}

export default App;