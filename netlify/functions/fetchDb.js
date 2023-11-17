import fetch from 'node-fetch';
require('dotenv').config();
import { createClient } from '@supabase/supabase-js';

const apiUrl = 'https://api.dronelogbook.com/company';
const apiKey = process.env.DRONELOGBOOK_API_KEY;
const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (event, context) => {
  try {
    // Fetch data from Supabase for row with id = 1
    const { data, error } = await supabase
      .from('dronelogbook api container')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Row with id 1 not found');
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.error('Error:', error);

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify({ error: 'Failed to retrieve data from Supabase' }),
    };
  }
};
