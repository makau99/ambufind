import { supabase } from "./supabase";

export async function getPendingRequests() {

    return await supabase

        .from("ambulance_requests")

        .select(`
            *,
            hospitals(name),
            patients(
                id,
                profiles(
                    full_name,
                    phone
                )
            )
        `)

        .eq("status", "Pending")

        .order("requested_at");

}

export async function getAmbulances() {

    return await supabase

        .from("ambulances")

        .select(`
            *,
            drivers(
                id,
                latitude,
                longitude,
                status,
                profiles(
                    full_name
                )
            )
        `)

        .order("registration_number");

}

export async function assignAmbulance(requestId, ambulanceId) {

    const requestUpdate = await supabase

        .from("ambulance_requests")

        .update({

            ambulance_id: ambulanceId,

            status: "Assigned"

        })

        .eq("id", requestId);

    if (requestUpdate.error) return requestUpdate;

    return await supabase

        .from("ambulances")

        .update({

            status: "Assigned"

        })

        .eq("id", ambulanceId);

}

export async function getAssignedRequests() {

    return await supabase

        .from("ambulance_requests")

        .select(`
            *,
            hospitals(name),
            ambulances(
                registration_number,
                status,
                drivers(
                    latitude,
                    longitude,
                    profiles(
                        full_name
                    )
                )
            ),
            patients(
                id,
                profiles(
                    full_name,
                    phone
                )
            )
        `)

        .in("status", [

            "Assigned",
            "En Route",
            "Arrived"

        ])

        .order("requested_at");

}

export async function getHospitals() {

    return await supabase

        .from("hospitals")

        .select("*")

        .order("name");

}