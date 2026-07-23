import { supabase } from "./supabase";

export async function getProfile(userId) {

    return await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

}

export async function updateProfile(profileId, profileData) {

    return await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", profileId)
        .select()
        .single();

}