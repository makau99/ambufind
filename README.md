# 🚑 GPS-Based Healthcare Logistics & Dispatch System

A web-based healthcare logistics and ambulance dispatch application designed to improve emergency response coordination through digital ambulance requests, centralized dispatch, GPS-based tracking, route visualization, and centralized operational records.

The system provides separate functionality for patients, ambulance drivers, dispatchers, and administrators, allowing each user to perform tasks according to their role.

---

## 📸 UI Preview

- 🏠 **Dashboard** – Overview of relevant system activity and statistics
- 🚨 **Ambulance Requests** – Submit and monitor emergency requests
- 🚑 **Dispatch Management** – Review requests and assign ambulances
- 👨‍✈️ **Driver Dashboard** – Manage assignments, trips, and location updates
- 🗺️ **Live Tracking** – View ambulance locations and routes
- 👥 **User Management** – Manage system users and roles
- 🚐 **Ambulance Management** – Manage ambulance information and availability
- 📊 **Reports** – View operational records and statistics

---

## 🚀 Features

### 🚨 Digital Ambulance Requests

Patients can submit ambulance requests by providing emergency and pickup information. Submitted requests are stored and made available to dispatchers for processing.

### 🚑 Centralized Dispatch

Dispatchers can view incoming emergency requests, monitor active requests, and assign available ambulances.

### 📍 GPS-Based Tracking

The system uses GPS coordinates to track ambulance locations during active emergency trips and display their positions on an interactive map.

### 🗺️ Route Visualization

The mapping functionality displays ambulance locations, pickup points, hospitals, and calculated routes. Distance and estimated arrival information can also be displayed during active trips.

### 👨‍✈️ Driver Operations

Drivers can receive assignments, accept emergency trips, update trip status, share their GPS location, and complete assigned requests.

### 👥 Role-Based Access

The application provides different functionality based on the user's role:

```text
Patient       → Request and monitor ambulance services
Driver        → Manage assigned trips and location updates
Dispatcher    → Manage requests and ambulance assignments
Administrator → Manage users, ambulances, requests and reports
```

### 📊 Centralized Records

User, patient, driver, ambulance, request, hospital, and trip information is stored within a centralized database.

### 🔔 Notifications

The system supports communication of ambulance assignments and emergency status updates between relevant users.

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
```text
| Technology       | Purpose                                      |
|------------------|----------------------------------------------|
| React            | Frontend application                         |
| JavaScript       | Application logic                            |
| Tailwind CSS     | User interface styling                       |
| Supabase         | Authentication and backend services          |
| PostgreSQL       | Centralized data storage                     |
| Google Maps API  | Mapping and location services                |
| OpenRouteService | Route calculation                            |
| Leaflet          | Interactive map visualization                |
| Vite             | Frontend development and build tooling       |
| Git & GitHub     | Version control and project management       |
---
```

## 🗄️ Main System Data
```text
| Data Area   | Information Managed                         |
|-------------|----------------------------------------------|
| Profiles    | Names, phone numbers and user roles           |
| Patients    | Patient and emergency information             |
| Drivers     | Driver and licence information                |
| Ambulances  | Registration, type, status and GPS location  |
| Requests    | Emergency requests and request status         |
| Hospitals   | Hospital locations and contact information   |

---
```
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
Centralized Record

---
```

## ⚙️ Setup & Deployment

### 🔑 Prerequisites

- Node.js
- Supabase
- OpenRouteService API key
- Modern web browser
- Git

### 🛠️ Installation

```bash
git clone <repository-url>
cd ambufind
npm install
```

### ▶️ Run the Application

```bash
npm run dev
```

Configure the required environment variables before running the application.

---

## 🎯 Project Objectives

The system aims to provide digital ambulance requests, centralized dispatch, ambulance assignment, GPS-based tracking, route visualization, centralized operational records, and role-based functionality for the different system users.

---

## 📌 Project Status

The core system functionality has been developed, including authentication, ambulance requests, dispatch management, driver operations, GPS tracking, mapping, administration, and reporting.

Current refinement focuses on responsive design, user interface improvements, reliability, and final system testing.

---

## 👨‍💻 Developer

**Evans Makau**

Software Developer & Data Scientist

Developed as a Final Year Project.

---

## 📜 License

This project is developed for educational purposes.
