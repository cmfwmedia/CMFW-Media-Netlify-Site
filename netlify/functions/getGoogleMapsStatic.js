import fetch from 'node-fetch'
require('dotenv').config()
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const apiUrl = `https://maps.googleapis.com/maps/api/staticmap?center=40.943671406145,-98.334157384208&zoom=16&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:A%7C40.714728,-73.998672&key=${apiKey}`;


async function fetchData(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        },
    });
    const data = await response.json();
    return data
}


export const handler = async (event, context) => {

    try {
        const pictures = await fetchData(apiUrl);

        // Push flightData to Supabase
        console.log(pictures)
        if (error) {
            throw new Error(error.message);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Flight data pushed to Supabase' }),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to push data to Supabase' }),
        };
    }
}
