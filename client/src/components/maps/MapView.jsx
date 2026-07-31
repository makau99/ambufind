import {

    MapContainer,

    TileLayer,

    Marker,

    Popup

} from "react-leaflet";

export default function MapView({

    center,

    marker,

    zoom = 15,

    height = "450px"

}) {

    return (

        <MapContainer

            center={center}

            zoom={zoom}

            style={{

                height,

                width: "100%",

                borderRadius: "20px"

            }}

        >

            <TileLayer

                attribution="© OpenStreetMap contributors"

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

            />

            {marker && (

                <Marker position={marker}>

                    <Popup>

                        Current Location

                    </Popup>

                </Marker>

            )}

        </MapContainer>

    );

}