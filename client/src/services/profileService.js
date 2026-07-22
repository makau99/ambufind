import { supabase } from "./supabase";

export async function getProfile(userId) {

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    return { data, error };

}