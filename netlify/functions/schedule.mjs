import fetch from 'node-fetch'
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'
dotenv.config()
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// scheduledFetchData.js

exports.handler = async function (event, context) {
    const apiKey = process.env.DRONELOGBOOK_API_KEY; // Replace with your actual API key

    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': apiKey,
        }
    };

    // Function to make a fetch call
    async function fetchData(url) {
        try {
            const response = await fetch(url, fetchOptions);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Array of URLs for the fetch calls
    const urls = [
        'https://api.dronelogbook.com/flight',
        'https://api.dronelogbook.com/drone'
    ];

    // Perform fetch calls for all URLs and store their promises in an array
    const fetchPromises = urls.map(url => fetchData(url));

    try {
        // Wait for all fetch calls to resolve using Promise.all()
        const responses = await Promise.all(fetchPromises);

        // Log the array of responses
        console.log('Responses:', responses);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Scheduled fetch completed' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};

exports.handler.schedule = '*/1 * * * *'; // Run every minute