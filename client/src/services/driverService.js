import { supabase } from "./supabase";

export async function getCurrentTrip(driverId) {

    return await supabase

        .from("ambulance_requests")

        .select(`
            *,
            hospitals(name),
            patients(
                profiles(
                    full_name,
                    phone
                )
            ),
            ambulances(
                id,
                driver_id,
                registration_number
            )
        `)

        .eq("status","Assigned")

        .single();

}

export async function updateTripStatus(requestId,status){

    return await supabase

        .from("ambulance_requests")

        .update({

            status

        })

        .eq("id",requestId);

}

export async function updateAmbulanceStatus(ambulanceId,status){

    return await supabase

        .from("ambulances")

        .update({

            status

        })

        .eq("id",ambulanceId);

}