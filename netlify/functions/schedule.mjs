import fetch from 'node-fetch'
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'
dotenv.config()
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// export default async (req) => {
//     const { next_run } = await req.json()
//     try {
//         const { data, error } = await supabase
//             .from('jsontest') // Replace 'your_table_name' with the actual table name
//             .insert([
//                 {
//                     testText: "this is a text test", // Replace column1, column2, ... with your column names
//                     // Add more columns and values as needed
//                 },
//             ]);

//         if (error) {
//             console.error('Error adding row:', error.message);
//             return;
//         }

//         console.log('Row added successfully:', data);
//         console.log("Received event! Next invocation at:", next_run)

//     } catch (error) {
//         console.error('Error adding row:', error.message);
//     }
// }

export const handler = async (event) => {
    // Insert a row
    const { data, error } = await supabase
        .from('jsontest')
        .insert([
            { testText: 'I need to not forget this' },
        ]);

    // Did it work?
    console.log(data, error);
}

export const config = {
    schedule: "* * * * *"
}