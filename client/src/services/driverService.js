import { supabase } from "./supabase";

export async function getDriver(profileId) {

    return await supabase

        .from("drivers")

        .select("*")

        .eq("profile_id", profileId)

        .single();

}

export async function getCurrentTrip(driverId) {

    // Find driver's ambulance
    const { data: ambulance, error } = await supabase

        .from("ambulances")

        .select("*")

        .eq("driver_id", driverId)

        .single();

    if (error) {

        return { data: null, error };

    }

    // Find current request assigned to that ambulance
    return await supabase

        .from("ambulance_requests")

        .select(`
            *,
            hospitals(name),
            patients(
                profile_id,
                profiles(
                    full_name,
                    phone
                )
            ),
            ambulances(
                registration_number
            )
        `)

        .eq("ambulance_id", ambulance.id)

        .in("status", ["Assigned", "En Route", "Arrived"])

        .single();

}

export async function updateTripStatus(requestId, status) {

    const updates = { status };

    if (status === "Completed") {
        updates.completed_at = new Date().toISOString();
    }

    return await supabase
        .from("ambulance_requests")
        .update(updates)
        .eq("id", requestId);

}

export async function updateAmbulanceStatus(ambulanceId, status) {

    return await supabase

        .from("ambulances")

        .update({
            status
        })

        .eq("id", ambulanceId);

}

export async function updateDriverStatus(driverId, status) {

    return await supabase

        .from("drivers")

        .update({
            status
        })

        .eq("id", driverId);

}