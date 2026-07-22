import { supabase } from "./supabase";

export async function getHospitals() {

    const { data, error } = await supabase
        .from("hospitals")
        .select("*")
        .order("name");

    return { data, error };

}