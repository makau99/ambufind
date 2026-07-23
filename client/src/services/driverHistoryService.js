import { supabase } from "./supabase";

export async function getDriverHistory(driverId) {

    // Find driver's ambulance
    const { data: ambulance, error } = await supabase
        .from("ambulances")
        .select("id")
        .eq("driver_id", driverId)
        .single();

    if (error || !ambulance) {

        return {
            data: [],
            error
        };

    }

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
            )
        `)

        .eq("ambulance_id", ambulance.id)

        .eq("status","Completed")

        .order("completed_at",{
            ascending:false
        });

}