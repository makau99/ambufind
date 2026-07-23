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

        .eq("status","Pending")

        .order("requested_at");

}

export async function getAvailableAmbulances() {

    return await supabase

        .from("ambulances")

        .select("*")

        .eq("status","Available");

}

export async function assignAmbulance(requestId, ambulanceId) {

    // Get the ambulance to find its driver
    const { data: ambulance, error } = await supabase
        .from("ambulances")
        .select("driver_id")
        .eq("id", ambulanceId)
        .single();

    if (error) return { error };

    // Update the request
    const requestUpdate = await supabase
        .from("ambulance_requests")
        .update({
            ambulance_id: ambulanceId,
            status: "Assigned"
        })
        .eq("id", requestId);

    if (requestUpdate.error) return requestUpdate;

    // Update ambulance status
    const ambulanceUpdate = await supabase
        .from("ambulances")
        .update({
            status: "Assigned"
        })
        .eq("id", ambulanceId);

    if (ambulanceUpdate.error) return ambulanceUpdate;

    // Update driver status
    if (ambulance.driver_id) {

        const driverUpdate = await supabase
            .from("drivers")
            .update({
                status: "Busy"
            })
            .eq("id", ambulance.driver_id);

        if (driverUpdate.error) return driverUpdate;
    }

    return { error: null };

}

export async function getAssignedRequests() {

    return await supabase

        .from("ambulance_requests")

        .select(`
            *,
            hospitals(name),
            ambulances(
                registration_number,
                status
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