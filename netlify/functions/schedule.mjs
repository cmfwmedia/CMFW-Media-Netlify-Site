import fetch from 'node-fetch'

export default async (req) => {
    const { next_run } = await req.json()

    const request1 = fetch('/.netlify/functions/getData').then(response => response.json());
    const request2 = fetch('/.netlify/functions/getFlights').then(response => response.json());
    const request3 = fetch('/.netlify/functions/getDrones').then(response => response.json());

    Promise.all([request1, request2, request3])
        .then(([data1, data2, data3]) => {
            console.log(data1);
            console.log(data2);
            console.log(data3);
        })
        .catch(error => {
            console.error(error);
        });
    console.log("Received event! Next invocation at:", next_run)
}

export const config = {
    schedule: "*/1 * * * *"
}