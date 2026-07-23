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

export async function assignAmbulance(requestId, ambulanceId){

    const requestUpdate = await supabase

        .from("ambulance_requests")

        .update({

            ambulance_id: ambulanceId,

            status:"Assigned"

        })

        .eq("id",requestId);

    if(requestUpdate.error) return requestUpdate;

    return await supabase

        .from("ambulances")

        .update({

            status:"Assigned"

        })

        .eq("id",ambulanceId);

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

        .eq("status","Assigned")

        .order("requested_at");

}