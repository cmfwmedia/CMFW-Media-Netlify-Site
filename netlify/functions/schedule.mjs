import fetch from 'node-fetch'
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'

dotenv.config()

// Initialize Supabase client
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

export default async (req) => {
    const { next_run } = await req.json()


    try {
        const { data, error } = await supabase
            .from('jsontest') // Replace 'your_table_name' with the actual table name
            .insert([
                {
                    jsoncol: testJSON, // Replace column1, column2, ... with your column names
                    // Add more columns and values as needed
                },
            ]);

        if (error) {
            console.error('Error adding row:', error.message);
            return;
        }

        console.log('Row added successfully:', data);
    } catch (error) {
        console.error('Error adding row:', error.message);
    }
    console.log("Received event! Next invocation at:", next_run)
    console.log(testJSON);

}

export const config = {
    schedule: "* * * * *"
}