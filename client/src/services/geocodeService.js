export async function reverseGeocode(lat, lng){

    const response = await fetch(

        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`

    );

    return await response.json();

}