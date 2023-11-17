import fetch from 'node-fetch'
import dotenv from "dotenv"
dotenv.config()

const apiUrl = 'https://api.dronelogbook.com/flight';
const apiKey = process.env.DRONELOGBOOK_API_KEY; // Replace with your actual API key
const maxPages = 30; // Adjust the maximum number of pages you want to fetch

async function fetchData(url, allData = []) {
    let hasMore = true;
    let page = 1;

    while (hasMore && page <= maxPages) {
        const response = await fetch(`${url}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': apiKey,
            },
        });

        const data = await response.json();

        if (data && data.has_more === 1) {
            page++;
        } else {
            hasMore = false;
        }

        allData.push(data);
    }

    return allData;
}

export const handler = async () => {
    try {
        const flightData = await fetchData(apiUrl);

        flightData.forEach((pageData, pageIndex) => {
            console.log(`Flight Data - Page ${pageIndex + 1}:`, pageData);
            // Perform any processing or additional actions with the fetched flight data
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Flight data fetched and logged' }),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch flight data' }),
        };
    }
};
