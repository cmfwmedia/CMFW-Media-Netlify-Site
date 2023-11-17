import fetch from 'node-fetch'
import dotenv from "dotenv"
dotenv.config()

const endpoints = [
    // 'https://api.dronelogbook.com/equipment',
    'https://api.dronelogbook.com/flight',
    // 'https://api.dronelogbook.com/customer',
    // 'https://api.dronelogbook.com/project',
    //  'https://api.dronelogbook.com/user',
    'https://api.dronelogbook.com/drone',
    // 'https://api.dronelogbook.com/company',
    // 'https://api.dronelogbook.com/place',
];

const apiKey = process.env.DRONELOGBOOK_API_KEY;

async function fetchData(url, allData = []) {
    let hasMore = true;
    let page = 1;

    while (hasMore) {
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


export default async (event, context) => {
    try {
        const results = [];

        for (const endpoint of endpoints) {
            const data = await fetchData(endpoint);
            results.push({ [endpoint]: data });
        }

        results.forEach((result) => {
            console.log(result);
        });

        return {
            statusCode: 200,
            body: JSON.stringify(results),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data' }),
        };
    }
};

export const config = {
    schedule: "* * * * *"
}