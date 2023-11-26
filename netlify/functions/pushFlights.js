export default async (req) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)

    const response = await fetch('https://cmfw-media-netlify-site.netlify.app/.netlify/functions/getFlights')
        .then(response => response.json()
        )
}

export const config = {
    schedule: "* * * * *"
}