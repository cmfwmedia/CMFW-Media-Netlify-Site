export default async (req) => {
    const { next_run } = await req.json()

    console.log("Received event! Next invocation at:", next_run)
    return {
        statusCode: 200,
    };
}

export const config = {
    schedule: "* * * * *"
}