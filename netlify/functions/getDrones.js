import fetch from 'node-fetch'
require('dotenv').config()

export const handler = async () => {

  const apiKey = process.env.DRONELOGBOOK_API_KEY
  const url = `https://api.dronelogbook.com/drone`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apiKey': `${apiKey}`,
    }
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  }
}