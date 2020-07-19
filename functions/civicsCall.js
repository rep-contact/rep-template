const axios = require("axios");

exports.handler = async (event, context, callback) => {
  const address = event.body;
  const key = process.env.GOOGLE_API_KEY;
  const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`;

  const res = await axios.get(endpoint).catch(function (error) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ response: error }),
    });
  });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ response: res.data }),
  });
};
