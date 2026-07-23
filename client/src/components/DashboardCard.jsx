import GlassCard from "./ui/GlassCard";

export default function DashboardCard({

    title,

    value,

    icon,

    color

}){

    return(

        <GlassCard className="p-6">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500">

                        {title}

                    </p>

                    <h1 className="text-4xl font-bold mt-2">

                        {value}

                    </h1>

                </div>

                <div

                    className={`

                        ${color}

                        text-white

                        p-5

                        rounded-2xl

                        text-2xl

                    `}

                >

                    {icon}

                </div>

            </div>

        </GlassCard>

    );

}