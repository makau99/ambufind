import axios from "axios";
import polyline from "@mapbox/polyline";


const API_KEY = import.meta.env.VITE_ORS_API_KEY;


const BASE_URL =
"https://api.openrouteservice.org/v2/directions/driving-car";



export async function getRoute(start, end){


    try{


        const {data}=await axios.post(


            BASE_URL,


            {

                coordinates:[

                    [
                        start.lng,
                        start.lat
                    ],

                    [
                        end.lng,
                        end.lat
                    ]

                ],

                instructions:false

            },


            {

                headers:{

                    Authorization:API_KEY,

                    "Content-Type":
                    "application/json"

                }


            }


        );



        console.log(
            "ORS RESPONSE:",
            data
        );





        if(
            !data.routes ||
            data.routes.length===0
        ){

            console.error(
                "No route found"
            );

            return null;

        }






        const route =
        data.routes[0];





        let coordinates=[];





        /*
        ORS DEFAULT:
        geometry = encoded polyline string
        */


        if(
            typeof route.geometry === "string"
        ){


            coordinates =
            polyline.decode(

                route.geometry

            );


        }






        /*
        Some ORS versions return GeoJSON
        */


        else if(
            route.geometry?.coordinates
        ){


            coordinates =

            route.geometry.coordinates.map(

                point=>[

                    point[1],

                    point[0]

                ]

            );


        }



        else{


            console.error(
                "No geometry returned",
                route
            );


            return null;


        }







        return{


            coordinates,


            distance:

            (

                route.summary.distance / 1000

            )
            .toFixed(2),




            duration:

            Math.ceil(

                route.summary.duration / 60

            )


        };





    }



    catch(error){


        console.error(

            "Route Error:",

            error.response?.data ||

            error.message

        );


        return null;


    }



}