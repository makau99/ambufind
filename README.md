# 🚑 GPS-Based Healthcare Logistics & Dispatch System

A web-based ambulance dispatch and tracking application designed to improve emergency response coordination through digital ambulance requests, centralized dispatch, GPS tracking, and real-time operational information.

---

## 📸 UI Preview

- 🏠 **Dashboard** – Role-specific overview of system activity
- 🚨 **Ambulance Requests** – Digital emergency request submission and monitoring
- 🚑 **Dispatch** – Centralized request and ambulance assignment management
- 🗺️ **Live Tracking** – GPS-based ambulance and route visualization
- 👤 **User Management** – Administration of system users and roles
- 📊 **Reports** – Operational statistics and emergency records

---

## 🚀 Features

- 🔐 **Authentication & Role Management** – Secure access for patients, drivers, dispatchers, and administrators
- 🚨 **Digital Ambulance Requests** – Patients can submit and monitor emergency requests
- 🚑 **Ambulance Assignment** – Dispatchers can assign available ambulances
- 📍 **GPS Tracking** – Track ambulance locations during active trips
- 🗺️ **Route Visualization** – Display routes, locations, distance, and estimated arrival information
- 📊 **Centralized Records** – Store users, ambulances, requests, and trip information
- 🔔 **Notifications** – Communicate assignments and status changes
- 🛠️ **Administration** – Manage users, ambulances, requests, and reports

---

## 📁 Project Structure

'''text
/
├── src/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   │   ├── admin/
│   │   ├── dispatcher/
│   │   ├── driver/
│   │   ├── patient/
│   │   └── auth/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── supabase/
│   └── functions/
├── package.json
├── vite.config.js
└── README.md
'''

---

## 💻 Technologies Used

'''text
| Technology            | Purpose                         |
|-----------------------|---------------------------------|
| React                 | Frontend application             |
| JavaScript            | Application logic                |
| Tailwind CSS          | User interface styling           |
| Supabase              | Authentication and database      |
| PostgreSQL            | Data storage                     |
| Google Maps API       | Mapping and location services    |
| OpenRouteService      | Route calculation                |
| Leaflet               | Interactive maps                 |
| Git & GitHub          | Version control                  |
'''

---

## ⚙️ Setup & Deployment

### 🔑 Prerequisites

Node.js, a Supabase project, Google Maps API credentials, an OpenRouteService API key, and a modern web browser.

### 🛠️ Running the Project

'''bash
git clone <repository-url>
cd ambufind
npm install
npm run dev
'''

Configure the required environment variables before running the application.

---

## 🗺️ Main Workflow

'''text
Patient Request
      ↓
Dispatcher Review
      ↓
Ambulance Assignment
      ↓
Driver Accepts Trip
      ↓
GPS Tracking & Navigation
      ↓
Trip Completion
      ↓
Centralized Record
'''

---

## 📌 Project Status

The core ambulance request, dispatch, driver, GPS tracking, mapping, administration, and reporting functionality has been developed. Current refinement focuses on responsive design, reliability, and user experience.

---

## 👨‍💻 Developer

**Evans Makau**  
🎓 *Software Development Student & Aspiring Software Developer*

---

## 📜 License

This project is developed for **educational purposes**.
