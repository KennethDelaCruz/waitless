require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.TOKEN_SECRET);

const app = express();

app.use(staticMiddleware);
app.use(express.json());
app.put('/api/yelp-search', (req, res) => {
  // req.headers.body contains lat and long
  const { longitude, latitude, limit } = req.body;
  const searchRequest = {
    attributes: ['reservation'],
    longitude,
    latitude,
    radius: 10000,
    limit
  };
  client.search(searchRequest)
    .then(response => {
      const businesses = JSON.stringify(response.jsonBody.businesses, null, 4);
      res.status(200).json(businesses);
    })
    .catch(err => console.error(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
