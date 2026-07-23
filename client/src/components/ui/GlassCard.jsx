export default function GlassCard({

    children,

    className=""

}){

    return(

        <div

            className={`

                bg-white/60

                backdrop-blur-xl

                rounded-3xl

                border

                border-white/40

                shadow-lg

                hover:shadow-2xl

                hover:-translate-y-1

                transition-all

                duration-300

                ${className}

            `}

        >

            {children}

        </div>

    );

}