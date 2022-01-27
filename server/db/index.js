const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
});

module.exports = {
  query: (text, params, fulfillmentHandler, rejectionHandler) => {
    const start = Date.now();
    return pool
    .query(text, params)
    // log the query, how long it took and number of rows returned
    .then(res => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: res.rowCount });
      return res;
    })
    .then(fulfillmentHandler)
    .catch(rejectionHandler);
  },
}