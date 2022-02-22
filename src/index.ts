import dotenv from 'dotenv';
import polka from 'polka';
import mysql from 'mysql';
import { promisify } from 'util';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();

import mediator from './mediator';
import serviceLinks from './serviceLinks';

// Middlewares
import jsonResponse from './middlewares/jsonResponse';
import pagination from './middlewares/pagination';

// Route controllers
import carts from './controllers/carts';
import items from './controllers/items';
import customers from './controllers/customers';

const PORT = process.env.PORT || 8080;
const MYSQL_CONNECTION_LIMIT = parseInt(process.env.MYSQL_CONNECTION_LIMIT, 10) || 100;
const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;

const pool = mysql.createPool({
  connectionLimit: MYSQL_CONNECTION_LIMIT,
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
});

const query = promisify(pool.query);
mediator.provide('query', query);

polka()
  .use(jsonResponse, pagination, cors(), bodyParser.json())
  .get('/', (req, res) => {
    res.json(serviceLinks);
  })
  .use('/carts', carts)
  .use('/customers', customers)
  .use('/items', items)
  .use('/orders')
  .listen(PORT, () => console.log(`🕰 Running automata-api on port ${PORT}`));
