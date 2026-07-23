export default function Button({

    children,

    className="",

    ...props

}){

    return(

        <button

            {...props}

            className={`

                className="

                    w-full

                    py-3

                    rounded-xl

                    font-semibold

                    bg-gradient-to-r

                    from-red-700

                    to-red-600

                    text-white

                    shadow-lg

                    transition-all

                    duration-300

                    hover:scale-105

                    hover:shadow-2xl

                    hover:brightness-110

                    active:scale-95

                    "

                ${className}

            `}

        >

            {children}

        </button>

    );

}