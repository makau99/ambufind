import { useEffect } from "react";
import { supabase } from "../services/supabase";

export default function Landing() {

    useEffect(() => {

        async function testConnection() {

            const { data, error } = await supabase
                .from("hospitals")
                .select("*");

            console.log(data);
            console.log(error);

        }

        testConnection();

    }, []);

    return (
        <h1>Landing Page</h1>
    );
}