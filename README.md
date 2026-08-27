# 🚑 GPS-Based Healthcare Logistics & Dispatch System

A web-based healthcare logistics and ambulance dispatch application designed to improve emergency response coordination through digital ambulance requests, centralized dispatch, GPS tracking, route visualization, and centralized operational records.

The system provides role-based functionality for patients, ambulance drivers, dispatchers, and administrators, allowing each user to interact with the features relevant to their responsibilities.

---

## 📸 UI Preview

- 🏠 **Dashboard** – Role-specific overview of system activity
- 🚨 **Ambulance Requests** – Submit and monitor emergency requests
- 🚑 **Dispatch Management** – Review requests and assign ambulances
- 📍 **Driver Dashboard** – Manage assignments, trips, and GPS location
- 🗺️ **Live Tracking** – View ambulance locations and routes
- 👥 **User Management** – Manage system users and roles
- 🚐 **Ambulance Management** – Manage ambulance information and availability
- 📊 **Reports** – View operational information and system statistics

---

## 🚀 Features

### 🚨 Digital Ambulance Requests
Patients can submit emergency ambulance requests by providing the required emergency and pickup information. Requests are stored and made available to dispatchers for processing.

### 🚑 Centralized Dispatch
Dispatchers can view incoming requests, monitor active emergencies, and assign available ambulances based on operational information.

### 📍 GPS-Based Tracking
The system uses GPS coordinates to represent ambulance and pickup locations. Ambulance location information can be updated during active trips.

### 🗺️ Route Visualization
Interactive maps display ambulance locations, pickup points, hospitals, and calculated routes. Distance and estimated arrival information can also be displayed during active trips.

### 👨‍✈️ Driver Operations
Drivers can receive ambulance assignments, accept trips, update emergency status, share their location, and complete assigned trips.

### 👥 Role-Based Access
The system provides separate functionality for patients, drivers, dispatchers, and administrators.

### 📊 Centralized Records
User, ambulance, request, trip, and operational information is maintained within a centralized database.

### 🔔 Notifications
The application supports communication of ambulance assignments and emergency status changes between relevant users.

---

## 📁 Project Structure

```text
ambufind/
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── dispatcher/
│   │   ├── driver/
│   │   └── patient/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── supabase/
│   └── functions/
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Technologies Used

| Technology       | Purpose                                      |
|------------------|----------------------------------------------|
| React            | Frontend application                          |
| JavaScript       | Application logic                             |
| Tailwind CSS     | User interface styling                       |
| Supabase         | Authentication and backend services          |
| PostgreSQL       | Centralized data storage                     |
| Google Maps API  | Mapping and location services                |
| OpenRouteService | Route calculation                            |
| Leaflet          | Interactive map visualization                |
| Vite             | Frontend development and build tooling       |
| Git & GitHub     | Version control and project management       |

---

## 🗄️ Main System Data

| Data Area   | Information Managed                         |
|-------------|----------------------------------------------|
| Profiles    | Names, phone numbers and user roles           |
| Patients    | Patient and emergency information             |
| Drivers     | Driver and licence information                |
| Ambulances  | Registration, type, status and GPS location  |
| Requests    | Emergency requests and request status         |
| Hospitals   | Hospital locations and contact information   |

---

## 🔄 Main Emergency Workflow

```text
Patient
   ↓
Submit Ambulance Request
   ↓
Dispatcher Reviews Request
   ↓
Ambulance Assigned
   ↓
Driver Accepts Assignment
   ↓
GPS Tracking & Navigation
   ↓
Patient Pickup
   ↓
Hospital / Destination
   ↓
Trip Completed
   ↓
Record Stored
```
---

## ⚙️ Setup & Deployment

### 🔑 Prerequisites
```text
- Node.js
- Supabase project
- Google Maps API credentials
- OpenRouteService API key
- Modern web browser
- Git
```
### 🛠️ Installation

```text
git clone <repository-url>
cd ambufind
npm install
```

### ▶️ Run the Application

```text
npm run dev
```

Configure the required environment variables before running the application.

---

## 🎯 Project Objectives

The system is designed to provide digital ambulance requests, centralized dispatch management, ambulance assignment, GPS-based tracking, route visualization, centralized operational records, and role-based functionality for different system users.

---

## 📌 Project Status

The main system functionality has been developed, including authentication, ambulance requests, dispatch management, driver operations, GPS tracking, mapping, administration, and reporting.

Current refinement focuses on responsive design, user interface improvements, reliability, and final system testing.

---

## 👨‍💻 Developer

**Evans Makau**

Software Development Student & Aspiring Software Developer

Developed as a Final Year Project.

---

## 📜 License

This project is developed for educational purposes.
