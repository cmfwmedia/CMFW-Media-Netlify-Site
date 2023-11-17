import fetch from 'node-fetch'
import dotenv from "dotenv"
import { createClient } from '@supabase/supabase-js'
dotenv.config()
const supabaseUrl = process.env.DATABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req) => {

    const apiKey = process.env.DRONELOGBOOK_API_KEY
    const url = `https://api.dronelogbook.com/drone`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': `${apiKey}`,
        }
    });

    console.log(response)

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