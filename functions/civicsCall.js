const axios = require("axios");

exports.handler = async (event, context, callback) => {
  const address = event.body;
  const key = process.env.GOOGLE_API_KEY;
  const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`;

  const res = await axios.get(endpoint);

  callback(null, {
    statusCode: res.status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ response: res.data }),
  });
};
