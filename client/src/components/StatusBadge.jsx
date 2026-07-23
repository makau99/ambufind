export default function StatusBadge({ status }) {

    let color = "";

    switch(status){

        case "Pending":

            color="bg-yellow-400";

            break;

        case "Assigned":

            color="bg-blue-500";

            break;

        case "En Route":

            color="bg-indigo-500";

            break;

        case "Arrived":

            color="bg-green-500";

            break;

        case "Completed":

            color="bg-green-700";

            break;

        case "Cancelled":

            color="bg-red-600";

            break;

        default:

            color="bg-gray-500";

    }

    return(

<span className={`${color} text-white px-3 py-1 rounded`}>

{status}

</span>

);

}