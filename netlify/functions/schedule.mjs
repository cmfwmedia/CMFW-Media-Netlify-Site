import fetch from 'node-fetch'
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'

dotenv.config()

// Initialize Supabase client
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const simpleJSON = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com'
  };

export default async (req) => {
    const { next_run } = await req.json()


    try {
        const { data, error } = await supabase
            .from('jsontest') // Replace 'your_table_name' with the actual table name
            .insert([
                {
                    jsoncol: simpleJSON, // Replace column1, column2, ... with your column names
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
    console.log(simpleJSON);

}

export const config = {
    schedule: "* * * * *"
}