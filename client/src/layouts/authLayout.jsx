export default function AuthLayout({ children }) {

    return (

        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50">

            <div className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-red-600/20 blur-[120px]" />

            <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-yellow-400/20 blur-[120px]" />

            <div className="relative flex min-h-screen items-center justify-center p-6">

                {children}

            </div>

        </div>

    );

}