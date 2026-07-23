import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { getProfile } from "../services/profileService";
import { getPatient } from "../services/patientService";

const authContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [patient, setPatient] = useState(null);

    useEffect(() => {

        async function loadSession() {

            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (session?.user) {

                setUser(session.user);

                const { data } = await getProfile(session.user.id);

                setProfile(data);

                if (data.role === "patient") {

                    const { data: patientData } = await getPatient(data.id);

                    setPatient(patientData);

                } else {

                    setPatient(null);

                }

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

                if (data.role === "patient") {

                    const { data: patientData } = await getPatient(data.id);

                    setPatient(patientData);

                } else {

                    setPatient(null);

                }

            } else {

                setUser(null);
                setProfile(null);
                setPatient(null);

            }

        });

        return () => subscription.unsubscribe();

    }, []);

    return (

        <authContext.Provider
            value={{
                user,
                profile,
                patient,
                loading
            }}
        >

            {children}

        </authContext.Provider>

    );

}

export function useAuth() {
    const context = useContext(authContext);

    console.log("AUTH CONTEXT:", context);

    return context;
}