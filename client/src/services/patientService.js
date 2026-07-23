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
        .single();

}