# AmbuFind — GPS-Based Healthcare Logistics and Dispatch System

AmbuFind is a web-based ambulance dispatch and healthcare logistics system developed as a Final Year Project at KCA University. The system enables patients to request ambulance services, dispatch officers to manage emergency requests, and ambulance drivers to receive assignments and share their real-time location.

## Overview

AmbuFind improves the coordination of ambulance services by bringing ambulance requests, dispatch operations, GPS tracking, mapping, and operational records into one centralized system.

The system supports four main user roles:

Patients can submit ambulance requests, provide pickup locations, and monitor their emergency requests.

Dispatchers can receive and manage emergency requests, assign available ambulances, and monitor active trips.

Ambulance drivers can receive assignments, share their GPS location, navigate to pickup locations, and update trip status.

Administrators can manage system users, ambulances, requests, and operational information.

## Main Features

### Ambulance Requests

Patients can submit emergency ambulance requests by providing the required emergency and pickup information. Requests are stored centrally and made available to the dispatch team.

### Centralized Dispatch

Dispatchers can view incoming ambulance requests and manage their progress from a centralized dashboard.

### Ambulance Assignment

Available ambulances can be assigned to emergency requests. Assignment information is synchronized between the dispatch and driver interfaces.

### GPS Tracking

The system uses GPS coordinates to represent ambulance and pickup locations. Driver location updates can be displayed on the map while an emergency trip is active.

### Mapping and Route Visualization

The application uses mapping and routing services to visualize locations and ambulance routes, supporting navigation from the ambulance's current position toward the required destination.

### Trip Management

Emergency requests progress through operational states:

Pending → Assigned → En Route → Arrived → Completed

### Centralized Records

Patient requests, ambulance information, driver information, trip status, and operational data are stored in a centralized PostgreSQL database through Supabase.

### Role-Based Access

Different users are provided with functionality appropriate to their responsibilities. Patients, drivers, dispatchers, and administrators access separate parts of the application.

## Technology Stack

Frontend: React

Styling: Tailwind CSS

Backend Services: Supabase

Database: PostgreSQL

Authentication: Supabase Auth

Mapping: Google Maps API

Routing: OpenRouteService

Development Environment: Visual Studio Code

API Testing: Postman

Version Control: Git and GitHub

## System Architecture

The application consists of a React frontend connected to Supabase services for authentication and database operations. External mapping and routing services provide location visualization and route information.

React Frontend
        |
        +---- Supabase Authentication
        |
        +---- Supabase PostgreSQL Database
        |
        +---- Google Maps API
        |
        +---- OpenRouteService API

## Project Structure

```text
ambufind/
├── src/
│   ├── components/
│   ├── context/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   └── ...
├── public/
├── supabase/
├── package.json
└── README.md

## Getting Started

### Prerequisites

Install Node.js, npm, and Git before setting up the project. A Supabase project and the required mapping and routing API credentials are also required.

### Clone the Repository

git clone <YOUR_REPOSITORY_URL>
cd ambufind

### Install Dependencies

npm install

### Configure Environment Variables

Create a `.env` file in the project root:

VITE_SUPABASE_URL=your_supabase_project_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

VITE_ORS_API_KEY=your_openrouteservice_api_key

Do not commit `.env` files or secret API keys to the repository.

### Start the Development Server

npm run dev

The application will normally be available at:

http://localhost:5173

## Supabase

Supabase provides authentication and PostgreSQL database services for the application.

The main data areas include:

profiles
patients
drivers
ambulances
ambulance_requests
hospitals

The application also uses Supabase Edge Functions for server-side operations that should not be performed directly from the client.

### Supabase Edge Functions

The project includes functionality for secure staff-account creation through the `create-staff-account` Edge Function.

After installing the Supabase CLI, authenticate with:

supabase login

Link the project:

supabase link --project-ref YOUR_PROJECT_REF

Deploy the function:

supabase functions deploy create-staff-account

## User Roles

### Patient

Patients can register and log in, submit ambulance requests, provide pickup locations, view request status, monitor active ambulance trips, and access relevant emergency information.

### Dispatcher

Dispatchers can view incoming requests, review emergency information, assign available ambulances, monitor active requests, track ambulance movement, and manage emergency status.

### Driver

Drivers can log in, view assigned emergency requests, manage assignments, share their GPS location, navigate toward pickup locations, update trip status, and complete emergency trips.

### Administrator

Administrators can view system statistics, manage users, manage ambulances, view ambulance requests, access operational reports, and manage system information.

## Ambulance Status

Available
Assigned
On Trip
Offline

## Emergency Request Status

Pending
Assigned
En Route
Arrived
Completed

## Development Notes

The system is developed as a web-based application using React and Supabase.

Mapping functionality depends on external mapping and routing services. Valid API credentials and network connectivity are therefore required for map and routing functionality.

The application consumes these external services through their APIs rather than implementing the underlying GPS, mapping, or routing infrastructure itself.

## Known Development Areas

Mobile-responsive layouts may require further refinement across some dashboards. Other areas for continued development include real-time distance and ETA updates, route recalculation during ambulance movement, UI synchronization after trip completion, mobile map usability, final deployment configuration, and production security configuration.

## Project Objective

The overall objective of AmbuFind is to provide a centralized GPS-enabled platform for managing ambulance requests, dispatch operations, ambulance assignment, real-time tracking, and emergency trip records.

## Academic Project

Project: GPS-Based Healthcare Logistics and Dispatch System

Institution: KCA University

Programme: Bachelor of Science in Software Development

Project Type: Final Year Project

## Disclaimer

AmbuFind is an academic software project developed for demonstration, evaluation, and learning purposes. It should not be used as a replacement for an officially approved emergency medical dispatch system without appropriate clinical, operational, security, regulatory, and infrastructure validation.
