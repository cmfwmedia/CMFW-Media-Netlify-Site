import fetch from 'node-fetch'

export default async (req) => {
    const { next_run } = await req.json()

    function createTestJSON() {
        const testJSON = {
            elements: [
                {
                    id: 1,
                    name: 'Element 1',
                    value: 10,
                    description: 'This is element 1'
                },
                {
                    id: 2,
                    name: 'Element 2',
                    value: 20,
                    description: 'This is element 2'
                },
                {
                    id: 3,
                    name: 'Element 3',
                    value: 30,
                    description: 'This is element 3'
                }
                // Add more elements as needed
            ]
        };

        return testJSON;
    }

    // Example usage:
    const testJSONData = createTestJSON();
  




    // const request1 = fetch('/.netlify/functions/getData').then(response => response.json());
    // const request2 = fetch('/.netlify/functions/getFlights').then(response => response.json());
    // const request3 = fetch('/.netlify/functions/getDrones').then(response => response.json());

    // Promise.all([request1, request2, request3])
    //     .then(([data1, data2, data3]) => {
    //         console.log(data1);
    //         console.log(data2);
    //         console.log(data3);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
    console.log("Received event! Next invocation at:", next_run)
    console.log(testJSONData);

}

export const config = {
    schedule: "* * * * *"
}