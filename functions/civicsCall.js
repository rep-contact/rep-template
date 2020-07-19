const axios = require("axios");

exports.handler = async (event, context, callback) => {
  const address = event.body;
  const key = process.env.GOOGLE_API_KEY;
  const placesKey = process.env.GOOGLE_PLACES_API_KEY;
  const endpoint = `https://www.googleapis.com/civicinfo/v2/representatives?key=${key}&address=${address}`;
  const placesEndpoint= `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&key=${placesKey}
  `

  const res = await axios.get(endpoint).catch(async function (error) {
    await axios.get(placesEndpoint).then((response) => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ response: response.data }),
      });
    }).catch((e) => {
      callback(null, {
        statusCode: 400,
        body: JSON.stringify({ response: error }),
      });
    })
  });

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ response: res.data }),
  });
};
