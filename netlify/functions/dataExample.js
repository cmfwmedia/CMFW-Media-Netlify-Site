import fetch from 'node-fetch'
require('dotenv').config()

export const handler = async () => {

    //   const apiKey = process.env.DRONELOGBOOK_API_KEY
    //   const url = `https://api.dronelogbook.com/drone`;
    //   const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'apiKey': `${apiKey}`,
    //     }
    //   });

    //   const data = await response.json();

    const url = "https://www.dronelogbook.com/inventory/droneDetail.php?id="
    const mavicMiniImageUrl = "https://images.squarespace-cdn.com/content/65022074520ebd181f024ee1/6e6477ba-2023-4574-8b31-ff234d9cb726/dji+mavic+mini.png?content-type=image%2Fpng"
    const mavic3EImageUrl = "https://images.squarespace-cdn.com/content/65022074520ebd181f024ee1/5f0c541f-df69-43a7-902a-9a338fbeb7de/DJI+Mavic+3E.jpg?content-type=image%2Fjpeg"
    const air2SImageUrl = "https://images.squarespace-cdn.com/content/65022074520ebd181f024ee1/14b3046b-cb01-4793-ad41-dcb5d179d99c/DJI+Air+2S.jpg?content-type=image%2Fjpeg"

    const data = [{


        name: "CMFW Mavic Air",
        model: "Mavic Mini",
        guid: "2F76663F-FF8B-4584-DDAB-A4B37FD033EA",
        brand: "DJI",
        status: "Retired",
        flight_time: 123,
        number_of_flights: 12,
        image_url: mavicMiniImageUrl
    },
    {
        name: "Goose",
        model: "Mavic 3E",
        guid: "137B375F-0BF0-B53E-6013-9C337C245FAE",
        brand: "DJI",
        status: "Airworthy",
        flight_time: 123,
        number_of_flights: 10,
        image_url: mavic3EImageUrl
    },
    {
        name: "Philip",
        model: "Air 2S",
        guid: "5B8E7F33-B590-0C83-5B94-0E49B07AAA33",
        brand: "DJI",
        status: "Airworthy",
        flight_time: 123,
        number_of_flights: 176,
        image_url: air2SImageUrl
    }
    ]

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}