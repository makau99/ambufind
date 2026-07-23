export default function Input({

    label,

    ...props

}){

    return(

        <div className="space-y-2">

            <label className="font-semibold text-gray-700">

                {label}

            </label>

            <input

                {...props}

                className="

                    w-full

                    rounded-xl

                    bg-white/60

                    backdrop-blur-lg

                    border

                    border-gray-200

                    px-4

                    py-3

                    outline-none

                    transition-all

                    duration-300

                    focus:border-red-700

                    focus:ring-4

                    focus:ring-red-700/20

                    hover:border-yellow-500

                "

            />

        </div>

    );

}