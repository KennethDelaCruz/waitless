require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.TOKEN_SECRET);
const app = express();
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

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
      res.status(200).json(response);
    })
    .catch(err => console.error(err));
});
// this needs to be changed to post, for users to be able to add a new      reservation
app.post('/api/restaurant-waitlist', (req, res) => {
  const { restaurantId } = req.body;
  const sql = `
  select from "reservations"
  where "restaurantId" = $1
  returning *;`;
  const query = [restaurantId];
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
