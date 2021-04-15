require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.TOKEN_SECRET);
const app = express();
const pg = require('pg');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
app.get('/api/restaurantId/:restaurant', (req, res, next) => {
  const restaurant = req.params.restaurant;
  const sql = `
  select "restaurantId"
  from "restaurants"
  where "restaurantName" = $1
  `;
  const params = [restaurant];
  db.query(sql, params)
    .then(result => {
      const output = result.rows[0];
      if (!output) {
        throw new ClientError(404, 'cannot find restaurantId');
      } else {
        res.json(output);
      }
    })
    .catch(err => next(err));
});

app.get('/api/waitlist/:Id', (req, res, next) => {
  const Id = parseInt(req.params.Id);
  const sql = `
  select count(*)
  from "reservations"
  where "restaurantId" = $1
  `;
  const params = [Id];
  db.query(sql, params)
    .then(result => {
      const count = result.rows[0];
      if (!count) {
        throw new ClientError(404, 'cannot find waitlist');
      } else {
        res.json(count);
      }

    })
    .catch(err => next(err));
});

app.post('/api/waitlist-reservation', (req, res, next) => {
  const { name, partySize, restaurantId, uniqueCode } = req.body;
  const sql = `
  insert into "reservations" ("customerName", "partySize", "restaurantId", "uniqueCode")
  values ($1, $2, $3, $4)
  returning "customerName", "partySize", "createdAt"
  `;
  const params = [name, partySize, restaurantId, uniqueCode];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => next(err));
});

app.put('/api/edit-reservation', (req, res, next) => {
  const { partySize, uniqueCode } = req.body;
  const sql = `
  update "reservations"
  set "partySize" = $1
  from "restaurants"
  where "uniqueCode" = $2
  returning *
  `;
  const params = [partySize, uniqueCode];
  db.query(sql, params)
    .then(result => {
      const update = result.rows[0];
      res.status(201).json(update);
    })
    .catch(err => next(err));
});

app.delete('/api/delete-reservation', (req, res, next) => {
  const { uniqueCode } = req.body;
  const sql = `
  delete from "reservations"
  where "uniqueCode" = $1;
  `;
  const params = [uniqueCode];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        const response = {
          Success: 'requested reservation deleted'
        };
        return res.status(404).json(response);
      } else {
        return res.sendStatus(204);
      }
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
