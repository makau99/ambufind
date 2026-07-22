import { supabase } from "./supabase";

export async function register(formData) {

    const {
        fullName,
        email,
        phone,
        password
    } = formData;

    const { data, error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        return { error };
    }

    const { error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: data.user.id,
            full_name: fullName,
            phone,
            role: "patient"
        });

    if (profileError) {
        return { error: profileError };
    }

    return { data };
}

export async function login(email, password) {

    return await supabase.auth.signInWithPassword({
        email,
        password
    });

}

export async function logout() {

    return await supabase.auth.signOut();

}