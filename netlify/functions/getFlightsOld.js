import fetch from 'node-fetch'
// const fetch = require('node-fetch');
require('dotenv').config()


//TO DO, MAKE SCRIPT DYNAMICALLY GET ALL PAGES, NOT HARD CODED

export const handler = async () => {
    const combinedData = [];
    const apiKey = process.env.DRONELOGBOOK_API_KEY

    for (let pageNum = 1; pageNum <= 8; pageNum++) {
        const url = `https://api.dronelogbook.com/flight?num_page=${pageNum}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'apiKey': `${apiKey}`,
            }
        });

        const data = await response.json();
        combinedData.push(...data.data); // Assuming the relevant data is in the 'data' property

        if (pageNum === 8) {
            return {
                statusCode: 200,
                body: JSON.stringify(combinedData)
            };
        }
    }
}
