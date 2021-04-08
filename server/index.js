require('dotenv/config')
const errorMiddleware = require('./error-middleware.js');
const express = require('express')
const ClientError = require('./client-error.js')

const app = express();
const jsonMiddleware = express.json();

app.use(jsonMiddleware);

const port = process.env.PORT;
console.log(port)

app.listen(process.env.PORT, () =>{
  console.log(`server listening to ${process.env.PORT}`)
})
