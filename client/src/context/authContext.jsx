import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getProfile } from "../services/profileService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadSession() {

            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (session?.user) {

                setUser(session.user);

                const { data } = await getProfile(session.user.id);

                setProfile(data);

            }

            setLoading(false);

        }

        loadSession();

        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(async (_, session) => {

            if (session?.user) {

                setUser(session.user);

                const { data } = await getProfile(session.user.id);

                setProfile(data);

            } else {

                setUser(null);
                setProfile(null);

            }

        });

        return () => subscription.unsubscribe();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                profile,
                loading
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}