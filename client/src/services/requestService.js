import { supabase } from "./supabase";

export async function createRequest(requestData) {

    const { data, error } = await supabase
        .from("ambulance_requests")
        .insert(requestData)
        .select()
        .single();

    return { data, error };

}

export async function getPatientRequests(patientId) {

    const { data, error } = await supabase
        .from("ambulance_requests")
        .select(`
            *,
            hospitals(name)
        `)
        .eq("patient_id", patientId)
        .order("requested_at", {
            ascending: false
        });

    return { data, error };

}

export async function getDashboardStats(patientId) {

    const { data, error } = await supabase
        .from("ambulance_requests")
        .select("status")
        .eq("patient_id", patientId);

    if (error) {
        return { data: null, error };
    }

    const stats = {
        total: data.length,
        pending: data.filter(r => r.status === "Pending").length,
        assigned: data.filter(r => r.status === "Assigned").length,
        completed: data.filter(r => r.status === "Completed").length
    };

    return { data: stats, error: null };

}