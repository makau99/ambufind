import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import DispatcherMap from "../../components/maps/DispatcherMap";

import {
    getPendingRequests,
    getAmbulances,
    getAssignedRequests
} from "../../services/dispatcherService";

import {
    Ambulance,
    ClipboardList,
    Activity,
    CheckCircle
} from "lucide-react";

export default function DispatcherDashboard() {

    const [pending, setPending] = useState([]);

    const [assigned, setAssigned] = useState([]);

    const [ambulances, setAmbulances] = useState([]);

    useEffect(() => {

        loadDashboard();

        const interval = setInterval(loadDashboard,5000);

        return ()=>clearInterval(interval);

    }, []);

    async function loadDashboard(){

        const {data:pendingData}=await getPendingRequests();

        const {data:assignedData}=await getAssignedRequests();

        const {data:ambulanceData}=await getAmbulances();

        setPending(pendingData||[]);

        setAssigned(assignedData||[]);

        setAmbulances(ambulanceData||[]);

    }

    const availableCount=ambulances.filter(

        a=>a.status==="Available"

    ).length;

    const activeTrips=assigned.filter(

        r=>r.status!=="Completed"

    ).length;

    const completedToday=assigned.filter(

        r=>r.status==="Completed"

    ).length;

    return(

        <DashboardLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Dispatcher Control Center

                    </h1>

                    <p className="text-gray-500 mt-2">

                        Monitor ambulances and emergency requests in real time.

                    </p>

                </div>

                <div className="grid lg:grid-cols-4 gap-6">

                    <StatCard

                        title="Pending Requests"

                        value={pending.length}

                        color="from-red-600 to-red-500"

                        icon={<ClipboardList size={28}/>}

                    />

                    <StatCard

                        title="Available Ambulances"

                        value={availableCount}

                        color="from-green-600 to-green-500"

                        icon={<Ambulance size={28}/>}

                    />

                    <StatCard

                        title="Active Trips"

                        value={activeTrips}

                        color="from-blue-600 to-blue-500"

                        icon={<Activity size={28}/>}

                    />

                    <StatCard

                        title="Completed"

                        value={completedToday}

                        color="from-gray-700 to-gray-600"

                        icon={<CheckCircle size={28}/>}

                    />

                </div>

                <div className="grid xl:grid-cols-3 gap-8">

                    <div className="xl:col-span-2">

                        <div className="rounded-3xl overflow-hidden shadow-2xl">

                            <DispatcherMap/>

                        </div>

                    </div>

                    <div className="space-y-6">

                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-6">

                            <h2 className="text-xl font-bold mb-5">

                                Pending Requests

                            </h2>

                            {

                                pending.length===0?

                                <p className="text-gray-500">

                                    No pending requests.

                                </p>

                                :

                                pending.map(request=>(

                                    <div

                                        key={request.id}

                                        className="border-b last:border-none py-3"

                                    >

                                        <h3 className="font-semibold">

                                            {

                                                request.patients.profiles.full_name

                                            }

                                        </h3>

                                        <p className="text-sm text-gray-500">

                                            {

                                                request.emergency_type

                                            }

                                        </p>

                                        <p className="text-xs text-red-700">

                                            Pending

                                        </p>

                                    </div>

                                ))

                            }

                        </div>

                        <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl p-6">

                            <h2 className="text-xl font-bold mb-5">

                                Active Trips

                            </h2>

                            {

                                assigned.length===0?

                                <p className="text-gray-500">

                                    No active trips.

                                </p>

                                :

                                assigned.map(request=>(

                                    <div

                                        key={request.id}

                                        className="border-b last:border-none py-3"

                                    >

                                        <h3 className="font-semibold">

                                            {

                                                request.ambulances.registration_number

                                            }

                                        </h3>

                                        <p className="text-sm">

                                            {

                                                request.patients.profiles.full_name

                                            }

                                        </p>

                                        <span className="text-blue-700 text-xs">

                                            {

                                                request.status

                                            }

                                        </span>

                                    </div>

                                ))

                            }

                        </div>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}

function StatCard({

    title,

    value,

    color,

    icon

}){

    return(

        <div

            className={`

                rounded-3xl

                bg-gradient-to-r

                ${color}

                text-white

                p-6

                shadow-xl

                transition

                hover:scale-105

                duration-300

            `}

        >

            <div className="flex justify-between">

                <div>

                    <p className="text-white/80">

                        {title}

                    </p>

                    <h1 className="text-5xl font-bold mt-4">

                        {value}

                    </h1>

                </div>

                <div>

                    {icon}

                </div>

            </div>

        </div>

    );

}