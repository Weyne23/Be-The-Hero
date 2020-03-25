const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

/*
  Metodos HTTp

  GET: buscar informação no back-end
  POST: adicionar informação no back-end
  PUT: alterar infromação no back-end
  DELETE: excluir informação no back-end
*/

/**
 * Tipos de parametros 
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?", (Filtros, Paginação)
 * Route Params: Parâmetros utilizando para indentificar recursos
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

 /**
  * SQL: MySQL, postegreSQL, SQLite, Oracle, Microsoft SQL Server
  * NoSQL: MongoDB, CouchBD, etc
  */

  /**
   * Driver: SELECT * FROM users
   * Query Builder: table('users').select('*').where()
   */


app.listen(3333);
