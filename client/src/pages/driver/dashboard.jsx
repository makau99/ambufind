import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/authContext";


import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";


import L from "leaflet";

import "leaflet/dist/leaflet.css";



import {

    getDriver,

    getCurrentTrip,

    updateTripStatus,

    updateAmbulanceStatus,

    updateDriverStatus,

    updateAmbulanceLocation


} from "../../services/driverService";



import { getRoute } from "../../services/routeService";




delete L.Icon.Default.prototype._getIconUrl;


L.Icon.Default.mergeOptions({

    iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",


    iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",


    shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"

});





export default function DriverDashboard(){



const {profile}=useAuth();




const [driver,setDriver]=useState(null);


const [trip,setTrip]=useState(null);


const [ambulance,setAmbulance]=useState(null);



const [route,setRoute]=useState(null);



const [driverPosition,setDriverPosition]=useState(null);



const [loading,setLoading]=useState(true);







useEffect(()=>{


loadTrip();


},[]);







async function loadTrip(){



if(!profile)
return;




const {data:driverData}=await getDriver(

profile.id

);




if(!driverData){


setLoading(false);

return;


}




setDriver(driverData);





const {data}=await getCurrentTrip(

driverData.id

);





if(data){


setTrip(data);


setAmbulance(

data.ambulances

);


}



setLoading(false);



}









/*
=====================================
BUILD ROUTE ONLY ON STATUS CHANGE
=====================================
*/


useEffect(()=>{


async function createRoute(){



if(
!trip
)
return;





let destination;




if(
trip.status==="En Route"
){



destination={


lat:Number(

trip.pickup_latitude

),


lng:Number(

trip.pickup_longitude

)



};



}








if(
trip.status==="Arrived"
){



destination={


lat:Number(

trip.hospitals.latitude

),



lng:Number(

trip.hospitals.longitude

)



};



}







if(!destination)
return;






let start;



if(
trip.status==="En Route"
){


start={


lat:Number(

trip.hospitals.latitude

),


lng:Number(

trip.hospitals.longitude

)


};


}

else{


start={


lat:Number(

trip.pickup_latitude

),


lng:Number(

trip.pickup_longitude

)


};


}






const result =
await getRoute(

start,

destination

);





setRoute(result);





}



createRoute();



},[
trip?.status
]);
/*
=====================================
MOVE AMBULANCE ALONG ROUTE
=====================================
*/


useEffect(()=>{


if(
!route ||
!route.coordinates ||
!ambulance
)
return;



let index = 0;




const interval = setInterval(async()=>{


if(
index >= route.coordinates.length
){


clearInterval(interval);


return;


}





const point =
route.coordinates[index];





setDriverPosition(point);





await updateAmbulanceLocation(

ambulance.id,

point[0],

point[1]

);




index++;




},3000);






return ()=>clearInterval(interval);




},[
route,
ambulance
]);









/*
=====================================
CHANGE TRIP STATUS
=====================================
*/


async function changeStatus(status){



if(!trip)
return;





await updateTripStatus(

trip.id,

status

);







if(
status==="En Route"
){



await updateAmbulanceStatus(

ambulance.id,

"On Trip"

);



}








if(
status==="Completed"
){



await updateAmbulanceStatus(

ambulance.id,

"Available"

);





await updateDriverStatus(

driver.id,

"Available"

);



}







loadTrip();



}








if(loading){



return(

<DashboardLayout>


<div className="text-center text-xl">

Loading...

</div>


</DashboardLayout>


);


}
return (

<DashboardLayout>


<div className="space-y-8">



<h1 className="text-4xl font-bold">

Driver Dashboard

</h1>






{
!trip && (

<div className="
rounded-3xl
bg-white/60
backdrop-blur-xl
shadow-xl
p-10
">


<h2 className="
text-2xl
font-bold
text-green-700
">

Waiting for Assignment

</h2>


<p className="mt-3 text-gray-600">

No emergency has been assigned.

</p>



</div>


)

}







{
trip && (

<>


<div className="
grid
lg:grid-cols-2
gap-8
">





{/* ======================
 TRIP INFORMATION
======================= */}



<div className="
rounded-3xl
bg-white/60
backdrop-blur-xl
shadow-xl
p-8
">



<h2 className="
text-2xl
font-bold
mb-6
">

Current Trip

</h2>




<div className="space-y-5">





<div>

<p className="text-gray-500">

Patient

</p>


<h3 className="text-xl font-semibold">


{
trip.patients?.profiles?.full_name ||
"Unknown"
}


</h3>


</div>








<div>

<p className="text-gray-500">

Phone

</p>


<h3>

{
trip.patients?.profiles?.phone ||
"Unknown"
}


</h3>


</div>







<div>

<p className="text-gray-500">

Hospital

</p>


<h3>


{
trip.hospitals?.name
}



</h3>


</div>








<div>

<p className="text-gray-500">

Emergency Type

</p>


<h3>


{
trip.emergency_type
}


</h3>


</div>








<div>

<p className="text-gray-500">

Pickup Address

</p>


<h3>


{
trip.pickup_address
}


</h3>


</div>







<div>


<span className="
px-4
py-2
rounded-full
bg-red-100
text-red-700
font-semibold
">


{
trip.status
}


</span>


</div>






</div>




</div>









{/* ======================
 MAP SECTION
======================= */}



<div className="space-y-6">





<div className="
grid
grid-cols-2
gap-5
">





<div className="
rounded-3xl
bg-white/60
shadow-xl
p-6
">


<p className="text-gray-500">

Distance

</p>



<h2 className="
text-4xl
font-bold
text-blue-700
mt-2
">


{
route
?
`${route.distance} km`
:
"--"
}


</h2>


</div>







<div className="
rounded-3xl
bg-white/60
shadow-xl
p-6
">


<p className="text-gray-500">

ETA

</p>




<h2 className="
text-4xl
font-bold
text-green-700
mt-2
">


{
route
?
`${route.duration} mins`
:
"--"
}


</h2>


</div>





</div>









<div className="
rounded-3xl
overflow-hidden
shadow-2xl
border
border-white/30
">





<MapContainer



center={

driverPosition

||

[

Number(
trip.hospitals.latitude
),

Number(
trip.hospitals.longitude
)

]


}



zoom={15}



style={{

height:"500px",

width:"100%"

}}



>



<TileLayer


attribution="© OpenStreetMap contributors"


url="
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
"



/>









{/* AMBULANCE */}


{

driverPosition && (



<Marker

position={driverPosition}

>


<Popup>

🚑 Ambulance

</Popup>


</Marker>



)


}










{/* PATIENT PICKUP */}



{

trip.pickup_latitude &&

trip.pickup_longitude && (



<Marker



position={[

Number(
trip.pickup_latitude
),

Number(
trip.pickup_longitude
)

]}



>


<Popup>

Patient Pickup

</Popup>



</Marker>



)


}









{/* HOSPITAL */}




{

trip.hospitals.latitude &&

trip.hospitals.longitude && (




<Marker



position={[

Number(
trip.hospitals.latitude
),

Number(
trip.hospitals.longitude
)

]}



>


<Popup>

{

trip.hospitals.name

}


</Popup>



</Marker>



)


}









{/* BLUE ROUTE */}



{

route && route.coordinates && (



<Polyline



positions={

route.coordinates

}



pathOptions={{

color:"#2563eb",

weight:6

}}



/>



)



}





</MapContainer>






</div>






</div>






</div>









{/* ======================
 ACTION BUTTONS
======================= */}




<div className="
flex
gap-4
flex-wrap
">





{


trip.status==="Assigned" && (


<button


onClick={()=>changeStatus(
"En Route"
)}



className="
px-8
py-4
rounded-2xl
bg-blue-600
text-white
font-semibold
hover:bg-blue-700
"


>


Start Trip


</button>



)


}








{


trip.status==="En Route" && (


<button


onClick={()=>changeStatus(
"Arrived"
)}



className="
px-8
py-4
rounded-2xl
bg-yellow-500
text-white
font-semibold
hover:bg-yellow-600
"


>


Arrived


</button>



)


}








{


trip.status==="Arrived" && (


<button


onClick={()=>changeStatus(
"Completed"
)}



className="
px-8
py-4
rounded-2xl
bg-green-600
text-white
font-semibold
hover:bg-green-700
"


>


Complete Trip


</button>



)


}





</div>






</>


)

}






</div>


</DashboardLayout>

);

}