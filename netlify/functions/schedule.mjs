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

export default async (req) => {
    // Get everything from the notes table
    // let { data: notes, error } = await supabase
    //     .from('jasontest')
    //     .select('testText')

    //     console.log(notes)
    //     console.log(error)

    // try {
    //     const { data, error } = await supabase
    //         .from('jsonTest')
    //         .select('example');

    //     if (error) {
    //         console.error('Error fetching data:', error.message);
    //         return;
    //     }

    //     if (data.length > 0) {
    //         console.log('Values under the "example" column:');
    //         data.forEach(row => {
    //             console.log(row.example);
    //         });
    //     } else {
    //         console.log('No rows found in the table');
    //     }
    // } catch (error) {
    //     console.error('Error fetching data:', error.message);
    // }

    try {
        const { data, error } = await supabase
            .from('jsonTest')
            .insert([{ example: 'test' }]);

        if (error) {
            console.error('Error adding row:', error.message);
            return;
        }

        console.log('Row added successfully:', data);
    } catch (error) {
        console.error('Error adding row:', error.message);
    }
}



export const config = {
    schedule: "* * * * *"
}