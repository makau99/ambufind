import { supabase } from "./supabase";

export async function getDriver(profileId) {

    return await supabase

        .from("drivers")

        .select("*")

        .eq("profile_id", profileId)

        .single();

}

export async function getCurrentTrip(driverId) {

    const { data: ambulance, error } = await supabase

        .from("ambulances")

        .select("*")

        .eq("driver_id", driverId)

        .single();

    if (error) {

        return {

            data: null,

            error

        };

    }

    const request = await supabase

        .from("ambulance_requests")

        .select(`

            *,

            hospitals(*),

            patients(

                *,

                profiles(*)

            ),

            ambulances(*)

        `)

        .eq("ambulance_id", ambulance.id)

        .in("status", [

            "Assigned",

            "En Route",

            "Arrived"

        ])

        .single();

    return request;

}

export async function updateTripStatus(id,status){

    return await supabase

        .from("ambulance_requests")

        .update({

            status

        })

        .eq("id",id);

}

export async function updateAmbulanceStatus(id,status){

    return await supabase

        .from("ambulances")

        .update({

            status

        })

        .eq("id",id);

}

export async function updateDriverStatus(id,status){

    return await supabase

        .from("drivers")

        .update({

            status

        })

        .eq("id",id);

}

export async function updateAmbulanceLocation(

    ambulanceId,

    latitude,

    longitude

){

    return await supabase

        .from("ambulances")

        .update({

            latitude,

            longitude

        })

        .eq("id",ambulanceId);

}