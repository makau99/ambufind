import { supabase } from "./supabase";


/*
|--------------------------------------------------------------------------
| ADMIN SERVICE
|--------------------------------------------------------------------------
| This service uses the existing database schema.
|
| No new tables are created.
| No new columns are required.
|
| Existing tables used:
| - profiles
| - ambulances
| - ambulance_requests
| - patients
| - hospitals
| - drivers
|
| Existing ambulance statuses:
| - Available
| - Assigned
| - On Trip
| - Offline
|
| Existing request statuses:
| - Pending
| - Assigned
| - En Route
| - Arrived
| - Completed
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| GET ADMIN DASHBOARD STATISTICS
|--------------------------------------------------------------------------
*/

export async function getAdminDashboardStats() {

    try {

        const [
            usersResult,
            ambulancesResult,
            requestsResult
        ] = await Promise.all([

            supabase
                .from("profiles")
                .select("id, role"),

            supabase
                .from("ambulances")
                .select("id, status"),

            supabase
                .from("ambulance_requests")
                .select("id, status")
        ]);


        if (usersResult.error) {

            return {
                data: null,
                error: usersResult.error
            };

        }


        if (ambulancesResult.error) {

            return {
                data: null,
                error: ambulancesResult.error
            };

        }


        if (requestsResult.error) {

            return {
                data: null,
                error: requestsResult.error
            };

        }


        const users =
            usersResult.data || [];


        const ambulances =
            ambulancesResult.data || [];


        const requests =
            requestsResult.data || [];


        const stats = {

            users:
                users.length,


            ambulances:
                ambulances.length,


            availableAmbulances:
                ambulances.filter(
                    (ambulance) =>
                        ambulance.status === "Available"
                ).length,


            pendingRequests:
                requests.filter(
                    (request) =>
                        request.status === "Pending"
                ).length,


            activeRequests:
                requests.filter(
                    (request) =>
                        [
                            "Assigned",
                            "En Route",
                            "Arrived"
                        ].includes(
                            request.status
                        )
                ).length,


            completedRequests:
                requests.filter(
                    (request) =>
                        request.status === "Completed"
                ).length

        };


        return {
            data: stats,
            error: null
        };


    } catch (error) {

        console.error(
            "getAdminDashboardStats error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}


/*
|--------------------------------------------------------------------------
| GET ALL USERS
|--------------------------------------------------------------------------
|
| Uses the existing profiles table.
|
| The profiles.role field remains the source of
| application-level role information.
|--------------------------------------------------------------------------
*/

export async function getAllUsers() {

    try {

        const {
            data,
            error
        } = await supabase

            .from("profiles")

            .select(
                "id, full_name, phone, role, created_at"
            )

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "getAllUsers error:",
                error
            );


            return {
                data: null,
                error
            };

        }


        return {
            data: data || [],
            error: null
        };


    } catch (error) {

        console.error(
            "getAllUsers error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}


/*
|--------------------------------------------------------------------------
| UPDATE USER ROLE
|--------------------------------------------------------------------------
|
| Updates the existing role field in profiles.
|
| No separate role table is required.
|--------------------------------------------------------------------------
*/

export async function updateUserRole(
    userId,
    newRole
) {

    try {

        if (!userId) {

            return {
                data: null,
                error: new Error(
                    "User ID is required."
                )
            };

        }


        if (!newRole) {

            return {
                data: null,
                error: new Error(
                    "A user role must be selected."
                )
            };

        }


        const allowedRoles = [

            "Patient",
            "Driver",
            "Dispatcher",
            "Admin"

        ];


        if (
            !allowedRoles.includes(
                newRole
            )
        ) {

            return {
                data: null,
                error: new Error(
                    "Invalid user role."
                )
            };

        }


        const {
            data,
            error
        } = await supabase

            .from("profiles")

            .update({
                role: newRole
            })

            .eq(
                "id",
                userId
            )

            .select()

            .single();


        if (error) {

            console.error(
                "updateUserRole error:",
                error
            );


            return {
                data: null,
                error
            };

        }


        return {
            data,
            error: null
        };


    } catch (error) {

        console.error(
            "updateUserRole error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}


/*
|--------------------------------------------------------------------------
| GET ALL AMBULANCES
|--------------------------------------------------------------------------
|
| Uses the existing ambulances table.
|--------------------------------------------------------------------------
*/

export async function getAllAmbulances() {

    try {

        const {
            data,
            error
        } = await supabase

            .from("ambulances")

            .select(
                `
                id,
                registration_number,
                vehicle_type,
                status,
                driver_id,
                latitude,
                longitude
                `
            )

            .order(
                "registration_number",
                {
                    ascending: true
                }
            );


        if (error) {

            console.error(
                "getAllAmbulances error:",
                error
            );


            return {
                data: null,
                error
            };

        }


        return {
            data: data || [],
            error: null
        };


    } catch (error) {

        console.error(
            "getAllAmbulances error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}


/*
|--------------------------------------------------------------------------
| UPDATE AMBULANCE STATUS
|--------------------------------------------------------------------------
*/

export async function updateAmbulanceStatus(
    ambulanceId,
    newStatus
) {

    try {

        if (!ambulanceId) {

            return {
                data: null,
                error: new Error(
                    "Ambulance ID is required."
                )
            };

        }


        const allowedStatuses = [

            "Available",
            "Assigned",
            "On Trip",
            "Offline"

        ];


        if (
            !allowedStatuses.includes(
                newStatus
            )
        ) {

            return {
                data: null,
                error: new Error(
                    "Invalid ambulance status."
                )
            };

        }


        const {
            data,
            error
        } = await supabase

            .from("ambulances")

            .update({
                status: newStatus
            })

            .eq(
                "id",
                ambulanceId
            )

            .select()

            .single();


        if (error) {

            console.error(
                "updateAmbulanceStatus error:",
                error
            );


            return {
                data: null,
                error
            };

        }


        return {
            data,
            error: null
        };


    } catch (error) {

        console.error(
            "updateAmbulanceStatus error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}


/*
|--------------------------------------------------------------------------
| GET ALL AMBULANCE REQUESTS
|--------------------------------------------------------------------------
|
| IMPORTANT:
|
| The actual database schema contains:
|
| ambulance_requests
| - id
| - patient_id
| - hospital_id
| - ambulance_id
| - emergency_type
| - pickup_address
| - pickup_latitude
| - pickup_longitude
| - status
| - requested_at
| - completed_at
|
| The existing AdminRequests.jsx expects:
|
| request.patient.full_name
| request.patient.phone
| request.hospital.name
| request.ambulance.registration_number
| request.created_at
|
| Therefore, this function fetches the actual database
| fields and transforms the returned JavaScript object.
|
| No database columns are added or renamed.
|--------------------------------------------------------------------------
*/

export async function getAllRequests() {

    try {

        const {
            data,
            error
        } = await supabase

            .from("ambulance_requests")

            .select(
                `
                id,
                patient_id,
                hospital_id,
                ambulance_id,
                emergency_type,
                pickup_address,
                pickup_latitude,
                pickup_longitude,
                status,
                requested_at,
                completed_at,

                patients (
                    id,
                    profile_id,
                    gender,
                    date_of_birth,
                    emergency_contact,
                    blood_group,

                    profiles (
                        id,
                        full_name,
                        phone,
                        role
                    )
                ),

                hospitals (
                    id,
                    name,
                    county,
                    address,
                    latitude,
                    longitude,
                    phone
                ),

                ambulances (
                    id,
                    registration_number,
                    vehicle_type,
                    status,
                    driver_id,
                    latitude,
                    longitude,

                    drivers (
                        id,
                        profile_id,
                        license_number,
                        status,

                        profiles (
                            id,
                            full_name,
                            phone,
                            role
                        )
                    )
                )
                `
            )

            .order(
                "requested_at",
                {
                    ascending: false
                }
            );


        if (error) {

            console.error(
                "getAllRequests error:",
                error
            );


            return {
                data: null,
                error
            };

        }


        /*
        |--------------------------------------------------------------------------
        | ADAPT DATABASE RESPONSE FOR EXISTING ADMIN REQUESTS PAGE
        |--------------------------------------------------------------------------
        |
        | Database names:
        | patients
        | hospitals
        | ambulances
        | requested_at
        |
        | Existing AdminRequests names:
        | patient
        | hospital
        | ambulance
        | created_at
        |
        |--------------------------------------------------------------------------
        */

        const formattedRequests =
            (data || []).map(
                (request) => {

                    const patientRecord =
                        Array.isArray(
                            request.patients
                        )
                            ? request.patients[0]
                            : request.patients;


                    const hospitalRecord =
                        Array.isArray(
                            request.hospitals
                        )
                            ? request.hospitals[0]
                            : request.hospitals;


                    const ambulanceRecord =
                        Array.isArray(
                            request.ambulances
                        )
                            ? request.ambulances[0]
                            : request.ambulances;


                    const patientProfile =
                        Array.isArray(
                            patientRecord?.profiles
                        )
                            ? patientRecord.profiles[0]
                            : patientRecord?.profiles;


                    const driverRecord =
                        Array.isArray(
                            ambulanceRecord?.drivers
                        )
                            ? ambulanceRecord.drivers[0]
                            : ambulanceRecord?.drivers;


                    const driverProfile =
                        Array.isArray(
                            driverRecord?.profiles
                        )
                            ? driverRecord.profiles[0]
                            : driverRecord?.profiles;


                    return {

                        /*
                        |--------------------------------------------------------------------------
                        | Original ambulance_requests fields
                        |--------------------------------------------------------------------------
                        */

                        id:
                            request.id,

                        patient_id:
                            request.patient_id,

                        hospital_id:
                            request.hospital_id,

                        ambulance_id:
                            request.ambulance_id,

                        emergency_type:
                            request.emergency_type,

                        pickup_address:
                            request.pickup_address,

                        pickup_latitude:
                            request.pickup_latitude,

                        pickup_longitude:
                            request.pickup_longitude,

                        status:
                            request.status,

                        requested_at:
                            request.requested_at,

                        completed_at:
                            request.completed_at,


                        /*
                        |--------------------------------------------------------------------------
                        | Compatibility field for AdminRequests.jsx
                        |--------------------------------------------------------------------------
                        */

                        created_at:
                            request.requested_at,


                        /*
                        |--------------------------------------------------------------------------
                        | Compatibility object for AdminRequests.jsx
                        |--------------------------------------------------------------------------
                        */

                        patient:
                            patientProfile
                                ? {

                                    id:
                                        patientProfile.id,

                                    full_name:
                                        patientProfile.full_name,

                                    phone:
                                        patientProfile.phone,

                                    role:
                                        patientProfile.role,

                                    patient_id:
                                        patientRecord?.id,

                                    profile_id:
                                        patientRecord?.profile_id,

                                    gender:
                                        patientRecord?.gender,

                                    date_of_birth:
                                        patientRecord?.date_of_birth,

                                    emergency_contact:
                                        patientRecord?.emergency_contact,

                                    blood_group:
                                        patientRecord?.blood_group

                                }

                                : null,


                        hospital:
                            hospitalRecord
                                ? {

                                    id:
                                        hospitalRecord.id,

                                    name:
                                        hospitalRecord.name,

                                    county:
                                        hospitalRecord.county,

                                    address:
                                        hospitalRecord.address,

                                    latitude:
                                        hospitalRecord.latitude,

                                    longitude:
                                        hospitalRecord.longitude,

                                    phone:
                                        hospitalRecord.phone

                                }

                                : null,


                        ambulance:
                            ambulanceRecord
                                ? {

                                    id:
                                        ambulanceRecord.id,

                                    registration_number:
                                        ambulanceRecord.registration_number,

                                    vehicle_type:
                                        ambulanceRecord.vehicle_type,

                                    status:
                                        ambulanceRecord.status,

                                    driver_id:
                                        ambulanceRecord.driver_id,

                                    latitude:
                                        ambulanceRecord.latitude,

                                    longitude:
                                        ambulanceRecord.longitude,

                                    driver:
                                        driverProfile
                                            ? {

                                                id:
                                                    driverRecord?.id,

                                                profile_id:
                                                    driverRecord?.profile_id,

                                                license_number:
                                                    driverRecord?.license_number,

                                                status:
                                                    driverRecord?.status,

                                                full_name:
                                                    driverProfile.full_name,

                                                phone:
                                                    driverProfile.phone

                                            }

                                            : null

                                }

                                : null

                    };

                }
            );


        return {

            data:
                formattedRequests,

            error:
                null

        };


    } catch (error) {

        console.error(
            "getAllRequests error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}


/*
|--------------------------------------------------------------------------
| GET ADMIN REPORT DATA
|--------------------------------------------------------------------------
|
| Retrieves the existing records required for
| the Admin Reports page.
|--------------------------------------------------------------------------
*/

export async function getAdminReportData() {

    try {

        const [
            usersResult,
            ambulancesResult,
            requestsResult
        ] = await Promise.all([

            supabase

                .from("profiles")

                .select(
                    "id, role, created_at"
                ),


            supabase

                .from("ambulances")

                .select(
                    `
                    id,
                    registration_number,
                    vehicle_type,
                    status
                    `
                ),


            supabase

                .from("ambulance_requests")

                .select(
                    `
                    id,
                    emergency_type,
                    status,
                    requested_at,
                    completed_at
                    `
                )

                .order(
                    "requested_at",
                    {
                        ascending: false
                    }
                )

        ]);


        if (usersResult.error) {

            return {
                data: null,
                error: usersResult.error
            };

        }


        if (ambulancesResult.error) {

            return {
                data: null,
                error: ambulancesResult.error
            };

        }


        if (requestsResult.error) {

            return {
                data: null,
                error: requestsResult.error
            };

        }


        return {

            data: {

                users:
                    usersResult.data || [],

                ambulances:
                    ambulancesResult.data || [],

                requests:
                    requestsResult.data || []

            },

            error: null

        };


    } catch (error) {

        console.error(
            "getAdminReportData error:",
            error
        );


        return {
            data: null,
            error
        };

    }

}