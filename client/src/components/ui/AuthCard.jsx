export default function AuthCard({ children }) {

    return (

        <div

            className="

                bg-white/55

                backdrop-blur-xl

                rounded-[30px]

                shadow-2xl

                border

                border-white/40

                p-10

                transition-all

                duration-500

            "

        >

            {children}

        </div>

    );

}