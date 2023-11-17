import fetch from 'node-fetch'
require('dotenv').config()
import { createClient } from '@supabase/supabase-js'
const apiUrl = 'https://api.dronelogbook.com/flight';
const apiKey = process.env.DRONELOGBOOK_API_KEY;
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData(url) {
    let hasMore = true;
    let page = 1;
    const combinedData = [];

    while (hasMore) {
        const response = await fetch(`${url}?num_page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
            },
        });

        const { data, has_more } = await response.json();
        combinedData.push(...data);

        if (has_more !== 1) {
            hasMore = false;
        } else {
            page++;
        }
    }

    return combinedData;
}



export const handler = async (event, context) => {
    try {
        const flightData = await fetchData(apiUrl);

        // Push flightData to Supabase
        const { data, error } = await supabase
            .from('dronelogbook api container')
            .update([{ 'flight': flightData }])
            .match({ id: 1 }); // Update only the row(s) with id = 1

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
