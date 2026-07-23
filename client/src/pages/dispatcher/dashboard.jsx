import DashboardLayout from "../../layouts/DashboardLayout";

export default function DispatcherDashboard() {

    return (

        <DashboardLayout>

            <h1 className="text-3xl font-bold mb-8">

                Dispatcher Dashboard

            </h1>

            <div className="grid md:grid-cols-4 gap-6">

                <div className="bg-red-700 text-white rounded-xl p-6">

                    <h2 className="text-lg">

                        Pending Requests

                    </h2>

                    <h1 className="text-4xl font-bold mt-3">

                        0

                    </h1>

                </div>

                <div className="bg-blue-700 text-white rounded-xl p-6">

                    <h2>

                        Available Ambulances

                    </h2>

                    <h1 className="text-4xl font-bold mt-3">

                        0

                    </h1>

                </div>

                <div className="bg-green-700 text-white rounded-xl p-6">

                    <h2>

                        Active Trips

                    </h2>

                    <h1 className="text-4xl font-bold mt-3">

                        0

                    </h1>

                </div>

                <div className="bg-gray-800 text-white rounded-xl p-6">

                    <h2>

                        Completed Today

                    </h2>

                    <h1 className="text-4xl font-bold mt-3">

                        0

                    </h1>

                </div>

            </div>

        </DashboardLayout>

    );

}