import fetch from 'node-fetch'
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'
dotenv.config()
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async () => {

    // const apiKey = process.env.DRONELOGBOOK_API_KEY
    // const url = `https://api.dronelogbook.com/drone`;

    // const response = await fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'apiKey': `${apiKey}`,
    //     }
    // });

    // const data = await response.json();

    try {
        const { data, error } = await supabase
            .from('jsonTest')
            .select('*')
            .eq('id', 1)
            .single();

        if (error) {
            console.error('Error fetching data:', error.message);
            return;
        }

        if (data) {
            console.log('Columns for row with ID 1:');
            console.log(data);
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            }
        } else {
            console.log('No row found with ID 1');
        }
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }


}