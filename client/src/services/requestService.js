import { supabase } from "./supabase";

export async function createRequest(requestData) {

    return await supabase
        .from("ambulance_requests")
        .insert(requestData)
        .select()
        .single();

}

export async function getPatientRequests(patientId) {

    return await supabase
        .from("ambulance_requests")
        .select(`
            *,
            hospitals(name),
            ambulances(registration_number)
        `)
        .eq("patient_id", patientId)
        .order("requested_at", { ascending: false });

}