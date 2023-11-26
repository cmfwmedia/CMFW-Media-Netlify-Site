import fetch from 'node-fetch'
require('dotenv').config()
import { createClient } from '@supabase/supabase-js'
const apiUrl = 'https://api.dronelogbook.com/company';
const apiKey = process.env.DRONELOGBOOK_API_KEY;
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export const handler = async (event, context) => {
    try {
        const testdata = "lol";

        // Push flightData to Supabase
        const { data, error } = await supabase
            .from('dronelogbook api container')
            .update([{ 'test': testdata }])
            .match({ id: 1 });

        if (error) {
            throw new Error(error.message);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'company data pushed to Supabase' }),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to push data to Supabase' }),
        };
    }
}
