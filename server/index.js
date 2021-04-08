require('dotenv/config');
const errorMiddleware = require('./error-middleware.js');
const express = require('express');
const ClientError = require('./client-error.js');

const app = express();
const jsonMiddleware = express.json();

app.use(jsonMiddleware);

const port = process.env.PORT;
console.log(port);

// need to complete the first app.get (which will make a request to yelp-api)

app.listen(process.env.PORT, () => {
  console.log(`server listening to ${process.env.PORT}`);
});

const staticMiddleware = require('./static-middleware');

app.use(staticMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
