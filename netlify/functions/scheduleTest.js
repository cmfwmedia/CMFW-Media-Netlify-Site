export default async (req) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)

    const response = await fetch('/.netlify/functions/test')
        .then(response => response.json()
        )

}

export const config = {
    schedule: "* * * * *"
}