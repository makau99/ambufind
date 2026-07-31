export async function reverseGeocode(latitude, longitude) {

    try {

        const response = await fetch(

            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,

            {

                headers: {

                    "Accept": "application/json"

                }

            }

        );

        if (!response.ok) {

            throw new Error("Failed to fetch address.");

        }

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return null;

    }

}