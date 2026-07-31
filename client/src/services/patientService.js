import { supabase } from "./supabase";

export async function getPatient(profileId) {

    return await supabase
        .from("patients")
        .select("*")
        .eq("profile_id", profileId)
        .single();

}

export async function updatePatient(patientId, patientData) {

    return await supabase
        .from("patients")
        .update(patientData)
        .eq("id", patientId)
        .select()
        .maybeSingle();

}

export async function getCurrentTrip(patientId) {

    return await supabase

        .from("ambulance_requests")

        .select(`
            *,
            ambulances(
                *,
                drivers(
                    *,
                    profiles(
                        full_name,
                        phone
                    )
                )
            ),
            hospitals(*),
            patients(
                *,
                profiles(
                    full_name,
                    phone
                )
            )
        `)

        .eq("patient_id", patientId)

        .in(
            "status",
            [
                "Assigned",
                "En Route",
                "Arrived"
            ]
        )

        .maybeSingle();

}