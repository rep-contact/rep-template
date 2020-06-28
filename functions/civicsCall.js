import fetch from "node-fetch";

exports.handler = (event, context, callback) => {
  const googleApiUrl = `https://www.googleapis.com/civicinfo/v2/representatives`;
  const apiKey = process.env.GOOGLE_API_KEY;
  const address = event.body.address;
  callback(null, {
    statusCode: 200,
    body: apiKey && address + googleApiUrl,
  });
};
