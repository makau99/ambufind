export default function DashboardCard({
    title,
    value,
    color
}) {

    return (

        <div className={`${color} rounded-xl shadow text-white p-6`}>

            <h2 className="text-lg">

                {title}

            </h2>

            <h1 className="text-4xl font-bold mt-3">

                {value}

            </h1>

        </div>

    );

}