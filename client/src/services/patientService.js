import { supabase } from "./supabase";

export async function getPatient(profileId) {

    const { data, error } = await supabase

        .from("patients")

        .select("*")

        .eq("profile_id", profileId)

        .single();

    return { data, error };

}