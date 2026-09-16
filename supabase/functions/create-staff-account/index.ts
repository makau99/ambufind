import { corsHeaders } from "npm:@supabase/supabase-js@^2/cors";
import { createClient } from "npm:@supabase/supabase-js@^2";


Deno.serve(async (req) => {

    /*
    |--------------------------------------------------------------------------
    | CORS PREFLIGHT
    |--------------------------------------------------------------------------
    */

    if (req.method === "OPTIONS") {

        return Response.json(
            { ok: true },
            {
                headers: corsHeaders
            }
        );

    }


    /*
    |--------------------------------------------------------------------------
    | ONLY POST IS ALLOWED
    |--------------------------------------------------------------------------
    */

    if (req.method !== "POST") {

        return Response.json(
            {
                error: "Method not allowed."
            },
            {
                status: 405,
                headers: corsHeaders
            }
        );

    }


    try {

        /*
        |--------------------------------------------------------------------------
        | SUPABASE CLIENT
        |--------------------------------------------------------------------------
        */

        const supabaseUrl =
            Deno.env.get(
                "SUPABASE_URL"
            );

        const supabaseAnonKey =
            Deno.env.get(
                "SUPABASE_ANON_KEY"
            );

        const supabaseServiceRoleKey =
            Deno.env.get(
                "SUPABASE_SERVICE_ROLE_KEY"
            );


        if (
            !supabaseUrl ||
            !supabaseAnonKey ||
            !supabaseServiceRoleKey
        ) {

            throw new Error(
                "Supabase environment variables are not configured."
            );

        }


        /*
        |--------------------------------------------------------------------------
        | CLIENT USING THE CURRENT USER'S SESSION
        |--------------------------------------------------------------------------
        */

        const supabaseUser =
            createClient(
                supabaseUrl,
                supabaseAnonKey,
                {
                    global: {
                        headers: {
                            Authorization:
                                req.headers.get(
                                    "Authorization"
                                ) ?? ""
                        }
                    }
                }
            );


        /*
        |--------------------------------------------------------------------------
        | VERIFY CURRENT USER
        |--------------------------------------------------------------------------
        */

        const {
            data: {
                user
            },
            error: userError
        } =
            await supabaseUser.auth.getUser();


        if (
            userError ||
            !user
        ) {

            return Response.json(
                {
                    error:
                        "Authentication required."
                },
                {
                    status: 401,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | ADMIN CLIENT
        |--------------------------------------------------------------------------
        |
        | Service-role key is ONLY used inside the Edge Function.
        | It must never be placed inside React.
        |
        */

        const supabaseAdmin =
            createClient(
                supabaseUrl,
                supabaseServiceRoleKey
            );


        /*
        |--------------------------------------------------------------------------
        | VERIFY CURRENT USER HAS ADMIN ROLE
        |--------------------------------------------------------------------------
        */

        const {
            data: adminProfile,
            error: adminProfileError
        } =
            await supabaseAdmin
                .from("profiles")
                .select(
                    "id, role"
                )
                .eq(
                    "id",
                    user.id
                )
                .single();


        if (
            adminProfileError ||
            !adminProfile
        ) {

            console.error(
                "Admin profile lookup error:",
                adminProfileError
            );

            return Response.json(
                {
                    error:
                        "Administrator profile could not be verified."
                },
                {
                    status: 403,
                    headers: corsHeaders
                }
            );

        }


        if (
            adminProfile.role !==
            "admin"
        ) {

            return Response.json(
                {
                    error:
                        "Administrator access required."
                },
                {
                    status: 403,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | READ REQUEST BODY
        |--------------------------------------------------------------------------
        */

        const body =
            await req.json();


        const fullName =
            body.fullName?.trim();

        const phone =
            body.phone?.trim();

        const email =
            body.email?.trim();

        const password =
            body.password;

        const role =
            body.role;


        /*
        |--------------------------------------------------------------------------
        | VALIDATE REQUIRED FIELDS
        |--------------------------------------------------------------------------
        */

        if (
            !fullName ||
            !phone ||
            !email ||
            !password ||
            !role
        ) {

            return Response.json(
                {
                    error:
                        "All staff account fields are required."
                },
                {
                    status: 400,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | STAFF ROLES
        |--------------------------------------------------------------------------
        |
        | Only Driver and Dispatcher can currently
        | be created from this page.
        |
        | Admin/System Administrator intentionally
        | remains dormant.
        |
        */

        const allowedRoles = [
            "driver",
            "dispatcher"
        ];


        if (
            !allowedRoles.includes(
                role
            )
        ) {

            return Response.json(
                {
                    error:
                        "Only Driver and Dispatcher accounts can be created."
                },
                {
                    status: 400,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | PASSWORD VALIDATION
        |--------------------------------------------------------------------------
        */

        if (
            password.length < 6
        ) {

            return Response.json(
                {
                    error:
                        "Password must contain at least 6 characters."
                },
                {
                    status: 400,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | CHECK WHETHER EMAIL ALREADY EXISTS
        |--------------------------------------------------------------------------
        */

        const {
            data: existingUsers,
            error: existingUsersError
        } =
            await supabaseAdmin.auth.admin.listUsers();


        if (existingUsersError) {

            console.error(
                "Existing user lookup error:",
                existingUsersError
            );

            return Response.json(
                {
                    error:
                        "Unable to verify existing accounts."
                },
                {
                    status: 500,
                    headers: corsHeaders
                }
            );

        }


        const emailExists =
            existingUsers.users.some(
                (existingUser) =>
                    existingUser.email?.toLowerCase() ===
                    email.toLowerCase()
            );


        if (emailExists) {

            return Response.json(
                {
                    error:
                        "An account with this email already exists."
                },
                {
                    status: 409,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | CREATE AUTH USER
        |--------------------------------------------------------------------------
        */

        const {
            data: authData,
            error: authError
        } =
            await supabaseAdmin.auth.admin.createUser({

                email:
                    email,

                password:
                    password,

                email_confirm:
                    true,

                user_metadata: {

                    full_name:
                        fullName,

                    phone:
                        phone,

                    role:
                        role

                }

            });


        if (
            authError ||
            !authData.user
        ) {

            console.error(
                "Auth user creation error:",
                authError
            );

            return Response.json(
                {
                    error:
                        authError?.message ||
                        "Unable to create authentication account."
                },
                {
                    status: 400,
                    headers: corsHeaders
                }
            );

        }


        const newUser =
            authData.user;


        /*
        |--------------------------------------------------------------------------
        | CREATE EXISTING PROFILE RECORD
        |--------------------------------------------------------------------------
        |
        | Uses the existing profiles table.
        | No new table or column is created.
        |
        */

        const {
            data: profileData,
            error: profileError
        } =
            await supabaseAdmin
                .from("profiles")
                .insert({

                    id:
                        newUser.id,

                    full_name:
                        fullName,

                    phone:
                        phone,

                    role:
                        role

                })
                .select()
                .single();


        /*
        |--------------------------------------------------------------------------
        | ROLLBACK AUTH ACCOUNT IF PROFILE INSERT FAILS
        |--------------------------------------------------------------------------
        */

        if (
            profileError
        ) {

            console.error(
                "Profile creation error:",
                profileError
            );


            /*
            | Delete the Auth account because
            | the profile could not be created.
            */

            await supabaseAdmin.auth.admin.deleteUser(
                newUser.id
            );


            return Response.json(
                {
                    error:
                        "Staff account could not be completed. The account creation was rolled back."
                },
                {
                    status: 500,
                    headers: corsHeaders
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | SUCCESS
        |--------------------------------------------------------------------------
        */

        return Response.json(
            {
                message:
                    "Staff account created successfully.",

                user: {

                    id:
                        newUser.id,

                    email:
                        newUser.email,

                    full_name:
                        fullName,

                    phone:
                        phone,

                    role:
                        role

                },

                profile:
                    profileData

            },
            {
                status: 201,
                headers: corsHeaders
            }
        );


    } catch (error) {

        console.error(
            "create-staff-account error:",
            error
        );


        return Response.json(
            {
                error:
                    error instanceof Error
                        ? error.message
                        : "Internal server error."
            },
            {
                status: 500,
                headers: corsHeaders
            }
        );

    }

});